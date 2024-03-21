const googleMiddleware= require('../Middlewares/googleMiddleware');
const nomencaltureModel=require('../Models/NomenclatureModel')
function getDate()
{
    const dateActuelle = new Date();
    const annee = dateActuelle.getFullYear();
    let mois = dateActuelle.getMonth() + 1;
    mois = mois < 10 ? '0' + mois : mois;
    let jour = dateActuelle.getDate();
    jour = jour < 10 ? '0' + jour : jour;
    return `${annee}-${mois}-${jour}`;
}
async function genererBondeCommande(num_commande,produits,fournisseur,objet,type,copyId)
{
    return new Promise(async(resolve,reject)=>{
        //const copyId=googleMiddleware.getCopy(".l..")
        await googleMiddleware.updateCel('C1',`République Algerienne démoctatique et populaire
        Bon de commande
        ${num_commande} ${getDate()}`,copyId);
        console.log(fournisseur)
        nomencaltureModel.getFournisseur(fournisseur).then(async(fournisseur)=>{
            console.log(fournisseur)
            await googleMiddleware.updateCel('C9',"Nom et prénom"+fournisseur.raison_sociale,copyId)
            await googleMiddleware.updateCel('C9',"Ou Raison Sociale:"+fournisseur.raison_sociale,copyId)
            await googleMiddleware.updateCel('C12',"Telephone et fax:"+fournisseur.telephone+"/"+fournisseur.fax,copyId)
            await googleMiddleware.updateCel('F13',"N.I.F"+fournisseur.nif,copyId)
            await googleMiddleware.updateCel('F14',"N.I.S"+fournisseur.nis,copyId)
            await googleMiddleware.updateCel('C15',"RIB (ou RIP)"+fournisseur.rib?fournisseur.rib:fournisseur.rip,copyId)
            await googleMiddleware.updateCel('F18',`Objet de la commande :
            ${objet}`,copyId);
            let range
            switch (type) {
                case "materiel":
                    range='A18'
                    break;
                case "fourniture":
                    range='A19'
                    break;
                case "service":
                    range='A20'
                    break;
                default:
                    break;
            }
            await googleMiddleware.updateCel(range,true,copyId);
            let i = 22;
            for (const produit of produits) {
                await googleMiddleware.addRow(i, produit, copyId);
                i++;
            }
            googleMiddleware.generatePDF(copyId,`commande${num_commande}`);
            resolve("pdf generated");
        }).catch(()=>{console.log("erreur")/*reject("internal error")*/})
    })
}
module.exports={getDate,genererBondeCommande}