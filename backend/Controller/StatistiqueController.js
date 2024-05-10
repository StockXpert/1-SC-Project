const { response } = require('express');
const StatistiqueModel=require('../Models/StatistiqueModel');
const StatistiqueService=require('../Services/StatistiqueService');
function  consumerMostdemmandedProduct(req,res)
{
    const {dateD,dateF,consommateur}=req.body
    StatistiqueModel.MostDemandedProduct(dateD,dateF,consommateur).then((data)=>{
     data=StatistiqueService.changeDataFormat(data);
     res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function mostdemmandedProduct(req,res)
{
    const {dateD,dateF}=req.body
    StatistiqueModel.MostDemandedProduct(dateD,dateF).then((data)=>{
     data=StatistiqueService.changeDataFormat(data);
     res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function  structureMostdemmandedProduct(req,res)
{
    const {dateD,dateF,structure}=req.body
    StatistiqueModel.MostDemandedProduct(dateD,dateF,structure).then((data)=>{
        data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function responsableStructureMostdemmandedProduct(req,res)
{
    const {dateD,dateF}=req.body
    const resp=req.email
    StatistiqueModel.MostDemandedProduct(dateD,dateF,structure).then((data)=>{
        data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function mostUsedFournissuer(req,res)
{
    const {dateD,dateF}=req.body
    
    StatistiqueModel.MostUsedFournissuer(dateD,dateF).then((data)=>{
     data=StatistiqueService.changeDataFormat(data);
     res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function rapidFournissuer(req,res)
{
    const {dateD,dateF}=req.body
    
    StatistiqueModel.RapidFournissuer(dateD,dateF).then((data)=>{
        data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function topDemandeurs(req,res)
{
    const {dateD,dateF}=req.body
    
    StatistiqueModel.topDemandeurs(dateD,dateF).then((data)=>{
        data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function structureTopDemandeurs(req,res)
{
    const {dateD,dateF,structure}=req.body
    
    StatistiqueModel.topDemandeurs(dateD,dateF,structure).then((data)=>{
        data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function respStructureTopDemandeurs(req,res)
{
    const {dateD,dateF}=req.body;
    const resp=req.email
    StatistiqueModel.topDemandeurs(dateD,dateF,structure).then((data)=>{
        data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function mostCommandedProducts(req,res)
{
    const {dateD,dateF}=req.body;
    StatistiqueModel.mostCommandedProducts(dateD,dateF).then((data)=>{
        data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function productDemandePerYear(req,res)
{
    const {product,year}=req.body;
    StatistiqueModel.productDemandePerYear(year,product).then((data)=>{
        data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function articleDemandePerYear(req,res)
{
    const {article,year}=req.body;
    StatistiqueModel.articleDemandePerYear(year,article).then((data)=>{
        data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function commandesStat(req,res)
{
    const {dateD,dateF}=req.body
    
    StatistiqueModel.MostUsedFournissuer(dateD,dateF).then((data)=>{
        data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
module.exports={articleDemandePerYear,commandesStat,consumerMostdemmandedProduct,mostCommandedProducts,mostUsedFournissuer,
    productDemandePerYear,rapidFournissuer,respStructureTopDemandeurs,responsableStructureMostdemmandedProduct,
    structureMostdemmandedProduct,structureTopDemandeurs,topDemandeurs,mostdemmandedProduct
}