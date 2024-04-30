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
    } else {
      destinationFolder = ''; // Dossier par défaut si le champ n'est pas reconnu
    }
    callback(null, destinationFolder);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    console.log({name});
    const timestamp = Date.now();
    callback(null, `${timestamp}_${name}`);
}
});

// Configuration Multer pour accepter plusieurs fichiers avec des clés différentes
const upload = multer({ storage: storage }).fields([
  { name: 'bonLivraison', maxCount: 1 }, // Accepte un seul fichier pour le champ bonLivraison
  { name: 'facture', maxCount: 1 } // Accepte un seul fichier pour le champ facture
]);

module.exports = upload;
