const NomenclatureModel = require('../Models/NomenclatureModel');
const NomenclatureService=require('../Services/NomenclatureService');
function addArticle(req,res)
{
    const {numArt,chapitre,designation}=req.body;
    NomenclatureService.addArticle(chapitre,designation,numArt).then((response)=>{
        res.status(200).json({response})
    }).catch((response)=>{
        res.status(500).json({response})
    })

}
function deleteArticle(req,res)
{
    const {designation}=req.body;
    NomenclatureService.deleteArticle(designation).then((response)=>{
        res.status(200).json({response})
    }).catch((response)=>{
        res.status(500).json({response})
    })
}
function addProduct(req,res)
{
    const {article,designation,quantite,description}=req.body;
    NomenclatureService.addProduct(article,designation,description,quantite).then((response)=>{
        res.status(200).json({response})
    }).catch((response)=>{
        res.status(500).json({response})
    })
}
function deleteProduct(req,res)
{
    const {designation}=req.body;
    NomenclatureService.deleteProduct(designation).then((response)=>{
        res.status(200).json({response})
    }).catch((response)=>{
        res.status(500).json({response})
    })
}
function addFournisseur(req,res)
{
    const {raisonSociale,adresse,tel,fax,numRegistre,rib,rip,nif,nis}=req.body;
    NomenclatureModel.insertFournisseur(raisonSociale,adresse,tel,fax,numRegistre,rib,rip,nif,nis).then(()=>{
        res.status(200).json({response:"fournisseur added"})
    }).catch(()=>{
        res.status(500).json({response:"internal error"});
    })
}
function deleteFournisseur(req,res)
{
    const {raisonSociale}=req.body;
    NomenclatureModel.deleteFournisseur(raisonSociale).then(()=>{
        res.status(200).json({response:"fournisseur deleted"})
    }).catch(()=>{
        res.status(500).json({response:"internal error"});
    })
}
function showFournisseurs(req,res)
{
    NomenclatureModel.getFournisseurs().then((response)=>{
        res.status(200).json({response})
    }).catch(()=>{
        res.status(500).json({response:"internal error"});
    })

}
function showProducts(req,res)
{
    NomenclatureModel.getProducts().then((response)=>{
        res.status(200).json({response})
    }).catch(()=>{
        res.status(500).json({response:"internal error"});
    })
}
function showChapters(req,res)
{
    NomenclatureModel.getChapters().then((response)=>{
        res.status(200).json({response})
    }).catch(()=>{
        res.status(500).json({response:"internal error"});
    })
}
function showArticles(req,res)
{
    NomenclatureModel.getArticles().then((response)=>{
        res.status(200).json({response})
    }).catch(()=>{
        res.status(500).json({response:"internal error"});
    })
}
module.exports={addArticle,addProduct,addFournisseur,deleteArticle,
    deleteProduct,deleteFournisseur,showFournisseurs,showProducts,showChapters,showArticles};