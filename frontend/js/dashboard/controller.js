import * as model from './model.js';
import searchView from './views/searchView.js';
import usersView from './views/usersView.js';
// import { AddUserView } from './views/addUserView.js';
// import { EditUserView } from './views/editUserView.js';
import addUserView from './views/addUserView.js';
import editUserView from './views/editUserView.js';
import sideView from './views/sideView.js';
import numberView from './views/numberView.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.5.3/dist/fuse.esm.js';
//controller is the mastermind behind the applciation
//it orchestrates the entire thing, even the rendering (calls a function from the views that's responsible of rendering and gives it some data fetched by the model's functions to render it (the data as an argument))
// let editUserView = new EditUserView();

const controlSearchResults = async function () {
  try {
    //TODO: renderSpinner();
    // usersView.renderSpinner();
    const query = searchView.getQuery();
    // usersView._clear();
    usersView.renderSpinner('');
    await model.loadSearchResults(query);
    usersView.render(model.state.search.results);
    numberView.addHandlerNumber(controlNumber);
    numberView.addHandlerMasterCheckbox(controlNumber);
    addUserView.addHandlerShowWindow('.add-users-btn', '.add-user-container');
    addUserView.addHandlerHideWindow('.close-btn', '.add-user-container');
    editUserView.addHandlerHideWindow(
      '.close-btn-edit',
      '.edit-user-container'
    );
    editUserView.addHandlerShowWindow('.details-btn', '.edit-user-container');
    return;
    //TODO: rendering the results of the query search
  } catch (err) {
    console.error(err);
    //TODO: throw err or treat it with a special func
  }
};
// controlAddUser is a handler function that takes in the newUser's data
// this taking of the newUser data is coded in the addHandlerUpload
const controlAddUser = async function (newUser) {
  try {
    //TODO: addUserView.renderSpinner();
    console.log(newUser);
    // await model.uploadUser(newUser); //new User is going to be in this case here, data received from the upload form's submission (see addUserView.js)
    //treatment of that data retrieved from the view is delegated to the model - (model.uploadUser(newUser)) (in accordance with the MCV architecture)
    addUserView.toggleWindow();
    console.log(model.state.User);
  } catch (err) {
    console.error(err);
  }
};

const controlNumber = function () {
  // console.log('CONTROL NUMBER');
  // console.log(model.state);
  numberView._clear();
  model.state.displayed.selected = numberView.calculateCheckboxes();

  numberView.render(model.state);
};

// SEARCH

const fuzzySearchFunctionMaker = (list, keys = []) => {
  const fuse = new Fuse(list, { ...FUSE_OPTIONS, keys });
  return pattern => fuse.search(pattern);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//TODO: TEMPORARY
controlSearchResults();
//
//
//
//
//
//
//

searchView.addHandlerSearch(controlSearchResults);
addUserView.addHandlerUpload(controlAddUser, '.add-user-inputs'); //adds a handler function, but when that handler gets called, it gets called on data from the form submission          (see addUserView.js) (in this case the handler is controlAddUser())
editUserView.addHandlerUpload(controlAddUser, '.inputs-edit'); //adds a handler function, but when that handler gets called, it gets called on data from the form submission          (see addUserView.js) (in this case the handler is controlAddUser())
// editUserView.addHandlerUpload(controlAddUser, '.inputs-edit');
numberView.addHandlerNumber(controlNumber);
sideView.addHandlerUtilisateurs(controlSearchResults);
numberView.addHandlerMasterCheckbox(controlNumber);
