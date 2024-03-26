// import { async } from 'regenerator-runtime';
import { API_URL, FUSE_OPTIONS, TIMEOUT_SEC } from './config.js';
import * as helpers from './helpers.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs';
export const state = {
  search: {
    query: '',
    results: [],
    queryResults: [],
  },
  displayed: {
    role: 'all',
    status: 'all',
    selected: 0,
  },
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await helpers.getJSON(`${API_URL}/Users/showUsers`);
    console.log(data);
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
        active: usr.active,
        date_naissance: helpers.formatDate(usr.date_naissance),
      };
    });
    state.search.queryResults = state.search.results;
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

//fuzzySearch is basically a searchFunction MAKER
//the searchFunction it made is fuzzySearchBrowsersList
// export const fuzzySearcher = helpers.fuzzySearch(
//   [state.search.results],
//   ['email', 'date_naissance', 'prenom', 'nom', 'role', 'structure']
// );
const data = [
  {
    email: '',
    prenom: '',
    nom: '',
    role: null,
    structure: 'Cycle Supérieure',
    active: 1,
    date_naissance: '1970-01-01',
  },
  {
    email: 'a.baghdadli@esi-sba.dz',
    prenom: 'Abdelhadi',
    nom: 'BAGHDADLI',
    role: 'Administrateur System',
    structure: 'Cycle Supérieure',
    active: 1,
    date_naissance: '2004-04-19',
  },
  {
    email: 'DG@esi-sba.dz',
    prenom: 'Kamil',
    nom: 'KAZI',
    role: 'Directeur',
    structure: 'Cycle Supérieure',
    active: 1,
    date_naissance: '2003-05-28',
  },
  {
    email: 'kam@esi-sba.dz',
    prenom: 'Kamil',
    nom: 'KAZI',
    role: 'Administrateur System',
    structure: 'Cycle Supérieure',
    active: 1,
    date_naissance: '2003-05-28',
  },
  {
    email: 'ms.senhadji@esi-sba.dz',
    prenom: '',
    nom: 'ms.senhadji',
    role: 'Consommateur',
    structure: 'Cycle Supérieure',
    active: 1,
    date_naissance: '1970-01-01',
  },
  {
    email: 'o.djeziri@esi-sba.dz',
    prenom: 'Oussama',
    nom: 'DJEZIRI',
    role: 'Administrateur System',
    structure: 'Cycle Supérieure',
    active: 1,
    date_naissance: '2002-12-30',
  },
  {
    email: 'ServiceAchat@esi-sba.dz',
    prenom: '',
    nom: 'Service Achat',
    role: 'Service achat',
    structure: 'Cycle Supérieure',
    active: 1,
    date_naissance: '2003-05-28',
  },
];
export const fuseMaker = data => new Fuse(data, FUSE_OPTIONS);
