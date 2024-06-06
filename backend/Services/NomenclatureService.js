const NomenclatureModel = require('../Models/NomenclatureModel');
function addArticle(chapitre, designation, numArt, tva) {
  return new Promise((resolve, reject) => {
    NomenclatureModel.getChapterId(chapitre)
      .then(chapitreId => {
        NomenclatureModel.addArticle(numArt, chapitreId, designation, tva)
          .then(() => {
            resolve('article added');
          })
          .catch(() => {
            reject('internal error');
          });
      })
      .catch(() => {
        reject('internal error');
      });
  });
}
function addProduct(
  article,
  designation,
  description,
  quantite,
  seuil,
  consommable
) {
  return new Promise((resolve, reject) => {
    if (article) {
      NomenclatureModel.getArticleIdTva(article)
        .then(article => {
          NomenclatureModel.addProduct(
            quantite,
            designation,
            description,
            seuil,
            consommable
          )
            .then(() => {
              NomenclatureModel.getProductId(designation)
                .then(productId => {
                  console.log({ article });
                  NomenclatureModel.addArticleProduct(
                    article.num_article,
                    productId
                  )
                    .then(() => {
                      resolve('product added');
                    })
                    .catch(() => {
                      reject('internal error1');
                    });
                })
                .catch(() => {
                  reject('internal error2');
                });
            })
            .catch(() => {
              reject('internal error3');
            });
        })
        .catch(() => {
          reject('internal error4');
        });
    } else {
      NomenclatureModel.addProduct(
        quantite,
        designation,
        description,
        seuil,
        consommable
      )
        .then(() => {
          resolve('product added');
        })
        .catch(() => {
          reject('internal error4');
        });
    }
  });
}
function deleteArticle(designation) {
  return new Promise((resolve, reject) => {
    NomenclatureModel.getArticleIdTva(designation)
      .then(articleId => {
        NomenclatureModel.deleteArticle(articleId.num_article)
          .then(() => {
            NomenclatureModel.deleteArticleFromC(articleId.num_article)
              .then(() => {
                resolve('article deleted');
              })
              .catch(() => {
                reject('internal error');
              });
          })
          .catch(() => {
            reject('internal error');
          });
      })
      .catch(() => {
        reject('internal error');
      });
  });
}
function deleteProduct(designation) {
  return new Promise((resolve, reject) => {
    NomenclatureModel.canDelete(designation, 'produit')
      .then(() => {
        NomenclatureModel.getProductId(designation)
          .then(articleId => {
            NomenclatureModel.deleteProduct(articleId)
              .then(() => {
                NomenclatureModel.deleteProductFromC(articleId)
                  .then(() => {
                    resolve('product deleted');
                  })
                  .catch(() => {
                    reject('internal error');
                  });
              })
              .catch(() => {
                reject('internal error');
              });
          })
          .catch(() => {
            reject('internal error');
          });
      })
      .catch(() => {
        reject('prohibited to delete product');
      });
  });
}
module.exports = { addArticle, addProduct, deleteArticle, deleteProduct };
