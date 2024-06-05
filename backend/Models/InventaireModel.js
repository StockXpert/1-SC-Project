const mysql = require('mysql');
const async = require('async');
const connectionConfig = {
  host: 'bibznsnq8nf1q3j7r74o-mysql.services.clever-cloud.com',
  user: 'ucvk6cpbqavmyqnb',
  password: 'w7Xaq1AwW42V3jvOiTgb',
  database: 'bibznsnq8nf1q3j7r74o',
};
function addInventaire(numInventaire, dateInventaire) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `INSERT INTO inventaire (num_inventaire,date_inventaire) values (?,?)`;
    const values = [numInventaire, dateInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          if (error.code == 'ER_DUP_ENTRY')
            reject(`numéro d'inventaire déja utilisé `);
          else reject('internal error');
          return;
        }
        resolve('success');
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function insertCompter(numInventaire, produits) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion à la base de données : ', err);
        reject(err);
        return;
      }
      console.log('Connecté à la base de données MySQL');

      // Commencer la transaction
      connection.beginTransaction(err => {
        if (err) {
          console.error('Erreur lors du démarrage de la transaction : ', err);
          reject(err);
          return;
        }
        console.log('Début de la transaction');

        // Utiliser une boucle asynchrone pour traiter chaque produit
        async.eachSeries(
          produits,
          (produit, callback) => {
            // Insérer les données dans ma_table avec l'ID produit fourni
            connection.query(
              'insert into compter (num_inventaire,present,reference,raison) values (?,?,?,?)',
              [
                numInventaire,
                produit.present,
                produit.reference,
                produit.raison,
              ],
              (err, result) => {
                if (err) {
                  return callback(err);
                }
                callback();
              }
            );
          },
          err => {
            if (err) {
              return connection.rollback(() => {
                console.error('Erreur lors du traitement des produits : ', err);
                reject(err);
              });
            }

            // Valider la transaction
            connection.commit(err => {
              if (err) {
                return connection.rollback(() => {
                  console.error(
                    'Erreur lors de la validation de la transaction : ',
                    err
                  );
                  reject(err);
                });
              }
              console.log('Transaction validée avec succès');
              resolve('success');
              connection.end();
            });
          }
        );
      });
    });
  });
}
function changeInvetaireStatus(numInventaire, etat) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `update inventaire set etat=? where num_inventaire=?`;
    const values = [etat, numInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve('success');
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getInventaires() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select * from inventaire`;
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve(results);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function insertInvetaireLink(numInventaire, link) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `update inventaire set zip=? where num_inventaire=?`;
    const values = [link, numInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve('');
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getInventaire(numInventaire) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select a.designation as article,t.designation as chapitre, c.present ,c.reference,p.designation,c.raison,r.num_inventaire,r.date_inventaire 
        from produit p,compter c,reference r,chapitre t ,contient n , article a
        where c.num_inventaire=? and c.reference=r.designation and p.id_produit=r.id_produit and
        p.id_produit=n.id_produit and n.id_article=a.num_article and a.num_chap=t.num_chap`;
    const values = [numInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve(results);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getInventaireStatus(numInventaire) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select etat from inventaire where num_inventaire=?`;
    const values = [numInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve(results[0].num_inventaire);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function deleteInventaire(numInventaire) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `delete from inventaire where num_inventaire=?`;
    const values = [numInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve('success');
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function updateInventaire(numInventaire, produits) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion à la base de données : ', err);
        reject(err);
        return;
      }
      console.log('Connecté à la base de données MySQL');

      // Commencer la transaction
      connection.beginTransaction(err => {
        if (err) {
          console.error('Erreur lors du démarrage de la transaction : ', err);
          reject(err);
          return;
        }
        console.log('Début de la transaction');

        // Utiliser une boucle asynchrone pour traiter chaque produit
        async.eachSeries(
          produits,
          (produit, callback) => {
            // Insérer les données dans ma_table avec l'ID produit fourni
            connection.query(
              'update compter set present=? , raison=? where num_inventaire=? and reference=?',
              [
                produit.present,
                produit.raison,
                numInventaire,
                produit.reference,
              ],
              (err, result) => {
                if (err) {
                  return callback(err);
                }
                callback();
              }
            );
          },
          err => {
            if (err) {
              return connection.rollback(() => {
                console.error('Erreur lors du traitement des produits : ', err);
                reject(err);
              });
            }

            // Valider la transaction
            connection.commit(err => {
              if (err) {
                return connection.rollback(() => {
                  console.error(
                    'Erreur lors de la validation de la transaction : ',
                    err
                  );
                  reject(err);
                });
              }
              console.log('Transaction validée avec succès');
              resolve('success');
              connection.end();
            });
          }
        );
      });
    });
  });
}
function validInvetaireStatus(numInventaire) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `update inventaire set etat='valid' where num_inventaire=?`;
    const values = [numInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve('success');
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function deleteCompter(numInventaire) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `delete from compter where num_inventaire=?`;
    const values = [numInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve('success');
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function inscriptionDate(produit, year) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select CONCAT(year(min(b.date_reception)), '-', DATE_FORMAT(min(b.date_reception), '%m'), '-', DATE_FORMAT(min(b.date_reception), '%d')) as date from bon_de_reception b,livre l
    where b.num_bon=l.num_bon and l.id_produit=? and year(b.date_reception)=?`;
    const values = [produit, year];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        console.log({ dateIns: results });
        if (results.length == 0) resolve('');
        else resolve(results[0].date);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function avgProductValue(produit, year) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select avg(c.prix_unitaire) as avg from bon_de_commande b,commande c
    where b.num_commande=c.id_commande and  c.id_produit=? and year(b.date_commande)=?`;
    const values = [produit, year];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        if (results.length == 0) resolve('');
        else resolve(results[0].avg);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getProductFournisseur(produit, year) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select f.raison_sociale,count(c.id_produit) as nombre  from bon_de_commande b,commande c,fournisseur f
    where b.num_commande=c.id_commande and  c.id_produit=? and year(b.date_commande)=?
    and f.id_fournisseur=b.id_fournisseur
     Group by f.raison_sociale
     order by nombre desc limit 1`;
    const values = [produit, year];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        console.log({ results: results });
        if (results.length == 0) resolve('');
        else resolve(results[0].raison_sociale);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getInventaireYear(numInventaire) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select year(date_inventaire) as year ,CONCAT(year(date_inventaire), '-', DATE_FORMAT(date_inventaire, '%m'), '-', DATE_FORMAT(date_inventaire, '%d')) as date_inventaire from inventaire where num_inventaire=?`;
    const values = [numInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve(results[0]);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getInventaireProducts(numInventaire) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select  p.designation,f.raison_sociale as fournisseur, Date_format(r.date_inscription,'%Y,%m,%d') as date_inscription, Date_format(r.date_inventaire,'%Y,%m,%d') as date_inventaire,m.prix_unitaire,r.num_inventaire
     from compter c,produit p,reference r,bon_de_commande b,commande m,fournisseur f
     where c.num_inventaire=? and c.present=true and c.reference=r.designation and p.id_produit=r.id_produit
     and b.num_commande=r.num_commande and f.id_fournisseur=b.id_fournisseur and b.num_commande=m.id_commande
     and m.id_produit=r.id_produit `;
    const values = [numInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve(results);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function insertLink(numInventaire, link, link2) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `update inventaire set link=?,link_excel=? where num_inventaire=?`;
    const values = [link, link2, numInventaire];

    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve('success');
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function updateQuantite(produits) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion à la base de données : ', err);
        reject(err);
        return;
      }
      console.log('Connecté à la base de données MySQL');

      // Commencer la transaction
      connection.beginTransaction(err => {
        if (err) {
          console.error('Erreur lors du démarrage de la transaction : ', err);
          reject(err);
          return;
        }
        console.log('Début de la transaction');

        // Utiliser une boucle asynchrone pour traiter chaque produit
        async.eachSeries(
          produits,
          (produit, callback) => {
            // Exécuter la requête pour récupérer l'ID produit à partir de la désignation
            console.log({ produit });
            connection.query(
              'SELECT id_produit FROM produit WHERE designation = ?',
              [produit.designation],
              (err, rows) => {
                if (err) {
                  return callback(err);
                }
                if (rows.length === 0) {
                  return callback('Produit non trouvé  ' + produit.designation);
                }
                const id_produit = rows[0].id_produit;

                // Insérer les données dans ma_table avec l'ID produit récupéré
                connection.query(
                  'update produit set quantite=? where id_produit=?',
                  [produit.quantite_phys, id_produit],
                  (err, result) => {
                    if (err) {
                      return callback(err);
                    }
                    console.log(
                      "Produit inséré avec succès dans ma_table avec l'ID produit : ",
                      id_produit
                    );
                    callback();
                  }
                );
              }
            );
          },
          err => {
            if (err) {
              return connection.rollback(() => {
                console.error('Erreur lors du traitement des produits : ', err);
                reject(err);
              });
            }

            // Valider la transaction
            connection.commit(err => {
              if (err) {
                return connection.rollback(() => {
                  console.error(
                    'Erreur lors de la validation de la transaction : ',
                    err
                  );
                  reject(err);
                });
              }
              console.log('Transaction validée avec succès');
              resolve('success');
              connection.end();
            });
          }
        );
      });
    });
  });
}
function countQuantitePhys() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select p.id_produit , p.designation ,count(r.designation) as quantite_phys
    from produit p,reference r where
    p.id_produit=r.id_produit and r.existe=true
    group by p.id_produit , p.designation`;
    const values = [];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve(results);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}

function deleteRefs(numInventaire) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `update reference set existe=false where designation in (select reference from compter where num_inventaire=? and present=false)`;
    const values = [numInventaire];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve('success');
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getProductArticleForFiche(year, article) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select p.id_produit , p.designation ,count(r.designation) as quantite_phys,p.quantite ,GROUP_CONCAT(r.num_inventaire SEPARATOR ',') AS num_inventaires,
    COUNT(CASE WHEN YEAR(r.date_inscription) < ? THEN 1 END) as reste,
    COUNT(CASE WHEN YEAR(r.date_inscription) = ? THEN 1 END) as entree
    from produit p,reference r where
    p.id_produit=r.id_produit 
    and p.id_produit in
    (select id_produit from contient where id_article=?)
    group by p.id_produit , p.designation`;
    const values = [year, year, article];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve(results);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getProductArticleSortie(year, article) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);

    const query = `select p.id_produit,
    SUM(CASE WHEN YEAR(d.date_sortie) = ? THEN f.quantite_servie ELSE 0 END) AS sortie
    from produit p,fournir f,demande_fourniture d where
    p.id_produit=f.id_produit and d.num_demande=f.id_demande
    and p.id_produit in
    (select id_produit from contient where id_article=?)
    group by p.id_produit , p.designation`;
    const values = [year, article];
    connection.connect(err => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject('connexion erreur');
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject('request error');
          return;
        }
        resolve(results);
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
module.exports = {
  addInventaire,
  insertCompter,
  changeInvetaireStatus,
  getInventaires,
  getInventaire,
  getInventaireStatus,
  deleteInventaire,
  updateInventaire,
  deleteCompter,
  getProductFournisseur,
  avgProductValue,
  inscriptionDate,
  getInventaireYear,
  getInventaireProducts,
  insertLink,
  updateQuantite,
  countQuantitePhys,
  deleteRefs,
  getProductArticleForFiche,
  getProductArticleSortie,
  insertInvetaireLink,
};
