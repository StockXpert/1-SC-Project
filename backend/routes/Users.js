const express=require('express');
const router=express.Router();
const UserController=require('../Controller/UserController');
const authMiddleware=require('../Middlewares/authMiddleware');
router.post("/login",UserController.login)
router.post("/register",authMiddleware,UserController.register)
router.get("/showUsers",authMiddleware,UserController.showUsers)
router.get("/showUser",authMiddleware,UserController.showUser);
router.post("/forgotPassword",UserController.forgotPassword);
router.post("/changePasswordMail",UserController.changePasswordMail);
router.post("/changePasswordAuth",authMiddleware,UserController.changePasswordAuth);
router.post("/addStructure",authMiddleware,UserController.addStructure);
router.put("/updateConsumerInformations",authMiddleware,UserController.updateConsumerInformations);
router.put("/updateRespInformations",authMiddleware,UserController.updateRespInformations);
router.delete("/deleteUser",authMiddleware,UserController.deleteUser);
router.get("/showConsumers",authMiddleware,UserController.afficherConsommateurs);
router.put('/rattacher',authMiddleware,UserController.rattacher);
router.get('/showStructure',authMiddleware,UserController.showStructure);
router.get('/showResp',authMiddleware,)
module.exports=router;