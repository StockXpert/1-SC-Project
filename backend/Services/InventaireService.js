const { reject } = require('async');
const InventaireModel=require('../Models/InventaireModel');
function addRegistre(numInventaire)
{
  return new Promise((resolve,reject)=>{
    InventaireModel.getInventaireYear(numInventaire).then((results)=>{
        const {date_inventaire,year}=results;
        InventaireModel.getInventaireProducts(numInventaire).then((produits)=>{
            constructProductsTable(produits,year,date_inventaire).then(()=>{
               genererRegistre(produits).then(()=>{
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
                InventaireModel.inscriptionDate(produit.id_produit,year).then((date)=>{
                    InventaireModel.getProductFournisseur(produit.id_produit,year).then((fournisseur)=>{
                        InventaireModel.avgProductValue(produit.id_produit,year).then((avg)=>{
                            produit.value=avg;
                            produit.date=date;
                            produit.fournisseur=fournisseur;
                        }).catch(()=>{reject('')})
                    }).catch(()=>{reject('')})
                }).catch(()=>{reject('')})
            }
            resolve('')
    })
}
function genererRegistre(produits)
{
    return new Promise((resolve,reject)=>{

    })
}
module.exports={addRegistre}