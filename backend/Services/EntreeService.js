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
    await googleMiddleware.updateCel('C8', `N° ${num_commande} ${date}`, Id);
    let year = date.split('/')[0];
    await googleMiddleware.updateCel(
      'A36',
      `-La source de financement : le budget de fonctionnement de l'école 2023 ${year}`,
      Id
    );
    nomencaltureModel
      .getFournisseur(fourn)
      .then(async fournisseur => {
        await Promise.all([
          googleMiddleware.updateCel(
            'C18',
            'Adresse ' + fournisseur.adresse,
            Id
          ),
          googleMiddleware.updateCel(
            'C15',
            'Nom et prénom ' + fournisseur.raison_sociale,
            Id
          ),
          googleMiddleware.updateCel(
            'C16',
            'Ou Raison Sociale: ' + fournisseur.raison_sociale,
            Id
          ),
          googleMiddleware.updateCel(
            'C18',
            'Telephone et fax:' + fournisseur.telephone + '/' + fournisseur.fax,
            Id
          ),
          googleMiddleware.updateCel(
            'C20',
            'N° R.C : ' + fournisseur.num_registre,
            Id
          ),
          googleMiddleware.updateCel(
            'F20',
            `N.I.F : ${fournisseur.nif ? fournisseur.nif : ''}`,
            Id
          ),
          googleMiddleware.updateCel(
            'F21',
            `N.I.S : ${+fournisseur.nis ? fournisseur.nis : ''}`,
            Id
          ),
          googleMiddleware.updateCel('F29', montantHT(produits) + '.00', Id),
          googleMiddleware.updateCel(
            'C22',
            `RIB (ou RIP) :${fournisseur.rib_ou_rip}`,
            Id
          ),
          googleMiddleware.updateCel(
            'F25',
            `Objet de la commande: ${objet}`,
            Id
          ),
        ]);
        let range;
        switch (type) {
          case 'materiel':
            range = 'A25';
            break;
          case 'fourniture':
            range = 'A26';
            break;
          case 'service':
            range = 'A27';
            break;
          default:
            break;
        }
        await Promise.all([
          googleMiddleware.updateCel('D30', `TVA ${tva}%`, Id),
          googleMiddleware.updateCel(
            'F31',
            TVA(montantHT(produits), tva) + '.00',
            Id
          ),
          googleMiddleware.updateCel(
            'F31',
            TVA(montantHT(produits), tva) + montantHT(produits) + '.00',
            Id
          ),
        ]);
        const myNumber = nombreEnLettres(
          TVA(montantHT(produits), tva) + montantHT(produits)
        );
        await Promise.all([
          googleMiddleware.updateCel('A34', `${myNumber} dinars algérien`, Id),
          googleMiddleware.updateCel(range, true, Id),
        ]);
        let i = 29;
        for (const produit of produits) {
          await googleMiddleware.addRow(i, produit, Id, 'commande');
          i++;
        }
        await Promise.all([
          googleMiddleware.generatePDF(
            Id,
            `bonCommande`,
            `commande${num_commande}`
          ),
          googleMiddleware.generateCSV(
            Id,
            `bonCommande`,
            `commande${num_commande}`
          ),
        ]);
        await Promise.all([
          googleMiddleware.updateCel(range, false, Id),
          googleMiddleware.deleteRows(29, i - 1, Id),
        ]);
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
  factureLink,
  products
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
            EntreeModel.addRefs(
              products,
              dateReception,
              numCommande,
              numReception
            )
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
    await googleMiddleware.updateCel('A10', `Fournisseur: ${fournisseur}`, Id);
    await googleMiddleware.updateCel(
      'C8',
      `              N° ${numReception} Date ${dateReception}`,
      Id
    );
    await googleMiddleware.updateCel(
      'A11',
      `N° du Bon de commande : ${numCommande}`,
      Id
    );
    await googleMiddleware.updateCel(
      'D11',
      `Date du Bon de Commande : ${dateCommande}`,
      Id
    );
    let i = 15;
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
    await googleMiddleware.deleteRows(15, i - 1, Id);
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
                  '-' + product.quantite,
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
function changeTabFormat(produits) {
  let products = [];
  for (let produit of produits) {
    for (let ref of produit.refs) {
      products.push({
        designation: produit.designation,
        ref,
      });
    }
  }
  return products;
}
function nombreEnLettres(nombre) {
  const unités = [
    '',
    'un',
    'deux',
    'trois',
    'quatre',
    'cinq',
    'six',
    'sept',
    'huit',
    'neuf',
  ];
  const dizaines = [
    '',
    'dix',
    'vingt',
    'trente',
    'quarante',
    'cinquante',
    'soixante',
    'soixante-dix',
    'quatre-vingt',
    'quatre-vingt-dix',
  ];
  const dizaines_spéciales = [
    'dix',
    'onze',
    'douze',
    'treize',
    'quatorze',
    'quinze',
    'seize',
  ];

  if (nombre === 0) return 'zéro';

  function enLettres(nombre) {
    if (nombre < 10) {
      return unités[nombre];
    } else if (nombre < 17) {
      return dizaines_spéciales[nombre - 10];
    } else if (nombre < 20) {
      return 'dix-' + unités[nombre - 10];
    } else if (nombre < 70) {
      if (nombre % 10 === 1 && nombre > 20) {
        return dizaines[Math.floor(nombre / 10)] + '-et-un';
      } else {
        return (
          dizaines[Math.floor(nombre / 10)] +
          (nombre % 10 > 0 ? '-' + unités[nombre % 10] : '')
        );
      }
    } else if (nombre < 80) {
      return 'soixante-' + enLettres(nombre - 60);
    } else if (nombre < 100) {
      return (
        'quatre-vingt' + (nombre % 10 > 0 ? '-' + unités[nombre % 10] : '')
      );
    } else if (nombre < 1000) {
      if (nombre === 100) {
        return 'cent';
      } else if (nombre < 200) {
        return 'cent ' + enLettres(nombre - 100);
      } else {
        return (
          unités[Math.floor(nombre / 100)] +
          '-cent' +
          (nombre % 100 > 0 ? '-' + enLettres(nombre % 100) : '')
        );
      }
    } else if (nombre < 1000000) {
      if (nombre === 1000) {
        return 'mille';
      } else if (nombre < 2000) {
        return 'mille ' + enLettres(nombre % 1000);
      } else {
        return (
          enLettres(Math.floor(nombre / 1000)) +
          '-mille' +
          (nombre % 1000 > 0 ? '-' + enLettres(nombre % 1000) : '')
        );
      }
    } else if (nombre < 1000000000) {
      if (nombre === 1000000) {
        return 'un million';
      } else if (nombre < 2000000) {
        return 'un million ' + enLettres(nombre % 1000000);
      } else {
        return (
          enLettres(Math.floor(nombre / 1000000)) +
          '-millions' +
          (nombre % 1000000 > 0 ? '-' + enLettres(nombre % 1000000) : '')
        );
      }
    } else if (nombre < 1000000000000) {
      if (nombre === 1000000000) {
        return 'un milliard';
      } else if (nombre < 2000000000) {
        return 'un milliard ' + enLettres(nombre % 1000000000);
      } else {
        return (
          enLettres(Math.floor(nombre / 1000000000)) +
          '-milliards' +
          (nombre % 1000000000 > 0 ? '-' + enLettres(nombre % 1000000000) : '')
        );
      }
    }
    return '';
  }

  return enLettres(nombre).replace(/-$/, '').trim();
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
  changeTabFormat,
};
