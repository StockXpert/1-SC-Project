const express=require('express');
const router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware');
const NomenclatureController=require('../Controller/NomenclatureController');
router.post('/addChapter',authMiddleware('add chapter'),NomenclatureController.addChapter);
router.delete('/deleteChapter',authMiddleware('delete chapter'),NomenclatureController.deleteChapter);
router.put('/updateChapter',authMiddleware('update chapter'),NomenclatureController.updateChapter)
router.post('/addProduct',authMiddleware('add product'),NomenclatureController.addProduct);
router.delete('/deleteProduct',authMiddleware('delete product'),NomenclatureController.deleteProduct);
router.post('/addArticle',authMiddleware('add article'),NomenclatureController.addArticle);
router.put('/updateArticle',authMiddleware('update article'),NomenclatureController.updateArticle)
router.delete('/deleteArticle',authMiddleware('delete article'),NomenclatureController.deleteArticle);
router.post('/addFournisseur',authMiddleware('add fournisseur'),NomenclatureController.addFournisseur);
router.delete('/deleteFournisseur',authMiddleware('delete fournisseur'),NomenclatureController.deleteFournisseur);
router.get('/showFournisseurs',authMiddleware('show fournisseurs'),NomenclatureController.showFournisseurs);
router.get('/showProducts',authMiddleware('show products'),NomenclatureController.showProducts);
router.get('/showArticles',authMiddleware('show articles'),NomenclatureController.showArticles);
router.get('/showChapters',authMiddleware('show chapters'),NomenclatureController.showChapters);
router.put('/updateFournisseur',authMiddleware('update fournisseur'),NomenclatureController.updateFournisseur);
router.post('/showRefs',NomenclatureController.showRefs);
router.put('/updateInventaire',NomenclatureController.updateInventaire);
router.put('/updateRaisonSociale',authMiddleware('update raison sociale'),NomenclatureController.updateRaisonSociale)
module.exports=router;
