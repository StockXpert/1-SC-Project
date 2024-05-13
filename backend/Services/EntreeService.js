const googleMiddleware = require('../Middlewares/googleMiddleware');
const EntreeModel = require('../Models/EntreeModel');
const nomencaltureModel = require('../Models/NomenclatureModel');
const numberWord = require('french-numbers-to-words');
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
  let somme = 0;
  console.log(produits);
  for (let produit of produits) {
    console.log(
      parseInt(produit.quantite) *
        parseInt(
          produit.prixUnitaire ? produit.prixUnitaire : produit.prix_unitaire
        )
    );
    somme =
      somme +
      parseInt(produit.quantite) *
        parseInt(
          produit.prixUnitaire ? produit.prixUnitaire : produit.prix_unitaire
        );
    console.log({ somme });
  }
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
          `RIB (ou RIP) :${fournisseur.rib_ou_rip}`,
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
          await googleMiddleware.addRow(i, produit, Id, 'commande');
          i++;
        }
        await googleMiddleware.generatePDF(
          Id,
          `bonCommande`,
          `commande${num_commande}`
        );
        await googleMiddleware.generateCSV(
          Id,
          `bonCommande`,
          `commande${num_commande}`
        );
        await googleMiddleware.updateCel(range, false, Id);
        await googleMiddleware.deleteRows(22, i - 1, Id);
        const link = `BonCommande/commande${num_commande}.`;
        EntreeModel.insertLink(link + 'pdf', link + 'xlsx', num_commande)
          .then(() => {
            resolve(link);
          })
          .catch(() => {
            reject('err');
          });
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}
function changeQuantite(numCommande, produits) {
  return new Promise(async (resolve, reject) => {
    let response;
    console.log('change');
    console.log({ produits });
    if (produits) {
      for (let produit of produits) {
        await nomencaltureModel
          .getProductId(produit.designation)
          .then(async idProduit => {
            console.log({ produit });
            response = await EntreeModel.updateQuantiteCommande(
              produit.quantite,
              numCommande,
              idProduit
            );
            if (response != 'success') reject('inetnal error1');
            response = await EntreeModel.updateQuantite(
              produit.quantite,
              idProduit
            );
            if (response != 'success') reject('inetnal error2');
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      }
    }
    resolve('success');
  });
}
function uploadvalidity(numCommande) {
  return new Promise((resolve, reject) => {
    EntreeModel.checkValidity(numCommande)
      .then(validity => {
        console.log({ validity });
        if (validity === 'valid')
          EntreeModel.changeStatus('delivrer', numCommande)
            .then(() => {
              resolve('quantite updated');
            })
            .catch(() => {
              reject('internal error4');
            });
        else
          EntreeModel.changeStatus('en cours', numCommande)
            .then(() => {
              resolve('quantite updated');
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}
function changeBonCommande(
  objet,
  fournisseur,
  deletedProducts,
  addedProducts,
  date,
  numCommande
) {
  return new Promise(async (resolve, reject) => {
    let response;
    if (objet || fournisseur || date) {
      EntreeModel.updateBonCommande(fournisseur, objet, date, numCommande)
        .then(async () => {
          if (addedProducts) {
            response = await EntreeModel.insertCommander(
              numCommande,
              addedProducts
            );
            if (response != 'success') reject('internal error');
          }
          if (deletedProducts) {
            response = await EntreeModel.deleteCommander(
              numCommande,
              deletedProducts
            );
            if (response != 'success') reject('internal error');
          }
          resolve('bon commande updated');
        })
        .catch(() => {
          reject('internal error');
        });
    } else {
      if (addedProducts) {
        response = await EntreeModel.insertCommander(
          numCommande,
          addedProducts
        );
        if (response != 'success') reject('internal error');
      }
      if (deletedProducts) {
        response = await EntreeModel.deleteCommander(
          numCommande,
          deletedProducts
        );
        if (response != 'success') reject('internal error');
      }
      resolve('bon commande updated');
    }
  });
}
function createReception(
  numCommande,
  produits,
  numFacture,
  numLivraison,
  dateReception,
  bonLivraisonLink,
  factureLink
) {
  return new Promise((resolve, reject) => {
    EntreeModel.insertBonReception(
      numCommande,
      dateReception,
      bonLivraisonLink,
      factureLink,
      numFacture,
      numLivraison
    )
      .then(numReception => {
        EntreeModel.insertLivre(numReception, produits)
          .then(() => {
            EntreeModel.getCommande(numCommande)
              .then(commande => {
                console.log(numCommande);
                genererBonReception(
                  produits,
                  numCommande,
                  commande.fournisseur,
                  commande.date_commande,
                  dateReception,
                  numReception,
                  '1CkIm8C3xJloKITIqfm-LsfqMpiZSSrGk1TVG6tzI1_w'
                )
                  .then(() => {
                    resolve('bon reception created');
                  })
                  .catch(err => {
                    console.log(err);
                    reject(err);
                  });
              })
              .catch(err => {
                console.log(err);
                reject(err);
              });
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}
async function genererBonReception(
  produits,
  numCommande,
  fournisseur,
  dateCommande,
  dateReception,
  numReception,
  Id
) {
  return new Promise(async (resolve, reject) => {
    await googleMiddleware.updateCel('A6', `Fournisseur: ${fournisseur}`, Id);
    await googleMiddleware.updateCel(
      'C4',
      `N° ${numReception} Date ${dateReception}`,
      Id
    );
    await googleMiddleware.updateCel(
      'A7',
      `N° du Bon de commande : ${numCommande}`,
      Id
    );
    await googleMiddleware.updateCel(
      'D7',
      `Date du Bon de Commande : ${dateCommande}`,
      Id
    );
    let i = 11;
    console.log(produits);
    for (const produit of produits) {
      console.log(produit);
      await googleMiddleware.addRow(i, produit, Id, 'reception');
      await googleMiddleware.addBorder(i, Id, 0, 1);
      await googleMiddleware.addBorder(i, Id, 1, 5);
      await googleMiddleware.addBorder(i, Id, 5, 6);
      i++;
    }
    await googleMiddleware.generatePDF(
      Id,
      `BonReception`,
      `reception${numReception}`
    );
    await googleMiddleware.generateCSV(
      Id,
      `BonReception`,
      `reception${numReception}`
    );
    await googleMiddleware.deleteRows(11, i - 1, Id);
    const link = `BonReception/reception${numReception}.`;
    EntreeModel.insertReceptionLink(link + 'pdf', link + 'xlsx', numReception)
      .then(() => {
        resolve(link);
      })
      .catch(() => {
        reject('err');
      });
  });
}
function restoreQuantite(numReception, numCommande, products) {
  return new Promise(async (resolve, reject) => {
    let response;

    if (products == null) {
      console.log(products);
      console.log('hi');
      EntreeModel.getBonReceptionProducts(numReception)
        .then(async products => {
          console.log(products);
          for (let product of products) {
            await nomencaltureModel
              .getProductId(product.designation)
              .then(async productId => {
                response = await EntreeModel.updateQuantiteCommande(
                  '-' + product.quantite,
                  numCommande,
                  productId
                );
                if (response != 'success') {
                  console.log('erreur');
                  reject('internal error');
                }
                response = await EntreeModel.updateQuantite(
                  -parseInt('-' + product.quantite),
                  productId
                );
                if (response != 'success') {
                  console.log('erreur');
                  reject('internal error');
                }
              });
          }
          resolve('quantite updated');
        })
        .catch(err => {
          console.log(err);
          reject('internal error');
        });
    } else if (products == 1) resolve('success');
    else {
      for (let product of products) {
        await nomencaltureModel
          .getProductId(product.designation)
          .then(async productId => {
            response = await EntreeModel.updateQuantiteCommande(
              '-' + product.quantite,
              numCommande,
              productId
            );
            if (response != 'success') reject('internal error');
            response = await EntreeModel.updateQuantite(
              '-' + product.quantite,
              productId
            );
            if (response != 'success') reject('internal error');
            response = await EntreeModel.deleteProduitLivre(
              numReception,
              productId
            );
            if (response != 'success') reject('internal error');
          });
      }
      resolve('quantite updated');
    }
  });
}
module.exports = {
  getDate,
  genererBondeCommande,
  montantHT,
  TVA,
  changeQuantite,
  changeBonCommande,
  uploadvalidity,
  createReception,
  restoreQuantite,
};
