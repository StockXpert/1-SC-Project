const express=require('express');
const router=express.Router();
const EntreeController=require('../Controller/EntreeController');
const authMiddleware=require('../Middlewares/authMiddleware');
router.get("/ficheBesoins",authMiddleware,EntreeController.genererFicheBesoins)

module.exports=router;