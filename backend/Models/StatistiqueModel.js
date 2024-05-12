const mysql=require('mysql');
const connectionConfig = {
  host: 'bibznsnq8nf1q3j7r74o-mysql.services.clever-cloud.com',
  user: 'ucvk6cpbqavmyqnb',
  password: 'w7Xaq1AwW42V3jvOiTgb',
  database: 'bibznsnq8nf1q3j7r74o'
};
function MostDemandedProduct(dateD,dateF,consommateur,structure) 
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        let query
        if(consommateur)
            query=`select p.designation as produit,sum(f.quantite_demande) as  nombre from demande_fourniture d,fournir f ,produit p where
        f.id_demande=d.num_demande and p.id_produit=f.id_produit and d.id_demandeur=?
        ${dateD?"(and d.date_demande between ? and ?)":""}
        group by p.designation order by nombre desc limit 10`
        else if (structure)
            query=`select p.designation as produit,sum(f.quantite_demande) as  nombre from demande_fourniture d,fournir f ,produit p where
        f.id_demande=d.num_demande and p.id_produit=f.id_produit and d.id_demandeur in
        (select email from utilisateur where id_structure=
            (select id_structure from structure where designation=?)
        )
        ${dateD?"(and d.date_demande between ? and ?)":""}
        group by p.designation order by nombre desc limit 10`
        else
            query=`select p.designation as produit,sum(f.quantite_demande) as  nombre from demande_fourniture d,fournir f ,produit p where
        f.id_demande=d.num_demande and p.id_produit=f.id_produit ${dateD?"(and d.date_demande between ? and ?)":""}
        group by p.designation order by nombre desc limit 10`
        let values=[]
        if(consommateur) values.push(consommateur)
        if(structure) values.push(structure)
        if(dateD) values.push(dateD,dateF)    
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
            resolve(results);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function MostUsedFournisseur(dateD,dateF)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query=`select f.raison_sociale as fournisseur,count(b.num_commande) as  nombre from bon_de_commande b,fournisseur f where
        b.id_fournisseur=f.id_fournisseur ${dateD?"(and d.date_commande between ? and ?)":""}
        group by f.raison_sociale order by nombre desc limit 10`
        let values=[]
        if(dateD) values.push(dateD,dateF)    
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
            resolve(results);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function RapidFournisseur(dateD,dateF)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query=`select f.raison_sociale as fournisseur,AVG(DATEDIFF(r.date_reception, b.date_commande)) as  nombre from bon_de_commande b,fournisseur f,bon_de_reception r where
        b.id_fournisseur=f.id_fournisseur and r.num_commande=b.num_commande and b.etat='delivrer' ${dateD?"(and d.date_commande between ? and ?)":""}
        group by f.raison_sociale,b.num_commande order by nombre desc limit 10`
        let values=[]
        if(dateD) values.push(dateD,dateF)    
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
            resolve(results);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function topDemandeurs(dateD,dateF,structure)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        let query
        if (structure)
            query=`select d.id_demandeur as consommateur ,count(d.num_demande) as  nombre from demande_fourniture d where
           d.id_demandeur in
           (
            SELECT email
            FROM utilisateur
            WHERE id_structure = (
                SELECT id_structure
                FROM structure
                WHERE designation = ?
            )
        )
        ${dateD?"(and d.date_demande between ? and ?)":""}
        group by d.id_demandeur order by count(d.num_demande) desc limit 10`
        else
            query=`select d.id_demandeur as consommateur ,count(d.num_demande) as  nombre from demande_fourniture d 
            ${dateD?"(and d.date_demande between ? and ?)":""}
            group by d.id_demandeur order by count(d.num_demande) desc limit 10`
        let values=[]
        if(structure) values.push(structure)
        if(dateD) values.push(dateD,dateF)    
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
            resolve(results);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function mostCommandedProducts(dateD,dateF)
{
return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    const query=`select p.designation as produit , sum (c.quantite) as  quantite from bon_de_commande b ,commande c,produit p where
    c.id_commande=b.num_commande and p.id_produit=c.id_produit 
    ${dateD?"(and d.date_commande between ? and ?)":""}
    group by p.designation order by quantite desc limit 10`
    let values=[]
    if(dateD) values.push(dateD,dateF)    
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
        resolve(results);
      });
      
      connection.end(); // Fermer la connexion après l'exécution de la requête
    });
  });
}  
function productDemandePerYear(year,product)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query=`select month(d.date_demande) as month ,sum(f.quantite_demande) as quantite from demande_fourniture d ,fournir f,produit p where
        d.num_demande=f.id_demande and p.id_produit=f.id_produit and year(d.date_demande)=? and p.designation=?
        group by month(d.date_demande)`
        let values=[year,product]   
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
            resolve(results);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function articleDemandePerYear(year,article)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query=`select month(d.date_demande) as month ,sum(f.quantite_demande) as quantite from demande_fourniture d ,fournir f where
        d.num_demande=f.id_demande and year(d.date_demande)=? and f.id_produit in
        (select id_produit from contient where id_article=
            (select num_article from article where designation=?)
        )
        group by month(d.date_demande)`
        let values=[year,article]   
        console.log(values)
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
            resolve(results);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
function commandesStat(dateD,dateF)
{
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig);
        const query=`select COUNT(CASE WHEN etat = 'en cours' THEN 1 END) AS enCours,
        COUNT(CASE WHEN etat = 'delivrer' THEN 1 END) AS delivrer,
        COUNT(CASE WHEN etat = 'annuler' THEN 1 END) AS annuler   
        from bon_de_commande
        ${dateD?"(where d.date_commande between ? and ?)":""}` 
        let values=[]
        if(dateD) values.push(dateD,dateF)    
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
            
            resolve(results);
          });
          
          connection.end(); // Fermer la connexion après l'exécution de la requête
        });
      });
}
module.exports={MostDemandedProduct,MostUsedFournisseur,RapidFournisseur,topDemandeurs,mostCommandedProducts,productDemandePerYear,
    articleDemandePerYear,commandesStat}