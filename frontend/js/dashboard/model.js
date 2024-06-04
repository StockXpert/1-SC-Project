// import { async } from 'regenerator-runtime';
import {
  API_URL,
  FUSE_OPTIONS,
  TIMEOUT_SEC,
  GROUP_DEFINITIONS,
  PERM_NAMES,
  ORDER_OF_GROUPS,
  FUSE_OPTIONS_FOURNISSEURS,
  FUSE_OPTIONS_ARTICLES,
  FUSE_OPTIONS_CMDSINT,
  FUSE_OPTIONS_CMDS,
  FUSE_OPTIONS_PROD,
  FUSE_OPTIONS_PROD_INV,
  FUSE_OPTIONS_INV,
  FUSE_OPTIONS_REF,
} from './config.js';
import * as helpers from './helpers.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs';
export const state = {
  me: {
    permissions: {
      all: [],
      wellFormed: [],
    },
  },
  allProducts: [],
  validityMsgs: {
    addbdci: {
      addProduct: {
        designation: '',
        quantite: '',
      },
      editProduct: {
        designation: '',
        quantite: '',
      },
    },
    editbdci: {
      addProduct: {
        designation: '',
        quantite: '',
      },
      editProduct: {
        designation: '',
        quantite: '',
      },
    },
  },
  commandesInt: {
    all: [],
    afterSearch: [],
    afterFilters: [],
    rendered: [],
    selected: {
      ext: false,
      old: {
        numDemande: '',
        products: '',
      },
      new: { numDemande: '', deletedProducts: [], addededProducts: [] },
      newApproval: { numDemande: '', products: [] },
      numDemande: '',
      products: [], //selecter bdci products
      changed: '',
    },
    deliver: {
      products: [{ reference: '', designation: '' }],
    },
  },
  bdc: {
    allCommandes: [],
    afterSearch: [],
    afterFilters: [],
    selected: '',
    rendered: [],
  },
  bdr: {
    all: [],
  },
  bdr_products: {
    all: [],
  },
  fournisseurs: {
    all: [],
    selected: '',
  },
  bdc_products: {
    all: [],
    selected: '',
    added: [],
    changed: {},
  },
  bdci_products: {
    all: [{}, {}],
    selected: '',
    added: [],
    changed: {},
  },
  type: {
    all: [],
    selected: '',
  },

  user: {},
  search: {
    // query: '',
    results: [],
    queryResults: [],
    // filteredResults: [],
    filters: {
      isFilterring: false,
      filterValues: [],
    },
    filteredResults: [],
  },
  roles: {
    all: [],
    allPermissions: [],
    selected: {
      droits: [],
    },
    wellFormed: [
      {
        groupName: '',
        permissions: [
          {
            code: '',
            name: '',
          },
          {
            code: '',
            name: '',
          },
        ],
      },
    ],
  },
  displayed: {
    role: 'all',
    status: 'all',
    selected: 0,
    selectedRoles: 0,
    selectedAddProductsNumber: 0,
  },
  structures: {
    results: [],
    selected: 0,
  },
  inventaires: {
    all: {},
    new: {
      numInventaire: '',
      dateInventaire: '',
      produits: [],
      oldProducts: [],
      selectedProduct: '',
      isNew: true,
    },

    selected: {
      chapitres: [],
      articles: [],
      numInventaire: '',
      renderedProducts: [],
      selectedProduct: '',
      produits: [],
      oldProduits: {},
      currentProduits: {},
      isNew: false,
      afterSearch: [],
      afterFilters: [],
    },
    rendered: [],
    afterFilters: [],
    afterSearch: [],
    //TODO:
    // rendered: {
    //   numInventaire: '',
    //   produits: [],
    //   selectedProduct: '',
    // },
  },
  chapters: {
    all: [],
    selected: 0,
    searched: {
      all: [],
      selected: 0,
    },
  },
  products: {
    all: [],
    selected: 0,
    searched: {
      all: [],
      selected: 0,
    },
    rendered: [],
    afterSearch: [],
  },
  articles: {
    all: [],
    selected: 0,
    searched: {
      all: [],
      selected: 0,
    },
  },
  fournisseur: {
    all: [],
    selected: 0,
    searched: {
      all: [],
      selected: 0,
    },
  },
};
export const getMyPerms = async function () {
  try {
    const result = await helpers.getJSON(`${API_URL}/Users/showUser`);
    state.me = { ...result.response[0] };
    const myPerms = JSON.parse(localStorage.getItem('permissions'));
    state.me.permissions = {
      all: myPerms,
      wellFormed: organizePermissionsByGroup(myPerms, false, false),
    };
    console.log(state.me);
    return state.me;
  } catch (error) {
    helpers.renderError('API Error in getMyPerms', error.message); // More specific error handling possible
    // console.error('Error in sendJSON:', error); // Optional for logging detailed errors
    throw error; // Re-throw for potential global error handling (optional)
  }
};

export const updateFilters = function (filterValues, isFilterring) {
  state.search.filters.isFilterring = isFilterring;
  state.search.filters.filterValues = filterValues;
  // console.log(filterValues, isFilterring);
};

