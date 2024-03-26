import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import searchView from './views/searchView.js';
import usersView from './views/usersView.js';
import addUserView from './views/addUserView.js';
import sideView from './views/sideView.js';
import numberView from './views/numberView.js';
import editUserView from './views/editUserView.js';
import structuresView from './views/structuresView.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.5.3/dist/fuse.esm.js';
import addStructureView from './views/addStructureView.js';
//controller is the mastermind behind the applciation
//it orchestrates the entire thing, even the rendering (calls a function from the views that's responsible of rendering and gives it some data fetched by the model's functions to render it (the data as an argument))

const controlSearchResults = async function () {
  try {
    //TODO: renderSpinner();
    const query = searchView.getQuery();
    await model.loadSearchResults(query);
    usersView._clear();
    usersView.render(model.state.search.results);
    numberView.addHandlerNumber(controlNumber);
    numberView.addHandlerMasterCheckbox(controlNumber);
    // let editUserView = new EditUserView();
    return;
    //TODO: rendering the results of the query search
  } catch (err) {
    console.error(err);
    //TODO: throw err or treat it with a special func
  }
};
//controlAddUser is a handler function that takes in the newUser's data
// this taking of the newUser data is coded in the addHandlerUpload
const controlAddUser = async function (newUser) {
  try {
    //TODO: addUserView.renderSpinner();
    await model.uploadUser(newUser); //new User is going to be in this case here, data received from the upload form's submission (see addUserView.js)
    //treatment of that data retrieved from the view is delegated to the model - (model.uploadUser(newUser)) (in accordance with the MCV architecture)
    addUserView.toggleWindow();
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

const controlNumber = function () {
  // console.log('CONTROL NUMBER');
  // console.log(model.state);
  numberView._clear();
  model.state.displayed.selected = numberView.calculateCheckboxes();

  numberView.render(model.state);
};

const controlLoadStructures = async function () {
  try {
    await model.loadStructures();
    // structuresView._clear();
    structuresView.render(model.state.structures);
  } catch (error) {
    console.error(error);
  }
};

const controlAddStructure = async function (newStructure) {
  try {
    await model.uploadStructure(newStructure);
    console.log(model.state.structures);
    structuresView.render(model.state.structures);
    addStructureView.clearForm();
    //Close Window
    // setTimeout(function () {
    //   addStructureView.toggleWindow();
    // }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
  }
};

const controlShowUsersEmail = async function () {
  try {
    const options = await model.getUsersEmail();
    addStructureView.addEmailsSelection(options);
  } catch (error) {
    console.error('🤔 ' + error);
  }
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
// editUserView.addHandlerUpload(controlAddUser, '.inputs-edit');
numberView.addHandlerNumber(controlNumber);
sideView.addHandlerUtilisateurs(controlSearchResults);
numberView.addHandlerMasterCheckbox(controlNumber);

controlShowUsersEmail();
controlLoadStructures();

addStructureView.addHandlerUpload(controlAddStructure);
