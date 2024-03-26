// import { async } from 'regenerator-runtime';
import { API_URL, TIMEOUT_SEC } from './config.js';
import * as helpers from './helpers.js';
// import Fuse from 'fuse.js';
export const state = {
  search: {
    query: '',
    results: [],
  },
  displayed: {
    role: 'all',
    status: 'all',
    selected: 0,
  },
  structures: [],
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
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
        role: usr.role ? helpers.roleTranslator(usr.role) : 'Aucun',
        // TODO: structure: usr.structure,
        structure: 'Cycle Superieur',
        active: usr.active ? 'Activé' : 'Désactivé',
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    console.log(`${err} 💔`);
    throw err;
  }
};

export const uploadUser = async function (data) {
  try {
    const postData = {
      email: data.email,
      role: data.roles,
      password: data.password,
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
    console.log(data.response);
    state.structures = data.response.map(str => {
      return {
        designation: str.designation,
        id: 1,
        responsible: str.id_resp,
        Assignment: 12,
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
    state.structures.push({
      designation: newStructure.name,
      id: 1,
      responsible: newStructure.responsable,
      Assignment: 12,
    });
    console.log(res);
  } catch (error) {
    console.error('Shit shit :' + error);
  }
};

export const getUsersEmail = async function () {
  try {
    const data = await helpers.getJSON(`${API_URL}/Users/showUsers`);
    console.log(data.response.map(user => user.email));
    return data.response.map(user => user.email);
  } catch (error) {
    console.error('Shit shit :' + error);
  }
};
