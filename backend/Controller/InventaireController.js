const { response } = require('express');
const InventaireModel = require('../Models/InventaireModel');
const InventaireService = require('../Services/InventaireService');
const NomenclatureModel = require('../Models/NomenclatureModel');
function createInventaire(req, res) {
  const { numInventaire, dateInventaire, produits } = req.body;
  InventaireModel.addInventaire(numInventaire, dateInventaire)
    .then(() => {
      NomenclatureModel.updateInventaire(produits)
        .then(() => {
          InventaireModel.insertCompter(numInventaire, produits)
            .then(() => {
              res.status(200).json({ response: 'inventaire created' });
            })
            .catch(() => res.status(500).json({ response: 'internal error' }));
        })
        .catch(() => res.status(500).json({ response: 'internal error' }));
    })
    .catch(() => res.status(500).json({ response: 'internal error' }));
}
function validInventaire(req, res) {
  const { numInventaire } = req.body;
  const currentYear = new Date().getFullYear();
  InventaireModel.changeInvetaireStatus(numInventaire, 'valid')
    .then(async () => {
      await Promise.all([
        InventaireService.addRegistre(numInventaire),
        InventaireService.addFiches(currentYear),
      ]);
      res.status(200).json({ response: 'validated' });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function updateInventaire(req, res) {
  const { numInventaire, produits } = req.body;
  InventaireModel.getInventaireStatus(numInventaire)
    .then(status => {
      if (status === 'valid' || status === 'confirme')
        res.status(400).json({ response: 'prohibited' });
      else {
        NomenclatureModel.updateInventaire(produits)
          .then(() => {
            InventaireModel.updateInventaire(numInventaire, produits)
              .then(() => {
                res.status(200).json({ response: 'updated' });
              })
              .catch(() => {
                res.status(500).json({ response: 'internal error' });
              });
          })
          .catch(() => {
            res.status(500).json({ response: 'internal error' });
          });
      }
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function confirmInventaire(req, res) {
  const { numInventaire } = req.body;
  InventaireModel.changeInvetaireStatus(numInventaire, 'confirme')
    .then(() => {
      res.status(200).json({ response: 'confirmed' });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function update(req, res) {
  const { numInventaire } = req.body;

  InventaireModel.deleteRefs(numInventaire).then(() => {
    InventaireModel.countQuantitePhys()
      .then(produits => {
        console.log({ produits });
        InventaireModel.updateQuantite(produits)
          .then(() => {
            res.status(200).json({ response: 'updated' });
          })
          .catch(() => {
            res.status(500).json({ response: 'internal error' });
          });
      })
      .catch(() => {
        res.status(500).json({ response: 'internal error' });
      });
  });
}
function showInventaires(req, res) {
  InventaireModel.getInventaires()
    .then(inventaires => {
      res.status(200).json({ response: inventaires });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function showInventaire(req, res) {
  const { numInventaire } = req.body;
  InventaireModel.getInventaire(numInventaire)
    .then(inventaire => {
      res.status(200).json({ response: inventaire });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function deleteInventaire(req, res) {
  const { numInventaire } = req.body;
  InventaireModel.getInventaireStatus(numInventaire)
    .then(status => {
      if (status === 'valid') res.status(400).json({ response: 'prohibited' });
      else {
        InventaireModel.deleteInventaire(numInventaire)
          .then(() => {
            InventaireModel.deleteCompter(numInventaire)
              .then(() => {
                res.status(200).json({ response: 'deleted' });
              })
              .catch(() => {
                res.status(500).json({ response: 'internal error' });
              });
          })
          .catch(() => {
            res.status(500).json({ response: 'internal error' });
          });
      }
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
module.exports = {
  createInventaire,
  showInventaire,
  showInventaires,
  updateInventaire,
  deleteInventaire,
  validInventaire,
  update,
  confirmInventaire,
};
