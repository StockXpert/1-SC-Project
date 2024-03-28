const express = require('express');
const router = express.Router();
const EntreeController = require('../Controller/EntreeController');
const authMiddleware = require('../Middlewares/authMiddleware');
const multer = require('../Middlewares/multer');
router.get(
  '/ficheBesoins',
  authMiddleware,
  EntreeController.genererFicheBesoins
);
router.post(
  '/bonCommande',
  authMiddleware('bon commande'),
  EntreeController.genererBondeCommande
);
module.exports = router;
