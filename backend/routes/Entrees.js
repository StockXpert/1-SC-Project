const express=require('express');
const router=express.Router();
const EntreeController=require('../Controller/EntreeController');
const authMiddleware=require('../Middlewares/authMiddleware');
router.get("/ficheBesoins",authMiddleware,EntreeController.genererFicheBesoins)
router.post('/bonCommande',authMiddleware('bon commande'),EntreeController.genererBondeCommande);
router.delete('/deleteCommande',authMiddleware('delete commande'),EntreeController.deleteCommande)
router.put('/updateQuantite',authMiddleware('update quantite'),EntreeController.updateQuantite)
router.post('/cancelCommande',authMiddleware('cancel commande'),EntreeController.cancelCommande)
router.get('/showCommandes',authMiddleware('show commandes'),EntreeController.showCommandes);
router.put('/updateBonCommande',authMiddleware('update bon commande'),EntreeController.updateBonCommande)
module.exports=router;