import * as model from './model.js';
import searchView from './views/searchView.js';
import usersView from './views/usersView.js';

// import 'core-js/stable';
// import regeneratorRuntime from 'regenerator-runtime/runtime.js';

const controlSearchResults = async function () {
  try {
    //TODO: renderSpinner();
    const query = searchView.getQuery();
    await model.loadSearchResults(query);
    usersView._clear();
    usersView.render(model.state.search.results);

    return;
    //TODO: rendering the results of the query search
  } catch (err) {
    console.error(err);
    //TODO: throw err or treat it with a special func
  }
};

searchView.addHandlerSearch(controlSearchResults);
