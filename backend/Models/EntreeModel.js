const mysql=require('mysql');
const async=require('async')
const connectionConfig = {
  host: 'bibznsnq8nf1q3j7r74o-mysql.services.clever-cloud.com',
  user: 'ucvk6cpbqavmyqnb',
  password: 'w7Xaq1AwW42V3jvOiTgb',
  database: 'bibznsnq8nf1q3j7r74o'
};
function getBonCommande(numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select b.type,a.designation as objet,b.date_commande from bon_de_commande b,article a
     where num_commande=? and b.id_article=a.num_article`;
    const values = [numCommande];
  
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve(results[0]);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getBonCommandeFournisseur(numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select raison_sociale from fournisseur where id_fournisseur in (
      select id_fournisseur from bon_de_commande where num_commande=?
    )`;
    const values = [numCommande];
  
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve(results[0].raison_sociale);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function insertBonCommande(fournisseur, id_article, type, date) {
  return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(connectionConfig);
      
      const query = `INSERT INTO bon_de_commande (date_ajout, id_fournisseur, id_article, type, date_commande) 
      SELECT NOW(), id_fournisseur, ?, ?, ? 
      FROM fournisseur 
      WHERE raison_sociale = ?;
      `;
      const values = [id_article, type,date,fournisseur];
      connection.connect((err) => {
          if (err) {
              console.error('Erreur de connexion :', err);
              reject("connexion erreur");
              return;
          }
        
          connection.query(query, values, (error, results, fields) => {
              if (error) {
                  console.error('Erreur lors de l\'exécution de la requête :', error);
                  reject("request error");
                  return;
              }
              resolve(results.insertId);
              connection.end(); // Fermer la connexion après l'exécution de la requête
          });
      });
  });
}
function insertBonReception(numCommande, date,livraisonLink,factureLink,numFacture,numLivraison) {
  return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(connectionConfig);
      
      const query = `INSERT INTO bon_de_reception (date_ajout, num_commande,link_livraison,
         link_facture, num_facture,num_livraison,date_reception) 
      values (now(),?,?,?,?,?,?)
      `;
      const values = [numCommande,livraisonLink,factureLink,numFacture,numLivraison,date];
      connection.connect((err) => {
          if (err) {
              console.error('Erreur de connexion :', err);
              reject("connexion erreur");
              return;
          }
        
          connection.query(query, values, (error, results, fields) => {
              if (error) {
                  console.error('Erreur lors de l\'exécution de la requête :', error);
                  reject("request error");
                  return;
              }
              resolve(results.insertId);
              connection.end(); // Fermer la connexion après l'exécution de la requête
          });
      });
  });
}
function insertLink(link,n_commande)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = "update bon_de_commande set link=? where num_commande=?";
        const values = [link,n_commande];
      
        connection.connect((err) => {
          if (err) {
            console.error('Erreur de connexion :', err);
            reject("connexion erreur");
            return;
          }
          
          connection.query(query, values, (error, results, fields) => {
            if (error) {
              console.error('Erreur lors de l\'exécution de la requête :', error);
              reject("request error");
              return;
            }
            resolve("success");
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function insertReceptionLink(link,numReception)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = "update bon_de_reception set link=? where num_bon=?";
        const values = [link,numReception];
      
        connection.connect((err) => {
          if (err) {
            console.error('Erreur de connexion :', err);
            reject("connexion erreur");
            return;
          }
          
          connection.query(query, values, (error, results, fields) => {
            if (error) {
              console.error('Erreur lors de l\'exécution de la requête :', error);
              reject("request error");
              return;
            }
            resolve("success");
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function getLink(n_commande)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        console.log({chapitre})
        const query = "select link from bon_de_commande where n_commande=?";
        const values = [n_commande];
      
        connection.connect((err) => {
          if (err) {
            console.error('Erreur de connexion :', err);
            reject("connexion erreur");
            return;
          }
          
          connection.query(query, values, (error, results, fields) => {
            if (error) {
              console.error('Erreur lors de l\'exécution de la requête :', error);
              reject("request error");
              return;
            }
            resolve(results[0].link);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function insertCommander(n_commande, produits) {
  return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(connectionConfig);
      connection.connect((err) => {
          if (err) {
              console.error('Erreur de connexion à la base de données : ', err);
              reject(err);
              return;
          }
          console.log('Connecté à la base de données MySQL');
          
          // Commencer la transaction
          connection.beginTransaction((err) => {
              if (err) {
                  console.error('Erreur lors du démarrage de la transaction : ', err);
                  reject(err);
                  return;
              }
              console.log("Début de la transaction");

              // Utiliser une boucle asynchrone pour traiter chaque produit
              async.eachSeries(produits, (produit, callback) => {
                  // Exécuter la requête pour récupérer l'ID produit à partir de la désignation
                  console.log({produit})
                  connection.query('SELECT id_produit FROM produit WHERE designation = ?', [produit.designation], (err, rows) => {
                      if (err) {
                          return callback(err);
                      }
                      if (rows.length === 0) {
                          return callback("Produit non trouvé  " + produit.designation);
                      }
                      const id_produit = rows[0].id_produit;

                      // Insérer les données dans ma_table avec l'ID produit récupéré
                      connection.query('INSERT INTO commande (id_commande, id_produit, quantite, prix_unitaire) VALUES (?, ?, ?, ?)', [n_commande, id_produit, produit.quantite, produit.prixUnitaire], (err, result) => {
                          if (err) {
                              return callback(err);
                          }
                          console.log('Produit inséré avec succès dans ma_table avec l\'ID produit : ', id_produit);
                          callback();
                      });
                  });
              }, (err) => {
                  if (err) {
                      return connection.rollback(() => {
                          console.error('Erreur lors du traitement des produits : ', err);
                          reject(err);
                      });
                  }

                  // Valider la transaction
                  connection.commit((err) => {
                      if (err) {
                          return connection.rollback(() => {
                              console.error('Erreur lors de la validation de la transaction : ', err);
                              reject(err);
                          });
                      }
                      console.log("Transaction validée avec succès");
                      resolve("success");
                      connection.end();
                  });
              });
          });
      });
  });
}
function insertLivre(numReception, produits) {
  return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(connectionConfig);
      connection.connect((err) => {
          if (err) {
              console.error('Erreur de connexion à la base de données : ', err);
              reject(err);
              return;
          }
          console.log('Connecté à la base de données MySQL');
          
          // Commencer la transaction
          connection.beginTransaction((err) => {
              if (err) {
                  console.error('Erreur lors du démarrage de la transaction : ', err);
                  reject(err);
                  return;
              }
              console.log("Début de la transaction");

              // Utiliser une boucle asynchrone pour traiter chaque produit
              async.eachSeries(produits, (produit, callback) => {
                  // Exécuter la requête pour récupérer l'ID produit à partir de la désignation
                  console.log({produit})
                  connection.query('SELECT id_produit FROM produit WHERE designation = ?', [produit.designation], (err, rows) => {
                      if (err) {
                          return callback(err);
                      }
                      if (rows.length === 0) {
                          return callback("Produit non trouvé  " + produit.designation);
                      }
                      const id_produit = rows[0].id_produit;

                      // Insérer les données dans ma_table avec l'ID produit récupéré
                      connection.query('INSERT INTO livre (num_bon, id_produit, quantite) VALUES (?, ?, ?)', [numReception, id_produit, produit.quantite], (err, result) => {
                          if (err) {
                              return callback(err);
                          }
                          console.log('Produit inséré avec succès dans ma_table avec l\'ID produit : ', id_produit);
                          callback();
                      });
                  });
              }, (err) => {
                  if (err) {
                      return connection.rollback(() => {
                          console.error('Erreur lors du traitement des produits : ', err);
                          reject(err);
                      });
                  }

                  // Valider la transaction
                  connection.commit((err) => {
                      if (err) {
                          return connection.rollback(() => {
                              console.error('Erreur lors de la validation de la transaction : ', err);
                              reject(err);
                          });
                      }
                      console.log("Transaction validée avec succès");
                      resolve("success");
                      connection.end();
                  });
              });
          });
      });
  });
}
function canDeleteCommande(numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select num_commande from bon_de_commande where num_commande=? and date_ajout>= NOW() - INTERVAL 1 DAY`;
    const values=[numCommande]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        if(results.length===0)
          reject('erreur');
        else 
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function deleteCommande(numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `delete from commande where id_commande=?`;
    const values=[numCommande]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function deleteBonCommande(numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `delete from bon_de_commande where num_commande=?`;
    const values=[numCommande]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function cancelCommande(numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `UPDATE bon_de_commande 
    SET etat = 'annuler' 
    WHERE num_commande = ?;`;
    console.log({numCommande})
    const values=[numCommande]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function getCommandes()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select b.num_commande,b.type,b.link,b.date_commande,b.etat,a.designation as objet,
                   f.raison_sociale as fournisseur from bon_de_commande b,fournisseur f,
                   article a where a.num_article=b.id_article and f.id_fournisseur=b.id_fournisseur `;
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve(results);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function getCommande(numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select b.num_commande,b.type,b.link,DATE_FORMAT(b.date_commande, '%Y-%m-%d') as date_commande,b.etat,a.designation as objet,
                   f.raison_sociale as fournisseur from bon_de_commande b,fournisseur f,
                   article a where a.num_article=b.id_article and f.id_fournisseur=b.id_fournisseur and b.num_commande=? `;           
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,[numCommande],(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve(results[0]);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function deleteProduitLivre(numReception,idProduit)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `delete from livre where num_bon=? and id_produit=?`;
    const values=[numReception,idProduit]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function deleteLivre(numReception)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `delete from livre where num_bon=?`;
    const values=[numReception]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function deleteReception(numReception)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `delete from bon_de_reception where num_bon=?`;
    const values=[numReception]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function updateQuantiteCommande(quantite,numCommande,idProduit)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    quantite=parseInt(quantite)
    console.log({quantite,numCommande,idProduit})
    const query = `update commande set quantite_recu=quantite_recu + ? where id_commande=? and id_produit=?`;
    const values=[quantite,numCommande,idProduit]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}

function updateQuantite(quantite,idProduit)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    quantite=parseInt(quantite)
    const query = `update produit set quantite=quantite+? where id_produit=?`;
    const values=[quantite,idProduit]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function checkValidity(numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `SELECT id_commande FROM commande WHERE id_commande = ? AND quantite != quantite_recu `;
    const values=[numCommande]
    console.log({numCommande})
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        console.log(results)
        if(results.length===0)
        resolve("valid");
        else resolve('no valid')
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function changeStatus(status,numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `update bon_de_commande set etat=? where num_commande=?`;
    const values=[status,numCommande]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function updateBonCommande(fournisseur,objet,date,numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `update bon_de_commande set ${fournisseur?'id_fournisseur=(select id_fournisseur from fournisseur where raison_sociale=?)':''} 
          ${(objet&&fournisseur?',':'')} ${objet?'id_article=(select id_article from article where designation=?)':''} 
          ${((objet&&date)||(fournisseur&&date))?',':''} ${date?'date_commande=?':''} where num_commande=?`;
    const values=[]
    if(fournisseur) values.push(fournisseur);
    if(objet) values.push(objet)
    if(date) values.push(date)
    values.push(numCommande)
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function deleteCommander(n_commande, produits) {
  return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(connectionConfig);
      connection.connect((err) => {
          if (err) {
              console.error('Erreur de connexion à la base de données : ', err);
              reject(err);
              return;
          }
          console.log('Connecté à la base de données MySQL');
          
          // Commencer la transaction
          connection.beginTransaction((err) => {
              if (err) {
                  console.error('Erreur lors du démarrage de la transaction : ', err);
                  reject(err);
                  return;
              }
              console.log("Début de la transaction");

              // Utiliser une boucle asynchrone pour traiter chaque produit
              async.eachSeries(produits, (produit, callback) => {
                  // Exécuter la requête pour récupérer l'ID produit à partir de la désignation
                  console.log({produit})
                  connection.query('SELECT id_produit FROM produit WHERE designation = ?', [produit.designation], (err, rows) => {
                      if (err) {
                          return callback(err);
                      }
                      if (rows.length === 0) {
                          return callback("Produit non trouvé  " + produit.designation);
                      }
                      const id_produit = rows[0].id_produit;

                      // Supprimer les données de la commande avec l'ID produit récupéré
                      connection.query('DELETE FROM commande WHERE id_commande = ? AND id_produit = ?', [n_commande, id_produit], (err, result) => {
                          if (err) {
                              return callback(err);
                          }
                          console.log('Produit supprimé avec succès de ma_table avec l\'ID produit : ', id_produit);
                          callback();
                      });
                  });
              }, (err) => {
                  if (err) {
                      return connection.rollback(() => {
                          console.error('Erreur lors du traitement des produits : ', err);
                          reject(err);
                      });
                  }

                  // Valider la transaction
                  connection.commit((err) => {
                      if (err) {
                          return connection.rollback(() => {
                              console.error('Erreur lors de la validation de la transaction : ', err);
                              reject(err);
                          });
                      }
                      console.log("Transaction validée avec succès");
                      resolve("success");
                      connection.end();
                  });
              });
          });
      });
  });
}
function getBonReception(numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select num_bon,date_reception,num_facture,num_livraison,link_livraison,link_facture,link from bon_de_reception
                   where num_commande=? `;           
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,[numCommande],(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve(results);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function getBonReceptionProducts(numReception)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select p.designation ,l.quantite from livre l,produit p
                   where l.num_bon=? and p.id_produit=l.id_produit `;           
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,[numReception],(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve(results);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function getCommandeProducts(numCommande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select p.designation ,c.quantite ,c.quantite_recu, c.prix_unitaire from commande c,produit p
                   where c.id_commande=? and p.id_produit=c.id_produit `;           
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,[numCommande],(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve(results);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function updateReception(numReception,numLivraison,numFacture,dateReception)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `update bon_de_reception set ${numLivraison?'num_livraison=?':''}
                  ${(numLivraison&&numFacture)?',':''} ${numFacture?'num_facture=?':''} 
                  ${((numLivraison&&dateReception)||(numFacture&&dateReception))?',':''}
                  ${dateReception?'date_reception=?':''}
                  where num_bon=?` ;
    const values=[]
    if(numLivraison) values.push(numLivraison);
    if(numFacture) values.push(numFacture);
    if(dateReception) values.push(dateReception)
    values.push(numReception)
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
module.exports={insertBonCommande,insertLink,getLink,insertCommander,canDeleteCommande,
                deleteBonCommande,deleteCommande,cancelCommande,getCommandes
                ,updateQuantiteCommande,updateQuantite,checkValidity,changeStatus,updateBonCommande,
                deleteCommander,insertBonReception,insertLivre,
                insertBonReception,getCommande,
                getBonReception,getBonReceptionProducts,getCommandeProducts,
                deleteLivre,deleteReception,updateReception,deleteProduitLivre,insertReceptionLink,
                getBonCommandeFournisseur,getBonCommande}