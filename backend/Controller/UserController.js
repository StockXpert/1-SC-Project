const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../Services/UserService');
const userModel = require('../Models/UserModel');
const nodeMailer = require('nodemailer');
const { forEach } = require('async');
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
              console.log(response.designation);
              const token = jwt.sign(
                { email: email, role: response.designation },
                SecretKey,
                { expiresIn: '24h' }
              );

              userModel
                .getRolePermissons(response.designation)
                .then(permissions => {
                  res.status(200).json({
                    response: 'succuss of login',
                    jwt: token,
                    role: response.designation,
                    permissions,
                  });
                })
                .catch(() => {
                  res.status(500).json({ response: 'internal error' });
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
  const {
    email,
    role,
    password,
    prenom,
    nom,
    date_naissance,
    type,
    structure,
  } = req.body;
  const encry_pswrd = await bcrypt.hash(password, 10);
  userService
    .createUser(
      email,
      role,
      encry_pswrd,
      prenom,
      nom,
      date_naissance,
      type,
      structure
    )
    .then(() => {
      res.status(200).json({ response: 'user created' });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
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
    .then(Users => {
      res.status(200).json({ response: Users });
    })
    .catch(error => {
      res.status(500).json({ response: error });
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
function updateUser(req, res) {
  const { email, nom, prenom, date_naissance, structure, type, role } =
    req.body;
  userService
    .updateUser(email, nom, prenom, date_naissance, type, structure, role)
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
    .catch(error => {
      res.status(500).json({ response: error });
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
    .rattacher(structure, email)
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
function changeStatus(req, res) {
  const { email } = req.body;
  userModel
    .updateStatus(email)
    .then(() => {
      res.status(200).json({ response: 'status changed' });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
async function addRole(req, res) {
  const { role, permissions } = req.body;

  try {
    await userModel.insertRole(role);
    const roleId = await userModel.getRole(role);
    const response = await userModel.insertRoleDroit(roleId, permissions);

    if (response === 'success') {
      res.status(200).json({ response: 'role added' });
    } else {
      res.status(500).json({ response: 'internal error' });
    }
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout du rôle avec les autorisations :",
      error
    );
    res.status(500).json({ response: 'internal error' });
  }
}
function deleteRole(req, res) {
  const { role } = req.body;
  userModel
    .canDeleteRole(role)
    .then(() => {
      userModel
        .deleteRoleDroit(role)
        .then(() => {
          userModel
            .deleteRole(role)
            .then(() => {
              res.status(200).json({ response: 'role deleted' });
            })
            .then(() => {
              res.status(500).json({ response: 'internal error' });
            });
        })
        .catch(() => {
          res.status(500).json({ response: 'internal error' });
        });
    })
    .catch(() => {
      res.status(500).json({ response: "can't delete" });
    });
}
async function addPermissions(req, res) {
  const { role, permissions } = req.body;
  userModel
    .getRole(role)
    .then(roleId => {
      userModel
        .insertRoleDroit(roleId, permissions)
        .then(() => {
          res.status(500).json({ response: 'permissions added' });
        })
        .catch(() => {
          res.status(500).json({ response: 'internal error' });
        });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
async function deletePermissions(req, res) {
  const { role, permissions } = req.body;
  let response;
  for (let permission of permissions) {
    response = await userModel.deleteRoleDroit(role, permission);
    if (response != 'success')
      res.status(500).json({ response: 'internal error' });
  }
  res.status(200).json({ response: 'permissions deleted' });
}
function showRoles(req, res) {
  userModel
    .getRoles()
    .then(roles => {
      res.status(200).json({ response: roles });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function showPermissions(req, res) {
  userModel
    .getPermissions()
    .then(permissions => {
      res.status(200).json({ response: permissions });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function deleteStructure(req, res) {
  const { structure } = req.body;
  userModel
    .canDeleteStructure(structure)
    .then(() => {
      userModel
        .deleteStructure(structure)
        .then(() => {
          res.status(200).json({ response: 'structure deleted' });
        })
        .catch(() => {
          res.status(500).json({ response: 'internal error' });
        });
    })
    .catch(() => {
      res.status(200).json({ response: 'prohibited to delete' });
    });
}
function updateStructure(req, res) {
  const { oldDesignation, newDesignation } = req.body;
  userModel
    .updateStructure(oldDesignation, newDesignation)
    .then(() => {
      res.status(200).json({ response: 'structure updated' });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
async function addRole(req, res) {
  const { role, permissions } = req.body;

  try {
    await userModel.insertRole(role);
    const roleId = await userModel.getRole(role);
    const response = await userModel.insertRoleDroit(roleId, permissions);

    if (response === 'success') {
      res.status(200).json({ response: 'role added' });
    } else {
      res.status(500).json({ response: 'internal error' });
    }
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout du rôle avec les autorisations :",
      error
    );
    res.status(500).json({ response: 'internal error' });
  }
}
function deleteRole(req, res) {
  const { role } = req.body;
  userModel
    .canDeleteRole(role)
    .then(() => {
      userModel
        .deleteRoleDroit(role)
        .then(() => {
          userModel
            .deleteRole(role)
            .then(() => {
              res.status(200).json({ response: 'role deleted' });
            })
            .then(() => {
              res.status(500).json({ response: 'internal error' });
            });
        })
        .catch(() => {
          res.status(500).json({ response: 'internal error' });
        });
    })
    .catch(() => {
      res.status(500).json({ response: "can't delete" });
    });
}
async function addPermissions(req, res) {
  const { role, permissions } = req.body;
  userModel
    .getRole(role)
    .then(roleId => {
      userModel
        .insertRoleDroit(roleId, permissions)
        .then(() => {
          res.status(500).json({ response: 'permissions added' });
        })
        .catch(() => {
          res.status(500).json({ response: 'internal error' });
        });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
async function deletePermissions(req, res) {
  const { role, permissions } = req.body;
  let response;
  for (let permission of permissions) {
    response = await userModel.deleteRoleDroit(role, permission);
    if (response != 'success')
      res.status(500).json({ response: 'internal error' });
  }
  res.status(200).json({ response: 'permissions deleted' });
}
function showRoles(req, res) {
  userModel
    .getRoles()
    .then(roles => {
      res.status(200).json({ response: roles });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function showPermissions(req, res) {
  userModel
    .getPermissions()
    .then(permissions => {
      res.status(200).json({ response: permissions });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function deleteStructure(req, res) {
  const { structure } = req.body;
  userModel
    .canDeleteStructure(structure)
    .then(() => {
      userModel
        .deleteStructure(structure)
        .then(() => {
          res.status(200).json({ response: 'structure deleted' });
        })
        .catch(() => {
          res.status(500).json({ response: 'internal error' });
        });
    })
    .catch(() => {
      res.status(200).json({ response: 'prohibited to delete' });
    });
}
function updateStructure(req, res) {
  const { oldDesignation, newDesignation } = req.body;
  userModel
    .updateStructure(oldDesignation, newDesignation)
    .then(() => {
      res.status(200).json({ response: 'structure updated' });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
module.exports = {
  login,
  register,
  showUsers,
  deleteStructure,
  updateStructure,
  showUser,
  forgotPassword,
  changePasswordAuth,
  changePasswordMail,
  updateUser,
  deleteUser,
  addStructure,
  afficherConsommateurs,
  rattacher,
  responsable,
  showStructure,
  addRole,
  showResp,
  changeStatus,
  deleteRole,
  addPermissions,
  deletePermissions,
  showRoles,
  showPermissions,
};
