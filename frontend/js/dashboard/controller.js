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
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.5.3/dist/fuse.esm.js';
import AddStructureView from './views/addStructureView.js';
import * as helpers from './helpers.js';
import numberStructuresView from './views/numberStructuresView.js';
import editStructureView from './views/editStructureView.js';
import structuresView from './views/structuresView.js';
import rolesView from './views/roles/rolesView.js';
import addRoleView from './views/roles/addRoleView.js';

//controller is the mastermind behind the applciation
//it orchestrates the entire thing, even the rendering (calls a function from the views that's responsible of rendering and gives it some data fetched by the model's functions to render it (the data as an argument))
// let editUserView = new EditUserView();

// THIS CONTROLLER HAPPENS AT PAGE LANDING :
const controlSearchResults = async function () {
  try {
    usersView.renderSpinner('');
    await model.loadSearchResults();
    await controlAddUserUpdateSelects();
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
  const targetIndex = helpers.findNodeIndex(
    document.querySelectorAll('.details-btn-structures'),
    target
  );
  // console.log(targetIndex);
  // console.log(model.state.structures.results[targetIndex]);
  editStructureView.changeInputs(model.state.structures.results[targetIndex]);
  editStructureView.addHandlerUpdate(controlUpdateStructure);
};

const controlUpdateStructure = async function (oldStructure, newStructure) {
  try {
    // if (
    //   Object.entries(helpers.getUpdateObject(oldStructure, newStructure))
    //     .length === 0
    // ) return;
    // console.log(oldStructure.designation, newStructure.designation);
    if (oldStructure.designation === newStructure.designation) return;
    structuresView.renderSpinner('Modification de la structure...');
    await model.updateStructure(oldStructure, newStructure);
    controlLoadStructures();
  } catch (error) {
    console.error(error);
  }
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
    structuresView.renderSpinner('Loading Structures');
    await model.loadStructures();
    console.log('LOADED !');
    structuresView.render(model.state.structures.results);
    numberStructuresView.render(model.state.structures);
    numberStructuresView.updateMasterCheckbox();
    numberStructuresView.addHandlerNumber(controleSelectStructures);
    numberStructuresView.addHandlerMasterCheckbox(controleSelectStructures);
    editStructureView.addHandlerShowWindow();
    editStructureView.addHandlerHideWindow();
    editStructureView.addHandlerEdit(controlEditStructure);
  } catch (error) {
    console.error(error);
  }
};

const controlAddStructure = async function (newStructure) {
  try {
    await model.uploadStructure(newStructure);
    console.log(model.state.structures.results);
    await controlLoadStructures();
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
    const emails = await model.getResponsiblesEmail();
    AddStructureView.addToSelection(emails, 'search-responsable');
    editStructureView.addToSelection(emails, 'search-structure-edit');
  } catch (error) {
    console.error('🤔 ' + error);
  }
};
// SEARCH

//ON FILTER CHANGE
const controlFilterring = function (filterValues, isFilterring) {
  model.updateFilters(filterValues, isFilterring);
  // use controlFuzzySearch to update model.state.search.filteredResults
  controlFuzzySearch(filterValues[0], false, true);
  const filteredResults = controlFuzzySearch(filterValues[1], true, true);
  //updating filteredResults
  // console.log(filteredResults);
  model.state.search.filteredResults = filteredResults;
};

const controlFuzzySearch = function (
  searchKeyword,
  isSubseqFilter = false,
  isGettingfGR = false
) {
  // console.log(model.state.search.filters.isFilterring);
  let fuse = '';
  //if isntFiltering then
  // if (!model.state.search.filters.isFilterring) {
  if (isGettingfGR) {
    if (!isSubseqFilter) fuse = model.fuseMaker(model.state.search.results);
    else {
      fuse = model.fuseMaker(model.state.search.queryResults);
    }
  } else {
    if (model.state.search.filters.isFilterring)
      fuse = model.fuseMaker(model.state.search.filteredResults);
    else fuse = model.fuseMaker(model.state.search.results);
  }
  //else (isFiltering)
  const filteredList = fuse.search(searchKeyword);
  // console.log(filteredList);
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
    if (isGettingfGR) {
      if (!isSubseqFilter) {
        model.state.search.queryResults = model.state.search.results;
      }
    } else {
      if (model.state.search.filters.isFilterring) {
        model.state.search.queryResults = model.state.search.filteredResults;
      } else {
        model.state.search.queryResults = model.state.search.results;
      }
    }
    usersView.render(model.state.search.queryResults);
    userViewAdders(model.state.search.queryResults);
  }
  // console.log(model.state.search.queryResults);
  return model.state.search.queryResults;
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
const userViewAdders = async function () {
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
// addUserView.addHandlerUpdateSelects(controlAddUserUpdateSelects);
const controlAddUserUpdateSelects = async function () {
  console.log('Updating AddUser inputs ...');
  addUserView.renderSpinner('Veuillez attendre un moment...');
  const roles = await model.getRoles();
  addUserView.addToSelection(roles, 'role-options', 'role');
  const structures = await model.getStructures();
  addUserView.addToSelection(
    structures,
    'structure-add-user-options',
    'structure'
  );
  addUserView.unrenderSpinner();
};

const controlLoadRoles = async function () {
  rolesView.renderSpinner('');
  const roles = await model.loadRoles();
  rolesView.render(roles);
  addRoleView.addHandlerShowWindow('#add-btn-role', '.add-role-container');
  addRoleView.addHandlerHideWindow(
    '.close-btn-add-role',
    '.add-role-container'
  );
};

// const controlSearchResults = async function () {
//   try {
//     usersView.renderSpinner('');
//     await model.loadSearchResults();
//     await controlAddUserUpdateSelects();
//     // D Y N A M I C   S E A R C H   A C T I V A T I O N :
//     searchView.addHandlerSearchV2(controlFuzzySearch);
//     usersView.render(model.state.search.results);
//     userViewAdders();
//     return;
//   } catch (err) {
//     console.error(err);
//     //TODO: throw err or treat it with a special func
//   }
// };

// REMINDER TO ALWAYS WATCH FOR THE ADDEVENTLISTENNERS WITH THE UNNAMED CALLBACKS (see index2.html for demostration)
//TODO: TEMPORARY
// await controlAddUserUpdateSelects();
// addUserView.addHandlerOpenWindowAndUpdateSelect(controlAddUserUpdateSelects);
controlSearchResults();
userViewAdders();
const controllers = [
  controlSearchResults,
  controlLoadStructures,
  controlLoadRoles,
];
sideView.addHandlerBtns(controllers);
numberView.addHandlerMasterCheckbox(controlNumber);
searchView.addHandlerSearch(controlSearchResults);
searchView.addHandlerFilter(controlFilterring);
addUserView.addHandlerUpload(controlAddUser);
editUserView.addHandlerUpload(controlUpdateUser);
deleteUserView.addDeleteController(controlDeleteUsers);

controlShowUsersEmail();

AddStructureView.addHandlerUpload(controlAddStructure);
numberStructuresView.addHandlerNumber(controlNumber);
numberStructuresView.addHandlerMasterCheckbox(controleSelectStructures);

// editStructureView.addHandlerShowWindow();
// editStructureView.addHandlerEdit(controlEditStructure);