export const updateUser = async function (newUser) {
  const updateObj = helpers.getUpdateObject(state.user, newUser);
  console.log(updateObj);
  updateObj.email = state.user.email;
  console.log(updateObj);
  //  /updateUser
  // console.log(updateObj.nom || updateObj.prenom);
  if (updateObj == {}) return;
  if (
    updateObj.nom ||
    updateObj.prenom ||
    updateObj.date_naissance ||
    updateObj.role
  ) {
    let putData = {
      email: updateObj.email,
      nom: updateObj.nom,
      prenom: updateObj.prenom,
      date_naissance: updateObj.date_naissance,
      role: updateObj.role,
    };
    console.log(putData);
    putData = helpers.removeUndefinedProperties(putData);
    console.log(putData);
    await helpers.putJSON(`${API_URL}/Users/updateUser`, putData);
    // helpers.putJSON(`${API_URL}/Users/updateUser`, newUser);
  }
  // /changeStatus
  if (updateObj.active) {
    console.log('STATUS CHANGED !');
    const postData = { email: updateObj.email };
    console.log(postData);
    // postData.active = updateObj.active === 'Activé' ? 1 : 0;
    // console.log(postData);
    await helpers.sendJSON(`${API_URL}/Users/changeStatus`, postData);
  }
  if (updateObj.structure) {
    console.log('structure update');
    console.log({
      structure: updateObj.structure,
      email: updateObj.email,
    });

    await helpers.putJSON(`${API_URL}/Users/rattacher`, {
      structure: updateObj.structure,
      email: updateObj.email,
    });
  }
};
export const loadSearchResults = async function (query) {
  try {
    const data = await helpers.getJSON(`${API_URL}/Users/showUsers`);
    state.search.results = data.response.map(usr => {
      // usr:
      // "email": "o.djeziri@esi-sba.dz",
      // "nom": "DJEZIRI",
      // "prenom": "Oussama",
      // "active": 1,
      // "date_naissance": "2002-12-29T23:00:00.000Z",
      // "role": "Administrateur System",
      // "type": null
      return {
        email: usr.email,
        prenom: usr.prenom ? helpers.capitalizeFirstLetter(usr.prenom) : '',
        nom: usr.nom
          ? helpers.capitalizeWord(usr.nom)
          : helpers.truncateEmail(usr.email),
        role: usr.role,
        // TODO: structure: usr.structure,
        structure: 'Cycle Supérieure',
        active: usr.active ? 'Activé' : 'Désactivé',
        date_naissance: helpers.formatDate(usr.date_naissance),
      };
    });
    state.search.queryResults = state.search.results;
    state.search.filteredResults = state.search.results;
  } catch (err) {
    console.log(`${err} 💔`);
    throw err;
  }
};

export const uploadUser = async function (data) {
  try {
    // email,
    // role,
    // password,
    // prenom,
    // nom,
    // date_naissance,
    // type,
    // structure,

    // date
    // :
    // "2002-03-12"
    // email
    // :
    // "pls@pepega.pogu"
    // name
    // :
    // "DJEZIRI"
    // password
    // :
    // "12345678"
    // prenom
    // :
    // "Oussama"
    // roles
    // :
    // "Consommateur"
    // structures
    // :
    // "STR1"
    // type
    // :
    // "Enseignant"
    console.log(data);
    const postData = {
      email: data.email,
      role: data.roles,
      password: data.password,
      prenom: data.prenom,
      nom: data.name,
      date_naissance: data.date,
      type: data.type,
      structure: data.structures,
    };
    console.log(postData);
    const resp = await helpers.sendJSON(`${API_URL}/Users/Register`, postData);

    console.log(resp);
  } catch (err) {
    console.error(err);
  }
};
export const uploadRole = async function (data) {
  try {
    console.log(data);
    const postData = {
      role: data.roleName,
      permissions: ['show user', 'change password auth'],
    };
    console.log(postData);
    const resp = await helpers.sendJSON(`${API_URL}/Users/addRole`, postData);

    console.log(resp);
  } catch (err) {
    // console.error(err);
    helpers.renderError('ERREUR !', 'Nom du role déja utilisé');
    // throw err;
  }
};

export const loadStructures = async function () {
  try {
    const data = await helpers.getJSON(`${API_URL}/Users/showStructure`);
    // console.log(data.response);
    state.structures.results = data.response.map(str => {
      return {
        designation: str.designation,
        responsible: `${str.nom} ${str.prenom}`,
      };
    });
  } catch (error) {
    console.error('💥💥💢💢 :' + error);
  }
};

export const uploadStructure = async function (newStructure) {
  try {
    const postData = {
      designation: newStructure.name,
      email: newStructure.responsable,
    };
    const res = await helpers.sendJSON(
      `${API_URL}/Users/addStructure`,
      postData
    );
    state.structures.results.push({
      designation: newStructure.name,
      responsible: newStructure.responsable,
    });
    console.log(res);
  } catch (error) {
    console.error('💥💥💢💢 :' + error);
  }
};

