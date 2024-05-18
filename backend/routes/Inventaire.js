const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const inventaireController = require('../Controller/InventaireController');
router.post(
  '/createInventaire',
  authMiddleware('create inventaire'),
  inventaireController.createInventaire
);
router.post(
  '/validInventaire',
  authMiddleware('valid inventaire'),
  inventaireController.validInventaire
);
router.get(
  '/showInventaires',
  authMiddleware('show inventaires'),
  inventaireController.showInventaires
);
router.get(
  '/showInventaire',
  authMiddleware('show inventaire'),
  inventaireController.showInventaire
);
router.put(
  '/updateInventaire',
  authMiddleware('update inventaire'),
  inventaireController.updateInventaire
);
router.delete(
  '/deleteInventaire',
  authMiddleware('delete inventaire'),
  inventaireController.deleteInventaire
);
router.put('/update', authMiddleware('update'), inventaireController.update);
router.put('/confirmInventaire', inventaireController.confirmInventaire);
module.exports = router;
