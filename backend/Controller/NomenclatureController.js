const NomenclatureModel = require('../Models/NomenclatureModel');
const NomenclatureService=require('../Services/NomenclatureService');
function addChapter(req,res)
{
  const {designation}=req.body;
  NomenclatureModel.insertChapter(designation).then(()=>{
    res.status(200).json({response:'chapter added'})
  }).catch(()=>{
    res.status(500).json({response:'internal error'})
  })
}
function updateChapter(req,res)
{
    const {oldDesignation,newDesignation}=req.body;
    NomenclatureModel.updateChapter(oldDesignation,newDesignation).then(()=>{
        res.status(200).json({response:'chapter updated'})
    }).catch(()=>{
      res.status(500).json({response:'internal error'})
    })
}
function deleteChapter(req,res)
{
  const {designation}=req.body
  NomenclatureModel.canDelete(designation,'chapitre').then(()=>{
    NomenclatureModel.deleteChapter(designation).then(()=>{
        res.status(200).json({response:'chapter deleted'})
    }).catch(()=>{
        res.status(500).json({response:'prohibited to delete chapter'})
    })

  }).catch(()=>{
      res.status(500).json({response:'internal error'})
    })
}
function addArticle(req,res)
{
    const {numArt,chapitre,designation}=req.body;
    NomenclatureService.addArticle(chapitre,designation,numArt).then((response)=>{
        res.status(200).json({response})
    }).catch((response)=>{
        res.status(500).json({response})
    })

}
function deleteFournisseur(raisonSocial)
{
    NomenclatureModel.canDeletefourn(raisonSocial).then(()=>{
        NomenclatureModel.deleteFournisseur(raisonSocial).then(()=>{
            res.status(200).json({response:'fournisseur deleted'})
        }).catch(()=>{res.status(500).json({response:'internal error'})})
    }).catch(()=>{res.status(500).json({response:'prohibited to delete fournisseur'})})
}
function updateArticle(req,res)
{
    const {oldDesignation,newDesignation,chapitre}=req.body
    NomenclatureModel.updateArticle(oldDesignation,newDesignation,chapitre).then(()=>{
        res.status(200).json({response:'article updated'});
    }).catch(()=>{
        res.status(500).json({response:'internal error'})
    })
}
function deleteArticle(req,res)
{
    const {designation}=req.body;
    NomenclatureModel.canDelete(designation,'article').then(()=>{
        NomenclatureService.deleteArticle(designation).then((response)=>{
            res.status(200).json({response})
        }).catch((response)=>{
            res.status(500).json({response})
        })
    }).catch(()=>{res.status(500).json({response:"prohibited to delete article"})})
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
    deleteProduct,deleteFournisseur,showFournisseurs,showProducts,showChapters,showArticles,
    addChapter,updateChapter,deleteChapter,updateArticle};