const mysql=require('mysql');
const connectionConfig = {
  host: 'bibznsnq8nf1q3j7r74o-mysql.services.clever-cloud.com',
  user: 'ucvk6cpbqavmyqnb',
  password: 'w7Xaq1AwW42V3jvOiTgb',
  database: 'bibznsnq8nf1q3j7r74o'
};
function isResponsable(email)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select id_structure from structure where id_resp=?`;
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
        if(results.length==0)
           resolve('')
        else reject('prohibited')  
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function HaveConsumers(structure)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select email from utilisateur where id_structure in
    (select id_structure from structure where designation=?)`;
    const values = [structure];

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
function isUsedRole(role)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select email from utilisateur where id_role in
    (select id_role from role where designation=?)`;
    const values = [role];

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
function getRolePermissons(role)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = `select D.designation from role R , role_droit P ,droit_acces D where R.designation=?
                    and R.id_role=P.id_role and P.id_droit=D.id_droit`;
    const values = [role];

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
        resolve(results); // Récupérer le rôle depuis le premier résultat
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function getRole(role) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query = "SELECT id_role FROM role WHERE designation = ?";
    const values = [role];

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
        resolve(results[0].id_role); // Récupérer le rôle depuis le premier résultat
      });

      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function insertUser(email,role, password,prenom,nom,date_naissance,type,structure) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    let query
    if(structure)
     query = `INSERT INTO utilisateur (email,mot_de_passe, prenom, nom, date_naissance, type, date_ajout, id_structure, id_role)
    SELECT ?, ?, ?, ?, ?, ?, NOW(), id_structure, ? from structure where designation=?;`;
    else 
    query=`INSERT INTO utilisateur (email,mot_de_passe, prenom, nom, date_naissance, type, date_ajout,id_role)
    values (?, ?, ?, ?, ?, ?, NOW(), ? )`;
    const values = [email,password,prenom,nom,date_naissance,type,role,structure];
  
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
    
    const query = 'SELECT u.mot_de_passe,r.designation FROM utilisateur u ,role r WHERE email= ? and u.id_role=r.id_role ';
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
        let designation=results[0].designation;
        let password=results[0].mot_de_passe;
        
        resolve({designation,password})
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}
function updateStatus(email)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    
    const query = 'update utilisateur set active= not active where email=?';
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
function getUsers()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    
    const query = `SELECT u.email, u.nom, u.prenom, u.active, u.date_naissance, r.designation as role, s.designation as structure, u.type
    FROM utilisateur u
    LEFT JOIN role r ON u.id_role = r.id_role
    LEFT JOIN structure s ON s.id_strucure = u.id_structure
    `
    
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
    const query=`SELECT u.email, u.nom, u.prenom, u.active, u.date_naissance, r.designation as role, s.designation as structure, u.type,t.designation as structure_resp
    FROM utilisateur u
    LEFT JOIN role r ON u.id_role = r.id_role
    LEFT JOIN structure s ON s.id_structure = u.id_structure
    Left join structure t On u.email=s.id_resp
    WHERE u.email = ?;`
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
function updateInformations(email,nom,prenom,date_naissance,type,structureId,table,role)
{
  console.log({table})
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    
    const query = `UPDATE ${table} SET 
    ${nom ? 'nom=?' : ''}
    ${(prenom && nom) ? ', ' : ''}
    ${prenom ? 'prenom=?' : ''}
    ${((prenom && date_naissance) || (date_naissance && nom)) ? ', ' : ''}
    ${date_naissance ? 'date_naissance=?' : ''}
    ${(date_naissance && type) || ((nom || prenom) && type) ? ', ' : ''}
    ${type ? 'type=?' : ''}
    ${(type && structureId) || ((nom || prenom || date_naissance) && structureId) ? ', ' : ''}
    ${structureId ? 'structure_id=?' : ''}
    ${(structureId && role) || ((nom || prenom || date_naissance || type) && role) ? ', ' : ''}
    ${role ? 'id_role=(select id_role from role where designation=?)' : ''}
    WHERE email=?`;
    const values=[];
    console.log(query)
    if(nom) values.push(nom);
    if(prenom) values.push(prenom);
    if(date_naissance) values.push(date_naissance);
    if(type) values.push(type);
    if(structureId) values.push(structureId);
    if(role) values.push(role);
    if(email) values.push(email);
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
function canDeletePerson(email)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select email from utilisateur where email=? and date_ajout>= NOW() - INTERVAL 1 DAY`;
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
        console.log({length:results.length})
        if(results.length===0)
          reject('erreur');
        else 
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function deletePerson(email)
{
  return new Promise((resolve, reject) => {
  const connection = mysql.createConnection(connectionConfig);
    
  const query = `delete  from utilisateur where email=? `;
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
  console.log({structure})
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
      console.log(results[0])
      resolve(results[0].id_structure);
    });
    
    connection.end(); // Fermer la connexion après l'exécution de la requête
  });}) 
}
function deleteStructure(structure)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `delete from structure where designation=?`;
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
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function updateStructure(oldDesignation,newDesignation)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `update structure set designation=? where designation=?`;
    const values=[newDesignation,oldDesignation]
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
function canDeleteStructure(structure)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select designation from structure where designation=? and date_ajout>= NOW() - INTERVAL 1 DAY`;
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
        if(results.length===0)
          reject('erreur');
        else 
        resolve("success");
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });})  
}
function addStructure(designation,email)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `INSERT INTO structure (designation, id_resp,date_ajout) 
    select ?,email,now() from utilisateur where email=?`;
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
function rattacher(structureId,email)
  {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(connectionConfig);
        
      const query ='update utilisateur set id_structure=? where email=?';
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
function getStructures()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = 'select s.designation,u.nom,u.prenom from structure s,utilisateur u where s.id_resp=u.email ';
   
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
function getRoles()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query =`select r.designation as role ,d.designation as droit 
    from role r,role_droit p ,droit_acces d where d.id_droit=p.id_droit and p.id_role=r.id_role`;
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
        const groupedByRole = results.reduce((acc, { role, droit }) => {
          if (!acc[role]) {
            acc[role] = [];
          }
          acc[role].push(droit);
          return acc;
        }, {});

        // Transformer l'objet regroupé en tableau d'objets
        const groupedResults = Object.entries(groupedByRole).map(([role, droits]) => ({ role, droits }));

        resolve(groupedResults);
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}
function getPermissions()
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='select designation from droit_acces where privilegie=false';
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
function insertRole(designation)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='insert into role (designation ,date_ajout) values (?,NOW())';
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
        resolve(results);
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}

function insertRoleDroit(id_role, permissions) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    let query ='INSERT INTO role_droit (id_role,id_droit) '
    for(let i=0;i<(permissions.length-1);i++)
    {
       query+=`Select ${id_role},id_droit from droit_acces where designation='${permissions[i]}'
               Union all `
    }
    query+=`Select ${id_role},id_droit from droit_acces where designation='${permissions[permissions.length-1]}'`
    console.log({query})
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
        resolve('success');
      });
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });}) 
}

function canDeleteRole(role)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select designation from role where designation=? and date_ajout>= NOW() - INTERVAL 1 DAY`;
    const values=[role]
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
function deleteRole(role)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='delete from role where designation=?';
    const values=[role]
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
function deleteRoleDroit(role,droit)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    let query,values; 
    if(droit){
        query=`DELETE FROM role_droit
        WHERE id_droit IN (SELECT id_droit FROM droit_acces WHERE designation = ?)
        AND id_role = (SELECT id_role FROM role WHERE designation = ?)`;
        values=[droit,role]        
      }
    else{ 
      query=`DELETE FROM role_droit WHERE id_role = (SELECT id_role FROM role WHERE designation = ?);
      `
      values=[droit]  
     }
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
function canDeleteRolePermission(role,permission)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query = `select id_role from role_droit where designation=? and date_ajout>= NOW() - INTERVAL 1 HOUR`;
    const values=[role]
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
function updateToken(token,email)
{
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
      
    const query ='update utilisateur set token=? where email=? ';
    const values=[token,email]
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
module.exports={insertUser,verifyUser,getPassword,getUsers,getUser,changePassword,
                updateInformations,deletePerson,getStructurId,addStructure
                ,getStructures,
                 getRole,updateStatus,canDeletePerson,
                 getRolePermissons,getRoles,getPermissions,
                 insertRole,insertRoleDroit,deleteRoleDroit,deleteRole,canDeleteRole,updateStructure,canDeleteStructure,
                rattacher,deleteStructure,getRolePermissons,HaveConsumers,isResponsable,isUsedRole,updateToken};






















