const StatistiqueModel=require('../Models/StatistiqueModel');
const StatistiqueService=require('../Services/StatistiqueService');
const UserModel=require('../Models/UserModel');
function  consumerMostdemmandedProduct(req,res)
{
    const {dateD,dateF}=req.body
    const consommateur=req.email
    StatistiqueModel.MostDemandedProduct(dateD,dateF,consommateur).then((data)=>{
        if(data.length)
            {data=StatistiqueService.changeDataFormat(data);
            res.status(200).json({response:data})}
            else res.status(200).json({response:'no data'})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function mostdemmandedProduct(req,res)
{
    const {dateD,dateF}=req.body
    StatistiqueModel.MostDemandedProduct(dateD,dateF).then((data)=>{
        if(data.length)
            {data=StatistiqueService.changeDataFormat(data);
            res.status(200).json({response:data})}
            else res.status(200).json({response:'no data'})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function  structureMostdemmandedProduct(req,res)
{
    const {dateD,dateF,structure}=req.body
    StatistiqueModel.MostDemandedProduct(dateD,dateF,null,structure).then((data)=>{
        if(data.length)
            {data=StatistiqueService.changeDataFormat(data);
            res.status(200).json({response:data})}
            else res.status(200).json({response:'no data'})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function responsableStructureMostdemmandedProduct(req,res)
{
    const {dateD,dateF}=req.body
    const resp=req.email
    UserModel.isResponsable(resp).then((structure)=>{
        StatistiqueModel.MostDemandedProduct(dateD,dateF,structure).then((data)=>{
            if(data.length)
                {data=StatistiqueService.changeDataFormat(data);
                res.status(200).json({response:data})}
                else res.status(200).json({response:'no data'})
        }).catch(()=>res.status(500).json({response:'internal error'}))
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function mostUsedFournisseur(req,res)
{
    const {dateD,dateF}=req.body
    
    StatistiqueModel.MostUsedFournisseur(dateD,dateF).then((data)=>{
        if(data.length)
            {data=StatistiqueService.changeDataFormat(data);
            res.status(200).json({response:data})}
            else res.status(200).json({response:'no data'})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function rapidFournisseur(req,res)
{
    const {dateD,dateF}=req.body
    StatistiqueModel.RapidFournisseur(dateD,dateF).then((data)=>{
        if(data.length)
        {data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})}
        else  res.status(200).json({response:'no data'})
    }).catch((err)=>{console.log(err);res.status(500).json({response:'internal error'})})
}
function topDemandeurs(req,res)
{
    const {dateD,dateF,produit}=req.body
    
    StatistiqueModel.topDemandeurs(dateD,dateF,null,produit).then((data)=>{
        if(data.length)
            {data=StatistiqueService.changeDataFormat(data);
            res.status(200).json({response:data})}
            else res.status(200).json({response:'no data'})
    }).catch((err)=>{console.log(err);res.status(500).json({response:'internal error'})})
}
function structureTopDemandeurs(req,res)
{
    const {dateD,dateF,structure,produit}=req.body
    
    StatistiqueModel.topDemandeurs(dateD,dateF,structure,produit).then((data)=>{
        if(data.length)
            {data=StatistiqueService.changeDataFormat(data);
            res.status(200).json({response:data})}
            else res.status(200).json({response:'no data'})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function respStructureTopDemandeurs(req,res)
{
    const {dateD,dateF}=req.body;
    const resp=req.email
    UserModel.isResponsable(resp).then((structure)=>{
        StatistiqueModel.topDemandeurs(dateD,dateF,structure).then((data)=>{
            if(data.length)
                {data=StatistiqueService.changeDataFormat(data);
                res.status(200).json({response:data})}
                else res.status(200).json({response:'no data'})
        }).catch(()=>res.status(500).json({response:'internal error'}))
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function mostCommandedProducts(req,res)
{
    const {dateD,dateF}=req.body;
    StatistiqueModel.mostCommandedProducts(dateD,dateF).then((data)=>{
        if(data.length)
            {data=StatistiqueService.changeDataFormat(data);
            res.status(200).json({response:data})}
            else res.status(200).json({response:'no data'})
    }).catch((err)=>{console.log(err);res.status(500).json({response:'internal error'})})
}
function productDemandePerYear(req,res)
{
    const {product,year}=req.body;
    StatistiqueModel.productDemandePerYear(year,product).then((data)=>{
        if(data.length)
            {data=StatistiqueService.changeDataFormat(data);
            res.status(200).json({response:data})}
            else res.status(200).json({response:'no data'})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function articleDemandePerYear(req,res)
{
    const {article,year}=req.body;
    StatistiqueModel.articleDemandePerYear(year,article).then((data)=>{
        if(data.length)
        {data=StatistiqueService.changeDataFormat(data);
        res.status(200).json({response:data})}
        else res.status(200).json({response:'no data'})
    }).catch((err)=>{console.log(err);res.status(500).json({response:'internal error'})})
}
function commandesStat(req,res)
{
    const {dateD,dateF}=req.body
    
    StatistiqueModel.commandesStat(dateD,dateF).then((data)=>{
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function bciConsommateurStat(req,res)
{
    const {dateD,dateF}=req.body
    const consommateur=req.email
    StatistiqueModel.bciStat(dateD,dateF,consommateur).then((data)=>{
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function bciStructureStat(req,res)
{
    const {dateD,dateF,structure}=req.body
    console.log({structure})
    StatistiqueModel.bciStat(dateD,dateF,null,structure).then((data)=>{
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function respBciStat(req,res)
{
    const {dateD,dateF}=req.body;
    const resp=req.email;
    UserModel.isResponsable(resp).then((structure)=>{
        StatistiqueModel.bciStat(dateD,dateF,structure).then((data)=>{
            console.log(200)
            res.status(200).json({response:data})
        }).catch(()=>res.status(500).json({response:'internal error'}))
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
function bciStat(req,res)
{
    const {dateD,dateF}=req.body
    
    StatistiqueModel.bciStat(dateD,dateF).then((data)=>{
        res.status(200).json({response:data})
    }).catch(()=>res.status(500).json({response:'internal error'}))
}
module.exports={articleDemandePerYear,commandesStat,consumerMostdemmandedProduct,mostCommandedProducts,mostUsedFournisseur,
    productDemandePerYear,rapidFournisseur,respStructureTopDemandeurs,responsableStructureMostdemmandedProduct,
    structureMostdemmandedProduct,structureTopDemandeurs,topDemandeurs,mostdemmandedProduct,bciStat,bciConsommateurStat,
    respBciStat,bciStructureStat
}