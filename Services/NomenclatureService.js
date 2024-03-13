const NomenclatureModel=require("../Models/NomenclatureModel");
function addArticle(chapitre,designation)
{
   return new Promise((resolve,reject)=>
   {
      NomenclatureModel.getChapterId(chapitre).then((chapitreId)=>{
       NomenclatureModel.addArticle(chapitreId,designation).then(()=>{
        resolve("article added");
       }).catch(()=>{
        reject("internal error");
       })
      }).catch(()=>{
        reject("internal error");
      })
   });
}
function addProduct(article,designation,description,quantite)
{
    return new Promise((resolve,reject)=>
   {
    NomenclatureModel.getArticleId(article).then((articleId)=>{
       NomenclatureModel.addProduct(quantite,designation,description).then(()=>{
        NomenclatureModel.getProductId(designation).then((productId)=>{
           NomenclatureModel.addArticleProduct(articleId,productId).then(()=>{
            resolve("product added");
           }).catch(()=>{reject("internal error")});
        }).catch(()=>{
        reject("internal error")
        })
       }).catch(()=>{
        reject("internal error")
       })
    }).catch(()=>{
        reject("internal error")
    })
   });
}
function deleteArticle(designation)
{
    return new Promise((resolve,reject)=>{
     NomenclatureModel.getArticleId(designation).then((articleId)=>{
       NomenclatureModel.deleteArticle(articleId).then(()=>{
         NomenclatureModel.deleteArticleFromC(articleId).then(()=>{
            resolve("article deleted");
         }).catch(()=>{reject("internal error")});
       }).catch(()=>{reject("internal error")});
     }).catch(()=>{reject("internal error")});
    })
}
function deleteProduct(designation)
{
    return new Promise((resolve,reject)=>{
        NomenclatureModel.getProductId(designation).then((articleId)=>{
          NomenclatureModel.deleteProduct(articleId).then(()=>{
            NomenclatureModel.deleteProductFromC(articleId).then(()=>{
               resolve("product deleted");
            }).catch(()=>{reject("internal error")});
          }).catch(()=>{reject("internal error")});
        }).catch(()=>{reject("internal error")});
       })
}
module.exports={addArticle,addProduct,deleteArticle,deleteProduct};