export const updateStructure = async function (oldStructure, newStructure) {
  try {
    const uploadData = {
      oldDesignation: oldStructure.designation,
      newDesignation: newStructure.designation,
    };
    const data = await helpers.putJSON(
      `${API_URL}/Users/updateStructure`,
      uploadData
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const getResponsiblesEmail = async function () {
  try {
    const data = await helpers.getJSON(`${API_URL}/Users/showUsers`);
    // console.log(data.response.map(user => user.email));

    return data.response
      .filter(
        user =>
          user.role !== 'Consommateur' || user.role !== 'Administrateur System'
      )
      .map(user => {
        return {
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          role: user.role,
        };
      });
  } catch (error) {
    console.error('💥💥💢💢 :' + error);
  }
};

export const getRoles = async function () {
  try {
    const roles = await helpers.getJSON(`${API_URL}/Users/showRoles`);
    // console.log(roles.response);
    const rolesArray = [];
    roles.response.forEach(role => rolesArray.push(role.role));
    return rolesArray;
  } catch (error) {
    console.error('💥getRoles threw this error :' + error);
  }
};

export const getRolePerms = async function (roleName) {
  try {
    const roles = await helpers.getJSON(`${API_URL}/Users/showRoles`);
    // console.log(roles.response);
    // const rolesArray = [];
    // roles.response.forEach(role => rolesArray.push(role.role));
    const droitsArray = (
      roles.response.find(obj => obj.role === roleName) || {}
    ).droits;
    if (!droitsArray) return []; // Return empty array if no matching role is found
    return droitsArray.map(designation => ({ designation }));
  } catch (error) {
    console.error('💥getRolePerms threw this error :' + error);
  }
};

export const getStructures = async function () {
  try {
    const structures = await helpers.getJSON(`${API_URL}/Users/showStructure`);
    // console.log(roles.response);
    const structuresArray = [];
    structures.response.forEach(str => structuresArray.push(str.designation));
    return structuresArray;
  } catch (error) {
    console.error('💥getStructures threw this error :' + error);
  }
};
//fuzzySearch is basically a searchFunction MAKER
//the searchFunction it made is fuzzySearchBrowsersList
// export const fuzzySearcher = helpers.fuzzySearch(
//   [state.search.results],
//   ['email', 'date_naissance', 'prenom', 'nom', 'role', 'structure']
// );
// const data = [
//   {
//     email: '',
//     prenom: '',
//     nom: '',
//     role: null,
//     structure: 'Cycle Supérieure',
//     active: 1,
//     date_naissance: '1970-01-01',
//   },
//   {
//     email: 'a.baghdadli@esi-sba.dz',
//     prenom: 'Abdelhadi',
//     nom: 'BAGHDADLI',
//     role: 'Administrateur System',
//     structure: 'Cycle Supérieure',
//     active: 1,
//     date_naissance: '2004-04-19',
//   },
//   {
//     email: 'DG@esi-sba.dz',
//     prenom: 'Kamil',
//     nom: 'KAZI',
//     role: 'Directeur',
//     structure: 'Cycle Supérieure',
//     active: 1,
//     date_naissance: '2003-05-28',
//   },
//   {
//     email: 'kam@esi-sba.dz',
//     prenom: 'Kamil',
//     nom: 'KAZI',
//     role: 'Administrateur System',
//     structure: 'Cycle Supérieure',
//     active: 1,
//     date_naissance: '2003-05-28',
//   },
//   {
//     email: 'ms.senhadji@esi-sba.dz',
//     prenom: '',
//     nom: 'ms.senhadji',
//     role: 'Consommateur',
//     structure: 'Cycle Supérieure',
//     active: 1,
//     date_naissance: '1970-01-01',
//   },
//   {
//     email: 'o.djeziri@esi-sba.dz',
//     prenom: 'Oussama',
//     nom: 'DJEZIRI',
//     role: 'Administrateur System',
//     structure: 'Cycle Supérieure',
//     active: 1,
//     date_naissance: '2002-12-30',
//   },
//   {
//     email: 'ServiceAchat@esi-sba.dz',
//     prenom: '',
//     nom: 'Service Achat',
//     role: 'Service achat',
//     structure: 'Cycle Supérieure',
//     active: 1,
//     date_naissance: '2003-05-28',
//   },
// ];
export const fuseMaker = data => new Fuse(data, FUSE_OPTIONS);
export const fuseMakerFournisseurs = data =>
  new Fuse(data, FUSE_OPTIONS_FOURNISSEURS);
export const fuseMakerArticles = data => new Fuse(data, FUSE_OPTIONS_ARTICLES);
export const fuseMakerProducts = data => {
  console.log(data);
  return new Fuse(data, FUSE_OPTIONS_ARTICLES);
};
export const fuseMakerCmds = data => new Fuse(data, FUSE_OPTIONS_CMDS);
export const fuseMakerCmdsInt = data => new Fuse(data, FUSE_OPTIONS_CMDSINT);
export const fuseMakerInv = data => new Fuse(data, FUSE_OPTIONS_INV);
export const fuseMakerRef = data => new Fuse(data, FUSE_OPTIONS_REF);
export const fuseMakerProd = data => new Fuse(data, FUSE_OPTIONS_PROD);
export const fuseMakerProdInv = data => new Fuse(data, FUSE_OPTIONS_PROD_INV);

export const loadRoles = async function () {
  try {
    const data = await helpers.getJSON(`${API_URL}/Users/showRoles`);
    state.roles.all = data.response;
    return data.response;
  } catch (err) {
    console.error(`💢 loadRoles got this error:, ${err}`);
  }
};
export const loadPerms = async function () {
  try {
    const data = await helpers.getJSON(`${API_URL}/Users/showPermissions`);
    state.roles.allPermissions = data.response;
    return data.response;
  } catch (err) {
    console.error(`💢 loadPerms got this error:, ${err}`);
  }
};

export const organizePermissionsByGroup = function (
  permissions,
  isNoDesignation = false,
  updateState = true
) {
  const groups = {};
  let designation = '';
  // Define group names and their associated permissions
  const groupDefinitions = GROUP_DEFINITIONS;

  permissions.forEach(permission => {
    if (isNoDesignation) {
      designation = permission;
    } else {
      designation = permission.designation;
    }
    let assigned = false;
    for (const [groupName, permissionCodes] of Object.entries(
      groupDefinitions
    )) {
      if (permissionCodes.includes(designation)) {
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push({
          code: designation,
          name: getPermissionName(designation),
        });
        assigned = true;
        break;
      }
    }
    if (!assigned) {
      if (!groups['Autre']) {
        groups['Autre'] = [];
      }
      groups['Autre'].push({
        code: designation,
        name: getPermissionName(designation),
      });
    }
  });

  // Convert groups object into the desired array format
  const result = Object.entries(groups).map(([groupName, permissions]) => ({
    groupName,
    permissions,
  }));

  function reorderPermissions(groups, ordering) {
    // Create a map to hold group names and their corresponding objects
    const groupsMap = new Map(groups.map(group => [group.groupName, group]));

    // Reorder groups based on the ordering array
    const reorderedGroups = ordering
      .map(groupName => groupsMap.get(groupName))
      .filter(Boolean);

    return reorderedGroups;
  }

  // Example usage:
  // const permissions = [/* Your permissions object here */];
  // const orderingObject = ["Par Defaut", "Utilisateurs", "Structures", "Roles", "Permissions", "Chapitres", "Produits et Articles", "Commandes", "Autre"];

  // const reorderedPermissions = reorderPermissions(permissions, orderingObject);
  // console.log(reorderedPermissions);
  const results = reorderPermissions(result, ORDER_OF_GROUPS);
  if (updateState) state.roles.wellFormed = results;
  return results;
};

// Helper function to get the permission name in French
export const getPermissionName = function (permissionCode) {
  // Define mapping of permission codes to their French names
  const permissionNames = PERM_NAMES;
  return permissionNames[permissionCode];
};

export const addPermsToRole = async function (perms, role) {
  const uploadData = { role: role, permissions: perms };
  console.log(uploadData);
  await helpers.putJSON(`${API_URL}/Users/addPermissions`, uploadData);
};
export const delPermsFromRole = async function (perms, role) {
  const uploadData = { role: role, permissions: perms };
  console.log(uploadData);
  await helpers.delJSON(`${API_URL}/Users/deletePermissions`, uploadData);
};
// // Example usage:
// const permissions = [
//   { designation: "register" },
//   { designation: "show users" },
//   // Add more permissions here
//   { designation: "unknown_permission_1" }, // This will be put in "Autre"
//   { designation: "unknown_permission_2" }  // This will be put in "Autre"
// ];

// const organizedPermissions = organizePermissionsByGroup(permissions);
// console.log(organizedPermissions);

export const deleteStructure = async function (structure) {
  try {
    const uploadData = { structure: structure.designation };
    await helpers.delJSON(`${API_URL}/Users/deleteStructure`, uploadData);
  } catch (error) {
    console.error(error);
    helpers.renderError('ERREUR !', error.message);
  }
};

export const deleteRole = async function (role) {
  try {
    const uploadData = { role };
    await helpers.delJSON(`${API_URL}/Users/deleteRole`, uploadData);
  } catch (error) {
    console.error(error);
  }
};

export const loadCmds = async function () {
  let { commandes } = await helpers.getJSON(`${API_URL}/Entrees/showCommandes`);
  console.log(commandes);
  state.bdc.allCommandes = commandes.sort(
    (a, b) => b.num_commande - a.num_commande
  );
  state.bdc.afterSearch = commandes.map(item => ({ ...item }));
  return commandes;
};
export const loadCmdsInt = async function () {
  let commandesInt = await helpers.getJSON(
    `${API_URL}/Sorties/showAllDemandes`
  );
  console.log(state.commandesInt);
  console.log(state.commandesInt.all);
  state.commandesInt.all = commandesInt.response.sort(
    // (a, b) => new Date(b.date_demande) - new Date(a.date_demande)
    // (a, b) => b.num_demande - a.num_demande
    helpers.newCustomSortForCmdsInt
  );
  console.log(state.commandesInt.all);
  state.commandesInt.afterFilters = state.commandesInt.all;
  state.commandesInt.afterSearch = state.commandesInt.all;
  return commandesInt;
};
export const loadCommandeproducts = async function (numCommande) {
  let products = await helpers.postJSONReturnResResp(
    `${API_URL}/Entrees/showCommandeProducts`,
    { numCommande: `${numCommande}` }
  );
  return products;
};

export const loadFournisseurs = async function () {
  let fournisseurs = await helpers.getJSON(
    `${API_URL}/Nomenclatures/showFournisseurs`
  );
  state.fournisseur.all = fournisseurs.response;
  return fournisseurs.response;
};

export const loadArticles = async function () {
  const articles = await helpers.getJSON(
    `${API_URL}/Nomenclatures/showArticles`
  );
  state.articles.all = articles.response;
  return articles.response;
};

export const loadProducts = async function (article) {
  let products = await helpers.getJSON(`${API_URL}/Nomenclatures/showProducts`);
  return helpers.filterByArticle(products.response, article);
};

export const loadAllProducts = async function () {
  let products = await helpers.getJSON(`${API_URL}/Nomenclatures/showProducts`);
  state.products.all = products.response;
  state.products.afterFilters = state.products.all;
  state.products.afterSearch = state.products.all;
  return products.response;
};

export const createBDC = async function () {
  try {
    const postBDCOBJ = {
      produits: state.bdc_products.added,
      objet: state.articles.selected,
      type: state.type.selected,
      fournisseur: state.fournisseurs.selected,
      date: helpers.getFormattedDate(),
    };
    console.log(postBDCOBJ);
    await helpers.sendJSON(`${API_URL}/Entrees/bonCommande`, postBDCOBJ);
  } catch (err) {
    throw err;
  }
};
export const createBDCI = async function () {
  const postBDCIOBJ = {
    produits: state.bdci_products.added,
    dateDemande: helpers.getFormattedDate(),
    exterieur: state.commandesInt.selected.ext,
  };
  console.log(postBDCIOBJ);
  await helpers.sendJSON(`${API_URL}/Sorties/demandeFourniture`, postBDCIOBJ);
};
export const saveBDCI = async function () {
  let postBDCIOBJ = {
    numDemande: state.commandesInt.selected.numDemande,
    deletedProducts: state.commandesInt.selected.old.products,
  };
  console.log(postBDCIOBJ);
  let resp = [];
  resp[0] = await helpers.putJSON(
    `${API_URL}/Sorties/updateConsDemande`,
    postBDCIOBJ
  );
  postBDCIOBJ = {
    numDemande: state.commandesInt.selected.numDemande,
    addedProducts: state.commandesInt.selected.products,
  };
  console.log(postBDCIOBJ);
  resp[1] = await helpers.putJSON(
    `${API_URL}/Sorties/updateConsDemande`,
    postBDCIOBJ
  );
  return resp;
};
export const deleteCmd = async function (numCommande) {
  return await helpers.delJSONReturnResResp(
    `${API_URL}/Entrees/deleteCommande`,
    {
      numCommande: numCommande,
    }
  );
};
export const cancelCmd = async function (numCommande) {
  return await helpers.postJSONReturnResResp(
    `${API_URL}/Entrees/cancelCommande`,
    {
      numCommande: numCommande,
    }
  );
};

export const loadBonRec = async function (numCommande) {
  const uploadData = {
    numCommande: numCommande,
  };
  const data = await helpers.sendJSON(
    `${API_URL}/Entrees/showBonReception`,
    uploadData
  );
  state.bdr.all = data.response;
};

export const loadBonCmdProducts = async function (numCommande) {
  const uploadData = {
    numCommande: numCommande,
  };
  const data = await helpers.sendJSON(
    `${API_URL}/Entrees/showCommandeProducts`,
    uploadData
  );
  state.bdr_products.all = data.response;
};

export const deleteBonRec = async function (numReception, numCommande) {
  const uploadData = {
    numReception: numReception,
    numCommande: numCommande,
  };
  const data = await helpers.delJSON(
    `${API_URL}/Entrees/deleteReception`,
    uploadData
  );
  console.log(data);
};

// export const addBonReception = async function (newReception) {
//   try {
//     const res = await fetch(`${API_URL}/Entrees/updateQuantite`, {
//       method: 'POST',
//       headers: {
//         Authorization: localStorage.getItem('JWT'),
//       },
//       body: newReception,
//     });
//     if (!res.ok) {
//       throw new Error('Erreur lors de la requête');
//     }
//     const data = res.json();
//     console.log(res);
//     console.log(data);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
export const addBonReception = async function (newReception) {
  // try {
  const res = await fetch(`${API_URL}/Entrees/updateQuantite`, {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('JWT'),
    },
    body: newReception,
  });
  // if (!res.ok) {
  // throw new Error('Erreur lors de la requête');
  // }
  const data = await res.json();
  return data;
  // } catch (error) {
  // throw error;
  // }
};

export const loadCommandeIntProducts = async function (numDemande) {
  let products = await helpers.postJSONReturnResResp(
    `${API_URL}/Sorties/showDemande`,
    { numDemande: `${numDemande}` }
  );
  console.log(products);
  return products;
  // produits = produits.produits;
  // return produits;
};
export const resAppCmdInt = async function (appObject) {
  let responseArray = await helpers.postJSONReturnResResp(
    `${API_URL}/Sorties/fournitureRespApp`,
    appObject
  );
  return responseArray;
};
export const dirAppCmdInt = async function (appObject) {
  let responseArray = await helpers.postJSONReturnResResp(
    `${API_URL}/Sorties/fournitureDirApp`,
    appObject
  );
  return responseArray;
};
export const magAppCmdInt = async function (appObject) {
  let responseArray = await helpers.postJSONReturnResResp(
    `${API_URL}/Sorties/fournitureMagApp`,
    appObject
  );
  return responseArray;
};
export const magLivrerCmdInt = async function (appObject) {
  console.log(appObject);
  let responseArray = await helpers.postJSONReturnResResp(
    `${API_URL}/Sorties/livrer`,
    appObject
  );
  return responseArray;
};
export const loadAllInv = async function () {
  try {
    let responseArray = await helpers.getJSONReturnResResp(
      `${API_URL}/Inventaire/showInventaires`
    );
    if (!responseArray[0].ok) {
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].error} car vous semblez manquer des permissions suivantes: <br/>
        show inventaires:
        Voir l'historique de l'inventaire (tout les états précédents)
        `
      );
      return false;
    } else state.inventaires.all = responseArray[1].response;
    let response = responseArray[1].response.sort(
      (a, b) => b.num_inventaire - a.num_inventaire
    );
    state.inventaires.afterSearch = response;
    return response;
  } catch (err) {
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
};
export const dechargerCmdsInt = async function (postObj) {
  try {
    let responseArray = await helpers.postJSONReturnResRespNoTO(
      `${API_URL}/Sorties/livrer`,
      postObj
    );
    if (!responseArray[0].ok) {
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].error} car vous semblez manquer des permissions suivantes: <br/>
        livrer:
        'Livrer la demande Interne/Externe et générer le Bon de Sortie/Décharge',
        `
      );
      return false;
    }
    console.log(responseArray);
    return responseArray;
  } catch (err) {
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
};
export const deleteCmdInt = async function (numDemande) {
  try {
    let delObj = { numDemande: numDemande };
    console.log(delObj);
    let responseArray = await helpers.delJSONReturnResResp(
      `${API_URL}/Sorties/deleteFourniture`,
      delObj
    );
    if (!responseArray[0].ok) {
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].error} car il semble qu'il vous manque la permission suivante: <br/>
        delete fourniture:
        'Supprimmer une commande interne',
        `
      );
      return false;
    }
    console.log(responseArray);
    return responseArray;
  } catch (err) {
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
};
// export const loadAllProducts = async function () {
//   let products = await helpers.getJSON(`${API_URL}/Nomenclatures/showProducts`);
//   return products.response;
// };
export const loadAllProductsPerms = async function () {
  try {
    let responseArray = await helpers.getJSONReturnResResp(
      `${API_URL}/Nomenclatures/showProducts`
    );
    if (!responseArray[0].ok) {
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].error} car il semble qu'il vous manque la permission suivante: <br/>
        show products :
        'Afficher les produits',
        `
      );
      return false;
    }
    console.log(responseArray);
    return responseArray;
  } catch (err) {
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
};
export const loadAllInvProducts = async function () {
  try {
    let responseArray = await helpers.postJSONReturnResResp(
      `${API_URL}/Nomenclatures/showRefs`
    );
    if (!responseArray[0].ok) {
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].error} La route "show refs" a mal fonctioné, il peut se trouver qu'il s'agit d'un problème de permissions: </br>
        show refs :
        'Afficher tout les produits avec des references',
        `
      );
      return false;
    }
    console.log(responseArray);
    return responseArray;
  } catch (err) {
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
};
export const preprareSelectedInventaire = async function () {
  try {
    let responseArray = await helpers.postJSONReturnResResp(
      `${API_URL}/Sortie`
    );
    if (!responseArray[0].ok) {
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].error} La route "show refs" a mal fonctioné, il peut se trouver qu'il s'agit d'un problème de permissions: </br>
        show refs :
        'Afficher tout les produits avec des references',
        `
      );
      return false;
    }
    console.log(responseArray);
    return responseArray;
  } catch (err) {
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
};
export const createInv = async function () {
  /*numInv*/
  try {
    console.log(state.inventaires.selected);
    let newProduitsArr = state.inventaires.selected.renderedProducts.map(
      produit => {
        const {
          designation,
          num_inventaire,
          present,
          raison,
          reference,
          date_inventaire,
        } = produit;
        return {
          reference,
          numInventaire: num_inventaire == null ? NaN : num_inventaire,
          //TODO: can i just update them overall in all products at once is that okay? or do i need to have to each product its own priseDate
          // datePrise: date_inventaire
          //   ? date_inventaire
          //   : helpers.getFormattedDate(),
          datePrise: helpers.getFormattedDate(),
          raison: present ? '' : raison,
          present: present,
        };
      }
    );
    let postObj = {
      numInventaire: state.inventaires.selected.numInventaire,
      dateInventaire: helpers.getFormattedDate(),
      produits: newProduitsArr,
    };
    console.log(postObj);
    if (state.inventaires.selected.isNew) {
      let responseArray = await helpers.postJSONReturnResRespNoTO(
        `${API_URL}/Inventaire/createInventaire`,
        postObj
      );
      if (!responseArray[0].ok) {
        helpers.renderError(
          'ERREUR!',
          `${responseArray[1].error} car il semble qu'il vous manque la permission suivante: <br/>
        create inventaire :
        'Créer un nouvel état d'état de l'inventaire',
        `
        );
        return false;
      }
      return responseArray;
    } else {
      let responseArray = await helpers.putJSONReturnResResp(
        `${API_URL}/Inventaire/updateInventaire`,
        postObj
      );
      if (!responseArray[0].ok) {
        helpers.renderError(
          'ERREUR!',
          `${responseArray[1].error} car il semble qu'il vous manque la permission suivante: <br/>
        update inventaire :
        'Metter à jour un nouvel état d'état de l'inventaire (continuer la saisie)',
        `
        );
        return false;
      }
      return responseArray;
    }
  } catch (err) {
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
  // return postObj;
  // return;
};

export const confirmInv = async function (numInv) {
  try {
    console.log(numInv);
    let putObj = {
      numInventaire: state.inventaires.selected.numInventaire,
    };
    console.log(putObj);
    let responseArray = await helpers.putJSON(
      `${API_URL}/Inventaire/confirmInventaire`,
      putObj
    );
    if (!responseArray[0].ok) {
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].error} car il semble qu'il vous manque la permission suivante: <br/>
        confirm inventaire :
        'Confirmer/finaliser un nouvel état d'état de l'inventaire',
        `
      );
      return false;
    }
    return responseArray;
  } catch (err) {
    console.err(err);
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
  // return postObj;
  // return;
};

export const prepareNewInventaire = async function (productsArr = []) {
  const newInv = productsArr.map(product => {
    return {
      raison: '',
      designation: product.produit,
      reference: product.reference,
      num_inventaire: product.num_inventaire,
      chapitre: product.chapitre,
      article: product.article,
      present: false,
      remote: product.num_inventaire ? true : false,
      /*    "produit": "Photocopieur LEX MARK MX510",
            "reference": "a1",
            "num_inventaire": 55,
            "date_inventaire": "2024-05-13T23:00:00.000Z"
             */
    };
  });
  console.log(newInv);
  state.inventaires.new.isNew = true;
  state.inventaires.new.numInventaire = '';
  //TODO: these are pointers and not copies. ... so if produits changes, oldProducts also changes!!
  // state.inventaires.new.oldProducts = Array.makeShallowCopy(newInv);
  state.inventaires.new.oldProducts = newInv.map(item => ({ ...item }));
  state.inventaires.new.produits = newInv;

  return newInv;
};

export const loadChapitres = async function () {
  try {
    const data = await helpers.getJSON(`${API_URL}/Nomenclatures/showChapters`);
    console.log(data.response);
    state.chapters.all = data.response;
  } catch (error) {
    console.error('Error loadChapitres :' + error);
  }
};

export const addChapter = async function (newChapter) {
  try {
    const res = await helpers.sendJSON(
      `${API_URL}/Nomenclatures/addChapter`,
      newChapter
    );
    console.log(res);
  } catch (error) {
    console.error('Error addChapter :' + error);
  }
};

export const updateChapter = async function (oldChapter, newChapter) {
  try {
    const uploadData = {
      oldDesignation: oldChapter.designation,
      newDesignation: newChapter.designation,
    };
    const data = await helpers.putJSON(
      `${API_URL}/Nomenclatures/updateChapter`,
      uploadData
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteChapter = async function (chapter) {
  try {
    const uploadData = { designation: chapter.designation };
    const data = await helpers.delJSON(
      `${API_URL}/Nomenclatures/deleteChapter`,
      uploadData
    );
    if (data.response === 'prohibited to delete chapter')
      helpers.renderError(
        'Erreur de permission',
        'prohibited to delete chapter'
      );
  } catch (error) {
    console.error(error);
  }
};

export const deleteFournisseur = async function (fournisseur) {
  try {
    const uploadData = { raisonSociale: fournisseur.raison_sociale };
    const data = await helpers.delJSON(
      `${API_URL}/Nomenclatures/deleteFournisseur`,
      uploadData
    );
    if (data.response === 'prohibited to delete fournisseur')
      helpers.renderError(
        'Erreur de permission',
        'prohibited to delete fournisseur'
      );
  } catch (error) {
    console.error(error);
  }
};

export const addArticle = async function (newArticle) {
  try {
    const res = await helpers.sendJSON(
      `${API_URL}/Nomenclatures/addArticle`,
      newArticle
    );
    console.log(res);
  } catch (error) {
    console.error('Error addArticle :' + error);
  }
};

export const deleteArticle = async function (article) {
  try {
    const uploadData = { designation: article.designation };
    const data = await helpers.delJSON(
      `${API_URL}/Nomenclatures/deleteArticle`,
      uploadData
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const updateArticle = async function (oldArticle, newArticle) {
  try {
    const uploadData = {
      oldArticle: oldArticle,
      newArticle: newArticle,
    };
    const data = await helpers.putJSON(
      `${API_URL}/Nomenclatures/updateArticle`,
      uploadData
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const addProduct = async function (newProduct) {
  try {
    const res = await helpers.sendJSON(
      `${API_URL}/Nomenclatures/addProduct`,
      newProduct
    );
    console.log(res);
  } catch (error) {
    console.error('Error addProduct :' + error);
  }
};

export const deleteInv = async function (numInventaire) {
  try {
    let delObj = { numInventaire };
    console.log(delObj);
    let responseArray = await helpers.delJSONReturnResResp(
      `${API_URL}/Inventaire/deleteInventaire`,
      delObj
    );
    if (!responseArray[0].ok) {
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].error} car il semble qu'il vous manque la permission suivante: <br/>
        delete inventaire:
        "Supprimer un état de l'inventaire",
        `
      );
      return false;
    }
    console.log(responseArray);
    return responseArray;
  } catch (err) {
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
};

