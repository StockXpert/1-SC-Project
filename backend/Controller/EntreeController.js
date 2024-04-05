const EntreeModel = require('../Models/EntreeModel');
const { getArticleIdTva } = require('../Models/NomenclatureModel');
const EntreeService = require('../Services/EntreeService');
function genererFicheBesoins(req, res) {
  const { produits, besoin } = req.body;
}
function genererBondeCommande(req, res) {
  const { produits, fournisseur, objet, type, date } = req.body;
  getArticleIdTva(objet)
    .then(article => {
      EntreeModel.insertBonCommande(
        fournisseur,
        article.num_article,
        type,
        date
      )
        .then(n_com => {
          EntreeModel.insertCommander(n_com, produits)
            .then(() => {
              EntreeService.genererBondeCommande(
                n_com,
                produits,
                fournisseur,
                objet,
                type,
                '1KEtktsb0n8ZspuxitPk-8kX1S5OJ6AcJmnlbywh-s98',
                article.tva,
                date
              )
                .then(link => {
                  res
                    .status(200)
                    .json({ response: 'bon de commande insere', link });
                })
                .catch(() => {
                  res.status(500).json({ response: 'internal error' });
                });
            })
            .catch(error => {
              console.log(error);
              res.status(500).json({ response: 'internal error' });
            });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ response: 'internal error' });
        });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function deleteCommande(req, res) {
  const { numCommande } = req.body;
  EntreeModel.getBonReception(numCommande)
    .then(response => {
      if (response.length != 0)
        res.status(500).json({ response: 'prohibited to delete commande2' });
      else {
        EntreeModel.canDeleteCommande(numCommande)
          .then(() => {
            EntreeModel.deleteCommande(numCommande)
              .then(() => {
                EntreeModel.deleteBonCommande(numCommande)
                  .then(() => {
                    res.status(200).json({ response: 'commande deleted' });
                  })
                  .catch(() => {
                    res.status(500).json({ response: 'internal error' });
                  });
              })
              .catch(() => {
                res.status(500).json({ response: 'internal error' });
              });
          })
          .catch(() => {
            res
              .status(500)
              .json({ response: 'prohibited to delete commande1' });
          });
      }
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function cancelCommande(req, res) {
  const { numCommande } = req.body;
  EntreeModel.cancelCommande(numCommande)
    .then(() => {
      res.status(200).json({ response: 'commande canceled' });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function showCommandes(req, res) {
  EntreeModel.getCommandes()
    .then(commandes => {
      res.status(200).json({ commandes });
    })
    .catch(err => {
      res.status(500).json({ response: err });
    });
}
function updateQuantite(req, res) {
  const { numCommande, produits, numFacture, numLivraison, dateReception } =
    req.body;
  const bonLivraisonLink = req.files['bonLivraison'][0].originalname;
  const factureLink = req.files['facture'][0].originalname;
  EntreeService.changeQuantite(numCommande, produits)
    .then(response => {
      EntreeService.uploadvalidity(numCommande).then(response => {
        EntreeService.createReception(
          numCommande,
          produits,
          numFacture,
          numLivraison,
          dateReception,
          bonLivraisonLink,
          factureLink
        )
          .then(response => {
            res.status(200).json({ response });
          })
          .catch(response => res.status(500).json({ response }));
      });
    })
    .catch(response => res.status(500).json({ response }));
}
function updateBonCommande(req, res) {
  const {
    objet,
    fournisseur,
    deletedProducts,
    addedProducts,
    date,
    numCommande,
  } = req.body;
  EntreeModel.getBonReception(numCommande)
    .then(response => {
      if (response.length != 0)
        res.status(500).json({ response: 'prohibited to update' });
      else {
        EntreeService.changeBonCommande(
          objet,
          fournisseur,
          deletedProducts,
          addedProducts,
          date,
          numCommande
        )
          .then(() => {
            EntreeModel.getBonCommande(numCommande)
              .then(commande => {
                EntreeModel.getBonCommandeFournisseur(numCommande)
                  .then(raisonSociale => {
                    EntreeModel.getCommandeProducts(numCommande)
                      .then(products => {
                        getArticleIdTva(commande.objet)
                          .then(article => {
                            console.log({ raisonSociale });
                            EntreeService.genererBondeCommande(
                              numCommande,
                              products,
                              raisonSociale,
                              commande.objet,
                              commande.type,
                              '1KEtktsb0n8ZspuxitPk-8kX1S5OJ6AcJmnlbywh-s98',
                              article.tva,
                              commande.date_commande
                            );
                          })
                          .catch(err => {
                            console.log(err);
                            res.status(500).json({ response: err });
                          });
                      })
                      .catch(err => {
                        console.log(err);
                        res.status(500).json({ response: 'internal error' });
                      });
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({ response: 'internal error' });
                  });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ response: 'internal error' });
              });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ response: 'internal error' });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ response: 'internal error' });
    });
}
function showBonReception(req, res) {
  const { numCommande } = req.body;
  EntreeModel.getBonReception(numCommande)
    .then(response => {
      res.status(500).json({ response });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function showBonReceptionProducts(req, res) {
  const { numReception } = req.body;
  EntreeModel.getBonReceptionProducts(numReception)
    .then(response => {
      res.status(500).json({ response });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function showCommandeProducts(req, res) {
  const { numCommande } = req.body;
  EntreeModel.getCommandeProducts(numCommande)
    .then(response => {
      res.status(200).json({ response });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function updateReception(req, res) {
  let {
    numCommande,
    numReception,
    deletedProducts,
    addedProducts,
    numLivraison,
    numFacture,
    dateReception,
  } = req.body;
  if (!deletedProducts) deletedProducts = 1;
  EntreeService.restoreQuantite(numReception, numCommande, deletedProducts)
    .then(() => {
      EntreeModel.insertLivre(numReception, addedProducts)
        .then(() => {
          EntreeService.changeQuantite(numCommande, addedProducts)
            .then(() => {
              EntreeService.uploadvalidity(numCommande)
                .then(() => {
                  if (numFacture || numLivraison || dateReception) {
                    EntreeModel.updateReception(
                      numReception,
                      numLivraison,
                      numFacture
                    )
                      .then(() => {
                        res.status(200).json({ response: 'Reception updated' });
                      })
                      .catch(() => {
                        res.status(500).json({ response: 'internal error' });
                      });
                  } else
                    res.status(200).json({ response: 'Reception updated' });
                })
                .catch(() => {
                  res.status(500).json({ response: 'internal error' });
                });
            })
            .catch(() => {
              res.status(500).json({ response: 'internal error' });
            });
        })
        .catch(() => {
          res.status(500).json({ response: 'internal error' });
        });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
function deleteReception(req, res) {
  const { numReception, numCommande } = req.body;
  EntreeService.restoreQuantite(numReception, numCommande, null)
    .then(() => {
      EntreeService.uploadvalidity(numCommande)
        .then(() => {
          EntreeModel.deleteReception(numReception)
            .then(() => {
              EntreeModel.deleteLivre(numReception)
                .then(response => {
                  res.status(200).json({ response });
                })
                .catch(() => {
                  res.status(500).json({ response: 'internal error' });
                });
            })
            .catch(() => {
              res.status(500).json({ response: 'internal error' });
            });
        })
        .catch(() => {
          res.status(500).json({ response: 'internal error' });
        });
    })
    .catch(() => {
      res.status(500).json({ response: 'internal error' });
    });
}
module.exports = {
  genererFicheBesoins,
  genererBondeCommande,
  deleteCommande,
  cancelCommande,
  showCommandes,
  updateQuantite,
  updateBonCommande,
  showBonReception,
  showBonReceptionProducts,
  showCommandeProducts,
  updateReception,
  deleteReception,
};
