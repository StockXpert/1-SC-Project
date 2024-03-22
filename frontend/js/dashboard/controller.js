import * as model from './model.js';
import searchView from './views/searchView.js';
import usersView from './views/usersView.js';
import addUserView from './views/addUserView.js';
import sideView from './views/sideView.js';

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

const controlAddUser = async function (newUser) {
  try {
    //TODO: addUserView.renderSpinner();
    await model.uploadUser(newUser); //new User is going to be in this case here, data received from the upload form's submission (see addUserView.js)
    //treatment of that data retrieved from the view is delegated to the model - (model.uploadUser(newUser)) (in accordance with the MCV architecture)
    console.log(model.state.User);
    // update the view
    // usersView.render(model.state.User);

    // addUserView.renderMessage();

    // setTimeout(function () {
    //   addUserView.toggleWindow();
    // }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    //TODO addUserView.renderError(err.message);
    console.error(err);
  }
};

searchView.addHandlerSearch(controlSearchResults);
addUserView.addHandlerUpload(controlAddUser); //adds a handler function, but when that handler gets called, it gets called on data from the form submission          (see addUserView.js) (in this case the handler is controlAddUser())
sideView.addHandlerUtilisateurs(controlSearchResults);
