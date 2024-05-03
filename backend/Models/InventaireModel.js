const mysql=require('mysql');
const connectionConfig = {
  host: 'bibznsnq8nf1q3j7r74o-mysql.services.clever-cloud.com',
  user: 'ucvk6cpbqavmyqnb',
  password: 'w7Xaq1AwW42V3jvOiTgb',
  database: 'bibznsnq8nf1q3j7r74o'
};
function addInventaire(numInventaire,dateInventaire)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
          
        const query = `INSERT INTO inventaire (num_inventaire,date_inventaire) (?,?)`;
        const values=[numInventaire,dateInventaire];
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
function insertCompter(numInventaire, produits) {
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
                        connection.query('INSERT INTO compter (num_inventaire, id_produit, quantite_phys,) VALUES (?, ?, ?)', [numInventaire, id_produit, produit.quantitePhys], (err, result) => {
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
    });}
function validInvetaireStatus(numInventaire)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
          
        const query = `update inventaire set etat='valid' where num_inventaire=?`;
        const values=[numInventaire];
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
function getInvetaires()
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
          
        const query = `select * from inventaire`;
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
function getInventaire(numInventaire)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
          
        const query = `select c.quantite_phys,p.quantite 
        from compter c,produit p where p.id_produit=c.id_produit and c.num_inventaire=?`;
        const values=[numInventaire]
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
            resolve(results);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });})
}
function getInventaireStatus(numInventaire)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
          
        const query = `select etat from inventaire where num_inventaire=?`;
        const values=[numInventaire]
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
            resolve(results[0].num_inventaire);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });})
}
function deleteInventaire(numInventaire)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
          
        const query = `delete from inventaire where num_inventaire=?`;
        const values=[numInventaire];
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
function updateInventaire(numInventaire,produits)
{ 
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
                        connection.query('update compter set quantite_phys=? where id_produit=? and num_inventaire=?', [produit.quantitePhys, id_produit,numInventaire], (err, result) => {
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
module.exports={addInventaire,insertCompter,validInvetaireStatus,getInvetaires,getInventaire,getInventaireStatus
,deleteInventaire,updateInventaire}