const SortieModel=require('../Models/SortieModel');
const googleMiddleware=require('../Middlewares/googleMiddleware');
const { reject } = require('async');
const EntreeModel=require('../Models/EntreeModel')
const nomencaltureModel=require('../Models/NomenclatureModel')
function canUpdate(numDemande,role)
{
    return new Promise((resolve,reject)=>{
        SortieModel.getDemandeStatus(numDemande).then((status)=>{
            switch (role) {
                case 'Magasinier':
                    if(status==="pret") resolve('')
                    reject('')   
                    break;
                case 'Directeur':
                    if(status==="visee par dg") resolve('')
                    reject('')
                    break;
                default:
                    if(status==="visee par resp") resolve('')
                    reject('')
                    break;
            }
        })
    })   
}
function genererBonSortie(numDemande,dateSortie,produits,id)
{
    return new Promise(async(resolve,reject)=>{
        await googleMiddleware.updateCel('E3',`Le:${dateSortie}`,id);
        let i=5;
        for(let produit of produits)
        {
            await googleMiddleware.addRow(i,produit,id,"sortie")
            i++;
        }
        await googleMiddleware.generatePDF(id,`sortie`,`sortie${numDemande}`);
        await googleMiddleware.deleteRows(5,i-1,id);
        const link=`sortie/sortie${numDemande}.`
        SortieModel.insertLink(numDemande,link+'pdf',link+'xlsx').then(()=>{
            resolve(link)
        }).catch(()=>{reject("err")})
    })
}
function subtituteQuantite(produits)
{
    return new Promise(async(resolve,reject)=>{
        let response
        for(let produit of produits)
        {
          await nomencaltureModel.getProductId(produit.designation).then(async(idProduit)=>{
            console.log({produit})
            response =await EntreeModel.updateQuantite('-'+produit.quantite_servie,idProduit)
            if(response!='success') reject('inetnal error1');
          }).catch((err)=>{console.log(err); reject(err)})
         
        }
        resolve('success')
    })
}
function genererBonDecharge(Id,products,numDecharge,dateDecharge,numDemande)
{
    return new Promise(async(resolve,reject)=>{
    console.log(products)
    changeProductsStructure(products)
    await googleMiddleware.updateCel('B3',"DECHARGE "+numDecharge,Id);
    await googleMiddleware.updateCel('B10',`Sidi Bel Abbés le ${dateDecharge}`,Id)
    let i=6; 
    for(let product of products )
    {
        await googleMiddleware.addRow(i,product,Id,'decharge')
        i++;
    }
    let link=`bonDecharge/bonDecharge${numDecharge}.`;
    await googleMiddleware.generatePDF(Id,'bonDecharge',`bonDecharge${numDecharge}`)
    await googleMiddleware.generateCSV(Id,'bonDecharge',`bonDecharge${numDecharge}`)
    await googleMiddleware.deleteRows(6,i-1,Id);
    SortieModel.insertDechargeLink(numDemande,link+'pdf',link+'xlsx').then(()=>{
        resolve('success')
    }).catch(()=>{reject('error')})
    })
}
function changeProductsStructure(products)
{
   let designation='';
   console.log(products)
   for(let product of products)
   {
      if(product.designation===designation)
         product.designation='';
      else designation=product.designation;  
   }
}
function addDecharge(Id,products,numDecharge,dateDecharge,numDemande)
{
    return new Promise((resolve,reject)=>{
        
        SortieModel.insertDateNumDecharge(numDemande,numDecharge,dateDecharge).then(()=>{
            SortieModel.insertDecharge(numDemande,products).then(()=>{
                genererBonDecharge(Id,products,numDecharge,dateDecharge,numDemande).then(()=>{
                    resolve('');
                }).catch(()=>{reject('')})
            }).catch(()=>{reject('')})
        }).catch(()=>{reject('')})
    })
}
module.exports={canUpdate,genererBonSortie,subtituteQuantite,addDecharge}