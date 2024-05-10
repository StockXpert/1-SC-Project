const express=require('express');
const router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware');
const StatistiqueController=require('../Controller/StatistiqueController');
router.post('/articleDemandePerYear',/*authMiddleware()*/StatistiqueController.articleDemandePerYear)
router.post('/rapidFournissuer',/*authMiddleware(),*/StatistiqueController.rapidFournissuer)
router.post('/respStructureTopDemandeurs',/*authMiddleware(),*/StatistiqueController.respStructureTopDemandeurs)
router.post('/responsableStructureMostdemmandedProduct',/*authMiddleware(),*/StatistiqueController.responsableStructureMostdemmandedProduct)
router.post('/topDemandeurs',/*authMiddleware(),*/StatistiqueController.topDemandeurs)
router.post('/productDemandePerYear',/*authMiddleware(),*/StatistiqueController.productDemandePerYear)
router.post('/structureMostdemmandedProduct',/*authMiddleware(),*/StatistiqueController.structureMostdemmandedProduct)
router.post('/structureTopDemandeurs',/*authMiddleware(),*/StatistiqueController.structureTopDemandeurs)
router.post('/mostCommandedProducts',/*authMiddleware(),*/StatistiqueController.mostCommandedProducts)
router.post('/mostUsedFournissuer',/*authMiddleware(),*/StatistiqueController.mostUsedFournissuer)
router.post('/mostdemmandedProduct',/*authMiddleware(),*/StatistiqueController.mostdemmandedProduct)
router.post('/commandesStat',/*authMiddleware(),*/StatistiqueController.commandesStat)
router.post('/consumerMostdemmandedProduct',/*authMiddleware(),*/StatistiqueController.consumerMostdemmandedProduct)












