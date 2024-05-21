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
async function generateFicheInventaire(Id,article,produits,year,numInventaire)
{
    console.log({check:produits})
   return new Promise(async(resolve,reject)=>{
    try
    {   
          
          await googleMiddleware.updateCel('A7',`Chapitre ${article.num_chap} - ${article.chapitre}`,Id)
          await googleMiddleware.updateCel('A8',`Article ${article.num_article} : ${article.designation}`,Id)
          await googleMiddleware.updateCel('E5',`Inventaire arreté au 31/12/${year}`,Id)
          await googleMiddleware.updateCel('D10',`Reste ${year-1}`,Id)
          await googleMiddleware.updateCel('E10',`Entree ${year}`,Id)
          await googleMiddleware.updateCel('F10',`Sortie ${year}`,Id)
         
        let i=11;
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        console.log('hi')
        for(let produit of produits)
            {
                await googleMiddleware.addRow(i,produit,Id,'fiche')
                i++;
                await delay(30000)
            }
        await googleMiddleware.generatePDF(Id,'fiche','fiche'+article.num_article+numInventaire)
        await googleMiddleware.generateCSV(Id,'fiche','fiche'+article.num_article+numInventaire)  
        await googleMiddleware.deleteRows(11,i-1,Id) 
        // insert links 
        resolve('')
    }
    catch (error){
        console.log(error)
        reject('')
    }
   })
}
function addFiches(year,numInventaire)
{
    return new Promise((resolve,reject)=>{
        nomencaltureModel.getArticles().then((articles)=>{
            console.log(articles)
           InventaireModel.getProductArticleForFiche(year,articles[3].num_article).then((produits1)=>{
            console.log({produits1})
            InventaireModel.getProductArticleSortie(year,articles[3].num_article).then((produits2)=>{
                let produits=fusionTab(produits1,produits2)
                generateFicheInventaire('1nIexOErp8aW2vX9NjO40UQGF5Aif6BZORVUQqVIbrss',articles[3],produits,year,numInventaire).then(()=>{
                    resolve('')
                }).catch(()=>{reject('')})
            }).catch(()=>{reject('')})
           }).catch(()=>{reject('')})
        }).catch(()=>{reject('')})
        
})
}
function fusionTab(produits1,produits2)
{
    console.log({produits1})
    console.log({produits2})
  for(let produit1 of produits1)
    {
      for(let produit2 of produits2)
        {
          if(produit2.id_produit=produit1.id_produit)
            produit1.sortie=produit2.sortie
        }
    }
    console.log({produits1})
  return produits1
}
module.exports={addRegistre,addFiches}