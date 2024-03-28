const { reject } = require('async');
const googleMiddleware = require('../Middlewares/googleMiddleware');
const EntreeModel = require('../Models/EntreeModel');
const nomencaltureModel = require('../Models/NomenclatureModel');
const numberWord = require('french-numbers-to-words');
const { promises } = require('nodemailer/lib/xoauth2');
function getDate() {
  const dateActuelle = new Date();
  const annee = dateActuelle.getFullYear();
  let mois = dateActuelle.getMonth() + 1;
  mois = mois < 10 ? '0' + mois : mois;
  let jour = dateActuelle.getDate();
  jour = jour < 10 ? '0' + jour : jour;
  return `${annee}-${mois}-${jour}`;
}
function montantHT(produits) {
  let somme;
  console.log(produits);
  for (let produit of produits)
    somme = parseInt(produit.quantite) * parseInt(produit.prixUnitaire);
  return somme;
}
function TVA(montantHT, tva) {
  return Math.floor((montantHT * tva) / 100);
}
async function genererBondeCommande(
  num_commande,
  produits,
  fourn,
  objet,
  type,
  Id,
  tva,
  date
) {
  return new Promise(async (resolve, reject) => {
    await googleMiddleware.updateCel(
      'C1',
      `République Algerienne démoctatique et populaire
        Bon de commande
        N° ${num_commande} ${date}`,
      Id
    );
    nomencaltureModel
      .getFournisseur(fourn)
      .then(async fournisseur => {
        await googleMiddleware.updateCel(
          'C11',
          'Adresse ' + fournisseur.adresse,
          Id
        );
        await googleMiddleware.updateCel(
          'C8',
          'Nom et prénom ' + fournisseur.raison_sociale,
          Id
        );
        await googleMiddleware.updateCel(
          'C9',
          'Ou Raison Sociale: ' + fournisseur.raison_sociale,
          Id
        );
        await googleMiddleware.updateCel(
          'C12',
          'Telephone et fax:' + fournisseur.telephone + '/' + fournisseur.fax,
          Id
        );
        await googleMiddleware.updateCel(
          'C13',
          'N° R.C : ' + fournisseur.num_registre,
          Id
        );
        await googleMiddleware.updateCel(
          'F13',
          `N.I.F : ${fournisseur.nif ? fournisseur.nif : ''}`,
          Id
        );
        await googleMiddleware.updateCel(
          'F14',
          `N.I.S : ${+fournisseur.nis ? fournisseur.nis : ''}`,
          Id
        );
        await googleMiddleware.updateCel(
          'F22',
          montantHT(produits) + '.00',
          Id
        );
        await googleMiddleware.updateCel(
          'C15',
          `RIB (ou RIP) :${
            fournisseur.rib ? fournisseur.rib : fournisseur.rip
          }`,
          Id
        );
        await googleMiddleware.updateCel(
          'F18',
          `Objet de la commande: ${objet}`,
          Id
        );
        let range;
        switch (type) {
          case 'materiel':
            range = 'A18';
            break;
          case 'fourniture':
            range = 'A19';
            break;
          case 'service':
            range = 'A20';
            break;
          default:
            break;
        }
        await googleMiddleware.updateCel('D23', `TVA ${tva}%`, Id);
        await googleMiddleware.updateCel(
          'F23',
          TVA(montantHT(produits), tva) + '.00',
          Id
        );
        await googleMiddleware.updateCel(
          'F24',
          TVA(montantHT(produits), tva) + montantHT(produits) + '.00',
          Id
        );
        const myNumber = new numberWord(
          TVA(montantHT(produits), tva) + montantHT(produits),
          'fr'
        ).result.fullText;
        await googleMiddleware.updateCel(
          'A27',
          `${myNumber} dinars algérien`,
          Id
        );
        await googleMiddleware.updateCel(range, true, Id);
        let i = 22;
        for (const produit of produits) {
          await googleMiddleware.addRow(i, produit, Id);
          i++;
        }
        await googleMiddleware.generatePDF(Id, `commande${num_commande}`);
        await googleMiddleware.updateCel(range, false, Id);
        await googleMiddleware.deleteRows(22, i - 1, Id);
        const link = `BonCommande/commande${num_commande}.pdf`;
        EntreeModel.insertLink(link, num_commande)
          .then(() => {
            resolve(link);
          })
          .catch(() => {
            reject('err');
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}
module.exports = { getDate, genererBondeCommande, montantHT, TVA };
