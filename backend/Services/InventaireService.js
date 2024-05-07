const { reject } = require('async');
const InventaireModel=require('../Models/InventaireModel');
const googleMiddleware=require('../Middlewares/googleMiddleware')
function addRegistre(numInventaire)
{
  return new Promise((resolve,reject)=>{
    InventaireModel.getInventaireYear(numInventaire).then((results)=>{
        const {date_inventaire,year}=results;
        console.log({year})
        InventaireModel.getInventaireProducts(numInventaire).then((produits)=>{
            console.log(produits)
            constructProductsTable(produits,year,date_inventaire).then((products)=>{
                console.log(products)
               genererRegistre(products,numInventaire,'1asTIrZrT9BYmoUXjRaNxh_ej_1YgwCp5mWJAJWdmXDs').then(()=>{
                resolve('');
               }).catch(()=>{reject('')})
            }).catch(()=>{reject('')})
        }).catch(()=>{reject('')})
      }).catch(()=>{reject('')})
  })
}
function constructProductsTable(produits,year,date)
{
    return new Promise((resolve,reject)=>{
        for(let produit of produits)
            {
                produit.date=date
                InventaireModel.inscriptionDate(produit.id_produit,year).then((dateI)=>{
                    InventaireModel.getProductFournisseur(produit.id_produit,year).then((fournisseur)=>{
                        InventaireModel.avgProductValue(produit.id_produit,year).then((avg)=>{
                            produit.value=avg;
                            produit.dateI=dateI;
                            produit.fournisseur=fournisseur;
                            console.log({produit:produit.value})
                            console.log({produit:produit.dateI})
                            console.log({produit:produit.fournisseur})
                        }).catch(()=>{reject('')})
                    }).catch(()=>{reject('')})
                }).catch(()=>{reject('')})
            }
            resolve(produits)
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
module.exports={addRegistre}