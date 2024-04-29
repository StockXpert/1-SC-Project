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
import cmdsIntView from './views/commandesInt/cmdsIntView.js';
import addStructureView from './views/addStructureView.js';
import addCmdsView from './views/commandes/addCmdsView.js';
import addCmdsIntView from './views/commandesInt/addCmdsIntView.js';
import editCmdsIntView from './views/commandesInt/editCmdsIntView.js';
import productsView from './views/commandes/productsView.js';
import deleteRoleView from './views/roles/deleteRoleView.js';
import deleteCmdsView from './views/commandes/deleteCmdsView.js';
import bonReceptionView from './views/commandes/bonReceptionView.js';
import cancelCmdsView from './views/commandes/cancelCmdsView.js';
import seeCmdsView from './views/commandes/seeCmdsView.js';
import seeCmdsIntView from './views/commandesInt/seeCmdsIntView.js';
import addBonReception from './views/commandes/addBonReception.js';
import View from './views/view.js';
import deleteBonReception from './views/commandes/deleteBonReception.js';
// import numberAddProductsView from './views/commandes/numberAddProductsView.js';

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
    if (
      !model.state.me.permissions.all.find(
        perm => perm.designation == 'show users'
      )
    ) {
      sideView.btns[0].click();
      helpers.renderError(
        'Erreur',
        'Vous semblez manquer des permissions nécessaires pour afficher cette section'
      );
      return;
    }
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
const controlViewCmd = async function (target) {
  //ONCLICK OF A VIEW BUTTON
  //Get the index of the clicked view button here
  // const target = this;
  const targetIndex = helpers.findNodeIndex(seeCmdsView._btnOpen, target);
  // seeCmdsView.renderSpinner('Récupération des produits de la commande...');
  seeCmdsView.renderSpinner('', true);
  const products = await model.loadCommandeproducts(
    model.state.bdc.allCommandes[targetIndex].num_commande
  );
  seeCmdsView.unrenderSpinner(true);
  if (!products[0].ok) {
    helpers.renderError(
      'Erreur',
      `Une erreur s'est produite lors de la récupération des produits du bon de commande.`
    );
  } else {
    // model.state.user = model.state.search.queryResults[targetIndex];
    //Use it to extract the input data from the state object
    seeCmdsView.changeDetails(
      model.state.bdc.allCommandes[targetIndex],
      products[1].response
    );
  }
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

const controlDeleteRoles = async function () {
  rolesView.renderSpinner('Suppression des Roles ...');
  helpers
    .filterNodeList(
      model.state.roles.all,
      helpers.getCheckboxStates(
        document
          .querySelector('.roles-cart')
          .querySelectorAll('input[type="checkbox"]')
      )
    )
    .forEach(async el => {
      console.log(el.role);
      await model.deleteRole(el.role);
      // back to main menu
    });
  await controlLoadRoles();
};

const controleSelectStructures = function () {
  numberStructuresView._clear();
  model.state.structures.selected = numberStructuresView.calculateCheckboxes();
  numberStructuresView.render(model.state.structures);
};

const controlLoadStructures = async function () {
  try {
    if (
      !model.state.me.permissions.all.find(
        perm => perm.designation == 'show structure'
      )
    ) {
      sideView.btns[0].click();
      helpers.renderError(
        'Erreur',
        'Vous semblez manquer des permissions nécessaires pour afficher cette section'
      );
      return;
    }
    structuresView.restrict(model.state.me.permissions.all);
    AddStructureView.restrict(model.state.me.permissions.all);
    deleteStructureView.restrict(model.state.me.permissions.all);
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
  editPermsView.renderSpinner('Chargement des permissions...', true);
  const roles = await model.getRoles();
  editPermsView.unrenderSpinner(true);
  editPermsView.addToSelection(roles, 'pick-role-options', 'role');
};

const controlLoadRoles = async function () {
  if (
    !model.state.me.permissions.all.find(
      perm => perm.designation == 'show roles'
    )
  ) {
    sideView.btns[0].click();
    helpers.renderError(
      'Erreur',
      'Vous semblez manquer des permissions nécessaires pour afficher cette section'
    );
    return;
  }
  rolesView.renderSpinner('');
  deleteRoleView.restrict(model.state.me.permissions.all);
  addRoleView.restrict(model.state.me.permissions.all);
  const roles = await model.loadRoles();
  const wellFormedPermsWithinRoles = roles.map(role => {
    return {
      droits: model.organizePermissionsByGroup(role.droits, true, false),
      role: role.role,
    };
  });
  rolesView.render(
    wellFormedPermsWithinRoles,
    true,
    model.state.me.permissions.all
  );
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
  if (
    !model.state.me.permissions.all.find(
      perm => perm.designation == 'show permissions'
    )
  ) {
    sideView.btns[0].click();
    helpers.renderError(
      'Erreur',
      'Vous semblez manquer des permissions nécessaires pour afficher cette section'
    );
    return;
  }
  if (
    !model.state.me.permissions.all.find(
      perm => perm.designation == 'show roles'
    )
  ) {
    sideView.btns[0].click();
    helpers.renderError(
      'Erreur',
      'Vous semblez manquer des permissions nécessaires pour afficher cette section'
    );
    return;
  }
  editPermsView.renderSpinner('Chargement des Roles... ', true);
  editPermsView.setSelector(0);
  await model.loadRoles();
  editPermsView.unrenderSpinner(true);
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
  if (
    !model.state.me.permissions.all.find(
      perm => perm.designation == 'show permissions'
    )
  ) {
    sideView.btns[0].click();
    helpers.renderError(
      'Erreur',
      'Vous semblez manquer des permissions nécessaires pour afficher cette section'
    );
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
    if (model.state.roles.selected.role == model.state.me.role) {
      const newPerms = await model.getRolePerms(model.state.me.role);
      localStorage.setItem('permissions', JSON.stringify(newPerms));
    }
  }
  let permsDeleted = helpers
    .filterNodeList(editPermsView.updateThisCheckboxesPointers(), deleted)
    .map(el => el.name);
  if (deleted.some(el => el === true)) {
    editUserView.renderSpinner('Suppression des permissions en cours...');
    await model.delPermsFromRole(permsDeleted, model.state.roles.selected.role);
    await controlUpdateMyPerms();
    if (model.state.roles.selected.role == model.state.me.role) {
      const newPerms = await model.getRolePerms(model.state.me.role);
      localStorage.setItem('permissions', JSON.stringify(newPerms));
    }
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

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/////// B O N S  D E  C O M M A N D E S #fff
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
const controlCmdsSearch = function (query, filtersState) {};
const controlCmdsFiltersChanges = function (newFiltersState = {}) {
  model.state.bdc.filtersState = newFiltersState;

  console.log(model.state.bdc.filtersState);
  // switch
  //trigger a new search (with the same current query, but new search pool (according to the new filter state))
};

cmdsView.addHandlerCmdsFiltersChange(controlCmdsFiltersChanges);
cmdsView.addHandlerCmdsSearch(controlCmdsSearch, model.state.bdc.filtersState);
// searchView.addHandlerSearchV2(controlFuzzySearch);

const controlLoadCmds = async function () {
  if (
    !model.state.me.permissions.all.find(
      perm => perm.designation == 'show commandes'
    )
  ) {
    sideView.btns[0].click();
    helpers.renderError(
      'Erreur',
      'Vous semblez manquer des permissions nécessaires pour afficher cette section'
    );
    return;
  }
  cmdsView.renderSpinner();
  cancelCmdsView.restrict(model.state.me.permissions.all);
  addCmdsView.restrict(model.state.me.permissions.all);
  deleteCmdsView.restrict(model.state.me.permissions.all);
  await model.loadCmds();
  const allCommandes = model.state.bdc.allCommandes;
  cmdsView.render(allCommandes, true, model.state.me.permissions.all);
  seeCmdsView.resetPointers();
  seeCmdsView.addSeeController(controlViewCmd);
  cmdsView.resetPointers();
  bonReceptionView.f();
  bonReceptionView.addHandlerShow(controlLoadBRec);
  // const filter1Obj = {

  // }
  // const searchFilterObject = { $and: [filter1Obj, filter2Obj] };
};

// const controlLoadCommandeproducts = async function () {
//   const products = await model.loadCommandeproducts(8);
// };

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
  let displayedResults = extractItems(results);
  // displayedResults.push({
  //   raison_sociale: input,
  // });
  console.log(displayedResults);
  addCmdsView.addToSuggestionsFournisseursAndEL(
    displayedResults,
    controlSelectFournisseur
  );
  addCmdsView.resultVisibilityTogglers();
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
  addCmdsView.resultVisibilityTogglers();
  //update search result refrencers

  //re-add EL to the search results
};

//PRODUCTS
//products.all are filtered by the selected article
const controlUpdateProducts = async () => {
  const products = await model.loadProducts(model.state.articles.selected);
  model.state.bdc_products.all = products;
};

const controlSearchProducts = (input, type) => {
  //ON INPUT:
  const fuze = model.fuseMakerProducts(model.state.bdc_products.all);
  const results = fuze.search(input);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  switch (type) {
    case 'add':
      addCmdsView.addToSuggestionsProductsAndEL(extractItems(results));
      addCmdsView.resultVisibilityTogglers();
      break;
    case 'edit':
      addCmdsView.addToSuggestionsProductsAndEL(
        extractItems(results),
        '.product-search-results-container-edit'
      );
      addCmdsView.resultVisibilityTogglers();
      break;
  }
};

//in addCmdsView:
//add EL ONINPUT TO #input-box

const controlSelectArticles = articleName => {
  model.state.articles.selected = articleName;
  controlUpdateProducts();
};

const controlSelectProducts = productName => {
  model.state.bdc_products.selected = productName;
};

const controlTypeSelection = typeName => {
  model.state.type.selected = typeName;
  console.log(model.state);
};

const controlAddProduct = newProduct => {
  //TODO:
  // newProduct.numero = model.state.bdc_products.added.length + 1;

  model.state.bdc_products.added.push(newProduct);
  addCmdsView.render(model.state.bdc_products.added);
  addCmdsView._checkboxesAddProduct =
    addCmdsView._parentElement.querySelectorAll('input[type="checkbox"]');
  addCmdsView.AddHandlerAddedProductsCheckboxes();
  //TODO: edit btns
  addCmdsView.addHandlerShowEditProductWindow(
    '.details-btn-bdc-add',
    '.edit-product-bdc-container'
  );
  // editUserView.addHandlerEdit(controlEditUser);
  //TODO: hide btn
  addCmdsView.addHandlerEditProductBtns(controlEditProductBtns);
};

const controlDeleteAddedProducts = () => {
  const addedProductsAfterRemoval = helpers.removeArrayByBooleans(
    model.state.bdc_products.added,
    helpers.getCheckboxStates(addCmdsView._checkboxesAddProduct)
  );
  model.state.bdc_products.added = addedProductsAfterRemoval;
  addCmdsView.render(model.state.bdc_products.added);
  addCmdsView._checkboxesAddProduct =
    addCmdsView._parentElement.querySelectorAll('input[type="checkbox"]');
  addCmdsView.AddHandlerAddedProductsCheckboxes();
  //TODO: edit btns
  addCmdsView.addHandlerShowEditProductWindow(
    '.details-btn-bdc-add',
    '.edit-product-bdc-container'
  );
  //TODO: hide btn
  addCmdsView.addHandlerEditProductBtns(controlEditProductBtns);
};

//TODO:
const controlEditProductBtns = function () {
  //ONCLICK OF A EDIT BUTTON
  //Get the index of the clicked edit button here
  const target = this;
  const targetIndex = helpers.findNodeIndex(
    addCmdsView._btnsOpenEditProduct,
    target
  );
  //Use it to extract the input data from the state object
  addCmdsView.changeInputs(model.state.bdc_products.added[targetIndex]);
  model.state.bdc_products.changed = targetIndex;
};

const controlChangeProduct = function (editedProduct) {
  //TODO:
  model.state.bdc_products.added[model.state.bdc_products.changed] =
    editedProduct;
  addCmdsView.render(model.state.bdc_products.added);
  addCmdsView._checkboxesAddProduct =
    addCmdsView._parentElement.querySelectorAll('input[type="checkbox"]');
  addCmdsView.AddHandlerAddedProductsCheckboxes();
  //TODO: edit btns
  addCmdsView.addHandlerShowEditProductWindow(
    '.details-btn-bdc-add',
    '.edit-product-bdc-container'
  );
  //TODO: hide btn
  addCmdsView.addHandlerEditProductBtns(controlEditProductBtns);
  // numberRoleView.selectionUpdater('.table-container-bdc-produits');
};

const controlDeleteCmds = async function () {
  // cmdsView.renderSpinner('Suppression de la Commandes ...');
  console.log(
    helpers.filterNodeList(
      model.state.bdc.allCommandes,
      helpers.getCheckboxStates(
        document
          .querySelector('#main-table-bdc')
          .querySelector('.results')
          .querySelectorAll('input[type="checkbox"]')
      )
    )
  );

  helpers
    .filterNodeList(
      model.state.bdc.allCommandes,
      helpers.getCheckboxStates(
        document
          .querySelector('#main-table-bdc')
          .querySelector('.results')
          .querySelectorAll('input[type="checkbox"]')
      )
    )
    .forEach(async bdc => {
      // console.log(bdc.role);
      console.log(bdc);
      const responseNData = await model.deleteCmd(bdc.num_commande);
      console.log(responseNData);
      if (!responseNData[0].ok) {
        helpers.renderError(
          `Erreur lors de la suppression d'un Bon de Commande`,
          `Le Bon de Commande que vous voulez supprimer contient deja un bon de réception`
        );
      } else {
        await controlLoadCmds();
      }
      // back to main menu
    });
};
const controlCancelCmds = async function () {
  // cmdsView.renderSpinner('Suppression de la Commandes ...');
  console.log(
    helpers.filterNodeList(
      model.state.bdc.allCommandes,
      helpers.getCheckboxStates(
        document
          .querySelector('#main-table-bdc')
          .querySelector('.results')
          .querySelectorAll('input[type="checkbox"]')
      )
    )
  );

  helpers
    .filterNodeList(
      model.state.bdc.allCommandes,
      helpers.getCheckboxStates(
        document
          .querySelector('#main-table-bdc')
          .querySelector('.results')
          .querySelectorAll('input[type="checkbox"]')
      )
    )
    .forEach(async bdc => {
      // console.log(bdc.role);
      console.log(bdc);
      const responseNData = await model.cancelCmd(bdc.num_commande);
      console.log(responseNData);
      if (!responseNData[0].ok) {
        helpers.renderError(
          `Erreur lors de l'Annulation d'un Bon de Commande`,
          `Impossible d'annuler le Bon de commande`
        );
      } else {
        // e.preventDefault();
        // cancelCmdsView.closeBtn.click();
        await controlLoadCmds();
      }
      // back to main menu
    });
};

const controlLoadBRec = async function () {
  const target = this;
  const targetIndex = helpers.findNodeIndex(
    document.querySelectorAll('.view-btr-btn'),
    target
  );
  bonReceptionView._clear();
  await model.loadBonRec(
    model.state.bdc.allCommandes[targetIndex].num_commande
  );
  bonReceptionView.renderSpinner('Load BDR ...');
  bonReceptionView.render(model.state.bdr.all);
  addBonReception.f();
  addBonReception._clear();
  await model.loadBonRecProducts(model.state.bdr.all[0].num_bon);
  addBonReception.renderSpinner('Loading products');
  addBonReception.render(model.state.bdr_products.all);
  addBonReception.handleUpdate(controlAddBRec);
  deleteBonReception.addDeleteController(controlDeleteBonRec);
};

function fun() {
  console.log('fun');
}

const controlAddBRec = async function (
  numBonLivraison,
  numFacture,
  products,
  linkLivraison,
  linkFacture
) {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const day = String(new Date().getDate()).padStart(2, '0');

  const newReception = {
    numCommande: model.state.bdr.all[0].numCommande,
    numLivraison: numBonLivraison,
    numFacture: numFacture,
    produits: products,
    facture: linkFacture,
    bonLivraison: linkLivraison,
    dateReception: `${year}-${month}-${day}`,
  };

  await model.addBonReception(newReception);
  bonReceptionView.render(model.state.bdr.all);
};

const controlDeleteBonRec = async function () {
  filterArrayByBooleans(
    model.state.bdr.all,
    helpers.getCheckboxStates(
      document
        .querySelector('.results-bdrs')
        .querySelectorAll('input[type="checkbox"]')
    )
  ).forEach(async el => {
    console.log(el);
    // bonReceptionView.renderSpinner(
    //   'Suppression Structure ' + el.designation + '...'
    // );
    // await model.deleteBonRec(el.num_bon, el.numCommande);
    // // back to main menu
    // await controlLoadBRec();
  });
};
/*
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
*/

const controlSavingBDC = async function () {
  if (model.state.fournisseurs.selected == '') {
    helpers.renderError(
      `Erreur lors de l'introduction des données `,
      `<p class="error-message"><b>Aucun fournisseur n'a été sélectionné.</b></p>
      <p>Veuillez vérifier que celui-ci ainsi que le reste des entrées essentielles ont été séléctionnées depuis les menus déroulant qui apparaissent en-dessous des leurs barres de recherche respectifs.</p>`
    );
  } else if (model.state.articles.selected == '') {
    helpers.renderError(
      `Erreur lors de l'introduction des données `,
      `<p class="error-message"><b>Aucun article n'a été sélectionné. </b></p>
      <p class="error-message">Veuillez vérifier que celui-ci ainsi que le reste des entrées essentielles ont été séléctionnées depuis les menus déroulant qui apparaissent en-dessous des leurs barres de recherche respectifs.</p>`
    );
  } else if (model.state.type.selected == '') {
    helpers.renderError(
      `Erreur lors de l'introduction des données `,
      `<p class="error-message"><b>Aucun chapitre n'a été sélectionné. </b></p>
      <p class="error-message">Veuillez vérifier que celui-ci ainsi que le reste des entrées essentielles ont été séléctionnées depuis les menus déroulant qui apparaissent en-dessous des leurs barres de recherche respectifs.</p>`
    );
  } else if (model.state.bdc_products.added.length == 0) {
    helpers.renderError(
      `Erreur lors de l'introduction des données `,
      `<p class="error-message"><b>Aucun produit n'a été ajouté au bon de commande.</b></p>
      <p class="error-message">Veuillez ajouter les produits souhaités et vérifier s'ils sont affichés dans le tableau des produits.</p`
    );
  } else {
    await model.createBDC();
    // addCmdsView._boundToggleWindow();
    await controlLoadCmds();
  }
};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////// B O N S  D E  C O M M A N D E S  I N T E R N E S #fff
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
const controlLoadCmdsInt = async function () {
  if (
    !model.state.me.permissions.all.find(
      perm => perm.designation == 'show all demandes'
    )
  ) {
    sideView.btns[0].click();
    helpers.renderError(
      'Erreur',
      'Vous semblez manquer des permissions nécessaires pour afficher cette section'
    );
    return;
  }
  addCmdsIntView.allowSavingBDC(false, '.btn-save-bdci-qt');
  editCmdsIntView.allowSavingBDC(false, '.btn-save-edit-bdci-qt');
  model.state.bdci_products.added = [];
  addCmdsIntView.render(model.state.bdci_products.added);
  cmdsIntView.renderSpinner('Chagement des produits ...');
  await controlUpdateAllProducts();
  cmdsIntView.unrenderSpinner();
  cmdsIntView.renderSpinner('Chagement des commandes internes ...');
  // TODO:
  // TODO: cancelCmdsView.restrict(model.state.me.permissions.all);
  // TODO: addCmdsView.restrict(model.state.me.permissions.all);
  // TODO: deleteCmdsView.restrict(model.state.me.permissions.all);
  await model.loadCmdsInt();
  cmdsIntView.unrenderSpinner();
  cmdsIntView.render(
    model.state.commandesInt.all,
    true,
    model.state.me.permissions.all
  );
  seeCmdsIntView.resetPointers();
  // TODO:
  seeCmdsIntView.addSeeController(controlViewCmdInt);
  cmdsIntView.resetPointers();
  // bonReceptionView.f();
  // bonReceptionView.addHandlerShow(controlLoadBRec);
  // const filter1Obj = {

  // }
  // const searchFilterObject = { $and: [filter1Obj, filter2Obj] };
};

const controlAddProductInt = newProduct => {
  // ON SUBMIT:
  //TODO:
  // newProduct.numero = model.state.bdc_products.added.length + 1;
  let oldProducts;
  oldProducts = model.state.bdci_products.added;

  if (helpers.isObjectInArray(oldProducts, newProduct)) {
    helpers.renderError(
      'Erreur',
      `Le produit que vous essayez d'ajouter a déjà été ajouté à la commande.
      Utilisez le bouton 'Modifier (icône de stylo)' pour modifier un produit deja ajouté `
    );
  } else {
    addCmdsIntView.allowSavingBDC(true, '.btn-save-bdci-qt');
    oldProducts.push(newProduct);
    addCmdsIntView.render(oldProducts);
    addCmdsIntView._checkboxesAddProduct =
      addCmdsIntView._parentElement.querySelectorAll('input[type="checkbox"]');
    addCmdsIntView.AddHandlerAddedProductsCheckboxes();
    //TODO: edit btns
    addCmdsIntView.addHandlerShowEditProductWindow(
      '.details-btn-bdci-add',
      '.edit-product-bdci-container'
    );
    // editUserView.addHandlerEdit(controlEditUser);
    //TODO: hide btn
    addCmdsIntView.addHandlerEditProductBtns(controlEditProductBtnsInt);
  }
};

const controlUpdateAllProducts = async () => {
  const products = await model.loadAllProducts();
  model.state.bdci_products.all = products;
};

const controlSearchProductsInt = (input, type, view = addCmdsIntView) => {
  //ON INPUT:
  const fuze = model.fuseMakerProducts(
    //TODO: what about for modifyProduct? (a second type?) :
    helpers.subtractObjects(
      model.state.bdci_products.all,
      model.state.bdci_products.added,
      'designation'
    )
  );
  const results = fuze.search(input);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  switch (type) {
    case 'add':
      // view.addToSuggestionsProductsAndEL(
      //   extractItems(results),
      //   '.bdci-product-search-results-container'
      // );
      view.addToSuggestionsProductsAndEL(extractItems(results), 'add');
      view.resultVisibilityTogglers();
      break;
    case 'edit':
      // view.addToSuggestionsProductsAndEL(
      //   extractItems(results),
      //   '.bdci-product-search-results-container-edit'
      // );
      view.addToSuggestionsProductsAndEL(extractItems(results), 'edit');
      view.resultVisibilityTogglers();
      break;
  }
};

// const controlEditProductBtnsInt = function () {
//   //ONCLICK OF A EDIT BUTTON
//   //Get the index of the clicked edit button here
//   const target = this;
//   const targetIndex = helpers.findNodeIndex(
//     addCmdsIntView._btnsOpenEditProduct,
//     target
//   );
//   //Use it to extract the input data from the state object
//   addCmdsIntView.changeInputs(model.state.bdci_products.added[targetIndex]);
//   model.state.bdci_products.changed = targetIndex;
// };
const controlEditProductBtnsInt = (view = addCmdsIntView, e) => {
  //ONCLICK OF A EDIT BUTTON
  //Get the index of the clicked edit button here
  // const productsArray = (typeof view == 'EditCmdsIntView')?model.state.commandesInt.selected.products:;
  let productsArray;
  switch (view.constructor.name) {
    case 'EditCmdsIntView':
      console.log('hello');
      productsArray = model.state.commandesInt.selected.products;
      break;
    case 'AddCmdsIntView':
      console.log('hi');
      productsArray = model.state.bdci_products.added;
      break;
  }
  console.log(view.constructor.name);
  const target = e.currentTarget;
  const targetIndex = helpers.findNodeIndex(view._btnsOpenEditProduct, target);
  console.log(target);
  console.log(view);
  console.log(targetIndex);
  console.log(productsArray);
  //Use it to extract the input data from the state object
  view.changeInputs(productsArray[targetIndex]);
  model.state.bdci_products.changed = targetIndex;
  model.state.commandesInt.selected.changed = targetIndex;
};

const controlChangeProductInt = function (
  editedProduct,
  view = editCmdsIntView
) {
  //TODO:
  let BdciProdsCurrState;
  let changed;
  switch (view.constructor.name) {
    case 'AddCmdsIntView':
      BdciProdsCurrState = model.state.bdci_products.added;
      changed = model.state.bdci_products.changed;
      break;
    case 'EditCmdsIntView':
      BdciProdsCurrState = model.state.commandesInt.selected.products;
      changed = model.state.commandesInt.selected.changed;
      break;
  }
  if (
    helpers.isObjectInArray(BdciProdsCurrState, editedProduct) &&
    changed != helpers.objectIndexInArray(BdciProdsCurrState, editedProduct)
  ) {
    helpers.renderError(
      'Erreur',
      `Le produit que vous essayez d'ajouter a déjà été ajouté à la commande.`
    );
  } else {
    BdciProdsCurrState[changed] = editedProduct;
    switch (view.constructor.name) {
      case 'AddCmdsIntView':
        view.render(BdciProdsCurrState);
        //TODO: make it depend on if the user has really changed the products or not
        view.allowSavingBDC(true, '.btn-save-bdci-qt');
        break;
      case 'EditCmdsIntView':
        view.changeDetails(BdciProdsCurrState);
        view.allowSavingBDC(true, '.btn-save-edit-bdci-qt');
        break;
    }
    view._checkboxesAddProduct = view._parentElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    view.AddHandlerAddedProductsCheckboxes();
    //TODO: edit btns
    addCmdsIntView.addHandlerShowEditProductWindow(
      '.details-btn-bdci-add',
      '.edit-product-bdci-container'
    );
    editCmdsIntView.addHandlerShowEditProductWindow(
      '.details-btn-edit-bdci-add',
      '.edit-product-edit-bdci-container'
    );
    //TODO: hide btn
    view.addHandlerEditProductBtns(controlEditProductBtnsInt);
    // numberRoleView.selectionUpdater('.table-container-bdc-produits');
  }
};

// const controlDeleteAddedProductsInt = view => {
//   console.log(view.constructor.name);
//   const addedProductsAfterRemoval = helpers.removeArrayByBooleans(
//     model.state.bdci_products.added,
//     helpers.getCheckboxStates(addCmdsIntView._checkboxesAddProduct)
//   );
//   if (addedProductsAfterRemoval.length == 0)
//     addCmdsIntView.allowSavingBDC(false, '.btn-save-bdci-qt');
//   model.state.bdci_products.added = addedProductsAfterRemoval;
//   addCmdsIntView.render(model.state.bdci_products.added);
//   addCmdsIntView._checkboxesAddProduct =
//     addCmdsIntView._parentElement.querySelectorAll('input[type="checkbox"]');
//   addCmdsIntView.AddHandlerAddedProductsCheckboxes();
//   //TODO: edit btns
//   addCmdsIntView.addHandlerShowEditProductWindow(
//     '.details-btn-bdci-add',
//     '.edit-product-bdci-container'
//   );
//   //TODO: hide btn
//   addCmdsIntView.addHandlerEditProductBtns(controlEditProductBtnsInt);
// };
const controlDeleteAddedProductsInt = (view = editCmdsIntView) => {
  let BdciProdsCurrState;
  switch (view.constructor.name) {
    case 'AddCmdsIntView':
      BdciProdsCurrState = model.state.bdci_products.added;
      break;
    case 'EditCmdsIntView':
      BdciProdsCurrState = model.state.commandesInt.selected.products;
      break;
  }
  let addedProductsAfterRemoval = helpers.removeArrayByBooleans(
    BdciProdsCurrState,
    helpers.getCheckboxStates(view._checkboxesAddProduct)
  );
  BdciProdsCurrState = addedProductsAfterRemoval;
  switch (view.constructor.name) {
    case 'AddCmdsIntView':
      if (addedProductsAfterRemoval.length == 0) {
        view.allowSavingBDC(false, '.btn-save-bdci-qt');
      }
      model.state.bdci_products.added = BdciProdsCurrState;
      view.render(BdciProdsCurrState);
      break;
    case 'EditCmdsIntView':
      model.state.commandesInt.selected.products = BdciProdsCurrState;
      view.changeDetails(BdciProdsCurrState);
      view.allowSavingBDC(true, '.btn-save-edit-bdci-qt');
      if (addedProductsAfterRemoval.length == 0) {
        view.allowSavingBDC(false, '.btn-save-edit-bdci-qt');
      }
      break;
  }
  view._checkboxesAddProduct = view._parentElement.querySelectorAll(
    'input[type="checkbox"]'
  );
  view.AddHandlerAddedProductsCheckboxes();
  //TODO: edit btns
  addCmdsIntView.addHandlerShowEditProductWindow(
    '.details-btn-bdci-add',
    '.edit-product-bdci-container'
  );
  editCmdsIntView.addHandlerShowEditProductWindow(
    '.details-btn-edit-bdci-add',
    '.edit-product-edit-bdci-container'
  );
  //TODO: hide btn
  view.addHandlerEditProductBtns(controlEditProductBtnsInt);
  // numberRoleView.selectionUpdater('.table-container-bdc-produits');
};

const controlSavingBDCI = async function () {
  if (model.state.bdci_products.added.length == 0) {
    helpers.renderError(
      `Erreur lors de l'introduction des données `,
      `<p class="error-message"><b>Aucun produit n'a été ajouté au bon de commande.</b></p>
      <p class="error-message">Veuillez ajouter les produits souhaités et vérifier s'ils sont affichés dans le tableau des produits.</p`
    );
  } else {
    await model.createBDCI();
    // addCmdsView._boundToggleWindow();
    await controlLoadCmdsInt();
  }
};

const controlViewCmdInt = async function (target) {
  //ONCLICK OF A VIEW BUTTON
  //Get the index of the clicked view button here
  // const target = this;
  const targetIndex = helpers.findNodeIndex(seeCmdsIntView._btnOpen, target);
  seeCmdsIntView.renderSpinner('', true);
  // TODO:
  const products = await model.loadCommandeIntProducts(
    model.state.commandesInt.all[targetIndex].num_demande
  );
  seeCmdsIntView.unrenderSpinner(true);
  if (!products[0].ok) {
    helpers.renderError(
      'Erreur',
      `Une erreur s'est produite lors de la récupération des produits du bon de commande interne.`
    );
  } else {
    // model.state.user = model.state.search.queryResults[targetIndex];
    //Use it to extract the input data from the state object
    seeCmdsIntView.changeDetails(
      model.state.commandesInt.all[targetIndex],
      products[1].demande
    );
  }
};

const controlModifyCmdsInt = async function () {
  //ONCLICK OF the EDIT BUTTON
  //Get the index of the selected CmdInt
  // const target = this;
  // const targetIndex = helpers.findNodeIndex(editUserView._btnOpen, target);

  // const targetIndex = helpers.findNodeIndex(
  //   Array.from(cmdsIntView._checkboxes).find(checkbox => checkbox.checked),
  //   Array.from(cmdsIntView._checkboxes).find(checkbox => checkbox.checked)
  // );
  const targetIndex = Array.from(cmdsIntView._checkboxes).findIndex(
    checkbox => checkbox.checked
  );
  // #ffa TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
  const numDemande = model.state.commandesInt.all[targetIndex].num_demande;

  editCmdsIntView.renderSpinner('', true);
  let selectedCmdIntProducts = await model.loadCommandeIntProducts(
    model.state.commandesInt.all[targetIndex].num_demande
  );
  editCmdsIntView.unrenderSpinner(true);
  selectedCmdIntProducts = selectedCmdIntProducts[1].demande;
  // #ffa TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
  selectedCmdIntProducts = selectedCmdIntProducts.map(el => {
    return {
      designation: el.designation,
      quantite: el.quantite_demande,
    };
  });
  // Use it to extract the input data from the state object
  // editCmdsIntView.changeInputs(numDemande, selectedCmdIntProducts);

  model.state.commandesInt.selected.numDemande = numDemande;
  model.state.commandesInt.selected.new.numDemande = numDemande;
  model.state.commandesInt.selected.old.numDemande = numDemande;
  // model.state.commandesInt.selected.new.DELETED && ADDED ARE TBD

  model.state.commandesInt.selected.products = selectedCmdIntProducts;
  model.state.commandesInt.selected.old.products = selectedCmdIntProducts;
  editCmdsIntView.changeDetails(selectedCmdIntProducts, numDemande);
  editCmdsIntView._checkboxesAddProduct =
    editCmdsIntView._parentElement.querySelectorAll('input[type="checkbox"]');
  editCmdsIntView.AddHandlerAddedProductsCheckboxes();
  //TODO: edit btns
  editCmdsIntView.addHandlerShowEditProductWindow(
    '.details-btn-edit-bdci-add',
    '.edit-product-edit-bdci-container'
  );
  editCmdsIntView.addHandlerEditProductBtns(controlEditProductBtnsInt);
};

const controlAddProductIntEdit = newProduct => {
  // ON SUBMIT:
  let selectedBDCIProdsCurrState = model.state.commandesInt.selected.products;
  if (helpers.isObjectInArray(selectedBDCIProdsCurrState, newProduct)) {
    helpers.renderError(
      'Erreur',
      `Le produit que vous essayez d'ajouter a déjà été ajouté à la commande.
      Utilisez le bouton 'Modifier (icône de stylo)' pour modifier un produit deja ajouté `
    );
  } else {
    editCmdsIntView.allowSavingBDC(true, '.btn-save-edit-bdci-qt');
    selectedBDCIProdsCurrState.push(newProduct);
    editCmdsIntView.changeDetails(selectedBDCIProdsCurrState);
    // #fad
    editCmdsIntView._checkboxesAddProduct =
      editCmdsIntView._parentElement.querySelectorAll('input[type="checkbox"]');
    editCmdsIntView.AddHandlerAddedProductsCheckboxes();
    //TODO: edit btns
    editCmdsIntView.addHandlerShowEditProductWindow(
      '.details-btn-edit-bdci-add',
      '.edit-product-edit-bdci-container'
    );
    // editUserView.addHandlerEdit(controlEditUser);
    //TODO: hide btn
    editCmdsIntView.addHandlerEditProductBtns(controlEditProductBtnsInt);
    // #fad
  }
};

const controlSavingBDCIEdit = async function () {
  if (model.state.commandesInt.selected.products.length == 0) {
    helpers.renderError(
      `Erreur lors de l'introduction des données `,
      `<p class="error-message"><b>Aucun produit n'a été ajouté au bon de commande.</b></p>
      <p class="error-message">Veuillez ajouter les produits souhaités et vérifier s'ils sont affichés dans le tableau des produits.</p`
    );
  } else {
    cmdsIntView.renderSpinner('Sauvegarde en cours...');
    let response = await model.saveBDCI();
    cmdsIntView.unrenderSpinner();
    // addCmdsView._boundToggleWindow();
    await controlLoadCmdsInt();
  }
};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////// B A C K  O '  B E Y O N D #fff
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

addCmdsView.addHandlerDeleteAddedProducts(controlDeleteAddedProducts);
addCmdsIntView.addHandlerDeleteAddedProducts(controlDeleteAddedProductsInt);
editCmdsIntView.addHandlerDeleteAddedProducts(controlDeleteAddedProductsInt);

deleteCmdsView.addDeleteController(controlDeleteCmds);
cancelCmdsView.addCancelController(controlCancelCmds);

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
  controlLoadCmdsInt,
];

addCmdsView.addHandlerSavingBDC(controlSavingBDC, model.state);
addCmdsIntView.addHandlerSavingBDC(controlSavingBDCI, model.state);
editCmdsIntView.addHandlerSavingBDC(controlSavingBDCIEdit, model.state);

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
editStructureView.addHandlerShowWindow();
editStructureView.addHandlerEdit(controlEditStructure);
deleteStructureView.addDeleteController(controlDeleteStructure);
sideView.hideAllDivs();
deleteRoleView.addDeleteController(controlDeleteRoles);

addCmdsView.addHandlerFournisseurSearch(controlSearchFournisseurs);
// #F00
// controlUpdateArticles();
// controlUpdateFournisseurs();
addCmdsView.addHandlerArticleSearch(controlSearchArticles);
addCmdsView.addTypeSelectHandler(controlTypeSelection);

addCmdsView.addHandlerProductSearch(
  controlSearchProducts,
  model.state.bdc_products
);
addCmdsIntView.addHandlerProductSearch(
  controlSearchProductsInt,
  model.state.bdci_products
);

editCmdsIntView.addHandlerProductSearch(
  controlSearchProductsInt,
  model.state.bdci_products
);

addCmdsView.addHandlerAddProduct(controlAddProduct, model.state.bdc_products);
addCmdsIntView.addHandlerAddProduct(
  controlAddProductInt,
  model.state.bdci_products
);
editCmdsIntView.addHandlerAddProduct(
  controlAddProductIntEdit,
  model.state.bdci_products
);

addCmdsView.addHandlerChangeProduct(
  controlChangeProduct,
  model.state.bdc_products
);
addCmdsIntView.addHandlerChangeProduct(
  controlChangeProductInt,
  model.state.bdci_products
);
editCmdsIntView.addHandlerChangeProduct(
  controlChangeProductInt,
  model.state.commandesInt.selected
);

//TODO: add after every render
// const controlNumberAddProducts = function () {
//   numberRoleView._clear();
//   model.state.bdc_products.selectedProducts =
//     numberAddProductsView.calculateCheckboxes();
//   numberRoleView.render(model.state);
// };

await editCmdsIntView.addHandlerEdit(controlModifyCmdsInt);
