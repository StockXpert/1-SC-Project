const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const multer=require('../Middlewares/multer')
const ParametreController=require('../Controller/ParametreController');
router.put('/changeCompletName',ParametreController.changeCompletName);
router.post('/uploadLogo',authMiddleware('upload logo'),multer,ParametreController.uploadLogo);
router.put('/changeName',ParametreController.changeName);
router.put('/changeAbstractName',ParametreController.changeAbstractName);
router.post('/uploadHeader',authMiddleware('upload header'),multer,ParametreController.uploadHeader)
router.get('/showInformations',ParametreController.showInformations)
router.put('/changeAppName',ParametreController.changeAppName);
router.put('/changeAdresse',ParametreController.changeAdresse);
router.put('/changeGestionCode',ParametreController.changeGestionCode);
router.put('/changeTelFax',ParametreController.changeTelFax);
module.exports=router