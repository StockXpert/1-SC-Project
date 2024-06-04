const mysql=require('mysql');
const async=require('async')
const connectionConfig = {
  host: 'bibznsnq8nf1q3j7r74o-mysql.services.clever-cloud.com',
  user: 'ucvk6cpbqavmyqnb',
  password: 'w7Xaq1AwW42V3jvOiTgb',
  database: 'bibznsnq8nf1q3j7r74o'
};
function isUsedchapter(chapitre)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select num_chap from chapitre where designation=?
    and num_chap in
    (select num_chap from article)`;
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
        console.log(results)
        if(results.length==0)
           resolve('')
        else reject('prohibited')  
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function isUsedArticle(article)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select num_article from article where designation=?
    and (num_article in
      (select id_article from bon_de_commande) or num_article in
      (select id_article from contient) )`;
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
        if(results.length==0)
           resolve('')
        else reject('prohibited')  
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function isUsedProduct(produit)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select id_produit from produit where designation=?
    and (id_produit in
      (select id_produit from commande) or id_produit in
      (select id_produit from livre) )`;
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
        if(results.length==0)
           resolve('')
        else reject('prohibited')  
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function updateSeuil(produit,seuil)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `update produit set seuil=? where designation=?`;
    const values = [seuil,produit];

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
        
           resolve('')
        
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function isUsedFournisseur(fournisseur)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select id_fournisseur from fournisseur where raison_sociale=?
    and id_fournisseur in
      (select id_fournisseur from bon_de_commande)`;
    const values = [fournisseur];

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
        console.log({length:results.length})
        if(results.length==0)
           resolve('')
        else reject('prohibited')  
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function updateFournisseur(adresse, telephone, fax, numRegistre, ribRip, nif, nis, raisonSociale) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `
    UPDATE fournisseur SET 
    ${adresse ? 'adresse=?' : ''}${adresse && (telephone || fax || numRegistre || ribRip || nif || nis) ? ', ' : ''}
    ${telephone ? 'telephone=?' : ''}${telephone && (fax || numRegistre || ribRip || nif || nis) ? ', ' : ''}
    ${fax ? 'fax=?' : ''}${fax && (numRegistre || ribRip || nif || nis) ? ', ' : ''}
    ${numRegistre ? 'num_registre=?' : ''}${numRegistre && (ribRip || nif || nis) ? ', ' : ''}
    ${ribRip ? 'rib_ou_rip=?' : ''}${ribRip && ( nif || nis) ? ', ' : ''}
    ${nif ? 'nif=?' : ''}${nif && nis ? ', ' : ''}
    ${nis ? 'nis=?' : ''}
    WHERE raison_sociale=?`;
    const values = [];
    
    if (adresse) values.push(adresse);
    if (telephone) values.push(telephone);
    if (fax) values.push(fax);
    if (numRegistre) values.push(numRegistre);
    if (ribRip) values.push(ribRip);
    if (nif) values.push(nif);
    if (nis) values.push(nis);
    values.push(raisonSociale);

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
        connection.end(); // Fermer la connexion après l'exécution de la requête
      });
    });
  }); 
}
function deleteChapter(designation)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    
    const query = 'delete from chapitre where designation=?';
    const values = [designation];
  
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
        resolve('success');
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function insertChapter(numChap,designation)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'insert into chapitre (num_chap,designation,date_ajout) values (?,?,NOW()) ';
    const values = [numChap,designation];
  
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
        resolve('success');
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function canDelete(designation,table)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select designation from ${table} where designation=? and date_ajout>= NOW() - INTERVAL 1 DAY`;
    const values=[designation]
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
function updateChapter(oldDesignation,newDesignation)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'update chapitre set designation=? where designation=?';
    const values = [newDesignation,oldDesignation];
  
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
            if(results[0].num_chap)
            resolve(results[0].num_chap);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function updateArticle(oldDesignation,newDesignation,chapitre,tva)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `UPDATE article
    SET 
        ${newDesignation ? 'designation=?' : ''} 
        ${(newDesignation && chapitre) ? ',' : ''} 
        ${chapitre ? 'num_chap=(SELECT num_chap FROM chapitre WHERE designation=?)' : ''} 
        ${(tva ? (newDesignation || chapitre ? ',' : '') + 'tva=?' : '')}
    WHERE 
        designation=?;`
    let values=[];
    if(newDesignation) values.push(newDesignation);
    if(chapitre) values.push(chapitre);
    if(tva) values.push(tva)
    values.push(oldDesignation)
  
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
function addArticle(numArt,chapitreId,designation,tva)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'insert into article (num_article,designation,num_chap,date_ajout,tva) values (?,?,?,NOW(),?)';
        const values = [numArt,designation,chapitreId,tva];
        
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
function addProduct(quantite,designation,description,seuil,consommable)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'insert into produit (designation,description,quantite,date_ajout,seuil,consommable) values (?,?,?,now(),?,?)';
        const values = [designation,description,quantite,seuil,consommable];
        if(quantite===null) quantite=0;
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
function getArticleIdTva(article)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query = 'select num_article,tva from article where designation=?';
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
            
            resolve(results[0]);
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
        const query = 'delete from contient where id_article=?';
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
function insertFournisseur(raisonSocial,adresse,tel,fax,numRegistre,ribRip,nif,nis)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'insert into fournisseur (raison_sociale,adresse,telephone,fax,num_registre,rib_ou_rip,nif,nis,date_ajout) values (?,?,?,?,?,?,?,?,NOW())';
    const values = [raisonSocial,adresse,tel,fax,numRegistre,ribRip,nif,nis];
  
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
function canDeletefourn(raisonSocial)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select raison_sociale from fournisseur where raison_sociale=? and date_ajout>= NOW() - INTERVAL 1 DAY`;
    const values=[raisonSocial]
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
    const query = 'select raison_sociale,adresse,telephone,fax,num_registre,rib_ou_rip,nif,nis from fournisseur';
    
  
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
    const query = `select p.designation,p.quantite,p.seuil,p.description,a.designation as article from produit p ,contient c,article a
                  where p.id_produit=c.id_produit and a.num_article=c.id_article
                   `;
    
  
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
    const query = 'select designation,num_chap from chapitre ';
    
  
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
    const query = `select a.designation,a.tva,a.num_article,c.designation as chapitre,c.num_chap from article a ,chapitre c
    where c.num_chap=a.num_chap`;
    
  
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

        resolve(results[0]);
      });
    });
    
    // Handle connection errors outside of the connect callback
    connection.on('error', (err) => {
      console.error('Erreur de connexion :', err);
      reject("connexion erreur");
    });
  });
}
function updateRaisonSociale(newR,oldR)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'update fournisseur set raison_sociale=? where raison_sociale=?';
    const values = [newR,oldR];
  
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
function updateInventaire(produits) {
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
                
                  // Insérer les données dans ma_table avec l'ID produit fourni
                  
                  connection.query(`update reference set num_inventaire=?, date_inventaire=? where designation=?`, [produit.numInventaire, produit.datePrise, produit.reference], (err, result) => {
                      if (err) {
                          return callback(err);
                      }
                      console.log('Produit inséré avec succès dans ma_table avec l\'ID produit : ', produit.id_produit);
                      callback();
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
function getRefs(produit)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select p.designation as produit,r.designation as reference ,r.num_inventaire,r.date_inventaire,p.consommable ,a.designation as article, c.designation as chapitre
    from reference r ,produit p ,chapitre c,article a,contient n
    where p.id_produit=r.id_produit and r.existe=true ${produit?'and p.designation=?':''} 
    and a.num_article=n.id_article and a.num_chap=c.num_chap and n.id_produit=p.id_produit `;
    let values=[];
    if(produit)values.push(produit)
  
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
    });
  });
}
module.exports={getChapterId,addArticle,addProduct,getArticleIdTva,getProductId,addArticleProduct,
                deleteArticle,deleteArticleFromC,deleteProduct,deleteProductFromC,
                insertFournisseur,deleteFournisseur,getFournisseurs,getProducts
                ,getArticles,getChapters,getFournisseur,insertChapter,updateChapter,canDelete
              ,deleteChapter,updateArticle,canDeletefourn,updateFournisseur,updateRaisonSociale,
               isUsedArticle,isUsedFournisseur,isUsedProduct,isUsedchapter,getRefs,updateInventaire,updateSeuil}