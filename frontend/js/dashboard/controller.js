import * as model from './model.js';
import { API_URL, MODAL_CLOSE_SEC } from './config.js';
import searchView from './views/searchView.js';
import usersView from './views/usersView.js';
// import { AddUserView } from './views/addUserView.js';
// import { EditUserView } from './views/editUserView.js';
import addUserView from './views/addUserView.js';
import sideView from './views/sideView.js';
import numberView from './views/numberView.js';
import editUserView from './views/editUserView.js';
import deleteUserView from './views/deleteUserView.js';
import StructuresView from './views/structuresView.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.5.3/dist/fuse.esm.js';
import AddStructureView from './views/addStructureView.js';
import * as helpers from './helpers.js';
import numberStructuresView from './views/numberStructuresView.js';
import editStructureView from './views/editStructureView.js';

//controller is the mastermind behind the applciation
//it orchestrates the entire thing, even the rendering (calls a function from the views that's responsible of rendering and gives it some data fetched by the model's functions to render it (the data as an argument))
// let editUserView = new EditUserView();

// THIS CONTROLLER HAPPENS AT PAGE LANDING :
const controlSearchResults = async function () {
  try {
    usersView.renderSpinner('');
    await model.loadSearchResults();
    // D Y N A M I C   S E A R C H   A C T I V A T I O N :
    searchView.addHandlerSearchV2(controlFuzzySearch);
    usersView.render(model.state.search.results);
    userViewAdders();
    return;
  } catch (err) {
    console.error(err);
    //TODO: throw err or treat it with a special func
  }
};
// controlAddUser is a handler function that takes in the newUser's data
// this taking of the newUser data is coded in the addHandlerUpload
const controlAddUser = async function (newUser) {
  try {
    console.log(newUser);
    usersView.renderSpinner("Ajout de l'utilisateur " + newUser.name + '...');
    await model.uploadUser(newUser); //new User is going to be in this case here, data received from the upload form's submission (see addUserView.js)
    //treatment of that data retrieved from the view is delegated to the model - (model.uploadUser(newUser)) (in accordance with the MCV architecture)
    controlSearchResults();
  } catch (err) {
    console.error(err);
  }
};

const controlUpdateUser = async function (newUser) {
  try {
    if (
      Object.entries(helpers.getUpdateObject(model.state.user, newUser))
        .length === 0
    ) {
      controlSearchResults();
      return;
    }
    usersView.renderSpinner("Mise à jour de l'utilisateur ...");
    await model.updateUser(newUser);
    controlSearchResults();
  } catch (err) {
    console.error(err);
  }
};

const controlEditUser = function () {
  //ONCLICK OF A EDIT BUTTON
  //Get the index of the clicked edit button here
  const target = this;
  const targetIndex = helpers.findNodeIndex(editUserView._btnOpen, target);
  model.state.user = model.state.search.queryResults[targetIndex];
  //Use it to extract the input data from the state object
  editUserView.changeInputs(model.state.search.queryResults[targetIndex]);
  //                                                                           TODO:
};

const controlEditStructure = function () {
  const target = this;
  const targetIndex = helpers.findNodeIndex(editUserView._btnOpen, target);
  editStructureView.changeInputs(model.state.structures.results[targetIndex]);
};

const controlNumber = function () {
  numberView._clear();
  model.state.displayed.selected = numberView.calculateCheckboxes();
  // console.log('state updated :');
  // console.log(model.state);
  numberView.render(model.state);
};

const controleSelectStructures = function () {
  numberStructuresView._clear();
  model.state.structures.selected = numberStructuresView.calculateCheckboxes();
  numberStructuresView.render(model.state.structures);
};
const controlLoadStructures = async function () {
  try {
    console.log('LOADING STRUCTURES...');
    StructuresView.renderSpinner();
    await model.loadStructures();
    console.log('LOADED !');
    StructuresView.render(model.state.structures.results);
    numberStructuresView.render(model.state.structures);
    numberStructuresView.updateMasterCheckbox();
    numberStructuresView.addHandlerNumber(controleSelectStructures);
    numberStructuresView.addHandlerMasterCheckbox(controleSelectStructures);
  } catch (error) {
    console.error(error);
  }
};

const controlAddStructure = async function (newStructure) {
  try {
    await model.uploadStructure(newStructure);
    console.log(model.state.structures.results);
    StructuresView.render(model.state.structures.results);
    AddStructureView.clearForm();
    //Close Window
    // setTimeout(function () {
    //   AddStructureView.toggleWindow();
    // }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
  }
};

