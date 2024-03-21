const EntreeModel=require('../Models/EntreeModel');
const EntreeService=require('../Services/EntreeService')
function genererFicheBesoins(req,res)
{
   const {produits,besoin}=req.body
}
function genererBondeCommande(req,res)
{
   const {produits,fournisseur,objet,type}=req.body;
   const date=EntreeService.getDate()
   EntreeModel.insertBonCommande(fournisseur,objet,type,date).then((n_com)=>{
    EntreeModel.insertCommander(n_com,produits).then(()=>{
      res.status(200).json({response:"bon de commande insere"})

    }).catch((error)=>{
      console.log(error)
      res.status(500).json({response:"internal error"});
    }
    )
   }).catch((error)=>{
      console.log(error)
      res.status(500).json({response:"internal error"});
   })

}
module.exports={genererFicheBesoins,genererBondeCommande};