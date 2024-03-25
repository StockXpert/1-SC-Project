const EntreeModel=require('../Models/EntreeModel');
const { getArticleId } = require('../Models/NomenclatureModel');
const EntreeService=require('../Services/EntreeService')
function genererFicheBesoins(req,res)
{
   const {produits,besoin}=req.body
}
function genererBondeCommande(req,res)
{
   const {produits,fournisseur,objet,type}=req.body;
   const date=EntreeService.getDate()
   getArticleId(objet).then((articleId)=>{
      EntreeModel.insertBonCommande(fournisseur,objet,type,date,articleId).then((n_com)=>{
         EntreeModel.insertCommander(n_com,produits).then(()=>{
           EntreeService.genererBondeCommande(n_com,produits,fournisseur,objet,
            type,'1KEtktsb0n8ZspuxitPk-8kX1S5OJ6AcJmnlbywh-s98').then((link)=>{
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
module.exports={genererFicheBesoins,genererBondeCommande};