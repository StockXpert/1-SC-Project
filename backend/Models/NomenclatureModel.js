const mysql=require('mysql');
const connectionConfig = {
  host: 'sql11.freesqldatabase.com',
  user: 'sql11693152',
  password: 'GujpSNqWUm',
  database: 'sql11693152'
};
function getChapterId(chapitre)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        console.log({chapitre})
        const query = 'select num_chap from chapitre where designation=?';
        const values = [chapitre];
      
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
            console.log({results})
            resolve(results[0].num_chap);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function addArticle(numArt,chapitreId,designation)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'insert into article (num_article,designation,num_chap) values (?,?,?)';
        const values = [numArt,designation,chapitreId];
      
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
function addProduct(quantite,designation,description)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'insert into produit (designation,description,quantite) values (?,?,?)';
        const values = [designation,description,quantite];
      
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
function getArticleId(article)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'select num_article from article where designation=?';
        const values = [article];
      
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
            
            resolve(results[0].num_article);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function getProductId(produit)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'select id_produit from produit where designation=?';
        const values = [produit];
      
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
            
            resolve(results[0].id_produit);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function addArticleProduct(articleId,productId)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'insert into contient (id_article,id_produit) values (?,?)';
        const values = [articleId,productId];
      
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
function deleteArticle(articleId)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'delete from article where num_article=?';
        const values = [articleId];
      
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
function deleteArticleFromC(articleId)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'delete from contient where num_article=?';
        const values = [articleId];
      
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
function deleteProduct(productId)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'delete from produit where id_produit=?';
        const values = [productId];
      
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
function deleteProductFromC(productId)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'delete from contient where id_produit=?';
        const values = [productId];
      
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
function insertFournisseur(raisonSocial,adresse,tel,fax,numRegistre,rib,rip,nif,nis)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'insert into fournisseur (raison_sociale,adresse,telephone,fax,num_registre,rib,rip,nif,nis) values (?,?,?,?,?,?,?,?,?)';
    const values = [raisonSocial,adresse,tel,fax,numRegistre,rib,rip,nif,nis];
  
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
function deleteFournisseur(raisonSociale)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'delete from fournisseur where raison_sociale=?';
    const values = [raisonSociale];
  
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
function getFournisseurs()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'select raison_sociale,adresse,telephone,fax,num_registre,rib,rip,nif,nis from fournisseur';
    
  
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
        
        resolve(results);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getProducts()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'select designation,quantite,description from produit ';
    
  
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
        
        resolve(results);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getChapters()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'select designation from chapitre ';
    
  
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
        
        resolve(results);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getArticles()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'select designation from article ';
    
  
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
        
        resolve(results);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getFournisseur(raisonSociale) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'SELECT * FROM fournisseur WHERE raison_sociale = ?';
    const values = [raisonSociale];

    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }

      connection.query(query, values, (error, results, fields) => {
        connection.end(); // Move connection closure here to ensure it's executed after query execution
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }

        resolve(results);
      });
    });
    
    // Handle connection errors outside of the connect callback
    connection.on('error', (err) => {
      console.error('Erreur de connexion :', err);
      reject("connexion erreur");
    });
  });
}
module.exports={getChapterId,addArticle,addProduct,getArticleId,getProductId,addArticleProduct,
                deleteArticle,deleteArticleFromC,deleteProduct,deleteProductFromC,
                insertFournisseur,deleteFournisseur,getFournisseurs,getProducts
                ,getArticles,getChapters,getFournisseur}