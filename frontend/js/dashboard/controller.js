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
import editRoleView from './views/roles/editRoleView.js';
import editPermsView from './views/roles/editPermsView.js';
import numberRoleView from './views/roles/numberRoleView.js';
import deleteStructureView from './views/deleteStructureView.js';
import cmdsView from './views/commandes/cmdsView.js';
import addStructureView from './views/addStructureView.js';
import addCmdsView from './views/commandes/addCmdsView.js';
import productsView from './views/commandes/productsView.js';

const controlUpdateMyPerms = async function () {
  // document.addEventListener('DOMContentLoaded', () => {
  sideView.renderSpinner();
  await model.getMyPerms();
  // sideView.hideBtns(model.state.me.permissions.all);
  // console.log(
  //   model.organizePermissionsByGroup(
  //     model.state.me.permissions.all,
  //     true,
  //     false
  //   )
  // );
  sideView.render(model.state.me.permissions.wellFormed);
  sideView.reselectBtns();
  // sideView.unrenderSpinner();
};
// console.log(model.state);
// };

await controlUpdateMyPerms();

//controller is the mastermind behind the applciation
//it orchestrates the entire thing, even the rendering (calls a function from the views that's responsible of rendering and gives it some data fetched by the model's functions to render it (the data as an argument))
// let editUserView = new EditUserView();