const controlShowUsersEmail = async function () {
  try {
    const options = await model.getUsersEmail();
    AddStructureView.addEmailsSelection(options);
  } catch (error) {
    console.error('🤔 ' + error);
  }
};
// SEARCH

const controlFilterring = function (filters, isFirst) {
  controlFuzzySearch(filters, isFirst);
};

const controlFuzzySearch = function (searchKeyword, isFirstFilter) {
  // console.log(model.state.search.results);
  let fuse = '';
  if (!isFirstFilter) {
    fuse = model.fuseMaker(model.state.search.results);
  } else {
    fuse = model.fuseMaker(model.state.search.queryResults);
  }
  const filteredList = fuse.search(searchKeyword);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  //        Q U E R Y        A I N ' T        E M P T Y
  if (!(searchKeyword.trim() === '')) {
    model.state.search.queryResults = extractItems(filteredList);
    usersView.render(model.state.search.queryResults);
    userViewAdders();
    //        Q U E R Y        I S        E M P T Y
  } else {
    if (!isFirstFilter)
      model.state.search.queryResults = model.state.search.results;
    //RERENDERRING RESULTS CONSTANTLY (This function will get re-executed on each search bar input change)
    //WERE PRING queryResults, so that's where the play is gonna happen
    usersView.render(model.state.search.queryResults);
    userViewAdders();
  }
  if (isFirstFilter) {
    model.state.search.filteredResults = model.state.search.queryResults;
    console.log('THE FILTERED RESULTS');
    console.log(model.state.search.filteredResults);
  }
};

const controlDeleteUsers = async function () {
  function getCheckboxStates(checkboxes) {
    const checkboxStates = [];
    checkboxes.forEach(function (checkbox) {
      checkboxStates.push(checkbox.checked);
    });
    return checkboxStates;
  }
  function filterArrayByBooleans(dataArray, booleanArray) {
    const filteredArray = [];
    for (let i = 0; i < dataArray.length; i++) {
      if (booleanArray[i]) {
        filteredArray.push(dataArray[i]);
      }
    }
    return filteredArray;
  }

  filterArrayByBooleans(
    model.state.search.queryResults,
    getCheckboxStates(
      document
        .querySelector('.results')
        .querySelectorAll('input[type="checkbox"]')
    )
  ).forEach(async el => {
    console.log(el);
    usersView.renderSpinner(
      "Suppression de l'utilisateur " + el.nom + ' ' + el.prenom + '...'
    );
    console.log({
      email: el.email,
    });
    await helpers.delJSON(`${API_URL}/Users/deleteUser`, {
      email: el.email,
    });
    // back to main menu
    controlSearchResults();
  });

  // console.log(model.state.search.queryResults);
  // const targetIndex = helpers.findNodeIndex(editUserView._btnOpen, target);
};

// deleteUserView.addDeleteController(controlDeleteUsers);
const userViewAdders = function () {
  numberView.masterSelectionUpdater();
  numberView.selectionUpdater();
  numberView.addHandlerNumber(controlNumber);
  addUserView.addHandlerShowWindow('.add-users-btn', '.add-user-container');
  addUserView.addHandlerHideWindow('.close-btn', '.add-user-container');
  editUserView.addHandlerHideWindow('.close-btn-edit', '.edit-user-container');
  editUserView.addHandlerHideWindow(
    '.edit-btn-decline',
    '.edit-user-container'
  );
  editUserView.addHandlerShowWindow('.details-btn', '.edit-user-container');
  editUserView.addHandlerEdit(controlEditUser);
  numberView.updateMasterCheckbox();
};
// REMINDER TO ALWAYS WATCH FOR THE ADDEVENTLISTENNERS WITH THE UNNAMED CALLBACKS (see index2.html for demostration)
//TODO: TEMPORARY
controlSearchResults();
userViewAdders();
const controllers = [controlSearchResults, controlLoadStructures];
sideView.addHandlerBtns(controllers);
numberView.addHandlerMasterCheckbox(controlNumber);
searchView.addHandlerSearch(controlSearchResults);
addUserView.addHandlerUpload(controlAddUser);
editUserView.addHandlerUpload(controlUpdateUser);
deleteUserView.addDeleteController(controlDeleteUsers);

controlShowUsersEmail();

AddStructureView.addHandlerUpload(controlAddStructure);
numberStructuresView.addHandlerNumber(controlNumber);
numberStructuresView.addHandlerMasterCheckbox(controleSelectStructures);

// editStructureView.addHandlerShowWindow();
// editStructureView.addHandlerEdit(controlEditStructure);
