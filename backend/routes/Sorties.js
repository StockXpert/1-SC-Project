const express=require('express');
const router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware')
router.post('/demandeFourniture',authMiddleware("demande fourniture"));
router.post('/fournitureRespApp',authMiddleware('approuve fourniture by responsable'),)
router.post('/fournitureDirApp',authMiddleware('approuve fourniture by director'),);
router.delete('/deleteFourniture',authMiddleware("delete fourniture"),);
router.put('/updateFourniture',authMiddleware('update fourniture'),)
router.get('/showRespFourniture',authMiddleware('show resp fourniture'))
router.get('/showDirFourniture',authMiddleware('show director fourniture'));
module.exports=router;