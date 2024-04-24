const mysql=require('mysql');
const async=require('async')
const connectionConfig = {
  host: 'bibznsnq8nf1q3j7r74o-mysql.services.clever-cloud.com',
  user: 'ucvk6cpbqavmyqnb',
  password: 'w7Xaq1AwW42V3jvOiTgb',
  database: 'bibznsnq8nf1q3j7r74o'
};
function addFourniture(email,dateDemande)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `insert into demande_fourniture (id_demandeur,date_demande) values (?,?)`;
    const values = [email,dateDemande];
  
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
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function insertFournir(numDemande, produits) {
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
                        connection.query('INSERT INTO fournir (id_demande, id_produit, quantite_demande) VALUES (?, ?, ?)', [numDemande, id_produit, produit.quantite], (err, result) => {
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
function updateAccordedQuantite(numDemande,produits)
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
                        connection.query('update fournir set quantite_accorde=? where id_demande=? and id_produit=?', [produit.quantite,numDemande, id_produit], (err, result) => {
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
function updateLivredQuantite(numDemande,produits)
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
                        connection.query('update fournir set quantite_servie=? where id_demande=? and id_produit=?', [produit.quantite,numDemande, id_produit], (err, result) => {
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
function changeDemandeStatNotif(numDemande,newStat,notif)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = `update demande_fourniture set etat=? , ${notif}=true where num_demande=?`;
        const values = [newStat,numDemande];
      
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
    function insertFournir(numDemande, produits) {
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
                            connection.query('INSERT INTO fournir (id_demande, id_produit, quantite_demande) VALUES (?, ?, ?)', [numDemande, id_produit, produit.quantite], (err, result) => {
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
function canDeleteFourniture(numDemande)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = `select etat from demande_fourniture where num_demande=?`
        const values = [numDemande];
      
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
            if(results[0].etat==="demande")
               resolve('can')
            reject('prohibited')
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      }); 
}
function deleteFourniture(numDemande)
{ 
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = `delete demande_fourniture where num_demande=?`
        const values = [numDemande];
      
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
             resolve('success')
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function getNewDemandes(role,etat,email,notif)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = `select num_demande,etat,id_demandeur,date_demande where ${notif}=true etat=? 
        ${role==="Consommateur"?"and id_demande=?":''}
        ${(etat==='en attente'||role==="Directeur")?`and id_demandeur in
        (select email from utilisateur where id_structure=
         (select id_structure from structure where id_resp=?))`:''}`
        const values = [etat];
        if(etat==='en attente') values.push(email)
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
             resolve(results)
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function getAllDemandes(etat,statement,email,role){
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        let query
        let values=[]
        if(role==="Consommateur")
        {
            query=`select num_demande,etat,date_demande from demande_fourniture where id_demandeur=?`
            values.push(email)
        }
        else{
         query = `select num_demande,etat,id_demandeur,date_demande from demande_fourniture where ${statement}
        ${(etat==='en attente'&&role==='Responsable directe')?`id_demandeur in
        (select email from utilisateur where id_structure=
         (select id_structure from structure where id_resp=?))`:''}`;
         values =[]
        if(etat==='en attente') values.push(email)
        }
        console.log({query})
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
             resolve(results)
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function updateDemandedQuantite(numDemande,produits)
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
                        connection.query('update fournir set quantite_demandee=? where id_demande=? and id_produit=?', [produit.quantite,numDemande, id_produit], (err, result) => {
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
function getDemandeStatus(numDemande)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = `select etat from demande_fourniture where num_demande=?`;
        const values =[numDemande]
        
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
             resolve(results[0].etat)
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function deleteProductsFournir(numDemande,produits)
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
                        connection.query('delete from fournir where id_demande=? and id_produit=?', [numDemande, id_produit], (err, result) => {
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
function readNotif(numDemande,notif)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = `update demande_fourniture set etat=? , ${notif}=false where num_demande=?`;
        const values = [numDemande];
      
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
            resolve('success');
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function insertLink(numDemande,link)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = `update demande_fourniture set link=? where num_demande=?`;
        const values = [link,numDemande];
      
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
            resolve('success');
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function insertDateSortie(numDemande,dateSortie)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = `update demande_fourniture set date_sortie=? where num_demande=?`;
        const values = [dateSortie,numDemande];
      
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
            resolve('success');
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function getDemandeProducts(numDemande)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
          
        const query = `select p.designation ,f.quantite_demande , f.quantite_servie from fournir f,produit p
                       where f.id_demande=? and p.id_produit=f.id_produit `;           
        connection.connect((err) => {
          if (err) {
            console.error('Erreur de connexion :', err);
            reject("connexion erreur");
            return;
          }
          
          connection.query(query,[numDemande],(error, results, fields) => {
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
function readAllNotif()
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = `update demande_fourniture set other_notif=false where other_notif=true`;
        
      
        connection.connect((err) => {
          if (err) {
            console.error('Erreur de connexion :', err);
            reject("connexion erreur");
            return;
          }
          
          connection.query(query, (error, results, fields) => {
            if (error) {
              console.error('Erreur lors de l\'exécution de la requête :', error);
              reject("request error");
              return;
            }
            resolve('success');
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function getDemande(numDemande,role,quantiteType)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = `select p.designation,p.seuil,${quantiteType} ${role!="Consommateur"?',p.seuil,p.quantite':""}
        from fournir f,produit p where p.id_produit=f.id_produit and f.id_demande=?`;
        const values =[numDemande]
        
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
             resolve(results)
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
module.exports={addFourniture,insertFournir,updateAccordedQuantite,changeDemandeStatNotif,updateLivredQuantite,
               deleteFourniture,canDeleteFourniture,getNewDemandes,getAllDemandes,updateDemandedQuantite,
            getDemandeStatus,deleteProductsFournir,readNotif,insertLink,
            getDemandeProducts,insertDateSortie,readAllNotif,getDemande}