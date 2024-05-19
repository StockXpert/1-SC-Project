const { reject } = require('async');
const InventaireModel=require('../Models/InventaireModel');
const googleMiddleware=require('../Middlewares/googleMiddleware')
const nomencaltureModel=require('../Models/NomenclatureModel');
function addRegistre(numInventaire)
{
  return new Promise((resolve,reject)=>{
    InventaireModel.getInventaireProducts(numInventaire).then((produits)=>{
        genererRegistre(produits,numInventaire,'1asTIrZrT9BYmoUXjRaNxh_ej_1YgwCp5mWJAJWdmXDs').then(()=>{
         resolve('');
        }).catch(()=>{reject('')})
    }).catch(()=>{reject('')})
  })
}
function genererRegistre(produits,numInventaire,Id)
{
    return new Promise(async(resolve,reject)=>{
        let i=2;
        for(let produit of produits)
        {
            await googleMiddleware.addRow(i,produit,Id,"registre")
            i++;
        }
        await googleMiddleware.generatePDF(Id,`registre`,`registre${numInventaire}`);
        await googleMiddleware.deleteRows(2,i-1,Id);
        const link=`registre/registre${numInventaire}.`
        InventaireModel.insertLink(numInventaire,link+'pdf',link+'xlsx').then(()=>{
            resolve(link)
        }).catch(()=>{reject("err")})
    })
}
async function generateFicheInventaire(Id,article,produits,year)
{
   return new Promise(async(resolve,reject)=>{
    try
    {
        console.log('hi')
        
         await googleMiddleware.updateCel('A7',`Chapitre ${article.num_chap} - ${article.chapitre}`,Id)
         await googleMiddleware.updateCel('A8',`Article ${article.num_article} : ${article.designation}`,Id)
         await googleMiddleware.updateCel('E5',`Inventaire arreté au 31/12/${year}`,Id)
        
        let i=11
        console.log('hi')
        for(let produit of produits)
            {
                await googleMiddleware.addRow(i,produit,Id,'fiche')
                i++;
            }
        resolve('')    
    }
    catch (error){
        console.log(error)
        reject('')
    }
   })
}
function addFiches(year)
{
    return new Promise((resolve,reject)=>{
        nomencaltureModel.getArticles().then((articles)=>{
            console.log(articles)
           InventaireModel.getProductArticleForFiche(year,articles[5].num_article).then((produits)=>{
            generateFicheInventaire('1nIexOErp8aW2vX9NjO40UQGF5Aif6BZORVUQqVIbrss',articles[5],produits,year).then(()=>{
                resolve('')
            }).catch(()=>{reject('')})
           }).catch(()=>{reject('')})
        }).catch(()=>{reject('')})
        
})
}
module.exports={addRegistre,addFiches}