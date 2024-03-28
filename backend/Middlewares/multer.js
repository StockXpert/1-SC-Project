const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let destinationFolder = '';
    if (file.fieldname === 'facture') {
      destinationFolder = 'factures';
    } else if (file.fieldname === 'bonLivraison') {
      destinationFolder = 'bons_de_livraison';
    } else {
      destinationFolder = ''; // Dossier par défaut si le champ n'est pas reconnu
    }
    callback(null, destinationFolder);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const timestamp = Date.now();
    callback(null, `${timestamp}_${name}`);
}
});

// Configuration Multer pour accepter plusieurs fichiers avec des clés différentes
const upload = multer({ storage: storage }).fields([
  { name: 'bonLivraison', maxCount: 1 }, // Permet d'accepter un seul bon de livraison
  { name: 'facture', maxCount: 1 } // Permet d'accepter une seule facture
]);

module.exports = upload;
