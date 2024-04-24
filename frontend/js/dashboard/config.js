export const API_URL = 'http://localhost:3000';
export const TIMEOUT_SEC = 10;
export const MODAL_CLOSE_SEC = 2.5;
export const FUSE_OPTIONS = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: [
    'email',
    'prenom',
    'nom',
    'role',
    'structure',
    'date_naissance',
    'active',
  ],
};
export const FUSE_OPTIONS_FOURNISSEURS = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['raison_sociale', 'adresse', 'telephone', 'fax', 'num_registre'],
};
export const FUSE_OPTIONS_ARTICLES = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['designation'],
};

export const GROUP_DEFINITIONS = {
  'Par Defaut': ['show user', 'change password auth'],
  Utilisateurs: [
    'show users',
    'register',
    'update user',
    'delete user',
    'change status',
    'rattacher',
  ],
  Chapitres: [
    'add chapter',
    'delete chapter',
    'update chapter',
    'show chapters',
  ],
  Produits: [
    'show commande products',
    'show products',
    'add product',
    'delete product',
  ],
  Fournisseurs: [
    'add fournisseur',
    'delete fournisseur',
    'show fournisseurs',
    'update fournisseur',
  ],
  Articles: [
    'show articles',
    'add article',
    'update article',
    'delete article',
  ],
  Commandes: [
    'show commandes',
    'bon commande',
    'delete commande',
    'update quantite',
    'cancel commande',
    'update bon commande',
    'update raison sociale',
    'update reception',
    'delete reception',
    'show bon reception',
    'show bon reception products',
  ],
  Roles: ['show roles', 'add role', 'delete role'],
  Permissions: ['show permissions', 'add permissions', 'delete permissions'],
  Structures: [
    'show structure',
    'update structure',
    'delete structure',
    'add structure',
  ],
  'Commandes Internes': [
    'demande fourniture',
    'approuve fourniture by responsable',
    'approuve fourniture by director',
    'approuve fourniture by magasinier',
  ],
};
export const PERM_NAMES = {
  register: 'Inscrire un nouvel utilisateur',
  'show users': 'Afficher les utilisateurs',
  'show user': 'Voir ses Informations',
  'update user': 'Mettre à jour un utilisateur',
  'delete user': 'Supprimer un utilisateur',
  'change status': "Changer le statut d'un utilisateur",
  'change password auth': "Changer le mot de passe d'authentification",
  rattacher: 'Raattacher un utilisateur à une structure',
  'add chapter': 'Ajouter un chapitre',
  'delete chapter': 'Supprimer le chapitre',
  'update chapter': 'Mettre à jour le chapitre',
  'add product': 'Ajouter un produit',
  'delete product': 'Supprimer le produit',
  'show products': 'Afficher les produits',
  'show articles': 'Afficher les articles',
  'add article': 'Ajouter un article',
  'update article': "Mettre à jour l'article",
  'delete article': "Supprimer l'article",
  'add fournisseur': 'Ajouter un fournisseur',
  'delete fournisseur': 'Supprimer le fournisseur',
  'show fournisseurs': 'Afficher les fournisseurs',
  'show chapters': 'Afficher les chapitres',
  'bon commande': 'Ajouter un bon de commande',
  'delete commande': 'Supprimer la commande',
  'update quantite': 'Mettre à jour la quantité',
  'cancel commande': 'Annuler la commande',
  'show commandes': 'Afficher les commandes',
  'update bon commande': 'Mettre à jour le bon de commande',
  'update fournisseur': 'Mettre à jour le fournisseur',
  'update raison sociale': 'Mettre à jour la raison sociale',
  'add role': 'Ajouter un rôle',
  'show roles': 'Afficher les rôles',
  'delete role': 'Supprimer le rôle',
  'show permissions': 'Afficher les permissions',
  'add permissions': 'Ajouter des permissions',
  'delete permissions': 'Supprimer des permissions',
  'update structure': 'Mettre à jour la structure',
  'delete structure': 'Supprimer la structure',
  'add structure': 'Ajouter une structure',
  'show structure': 'Afficher la structure',
  'show commande products': 'Afficher les produits commandés.',
  'show bon reception products': 'Afficher les produits de bon de réception',
  'update reception': 'Mettre à jour un bon de réception',
  'delete reception': 'Supprimmer un bon de réception',
  'show bon reception': 'Afficher les bons de réception',
  'demande fourniture': 'Créer un bon de commande interne',
  'approuve fourniture by responsable':
    'Approuver les bon de commandes internes par un responsable directe',
  'approuve fourniture by director':
    'Approuver les bon de commandes internes par le directeur',
  'approuve fourniture by magasinier':
    'Accepter les bon de commandes internes par le magasinier',
};

export const GROUP_BTNS = {
  'Par Defaut': `<a href="" class="sidebar-btns dashbord-btn active " name="Par Defaut">
  <span class="material-icons-sharp"> dashboard </span>
  <h3>Dashboard</h3>
</a>`,
  Utilisateurs: `<a href="" class="sidebar-btns utilisateurs utilisateurs-btn" name="Utilisateurs">
  <span class="material-icons-sharp"> person_outline</span>
  <h3>Utilisateurs</h3>
  <span class="message-count">27</span>
</a>`,
  Roles: `<a href="" class="sidebar-btns roles-btn" name="Roles">
  <span class="material-icons-sharp"> work </span>
  <h3>Rôles</h3>
</a>`,
  Structures: `<a href="" class="sidebar-btns structures-btn" name="Structures">
  <span class="material-icons-sharp"> school </span>
  <h3>Structures</h3>
</a>`,
  Permissions: `<a class="sidebar-btns permissions-btn" href="" name="Permissions">
  <span class="material-icons-sharp"> manage_accounts </span>
  <h3>Permissions</h3>
</a>`,
  Chapitres: `<a class="sidebar-btns chapitres-btn" href="" name="show chapters">
  <span class="material-icons-sharp"> menu_book </span>
  <h3>Chapitres</h3>
</a>`,
  Fournisseurs: `<a class="sidebar-btns fournisseurs-btn hidden" href="">
  <span class="material-icons-sharp"> local_shipping </span>
  <h3>Fournisseurs</h3>
</a>`,
  Commandes: `<a class="sidebar-btns bon-de-commandes-btn" href="">
  <span class="material-icons-sharp"> description </span>
  <h3>Bon de Commande</h3>
</a>
  `,
  'Commandes Internes': `  <a class="sidebar-btns bon-de-commandes-interne-btn" href="">
  <span class="material-icons-sharp"> assignment </span>
  <h3>Commandes Internes</h3>
</a>
  `,
  Autre: `<a class="sidebar-btns bon-de-commandes-btn" href="">
  <span class="material-icons-sharp"> pending </span>
  <h3>Autres</h3>
</a>
  `,
  Produits: `<a class="sidebar-btns produits-btn" href="">
  <span class="material-icons-sharp produits-btn">
    shopping_cart
  </span>
  <h3>Produits</h3>
</a>
  `,
  Articles: `<a class="sidebar-btns articles-btn" href="" name="show articles">
  <span class="material-icons-sharp"> article </span>
  <h3>Articles</h3>
</a>
  `,
};
export const ORDER_OF_GROUPS = [
  'Par Defaut',
  'Utilisateurs',
  'Structures',
  'Roles',
  'Permissions',
  'Commandes',
  'Commandes Internes',
  'Chapitres',
  'Produits',
  'Articles',
  'Autre',
];
