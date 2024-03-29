const mysql=require('mysql');
const connectionConfig = {
  host: 'sql11.freemysqlhosting.net',
  user: 'sql11691251',
  password: 'QjdjqXx86J',
  database: 'sql11691251'
};
function insertUser(email,role, password) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = 'INSERT INTO utilisateur (email, role, mot_de_passe) VALUES (?, ?, ?)';
    const values = [email,  role, password];
  
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
        
        resolve("utilisateur insere");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
// Fonction pour vérifier si un nom d'utilisateur est disponible
function verifyUser(email) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    
    const query = 'SELECT email FROM utilisateur WHERE email = ?';
    const values = [email];
    
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
        
        if (results.length === 0) {
          resolve("email available");
        } else {
          resolve("email unavailable");
        }
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getPassword(email)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    
    const query = 'SELECT mot_de_passe,role FROM utilisateur WHERE email= ? ';
    const values = [email];
    
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
        let role=results[0].role;
        let password=results[0].mot_de_passe;
        
        resolve({role,password})
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getUsers()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    
    const query = 'SELECT email,role FROM utilisateur';
    
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
    });
  }); 
}
function getUser(email)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    
    const query = 'SELECT email,role FROM utilisateur where email = ?';
    const values=[email]
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
function changePassword(email,newPassword)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    
    const query = 'update utilisateur set mot_de_passe=? where email=?';
    const values=[newPassword,email]
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
    });
  }); 
}
function updateInformations(email,nom,prenom,date_naissance,type,structureId,table)
{
  console.log({table})
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    
    const query = `update ${table} set 
    ${nom ? 'nom=?' : ''}
    ${(prenom && nom) ? ', ' : ''}
    ${prenom ? 'prenom=?' : ''}
    ${((prenom && date_naissance) || (date_naissance && nom)) ? ', ' : ''}
    ${date_naissance ? 'date_naissance=?' : ''}
    ${(date_naissance && type) || ((nom || prenom) && type) ? ', ' : ''}
    ${type ? 'type=?' : ''}
    ${(type && structureId) || ((nom || prenom || date_naissance) && structureId) ? ', ' : ''}
    ${structureId ? 'structure_id=?' : ''}
    where email=?`;

    const values=[];
    console.log(query)
    if(nom) values.push(nom);
    if(prenom) values.push(prenom);
    if(date_naissance) values.push(date_naissance);
    if(email) values.push(email);
    if(type) values.push(type);
    if(structureId) values.push(structureId);
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
    });
  }); 
}
function deletePerson(email,table)
{
  return new Promise((resolve, reject) => {
  const connection = mysql.createConnection(connectionConfig);
    
  const query = `delete  from ${table} where email=?`;
  const values=[email]
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
function getStructurId(structure)
{
  return new Promise((resolve, reject) => {
  const connection = mysql.createConnection(connectionConfig);
    
  const query = 'select id_structure from structure where designation=?';
  const values=[structure]
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
      resolve(results[0].id_structure);
    });
    
    connection.end(); // Fermer la connexion après l'exécution de la requête
  });}) 
}
function createConsommateur(email,nom,prenom,date_naissance,structureId,type)
{
  return new Promise((resolve, reject) => {
  const connection = mysql.createConnection(connectionConfig);
    
  const query = 'insert into consommateur (email,nom,prenom,date_naissance,id_structure,type) values (?,?,?,?,?,?)';
  const values=[email,nom,prenom,date_naissance,structureId,type];
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
function addStructure(designation,email)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `INSERT INTO structure (designation, id_resp) 
    SELECT ?, id_resp FROM responsable WHERE email=?`;
    const values=[designation,email];
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
  function afficherConsommateurs()
  {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(connectionConfig);
        
      const query =   `SELECT C.email, C.prenom, C.nom, S.designation As structure, C.date_naissance, C.type 
      FROM consommateur C
      INNER JOIN structure S ON S.id_structure = C.id_structure`;
     
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
  function rattacher(structureId,email)
  {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(connectionConfig);
        
      const query ='update consommateur set id_structure=? where email=?';
      const values=[structureId,email];
     
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
function responsable(designation,consommateurId)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='update structure set id_consommateur=? where designation=?';
    const values=[consommateurId,designation];
   
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
function getconsommateurId(email)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = 'select id_consommateur from consommateur where email=?';
    const values=[email];
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
        resolve(results[0].id_consommateur);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}
function getStructures()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = 'select designation from structure ';
   
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
function addResponsable(email,nom,prenom,date_naissance)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='insert into responsable (email,nom,prenom,date_naissance) values(?,?,?,?)';
    const values=[email,nom,prenom,date_naissance];
   
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
function showResp()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='select nom,prenom,date_naissance from responsable';
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
module.exports={insertUser,verifyUser,getPassword,getUsers,getUser,changePassword,
                updateInformations,deletePerson,getStructurId,createConsommateur,addStructure
                ,afficherConsommateurs,responsable,getconsommateurId,getStructures,
                 addResponsable,showResp};






















