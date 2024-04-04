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
  bdc: {
    allCommandes: [],
    filtersState: [],
  },
  fournisseurs: {
    all: [],
    selected: '',
  },
  articles: {
    all: [],
    selected: '',
  },
  bdc_products: {
    all: [],
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
};
export const getMyPerms = async function () {
  const result = await helpers.getJSON(`${API_URL}/Users/showUser`);
  state.me = { ...result.response[0] };
  const myPerms = JSON.parse(localStorage.getItem('permissions'));
  state.me.permissions = {
    all: myPerms,
    wellFormed: organizePermissionsByGroup(myPerms, false, false),
  };
  return state.me;
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
    console.error(err);
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
    console.error('Shit shit :' + error);
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
    console.error('Shit shit :' + error);
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
        };
      });
  } catch (error) {
    console.error('Shit shit :' + error);
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
export const fuseMakerProducts = data => new Fuse(data, FUSE_OPTIONS_ARTICLES);

export const loadRoles = async function () {
  try {
    const data = await helpers.getJSON(`${API_URL}/Users/showRoles`);
    // console.log('loadRoles', data);
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
  let commandes = await helpers.getJSON(`${API_URL}/Entrees/showCommandes`);
  commandes = commandes.commandes;
  state.bdc.allCommandes = commandes;
  return commandes;
};
export const loadCommandeproducts = async function (numCommande) {
  let products = await helpers.getJSONBody(
    `${API_URL}/Entrees/showCommandeProducts`,
    { numCommande: `${numCommande}` }
  );
  console.log(products);
  // produits = produits.produits;
  // return produits;
};

export const loadFournisseurs = async function () {
  let fournisseurs = await helpers.getJSON(
    `${API_URL}/Nomenclatures/showFournisseurs`
  );
  // console.log(fournisseurs);
  return fournisseurs.response;
};

export const loadArticles = async function () {
  let articles = await helpers.getJSON(`${API_URL}/Nomenclatures/showArticles`);
  return articles.response;
};

export const loadProducts = async function (article) {
  let products = await helpers.getJSON(`${API_URL}/Nomenclatures/showProducts`);
  return helpers.filterByArticle(products.response, article);
};

export const createBDC = async function () {
  const postBDCOBJ = {
    produits: state.bdc_products.added,
    objet: state.articles.selected,
    type: state.type.selected,
    fournisseur: state.fournisseurs.selected,
    date: helpers.getFormattedDate(),
  };
  console.log(postBDCOBJ);
  await helpers.sendJSON(`${API_URL}/Entrees/bonCommande`, postBDCOBJ);
};
export const deleteCmd = async function (numCommande) {
  return await helpers.delJSONReturnResResp(
    `${API_URL}/Entrees/deleteCommande`,
    {
      numCommande: numCommande,
    }
  );
};
