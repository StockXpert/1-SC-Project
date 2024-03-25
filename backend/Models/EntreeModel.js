const mysql=require('mysql');
const async=require('async')
const connectionConfig = {
  host: 'sql11.freesqldatabase.com',
  user: 'sql11693152',
  password: 'GujpSNqWUm',
  database: 'sql11693152'
};
function insertBonCommande(fournisseur,id_article,type)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        
        const query = `insert into bon_de_commande
                      (date_commande,id_fournisseur,id_article,type) 
                       select CURRENT_TIMESTAMP,id_fournisseur,?,? from fournisseur where raison_sociale=?`;
        const values = [id_article,type,fournisseur];
      
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
            resolve(results.link);
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
                      connection.query('INSERT INTO commande (id_commande, id_produit, quantite, prix_unitaire) VALUES (?, ?, ?, ?)', [n_commande, id_produit, produit.quantite, produit.prix_unitaire], (err, result) => {
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
module.exports={insertBonCommande,insertLink,getLink,insertCommander}