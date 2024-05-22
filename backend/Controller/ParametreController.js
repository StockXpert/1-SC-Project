const ParametreModel=require('../Models/ParametreModel')
function changeCompletName(req,res)
{
    const {completName}=req.body
    ParametreModel.updateCompletName(completName).then(()=>{
        res.status(200).json({response:'updated'})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function uploadLogo(req,res)
{
    const logoLink = 'parametre/'+req.files['logo'][0].filename
    ParametreModel.updateHeader(logoLink).then(()=>{
        res.status(200).json({response:'updated'})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function changeName(req,res)
{
    
    const {name}=req.body
    ParametreModel.updateName(name).then(()=>{
        res.status(200).json({response:'updated'})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function changeAppName(req,res)
{
    
    const {appName}=req.body
    ParametreModel.updateAppName(appName).then(()=>{
        res.status(200).json({response:'updated'})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function changeAbstractName(req,res)
{
    
    const {abstractName}=req.body
    ParametreModel.updateAbstractName(abstractName).then(()=>{
        res.status(200).json({response:'updated'})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function uploadHeader(req,res)
{
    const headerLink = 'parametre/'+req.files['header'][0].filename
    ParametreModel.updateHeader(headerLink).then(()=>{
        res.status(200).json({response:'updated'})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function showInformations(req,res)
{
   ParametreModel.getParametres().then((parametre)=>{
    res.status(200).json({response:parametre})
   }).catch(()=>{res.status(500).json({response:'internal error'})})
}
module.exports={uploadHeader,uploadLogo,changeAbstractName,changeCompletName,changeName,showInformations,changeAppName}