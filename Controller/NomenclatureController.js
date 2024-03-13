const NomenclatureService=require('../Services/NomenclatureService');
function addArticle(req,res)
{
    const {chapitre,designation}=req.body;
    NomenclatureService.addArticle(chapitre,designation).then((response)=>{
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
module.exports={addArticle,addProduct,updateProduct,deleteArticle,deleteProduct};