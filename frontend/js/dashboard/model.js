// import { async } from 'regenerator-runtime';
import { API_URL, TIMEOUT_SEC } from './config.js';
import { getJSON, sendJSON } from './helpers.js';
export const state = {
  search: {
    query: '',
    results: [],
  },
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    //TODO: ${API_URL}
    const data = await getJSON(`${API_URL}/Users/showUsers`);
    // TODO: console.log(data);

    state.search.results = data.response.map(usr => {
      return {
        email: usr.email,
        prenom: usr.prénom,
        nom: usr.nom,
        roles: usr.role,
        //TODO: they are all set to active for now
        active: true,
      };
    });
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
