const express=require('express');
const router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware');
const StatistiqueController=require('../Controller/StatistiqueController');
router.post('/articleDemandePerYear',authMiddleware("articleDemandePerYear"),StatistiqueController.articleDemandePerYear)
router.post('/rapidFournisseur',authMiddleware("rapidFournisseur"),StatistiqueController.rapidFournisseur)
router.post('/respStructureTopDemandeurs',authMiddleware("respStructureTopDemandeurs"),StatistiqueController.respStructureTopDemandeurs)
router.post('/responsableStructureMostdemmandedProduct',authMiddleware("responsableStructureMostdemmandedProduct"),StatistiqueController.responsableStructureMostdemmandedProduct)
router.post('/topDemandeurs',authMiddleware("topDemandeurs"),StatistiqueController.topDemandeurs)
router.post('/productDemandePerYear',authMiddleware("productDemandePerYear"),StatistiqueController.productDemandePerYear)
router.post('/structureMostdemmandedProduct',authMiddleware("structureMostdemmandedProduct"),StatistiqueController.structureMostdemmandedProduct)
router.post('/structureTopDemandeurs',authMiddleware("structureTopDemandeurs"),StatistiqueController.structureTopDemandeurs)
router.post('/mostCommandedProducts',authMiddleware("mostCommandedProducts"),StatistiqueController.mostCommandedProducts)
router.post('/mostUsedFournisseur',authMiddleware("mostUsedFournisseur"),StatistiqueController.mostUsedFournisseur)
router.post('/mostdemmandedProduct',authMiddleware("mostdemmandedProduct"),StatistiqueController.mostdemmandedProduct)
router.post('/commandesStat',authMiddleware("commandesStat"),StatistiqueController.commandesStat)
router.post('/consumerMostdemmandedProduct',authMiddleware("consumerMostdemmandedProduct"),StatistiqueController.consumerMostdemmandedProduct)
module.exports=router











