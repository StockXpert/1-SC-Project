const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../Services/UserService');
const userModel = require('../Models/UserModel');
const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kazi.kamil13@gmail.com',
    pass: 'mmnj tkih mbkp mloo',
  },
});
const passwordReset = {};
try {
  require('dotenv').config();
} catch (error) {
  console.error('Erreur lors du chargement du fichier .env:', error);
}
async function login(req, res) {
  const { email, password } = req.body;
  const SecretKey = process.env.KEY;
  // console.log({SecretKey})
  userService
    .verifyUser(email)
    .then(response => {
      if (response === 'email available')
        return res.status(404).json({ response: 'not existing account' });
      else {
        // console.log(password);
        // console.log(SecretKey);
        // console.log('login' + response.password);
        bcrypt
          .compare(password, response.password)
          .then(result => {
            // console.log('hi');
            if (result) {
              const token = jwt.sign(
                { email: email, role: response.role },
                SecretKey,
                { expiresIn: '30m' }
              );
              res
                .status(200)
                .json({
                  response: 'succuss of login',
                  jwt: token,
                  role: response.role,
                });
            } else res.status(404).json({ response: 'Password error' });
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
          });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ response: 'internal error' });
    });
}
async function register(req, res) {
  const SecretKey = process.env.KEY;
  const { email, role, password } = req.body;
  const encry_pswrd = await bcrypt.hash(password, 10);
  userService.createUser(email, role, encry_pswrd).then(response => {
    if (
      (role != 'Consommateur' && role != 'RD' && role != 'DG') ||
      response != 'utilisateur insere'
    )
      return res.json({ response });
    if (role == 'RD' || role == 'DG') {
      const { nom, prenom, email, date_naissance } = req.body;
      userService
        .createResponsable(nom, prenom, email, date_naissance)
        .then(response => {
          res.status(200).json({ response });
        })
        .catch(response => {
          res.status(500).json({ response });
        });
    } else {
      const { nom, prenom, date_naissance, type, structure } = req.body;
      userService
        .createConsommateur(nom, prenom, date_naissance, structure, email, type)
        .then(() => {
          res.status(200).json({ response: 'user created' });
        })
        .catch(() => {
          res.status(500).json({ response: 'internal error' });
        });
    }
  });
}
function showUsers(req, res) {
  userModel
    .getUsers()
    .then(results => {
      res.status(200).json({ response: results });
    })
    .catch(error => {
      res.status(500).json({ error: 'internal error' });
    });
}
function showUser(req, res) {
  userModel
    .getUser(req.email)
    .then(results => {
      res.status(200).json({ response: results });
    })
    .catch(error => {
      res.status(500).json({ error: 'internal error' });
    });
}
function forgotPassword(req, res) {
  let { email } = req.body;
  let code = userService.generateCode();
  passwordReset[email] = code;
  // console.log(passwordReset);
  const mailOptions = {
    from: 'kazi.kamil13@gmail.com',
    to: email,
    subject: 'Réinitialisation de mot de passe',
    text: `Votre code de réinitialisation de mot de passe est : ${code}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Erreur lors de l'envoi du courriel.");
    } else {
      console.log('E-mail envoyé: ' + info.response);
      res
        .status(200)
        .send('Un e-mail de réinitialisation de mot de passe a été envoyé.');
    }
  });
}
async function changePasswordMail(req, res) {
  let { email, code, newPassword } = req.body;
  if (!newPassword) res.status(400).json({ response: 'no found attribut' });
  // console.log(passwordReset);
  if (passwordReset[email] === code) {
    const encry_pswrd = await bcrypt.hash(newPassword, 10);
    userModel
      .changePassword(email, encry_pswrd)
      .then(() => {
        res.status(200).json({ response: 'password changed with success' });
      })
      .catch(() => {
        res.status(500).json({ response: 'internal error' });
      });
  } else res.status(400).json({ response: 'code invalid' });
}
async function changePasswordAuth(req, res) {
  const { email } = req;
  const { newPassword } = req.body;
  if (!newPassword) res.status(400).json({ response: 'no found attribut' });
  const encry_pswrd = await bcrypt.hash(newPassword, 10);
  // console.log(encry_pswrd);
  userModel
    .changePassword(email, encry_pswrd)
    .then(() => {
      res.status(200).json({ response: 'password changed with success' });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function updateConsumerInformations(req, res) {
  const { email, nom, prenom, date_naissance, structure, type } = req.body;
  userService
    .updateConsumerInfos(email, nom, prenom, date_naissance, type, structure)
    .then(() => {
      res.status(200).json({ response: 'informations changed' });
    })
    .catch(() => {
      res.status(400).json({ response: 'internal error' });
    });
}
function deleteUser(req, res) {
  if (req.email === req.body.email)
    res.status(400).json({ response: 'prohibited to delete admin' });
  let { email } = req.body;
  userService
    .deleteUser(email)
    .then(() => {
      res.status(200).json({ response: 'user deleted' });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function addStructure(req, res) {
  const { designation, email } = req.body;
  // console.log(designation);
  userModel
    .addStructure(designation, email)
    .then(() => {
      res.status(200).json({ response: 'structure added' });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function afficherConsommateurs(req, res) {
  userModel
    .afficherConsommateurs()
    .then(response => {
      res.status(200).json({ response });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function rattacher(req, res) {
  const { structure, email } = req.body;
  userService
    .rattacher(email, structure)
    .then(response => {
      res.status(200).json({ response });
    })
    .catch(response => {
      res.status(400).json({ response });
    });
}
function responsable(req, res) {
  const { structure, email } = req.body;
  userService
    .responsable(email, structure)
    .then(response => {
      res.status(200).json({ response });
    })
    .catch(response => {
      res.status(400).json({ response });
    });
}
function showStructure(req, res) {
  userModel
    .getStructures()
    .then(response => {
      res.status(200).json({ response });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function updateRespInformations(req, res) {
  const { nom, prenom, email, date_naissance } = req.body;
  userModel
    .updateInformations(
      email,
      nom,
      prenom,
      date_naissance,
      null,
      null,
      'responsable'
    )
    .then(() => {
      res.status(200).json({ response: 'infomations updated' });
    })
    .catch({ response: 'internal error' });
}
function showResp(req, res) {
  userModel
    .showResp()
    .then(response => {
      res.status(200).json({ response });
    })
    .catch(() => {
      res.status(200).json({ response: 'internal error' });
    });
}
module.exports = {
  login,
  register,
  showUsers,
  showUser,
  forgotPassword,
  changePasswordAuth,
  changePasswordMail,
  updateConsumerInformations,
  deleteUser,
  addStructure,
  afficherConsommateurs,
  rattacher,
  responsable,
  showStructure,
  updateRespInformations,
  showResp,
};
