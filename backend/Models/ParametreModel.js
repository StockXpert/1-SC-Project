const mysql=require('mysql');
const connectionConfig = {
  host: 'bibznsnq8nf1q3j7r74o-mysql.services.clever-cloud.com',
  user: 'ucvk6cpbqavmyqnb',
  password: 'w7Xaq1AwW42V3jvOiTgb',
  database: 'bibznsnq8nf1q3j7r74o'
};
function getParametres()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='select * from parametre ';
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
        resolve(results[0]);
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}
function updateCompletName(nomComplet)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='update parametre set nom_complet=? ';
    const values=[nomComplet]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error,results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve('');
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}
function updateName(nom)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='update parametre set nom_entreprise=? ';
    const values=[nom]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error,results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve('');
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}
function updateAbstractName(Abnom)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='update parametre set nom_abrege=? ';
    const values=[Abnom]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error,results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve('');
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}
function updateLogo(link)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
          
        const query ='update parametre set logo_application=? ';
        const values=[link]
        connection.connect((err) => {
          if (err) {
            console.error('Erreur de connexion :', err);
            reject("connexion erreur");
            return;
          }
          
          connection.query(query,values,(error,results, fields) => {
            if (error) {
              console.error('Erreur lors de l\'exécution de la requête :', error);
              reject("request error");
              return;
            }
            resolve('');
          });
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });}) 
}
function updateHeader(link)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
          
        const query ='update parametre set en_tete_document=? ';
        const values=[link]
        connection.connect((err) => {
          if (err) {
            console.error('Erreur de connexion :', err);
            reject("connexion erreur");
            return;
          }
          
          connection.query(query,values,(error,results, fields) => {
            if (error) {
              console.error('Erreur lors de l\'exécution de la requête :', error);
              reject("request error");
              return;
            }
            resolve('');
          });
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });}) 
}
function updateAppName(nomApp)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='update parametre set nom_application=? ';
    const values=[nomApp]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error,results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve('');
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}
function updateAdresse(adresse)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='update parametre set adresse=? ';
    const values=[adresse]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error,results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve('');
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}
function updateGestionCode(gCode)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='update parametre set code_gestion=? ';
    const values=[gCode]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error,results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve('');
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}
function updateTelFax(TF)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='update parametre set tel_fax=? ';
    const values=[TF]
    connection.connect((err) => {
      if (err) {
        console.error('Erreur de connexion :', err);
        reject("connexion erreur");
        return;
      }
      
      connection.query(query,values,(error,results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'exécution de la requête :', error);
          reject("request error");
          return;
        }
        resolve('');
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}
module.exports={getParametres,updateAbstractName,updateAppName,updateName,updateCompletName,
    updateHeader,updateLogo,updateTelFax,updateAdresse,updateGestionCode}