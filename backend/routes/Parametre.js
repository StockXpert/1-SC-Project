const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const multer=require('../Middlewares/multer')
const ParametreController=require('../Controller/ParametreController');
router.put('/changeCompletName',ParametreController.changeCompletName);
router.put('/uploadLogo',multer,ParametreController.uploadLogo);
router.put('/changeName',ParametreController.changeName);
router.put('/changeAbstractName',ParametreController.changeAbstractName);
router.put('/uploadHeader',multer,ParametreController.uploadHeader)
router.get('/showInformations',ParametreController.showInformations)
router.put('/changeAppName',ParametreController.changeAppName);
router.put('/changeAdresse',ParametreController.changeAdresse);
router.put('/changeGestionCode',ParametreController.changeGestionCode);
router.put('/changeTelFax',ParametreController.changeTelFax);