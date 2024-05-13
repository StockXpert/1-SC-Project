const { response } = require('express');
const InventaireModel=require('../Models/InventaireModel');
const InventaireService=require('../Services/InventaireService');
function createInventaire(req,res)
{
    const {numInventaire,dateInventaire,produits}=req.body
    InventaireModel.addInventaire(numInventaire,dateInventaire).then(()=>{
        InventaireModel.insertCompter(numInventaire,produits).then(()=>{
            res.status(200).json({response:'inventaire created'})
        }).catch(()=>res.status(500).json({response:'internal error'}))
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function validInventaire(req,res)
{
  const {numInventaire}=req.body;
  InventaireModel.validInvetaireStatus(numInventaire).then(()=>{
    InventaireService.addRegistre(numInventaire).then(()=>{
        res.status(200).json({response:'invetaire validated'})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
  }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function updateInventaire(req,res)
{
  const {numInventaire,produits}=req.body
  InventaireModel.getInventaireStatus(numInventaire).then((status)=>{
    if(status==='valid') res.status(400).json({response:'prohibited'})
    else 
    {
        InventaireModel.updateInventaire(numInventaire,produits).then(()=>{
            res.status(200).json({response:'updated'})
        }).catch(()=>{res.status(500).json({response:'internal error'})})
    }
}).catch(()=>{res.status(500).json({response:'internal error'})})
}
function showInventaires(req,res)
{
    InventaireModel.getInventaires().then((inventaires)=>{
        res.status(200).json({response:inventaires})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function showInventaire(req,res)
{
    const {numInventaire}=req.body;
    InventaireModel.getInventaire(numInventaire).then((inventaire)=>{
        res.status(200).json({response:inventaire})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function deleteInventaire(req,res)
{
    const {numInventaire}=req.body;
    InventaireModel.getInventaireStatus(numInventaire).then((status)=>{
        if(status==='valid') res.status(400).json({response:'prohibited'})
        else 
        {
            InventaireModel.deleteInventaire(numInventaire).then(()=>{
                InventaireModel.deleteCompter(numInventaire).then(()=>{
                    res.status(200).json({response:'deleted'})
                }).catch(()=>{res.status(500).json({response:'internal error'})})
            }).catch(()=>{res.status(500).json({response:'internal error'})})
        }
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
module.exports={createInventaire,showInventaire,showInventaires,updateInventaire,deleteInventaire,validInventaire}