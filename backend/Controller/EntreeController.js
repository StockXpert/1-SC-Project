const EntreeModel=require('../Models/EntreeModel');
const { getArticleIdTva } = require('../Models/NomenclatureModel');
const EntreeService=require('../Services/EntreeService')
function genererFicheBesoins(req,res)
{
   const {produits,besoin}=req.body
}
function genererBondeCommande(req,res)
{
   const {produits,fournisseur,objet,type,date}=req.body;
   getArticleIdTva(objet).then((article)=>{
      EntreeModel.insertBonCommande(fournisseur,article.num_article,type,date).then((n_com)=>{
         EntreeModel.insertCommander(n_com,produits).then(()=>{
           EntreeService.genererBondeCommande(n_com,produits,fournisseur,objet,
            type,'1KEtktsb0n8ZspuxitPk-8kX1S5OJ6AcJmnlbywh-s98',article.tva,date).then((link)=>{
               res.status(200).json({response:"bon de commande insere",link})
            }).catch(()=>{res.status(500).json({response:"internal error"});})
         }).catch((error)=>{
           console.log(error)
           res.status(500).json({response:"internal error"});
         }
         )
        }).catch((error)=>{
           console.log(error)
           res.status(500).json({response:"internal error"});
        })
   }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function deleteCommande(req,res)
{
   const {numCommande}=req.body;
   EntreeModel.canDeleteCommande(numCommande).then(()=>{
      EntreeModel.deleteCommande(numCommande).then(()=>{
         EntreeModel.deleteBonCommande(numCommande).then(()=>{
            res.status(200).json({response:'commande deleted'})
         }).catch(()=>{res.status(500).json({response:'internal error'})})
      }).catch(()=>{res.status(500).json({response:'internal error'})})
   }).catch(()=>{
      res.status(500).json({response:'prohibited to delete commande'});
   })
}
function cancelCommande(req,res)
{
   const {numCommande}=req.body;
   EntreeModel.cancelCommande(numCommande).then(()=>{
      res.status(200).json({response:'commande canceled'})
   }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function showCommandes(req,res)
{
  EntreeModel.getCommandes().then((commandes)=>{
   res.status(200).json({commandes})
  }).catch((err)=>{res.status(500).json({response:err})})
}
function updateQuantite(req,res)
{
   const {numCommande,produits}=req.body
   EntreeService.changeQuantite(numCommande,produits).then((response)=>{
      EntreeService.uploadvalidity(numCommande).then((response)=>{
         res.status(200).json({response})
      })
   }).catch((response)=>res.status(500).json({response}))
}
function updateBonCommande(req,res)
{
  const {objet,fournisseur,deletedProducts,addedProducts,date,numCommande}=req.body;
  EntreeService.changeBonCommande(objet,fournisseur,deletedProducts,addedProducts,date,numCommande).then(()=>{
   res.status(200).json({response:'bon de commande updated'})
  }).catch(()=>{
   res.status(500).json({response:'internal error'})
  })
}
module.exports={genererFicheBesoins,genererBondeCommande,deleteCommande,cancelCommande,
            showCommandes,updateQuantite,updateBonCommande};