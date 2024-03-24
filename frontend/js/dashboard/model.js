// import { async } from 'regenerator-runtime';
import { API_URL, TIMEOUT_SEC } from './config.js';
import { getJSON, sendJSON } from './helpers.js';
import Fuse from 'fuse.js';
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
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    //TODO: ${API_URL}
    const data = await getJSON(`${API_URL}/Users/showUsers`);
    console.log(data); // TODO:

    // state.search.results = data.response.map(usr => {
    state.search.results = data.map(usr => {
      return {
        email: usr.email,
        prenom: usr.prenom,
        nom: usr.nom,
        // roles: usr.role,
        roles: 'admin',
        structure: usr.structure,
        //TODO: they are all set to active for now
        active: true,
      };
    });
    console.log(state.search.results);
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
    const resp = await sendJSON(`${API_URL}/Users/Register`, postData);

    console.log(resp);
  } catch (err) {
    console.error(err);
  }
};
