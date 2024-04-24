const SortieModel=require('../Models/SortieModel');
const googleMiddleware=require('../Middlewares/googleMiddleware');
const { reject } = require('async');
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
                    if(status==="visee par dir") resolve('')
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
        await googleMiddleware.updateCel('D7',`Le:${dateSortie}`,id);
        let i=9;
        for(let produit of produits)
        {
            await googleMiddleware.addRow(i,produit,id,"sortie")
            i++;
        }
        await googleMiddleware.generatePDF(id,`sortie`,`sortie${numDemande}`);
        await googleMiddleware.deleteRows(9,i-1,id);
        const link=`sortie/sortie${numDemande}.pdf`
        SortieModel.insertLink(numDemande,link).then(()=>{
            resolve(link)
        }).catch(()=>{reject("err")})
    })

}
module.exports={canUpdate,genererBonSortie}