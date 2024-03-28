// import { async } from 'regenerator-runtime';
// import { config } from 'dotenv';
import { API_URL, FUSE_OPTIONS, TIMEOUT_SEC } from './config.js';
import * as helpers from './helpers.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs';
export const state = {
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
  displayed: {
    role: 'all',
    status: 'all',
    selected: 0,
  },
  structures: {
    results: [],
    selected: 0,
  },
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
    // console.log('loading search results...');
    const data = await helpers.getJSON(`${API_URL}/Users/showUsers`);
    // console.log(data);
    // console.log('loading search results...');
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

export const getUsersEmail = async function () {
  try {
    const data = await helpers.getJSON(`${API_URL}/Users/showUsers`);
    // console.log(data.response.map(user => user.email));
    return data.response.map(user => {
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
    roles.response.forEach(role => rolesArray.push(role.designation));
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
