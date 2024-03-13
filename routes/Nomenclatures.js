const express=require('express');
const router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware');
const NomenclatureController=require('../Controller/NomenclatureController')
router.post('/addProduct',authMiddleware,NomenclatureController.addProduct);
router.delete('/deleteProduct',authMiddleware,NomenclatureController.deleteProduct);
router.put('/updateProduct',authMiddleware,NomenclatureController.updateProduct);
router.post('/addArticle',authMiddleware,NomenclatureController.addArticle);
router.delete('/deleteArticle',authMiddleware,NomenclatureController.deleteArticle);
router.post('/addFournisseur',authMiddleware,NomenclatureController.addFournisseur);
router.delete('/deleteFournisseur',authMiddleware,NomenclatureController.deleteFournisseur);
router.get('/showFournisseurs',authMiddleware,NomenclatureController.showFournisseurs);
router.get('/showProducts',authMiddleware,NomenclatureController.showProducts);
