const express = require('express');
const router = express.Router();
const EntreeController = require('../Controller/EntreeController');
const authMiddleware = require('../Middlewares/authMiddleware');
const multer = require('../Middlewares/multer');
router.post(
  '/bonCommande',
  authMiddleware('bon commande'),
  EntreeController.genererBondeCommande
);
router.delete(
  '/deleteCommande',
  authMiddleware('delete commande'),
  EntreeController.deleteCommande
);
router.post('/updateQuantite', multer, EntreeController.updateQuantite);
router.post(
  '/cancelCommande',
  authMiddleware('cancel commande'),
  EntreeController.cancelCommande
);
router.get(
  '/showCommandes',
  authMiddleware('show commandes'),
  EntreeController.showCommandes
);
router.put(
  '/updateBonCommande',
  authMiddleware('update bon commande'),
  EntreeController.updateBonCommande
);
router.post(
  '/showCommandeProducts',
  authMiddleware('show commande products'),
  EntreeController.showCommandeProducts
);
router.post(
  '/showBonReceptionProducts',
  authMiddleware('show bon reception products'),
  EntreeController.showBonReceptionProducts
);
router.put(
  '/updateReception',
  authMiddleware('update reception'),
  EntreeController.updateReception
);
router.delete(
  '/deleteReception',
  authMiddleware('delete reception'),
  EntreeController.deleteReception
);
router.post(
  '/showBonReception',
  authMiddleware('show bon reception'),
  EntreeController.showBonReception
);
module.exports = router;