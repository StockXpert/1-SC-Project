const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let destinationFolder = '';
    if (file.fieldname === 'facture') {
      console.log("facture");
      destinationFolder = 'backend/Facture';
    } else if (file.fieldname === 'bonLivraison') {
      console.log("Livraison")
      destinationFolder = 'backend/bonLivraison';
    }
    else if(file.fieldname==='bonCommande')
      {
        destinationFolder = 'backend/bonCommande';
      }
    else if(file.fieldname==='bonReception')
        {
          destinationFolder = 'backend/bonReception';
        }  
    else if(file.fieldname==='sortie')
        {
          destinationFolder = 'backend/sortie';
        }
    else if(file.fieldname==='bonDecharge')
          {
            destinationFolder = 'backend/bonDecharge';
          }
     else {
      destinationFolder = 'backend/parametre'; // Dossier par défaut si le champ n'est pas reconnu
    }
    callback(null, destinationFolder);
  },
  filename: (req, file, callback) => {
    if(file.fieldname==="bonLivraison"||file.fieldname==="facture")
    {const name = file.originalname.split(' ').join('_');
    console.log({name});
    const timestamp = Date.now();
    callback(null, `${timestamp}_${name}`);}
    else if(file.fieldname=="logo"||file.fieldname=="header")
     { const name = file.fieldname+".png"
      callback(null,name)
     }
    else
    {
      const name = file.originalname;
    callback(null, `${name}`);
    }
}
});

// Configuration Multer pour accepter plusieurs fichiers avec des clés différentes
const upload = multer({ storage: storage }).fields([
  { name: 'bonLivraison', maxCount: 1 }, // Accepte un seul fichier pour le champ bonLivraison
  { name: 'bonCommande', maxCount: 1 }, // Accepte un seul fichier pour le champ facture
  { name: 'bonReception', maxCount: 1 },
  { name: 'sortie', maxCount: 1 },
  { name: 'bonDecharge', maxCount: 1 },
  { name: 'facture', maxCount: 1 },
  { name: 'header', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]);

module.exports = upload;
