const NomenclatureModel = require('../Models/NomenclatureModel');
const NomenclatureService=require('../Services/NomenclatureService');
function addChapter(req,res)
{
  const {numChap,designation}=req.body;
  NomenclatureModel.insertChapter(numChap,designation).then(()=>{
    res.status(200).json({response:'chapter added'})
  }).catch((error)=>{
    console.log({error})
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
  NomenclatureModel.isUsedchapter(designation).then(()=>{
    NomenclatureModel.canDelete(designation,'chapitre').then(()=>{
        NomenclatureModel.deleteChapter(designation).then(()=>{
            res.status(200).json({response:'chapter deleted'})
        }).catch((err)=>{
            console.log({err})
            res.status(500).json({response:'internal error'})
        })
      }).catch((err)=>{
        console.log({err})
          res.status(500).json({response:'prohibited to delete chapter'})
        })
  }).catch(()=>res.status(403).json({response:'forbidden'}))
}
function addArticle(req,res)
{
    const {numArt,chapitre,designation,tva}=req.body;
    NomenclatureService.addArticle(chapitre,designation,numArt,tva).then((response)=>{
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
    const {oldDesignation,newDesignation,chapitre,tva}=req.body
    NomenclatureModel.updateArticle(oldDesignation,newDesignation,chapitre,tva).then(()=>{
        res.status(200).json({response:'article updated'});
    }).catch((err)=>{
        console.log({err})
        res.status(500).json({response:'internal error'})
    })
}
function deleteArticle(req,res)
{
    const {designation}=req.body;
    NomenclatureModel.isUsedArticle(designation).then(()=>{
        NomenclatureModel.canDelete(designation,'article').then(()=>{
            NomenclatureService.deleteArticle(designation).then((response)=>{
                res.status(200).json({response})
            }).catch((response)=>{
                res.status(500).json({response})
            })
        }).catch(()=>{res.status(500).json({response:"prohibited to delete article"})})
    }).catch(()=>res.status(403).json({response:'forbidden'}))
}
function addProduct(req,res)
{
    const {article,designation,quantite,description,seuil}=req.body;
    NomenclatureService.addProduct(article,designation,description,quantite,seuil).then((response)=>{
        res.status(200).json({response})
    }).catch((response)=>{
        console.log(response)
        res.status(500).json({response:response})
    })
}
function deleteProduct(req,res)
{
    const {designation}=req.body;
    NomenclatureModel.isUsedProduct(designation).then(()=>{
        NomenclatureService.deleteProduct(designation).then((response)=>{
            res.status(200).json({response})
        }).catch((response)=>{
            res.status(500).json({response})
        })
    }).catch(()=>res.status(403).json({response:'forbidden'}))
}
function addFournisseur(req,res)
{
    const {raisonSociale,adresse,tel,fax,numRegistre,ribRip,nif,nis}=req.body;
    NomenclatureModel.insertFournisseur(raisonSociale,adresse,tel,fax,numRegistre,ribRip,nif,nis).then(()=>{
        res.status(200).json({response:"fournisseur added"})
    }).catch(()=>{
        res.status(500).json({response:"internal error"});
    })
}
function deleteFournisseur(req,res)
{
    const {raisonSociale}=req.body;
    NomenclatureModel.isUsedFournisseur(raisonSociale).then(()=>{
        NomenclatureModel.canDeletefourn(raisonSociale).then(()=>{
            NomenclatureModel.deleteFournisseur(raisonSociale).then(()=>{
                res.status(200).json({response:"fournisseur deleted"})
            }).catch(()=>{
                res.status(500).json({response:"internal error"});
            })
        }).catch(()=>{res.status(500).json({response:"prohibited to delete fournisseur"});})
    }).catch(()=>res.status(403).json({response:'forbidden'}))
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
function updateFournisseur(req,res)
{
    const {adresse,telephone,fax,numRegistre,ribRip,nif,nis,raisonSociale}=req.body
    NomenclatureModel.updateFournisseur(adresse,telephone,fax,numRegistre,ribRip,nif,nis,raisonSociale).then(()=>{
        res.status(200).json({response:"fournisseur updated"});
    }).catch(()=>{
        res.status(500).json({response:"internal error"})
    })
}
function updateRaisonSociale(req,res)
{
    const {newRaisonSociale,oldRaisonSociale}=req.body
    NomenclatureModel.updateRaisonSociale(newRaisonSociale,oldRaisonSociale).then(()=>{
        res.status(200).json({response:"fournisseur updated"});
    }).catch(()=>{
        res.status(500).json({response:"internal error"})
    })
}
module.exports={addArticle,addProduct,addFournisseur,deleteArticle,
    deleteProduct,deleteFournisseur,showFournisseurs,showProducts,showChapters,showArticles,
    addChapter,updateChapter,deleteChapter,updateArticle,updateRaisonSociale,updateFournisseur};