export const getGraphPromise = async function (graphLink, optionalBody = null) {
  const resultsPro = await Promise.race([
    fetch(`${API_URL}/Statistique/${graphLink}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('JWT'),
        'Content-Type': 'application/json',
      },
      body: optionalBody && JSON.stringify(optionalBody),
    }),
    helpers.timeout(TIMEOUT_SEC),
  ]);
  return resultsPro.json();
};

export function updateRenderedInv(newlyRenderedArray) {
  state.inventaires.rendered = newlyRenderedArray;
}
export async function loadInventaire(numInventaire) {
  try {
    let post = { numInventaire };
    console.log(post);
    let responseArray = await helpers.postJSONReturnResResp(
      `${API_URL}/Inventaire/showInventaire`,
      post
    );
    console.log(responseArray);
    if (!responseArray[0].ok) {
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].response} car il semble qu'il vous manque la permission suivante: <br/>
        show inventaire:
        "Voir un état de l'inventaire",
        `
      );
      throw new Error(
        ` ${responseArray[1].response} -  (${responseArray[0].status}) `
      );
    }
    let produitsFetched = responseArray[1].response.map(prod => {
      let {
        date_inventaire,
        designation,
        num_inventaire,
        present,
        raison,
        reference,
      } = prod;
      return {
        present: present ? true : false,
        reference,
        num_inventaire,
        designation,
        raison,
        date_inventaire,
        remote: num_inventaire ? true : false,
      };
    });
    console.log('loadInventaire', produitsFetched);
    state.inventaires.selected.isNew = false;
    state.inventaires.selected.numInventaire = numInventaire;
    state.inventaires.selected.produits = produitsFetched;
    state.inventaires.selected.oldProduits = produitsFetched;
    return produitsFetched;
  } catch (err) {
    helpers.renderError(`ERREUR!`, `${err}`);
    console.error(err);
    return false;
  }
}
export async function validateInv(numInventaire) {
  try {
    let post = { numInventaire };
    console.log(post);
    let responseArray = await helpers.postJSONReturnResRespNoTO(
      `${API_URL}/Inventaire/validInventaire`,
      post
    );
    if (!responseArray[0].ok) {
      console.error(responseArray);
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].error} car il semble qu'il vous manque la permission suivante: <br/>
        valid inventaire:
        "Valider un état de l'inventaire",
        `
      );
      return false;
    }
    console.log(responseArray);
    return responseArray[1].response;
  } catch (err) {
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
}
export async function crushInv(numInventaire) {
  console.log('crushing', numInventaire);
  try {
    let post = { numInventaire };
    console.log(post);
    let responseArray = await helpers.putJSONReturnResResp(
      `${API_URL}/Inventaire/update`,
      post
    );
    if (!responseArray[0].ok) {
      console.error(responseArray);
      helpers.renderError(
        'ERREUR!',
        `${responseArray[1].error} car il semble qu'il vous manque la permission suivante: <br/>
        update:
        "Mise a jour de l'état de l'inventaire",
        `
      );
      return false;
    }
    console.log(responseArray);
    return responseArray[1].response;
  } catch (err) {
    helpers.renderError('FATAL ERROR!', `${err}`);
  }
}

export const updateFournisseur = async function (newFournisseur) {
  try {
    const uploadData = newFournisseur;
    const data = await helpers.putJSON(
      `${API_URL}/Nomenclatures/updateFournisseur`,
      uploadData
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const addFournisseur = async function (newFournisseur) {
  try {
    const res = await helpers.sendJSON(
      `${API_URL}/Nomenclatures/addFournisseur`,
      newFournisseur
    );
    console.log(res);
  } catch (error) {
    console.error('Error addFournisseur :' + error);
  }
};