// THIS CONTROLLER HAPPENS AT PAGE LANDING :
const controlSearchResults = async function () {
  try {
    usersView.renderSpinner('');
    deleteUserView.restrict(model.state.me.permissions.all);
    addUserView.restrict(model.state.me.permissions.all);
    usersView.restrict(model.state.me.permissions.all);
    numberView._clear();
    await model.loadSearchResults();
    numberView.addHandlerNumber(controlNumber);
    searchView.addHandlerSearchV2(controlFuzzySearch);
    usersView.render(
      model.state.search.results,
      true,
      model.state.me.permissions.all
    );
    editUserView.restrict(model.state.me.permissions.all);
    controlAddUserUpdateSelects();
    userViewAdders();
    // D Y N A M I C   S E A R C H   A C T I V A T I O N :
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
  numberView.render(model.state);
};

const controlNumberRoles = function () {
  numberRoleView._clear();
  model.state.displayed.selectedRoles = numberRoleView.calculateCheckboxes();
  numberRoleView.render(model.state);
};

const controlDeleteCancelBtns = function (checkboxes) {
  let newStates = helpers.getCheckboxStates(checkboxes);
  let oldState = helpers.checkSpecialArray(
    checkboxes,
    model.state.roles.selected.droits
  );
  return helpers.compareBooleanArrays(newStates, oldState);
};

const controlDeleteRoles = function (containerClass = '.results') {
  helpers
    .filterNodeList(
      model.state.roles.all,
      helpers.getCheckboxStates(
        document
          .querySelector(containerClass)
          .querySelectorAll('input[type="checkbox"]')
      )
    )
    .forEach(async el => {
      console.log(el);
      // usersView.renderSpinner(
      //   "Suppression de l'utilisateur " + el.nom + ' ' + el.prenom + '...'
      // );
      // console.log({
      //   email: el.email,
      // });
      // await helpers.delJSON(`${API_URL}/Users/deleteUser`, {
      //   email: el.email,
      // });
      // back to main menu
      // controlSearchResults();
    });

  // console.log(model.state.search.queryResults);
  // const targetIndex = helpers.findNodeIndex(editUserView._btnOpen, target);
};

const controleSelectStructures = function () {
  numberStructuresView._clear();
  model.state.structures.selected = numberStructuresView.calculateCheckboxes();
  numberStructuresView.render(model.state.structures);
};

const controlLoadStructures = async function () {
  try {
    structuresView.restrict(model.state.me.permissions.all);
    AddStructureView.restrict(model.state.me.permissions.all);
    structuresView.renderSpinner('Loading Structures');
    await model.loadStructures();
    const emails = await model.getResponsiblesEmail();
    AddStructureView.addToSelection(emails, 'search-responsable');
    editStructureView.addToSelection(emails, 'search-structure-edit');
    structuresView.render(
      model.state.structures.results,
      true,
      model.state.me.permissions.all
    );
    numberStructuresView.render(model.state.structures);
    numberStructuresView.updateMasterCheckbox();
    numberStructuresView.addHandlerNumber(controleSelectStructures);
    numberStructuresView.addHandlerMasterCheckbox(controleSelectStructures);
    editStructureView.addHandlerShowWindow();
    editStructureView.addHandlerHideWindow();
    editStructureView.addHandlerEdit(controlEditStructure);
    // deleteStructureView.addDeleteController(controlDeleteStructure);
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
    setTimeout(function () {
      AddStructureView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
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
  // console.log('controlFilterring executed');
  controlFuzzySearch(filterValues[0], false, true);
  console.log('ctrl filterring');
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
    usersView.render(
      model.state.search.queryResults,
      true,
      model.state.me.permissions.all
    );
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
    usersView.render(
      model.state.search.queryResults,
      true,
      model.state.me.permissions.all
    );
    userViewAdders();
  }
  // console.log(model.state.search.queryResults);
  return model.state.search.queryResults;
};

const controlDeleteUsers = function (containerClass = '.results') {
  // function getCheckboxStates(checkboxes) {
  //   const checkboxStates = [];
  //   checkboxes.forEach(function (checkbox) {
  //     checkboxStates.push(checkbox.checked);
  //   });
  //   return checkboxStates;
  // }

  filterArrayByBooleans(
    model.state.search.queryResults,
    helpers.getCheckboxStates(
      document
        .querySelector(containerClass)
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
  // console.log('userViewAdders');
  // updates the checkboxes selectors
  numberView.masterSelectionUpdater();
  numberView.selectionUpdater();
  // adds to each of them an EL.onclick that re-renders the selected-number-of-users amount (to keep up with the changes in the checkboxes)
  numberView.addHandlerNumber(controlNumber);
  numberRoleView.addHandlerNumber(controlNumberRoles);
  //Re-Adds the eventListenner to the "Ajouter un User" btn:
  addUserView.addHandlerShowWindow('.add-users-btn', '.add-user-container');
  //Re-Adds the eventListenner to the "x" btn:
  addUserView.addHandlerHideWindow('.close-btn', '.add-user-container');
  //Re-Adds the eventListenner to the "x" btn:
  editUserView.addHandlerHideWindow('.close-btn-edit', '.edit-user-container');
  //Re-Adds the eventListenner to the "Annuler button":
  editUserView.addHandlerHideWindow(
    '.edit-btn-decline',
    '.edit-user-container'
  );
  //Updates the edit Btns' pointers:                     TODO:add these to the Role controller
  editUserView.addHandlerShowWindow('.details-btn', '.edit-user-container');
  //Adds an eventListenner to the edit Btns.onclick that updates the edit menu's inputs to match the clicked user's info: TODO:
  editUserView.addHandlerEdit(controlEditUser);

  //Updates the state of the masterCheeck box to match the searchResults
  numberView.updateMasterCheckbox();
  controlNumberRoles();
};

// addUserView.addHandlerUpdateSelects(controlAddUserUpdateSelects);
const controlAddUserUpdateSelects = async function () {
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
const controlEditRoleUpdateSelects = async function () {
  editPermsView.renderSpinner('Veuillez attendre un moment...', true);
  const roles = await model.getRoles();
  editPermsView.unrenderSpinner(true);
  editPermsView.addToSelection(roles, 'pick-role-options', 'role');
};

const controlLoadRoles = async function () {
  rolesView.renderSpinner('');
  const roles = await model.loadRoles();
  const wellFormedPermsWithinRoles = roles.map(role => {
    return {
      droits: model.organizePermissionsByGroup(role.droits, true, false),
      role: role.role,
    };
  });
  rolesView.render(wellFormedPermsWithinRoles);
  numberRoleView.selectionUpdater('.roles-cart');
  // numberRoleView.addHandlerNumber(controlNumberRoles);
  numberRoleView.addHandlerNumber(controlNumberRoles);
  controlNumberRoles();
  // SHOW PERM WINDOW
  editRoleView.addHandlerShowWindow('.role');
  //adding EL for: on CLICK OF A ROLE : UPDATE PERM VIEW
  editRoleView.addHandlerEdit(controlEditRole);
};
const controlLoadPerms = async function () {
  editPermsView.render('');
  editPermsView.setSelector(0);
  await model.loadRoles();
  //update the roleSelector from backend
  await controlEditRoleUpdateSelects();
};

//ONCLICK OF A ROLE
const controlEditRole = async function (
  event,
  usedRoleSelector = false,
  selectorIndex = undefined
) {
  if (event.target.type === 'checkbox') {
    return;
  }

  //Get the index of the clicked ROLE here
  const target = this;
  let targetIndex;

  if (usedRoleSelector) {
    targetIndex = selectorIndex;
  }

  if (!usedRoleSelector) {
    targetIndex = helpers.findNodeIndex(editRoleView._btnOpen, target);
    //update the roleSelector from backend
    await controlEditRoleUpdateSelects();
    //set its value to reflect clicked role
    editPermsView.setSelector(targetIndex + 1);
  }

  //update state to reflect clicked role
  console.log(model.state.roles.all);
  console.log(model.state);
  model.state.roles.selected = model.state.roles.all[targetIndex];
  console.log(model.state.roles.selected);

  editPermsView.renderSpinner();
  // update model.state.roles.allPermissions from backend
  await model.loadPerms();

  //update state.roles.wellFormed
  model.organizePermissionsByGroup(model.state.roles.allPermissions);

  //Use it to extract the input data from the state object
  editPermsView.render(model.state.roles.wellFormed);
  //reselect the perms checkboxes
  const checkboxes = editPermsView.updateThisCheckboxesPointers();

  //adding EL for DELETE/CANCEL BTNS TOGGLING ACCORDING TO IF USER HAS MADE A CHANGE OR NOT
  editPermsView.addHandlerDeleteCancelBtns(controlDeleteCancelBtns);

  //update them to reflect currently selected role
  helpers.setCheckboxStates(
    checkboxes,
    helpers.checkSpecialArray(checkboxes, model.state.roles.selected.droits)
  );
};

//Add and Delete Perms from Roles on perm.Submit
const controlUpdateRole = async function (changesObj) {
  console.log(model.state);
  let added = [];
  added = changesObj.add;
  let deleted = [];
  deleted = changesObj.delete;
  document.querySelector('.permissions-save-btns').classList.add('hidden');
  let permsAdded = helpers
    .filterNodeList(editPermsView.updateThisCheckboxesPointers(), added)
    .map(el => el.name);
  if (added.some(el => el === true)) {
    editUserView.renderSpinner('Ajout des permissions en cours...');
    await model.addPermsToRole(permsAdded, model.state.roles.selected.role);
    await controlUpdateMyPerms();
  }
  let permsDeleted = helpers
    .filterNodeList(editPermsView.updateThisCheckboxesPointers(), deleted)
    .map(el => el.name);
  if (deleted.some(el => el === true)) {
    editUserView.renderSpinner('Suppression des permissions en cours...');
    await model.delPermsFromRole(permsDeleted, model.state.roles.selected.role);
    await controlUpdateMyPerms();
  }
};

const controlReloadPerms = e => {
  e.preventDefault();
  const checkboxes = document
    .querySelector('.container-checkboxes-permissions')
    .querySelectorAll('input[type=checkbox]');
  console.log(checkboxes);

  helpers.setCheckboxStates(
    checkboxes,
    helpers.checkSpecialArray(checkboxes, model.state.roles.selected.droits)
  );
  document.querySelector('.permissions-save-btns').classList.add('hidden');
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
// editPermsView.addHandlerUpload(controlUpdateRole);

const controlAddRole = async function (newRole) {
  try {
    console.log(newRole);
    rolesView.renderSpinner('Ajout du role ' + newRole.roleName + '...');
    await model.uploadRole(newRole); //new User is going to be in this case here, data received from the upload form's submission (see addUserView.js)
    //treatment of that data retrieved from the view is delegated to the model - (model.uploadUser(newUser)) (in accordance with the MCV architecture)
    controlLoadRoles();
  } catch (err) {
    console.error(err);
  }
};

const controlDeleteStructure = function () {
  filterArrayByBooleans(
    model.state.structures.results,
    helpers.getCheckboxStates(
      document
        .querySelector('.table-structures')
        .querySelectorAll('input[type="checkbox"]')
    )
  ).forEach(async el => {
    console.log(el);
    usersView.renderSpinner('Suppression Structure ' + el.designation + '...');
    await model.deleteStructure(el);
    // back to main menu
    await controlLoadStructures();
  });
};

function filterArrayByBooleans(dataArray, booleanArray) {
  const filteredArray = [];
  for (let i = 0; i < dataArray.length; i++) {
    if (booleanArray[i]) {
      filteredArray.push(dataArray[i]);
    }
  }
  return filteredArray;
}
const controlProfile = function () {
  sideView.divs.forEach(div => div.classList.add('hidden'));
  sideView.divs[0].classList.remove('hidden');
};

const controlRoleSwitch = (e, selectedIndex) => {
  controlEditRole(e, true, selectedIndex - 1);
};

const controlLoadCmds = async function () {
  cmdsView.renderSpinner();
  const cmds = await model.loadCmds();
  cmdsView.render(cmds);
};

const controlLoadCommandeproducts = async function () {
  const products = await model.loadCommandeproducts(8);
};

//FOURNISSEURS
const controlUpdateFournisseurs = async () => {
  //fetch all fournisseurs to model.state.fournisseurs
  const fournisseurs = await model.loadFournisseurs();
  model.state.fournisseurs.all = fournisseurs;
};

//ON INPUT FOURNISSEURS:
const controlSearchFournisseurs = input => {
  const fuze = model.fuseMakerFournisseurs(model.state.fournisseurs.all);
  const results = fuze.search(input);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  addCmdsView.addToSuggestionsFournisseursAndEL(
    extractItems(results),
    controlSelectFournisseur
  );
};

const controlSelectFournisseur = fournisseurName => {
  model.state.fournisseurs.selected = fournisseurName;
};

//ARTICLES

const controlUpdateArticles = async () => {
  //fetch all fournisseurs to model.state.fournisseurs
  const articles = await model.loadArticles();
  model.state.articles.all = articles;
};

const controlSearchArticles = input => {
  //ON INPUT:
  //get search input
  // input
  //get search results
  const fuze = model.fuseMakerArticles(model.state.articles.all);
  const results = fuze.search(input);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  //add results to html
  addCmdsView.addToSuggestionsArticlesAndEL(
    extractItems(results),
    controlSelectArticles
  );
  //update search result refrencers

  //re-add EL to the search results
};

//in addCmdsView:
//add EL ONINPUT TO #input-box

const controlSelectArticles = articleName => {
  model.state.articles.selected = articleName;
};

const controlTypeSelection = typeName => {
  model.state.type.selected = typeName;
  console.log(model.state);
};

// REMINDER TO ALWAYS WATCH FOR THE ADDEVENTLISTENNERS WITH THE UNNAMED CALLBACKS (see index2.html for demonstration)
//TODO: TEMPORARY
// await controlAddUserUpdateSelects();
// addUserView.addHandlerOpenWindowAndUpdateSelect(controlAddUserUpdateSelects);
// controlSearchResults();
// userViewAdders();

const controllers = [
  controlProfile,
  controlSearchResults,
  controlLoadStructures,
  controlLoadRoles,
  controlLoadPerms,
  ,
  ,
  ,
  ,
  ,
  ,
  controlLoadCmds,
];

addRoleView.addHandlerUpload(controlAddRole);
editPermsView.addHandlerUpload(controlUpdateRole);
editPermsView.addHandlerSwitch(controlRoleSwitch);
sideView.addHandlerBtns(controllers, '', model.state.me.permissions.all);
numberView.addHandlerMasterCheckbox(controlNumber);
searchView.addHandlerSearch(controlSearchResults);
searchView.addHandlerFilter(controlFilterring);
addUserView.addpasswordIconsEL();
addUserView.addHandlerHideWindow('.close-btn', '.add-user-container');
addUserView.addHandlerUpload(controlAddUser);
editUserView.addHandlerUpload(controlUpdateUser);
deleteUserView.addDeleteController(controlDeleteUsers);
editRoleView.addHandlerHideWindow('.cancel-permission-btn', controlReloadPerms);
// controlShowUsersEmail();
numberRoleView.addHandlerNumber(controlNumberRoles);
AddStructureView.addHandlerUpload(controlAddStructure);
numberStructuresView.addHandlerNumber(controlNumber);
numberStructuresView.addHandlerMasterCheckbox(controleSelectStructures);
// editStructureView.addHandlerShowWindow();
editStructureView.addHandlerEdit(controlEditStructure);
deleteStructureView.addDeleteController(controlDeleteStructure);
sideView.hideAllDivs();

controlUpdateFournisseurs();
addCmdsView.addHandlerFournisseurSearch(controlSearchFournisseurs);
controlUpdateArticles();
addCmdsView.addHandlerArticleSearch(controlSearchArticles);
addCmdsView.addTypeSelectHandler(controlTypeSelection);
