const { reject } = require('async');
const InventaireModel=require('../Models/InventaireModel');
const googleMiddleware=require('../Middlewares/googleMiddleware')
const nomencaltureModel=require('../Models/NomenclatureModel');
const admZip=require('adm-zip');
const path=require('path')
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
        let i=12;
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
async function generateFicheInventaire(Id,article,products,year,numInventaire)
{
   
   return new Promise((resolve,reject)=>{
    try
    {   
         const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
         
         products.then(async(produits)=>{
          await delay(5000) 
          await googleMiddleware.updateCel('A18',`Chapitre ${article.num_chap} - ${article.chapitre}`,Id)
          await googleMiddleware.updateCel('A19',`Article ${article.num_article} : ${article.designation}`,Id)
          await googleMiddleware.updateCel('E16',`Inventaire arreté au 31/12/${year}`,Id)
          await googleMiddleware.updateCel('D21',`Reste ${year-1}`,Id)
          await googleMiddleware.updateCel('E21',`Entree ${year}`,Id)
          await googleMiddleware.updateCel('F21',`Sortie ${year}`,Id)
         
        let i=22;
        
        console.log('hi')
        for(let produit of produits)
            {
                await googleMiddleware.addRow(i,produit,Id,'fiche')
                i++;
                await delay(5000)
            }
        await googleMiddleware.generatePDF(Id,'fiche','fiche'+article.num_article+numInventaire)
        await googleMiddleware.generateCSV(Id,'fiche','fiche'+article.num_article+numInventaire)  
        await googleMiddleware.deleteRows(22,i-1,Id)  
        resolve('')
         }).catch((err)=>reject(err))
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
        let files=[path.join('backend','registre',`registre${numInventaire}.pdf`)]
        let zip=new admZip()
        nomencaltureModel.getArticles().then(async(articles)=>{
            for(let article of articles)
                {
                          
                    files.push(path.join('backend','fiche',`fiche${article.num_article}${numInventaire}.pdf`))
                          let produits1= InventaireModel.getProductArticleForFiche(year,article.num_article)
                          let produits2= InventaireModel.getProductArticleSortie(year,article.num_article)
                          let produits=fusionTab(produits1,produits2)
                          if(produits)
                           await generateFicheInventaire('1nIexOErp8aW2vX9NjO40UQGF5Aif6BZORVUQqVIbrss',article,produits,year,numInventaire).then(()=>{
                          files.forEach(file => {
                          zip.addLocalFile(file);
                          });
                        const outputFilePath = path.join('backend',`inventaire`,`inventaire${numInventaire}.zip`);
                        zip.writeZip(outputFilePath);
                        InventaireModel.insertInvetaireLink(numInventaire,`inventaire/inventaire${numInventaire}.zip`)
                }).catch((err)=>{console.log(err);reject('')})
                }
                resolve('')
        }).catch((err)=>{console.log(err);reject('')})
        
})
}
function fusionTab(products1,products2)
{
 return new Promise((resolve,reject)=>{
     
  products1.then((produits1)=>{
    products2.then((produits2)=>{
      for(let produit1 of produits1)
        {
          for(let produit2 of produits2)
            {
              if(produit2.id_produit=produit1.id_produit)
                produit1.sortie=produit2.sortie
            }
        }
        resolve(produits1)
    })
  })

 })
}
module.exports={addRegistre,addFiches}