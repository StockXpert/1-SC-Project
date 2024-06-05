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
import cmdsIntHeaderView from './views/commandesInt/cmdsIntHeaderView.js';
import invHeaderView from './views/inventaires/InvHeaderView.js';
import addStructureView from './views/addStructureView.js';
import addCmdsView from './views/commandes/addCmdsView.js';
import addCmdsIntView from './views/commandesInt/addCmdsIntView.js';
import editCmdsIntView from './views/commandesInt/editCmdsIntView.js';
import validateCmdsIntView from './views/commandesInt/validateCmdsIntView.js';
import productsView from './views/nomenclatures/produits/productsView.js';
import deleteRoleView from './views/roles/deleteRoleView.js';
import deleteCmdsView from './views/commandes/deleteCmdsView.js';
import bonReceptionView from './views/commandes/bonReceptionView.js';
import cancelCmdsView from './views/commandes/cancelCmdsView.js';
import seeCmdsView from './views/commandes/seeCmdsView.js';
import seeCmdsIntView from './views/commandesInt/seeCmdsIntView.js';
import addBonReception from './views/commandes/addBonReception.js';
// import View from './views/view.js';
import deleteBonReception from './views/commandes/deleteBonReception.js';
import invView from './views/inventaires/InvView.js';
import deliverCmdsExtView from './views/commandesInt/deliverCmdsExtView.js';
import deleteCmdsIntView from './views/commandesInt/deleteCmdsIntView.js';
import deleteInvView from './views/inventaires/deleteInvView.js';
import addInvView from './views/inventaires/addInvView.js';
import chaptersView from './views/nomenclatures/chapitres/chaptersView.js';
import numberChaptersView from './views/nomenclatures/chapitres/numberChaptersView.js';
import addChapterView from './views/nomenclatures/chapitres/addChapterView.js';
import editChapterView from './views/nomenclatures/chapitres/editChapterView.js';
import deleteChapterView from './views/nomenclatures/chapitres/deleteChapterView.js';
import statsView from './views/statistiques/statsView.js';
import articlesView from './views/nomenclatures/articles/articlesView.js';
import addArticleView from './views/nomenclatures/articles/addArticleView.js';
import editArticleView from './views/nomenclatures/articles/editArticleView.js';
import fournisseurView from './views/nomenclatures/fournisseur/fournisseurView.js';
import validateInvView from './views/inventaires/validateInvView.js';
import deleteArticleView from './views/nomenclatures/articles/deleteArticleView.js';
import numberArticlesView from './views/nomenclatures/articles/numberArticlesView.js';
import addProductsView from './views/nomenclatures/produits/addProductsView.js';
import profileView from './views/profile/profileView.js';
import editFournisseurView from './views/nomenclatures/fournisseur/editFournisseurView.js';
import detailFournisseurView from './views/nomenclatures/fournisseur/detailFournisseurView.js';
import addFournisseurView from './views/nomenclatures/fournisseur/addFournisseurView.js';
import deleteFournisseurView from './views/nomenclatures/fournisseur/deleteFournisseurView.js';
import deleteProductView from './views/nomenclatures/produits/deleteProductView.js';
import editProductView from './views/nomenclatures/produits/editProductView.js';
import { STAT_LINK_CONFIG } from './config.js';
import uploadHeaderView from './views/Parametre/uploadHeaderView.js';
import uploadLogoView from './views/Parametre/uploadLogoView.js';
// import numberAddProductsView from './views/commandes/numberAddProductsView.js';

const controlUpdateMyPerms = async function () {
  try {
    // document.addEventListener('DOMContentLoaded', () => {
    sideView.renderSpinner();
    profileView.renderSpinner('', true);
    // profileView.renderMini(false);
    await model.getMyPerms();
    sideView.render(model.state.me.permissions.wellFormed);
    profileView.unrenderSpinner(true);
    profileView.render(model.state.me);
    profileView.renderMini();
    sideView.reselectBtns();
    // sideView.unrenderSpinner();
  } catch (error) {
    sideView.unrenderSpinner();
    profileView.unrenderSpinner(true);
    helpers.renderError('ERREUR SERVEUR', error.message); // More specific error handling possible
    // helpers.renderConfirmWindow()
    console.error(error); // Optional for logging detailed errors
  }
};
const controlCommandeExterne = newState => {
  model.state.commandesInt.selected.ext = newState;
};
// console.log(model.state);
// };
const init = async () => {
  await controlUpdateMyPerms();
  addCmdsIntView.addHandlerCheckboxedBtn(
    '.check-bdd',
    controlCommandeExterne,
    model.state.me.role == 'Magasinier'
  );
};
await init();

// await controlUpdateMyPerms();
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

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/////// S T R U C T U R E S #fff
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

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
    addStructureView.restrict(model.state.me.permissions.all);
    deleteStructureView.restrict(model.state.me.permissions.all);
    structuresView.renderSpinner('');
    await model.loadStructures();
    const emails = await model.getResponsiblesEmail();
    addStructureView.addToSelection(emails, 'search-responsable');
    editStructureView.addToSelection(emails, 'search-structure-edit');
    structuresView.render(
      model.state.structures.results,
      true,
      model.state.me.permissions.all
    );
    numberStructuresView.render(model.state.structures);
    numberStructuresView.updateMasterCheckbox(); //
    numberStructuresView.addHandlerNumber(controleSelectStructures); //
    numberStructuresView.addHandlerMasterCheckbox(controleSelectStructures); //
    editStructureView.addHandlerEdit(controlEditStructure); //
    editStructureView.addHandlerShowWindow(); //
  } catch (error) {
    structuresView.unrenderSpinner();
    console.error(error);
    helpers.renderError('ERREUR !', error.message);
  }
};

const controlAddStructure = async function (newStructure) {
  try {
    structuresView.renderSpinner('Ajout de la stucture');
    addStructureView._btnClose.click();
    addStructureView.clearForm();
    await model.uploadStructure(newStructure);
    structuresView.unrenderSpinner();
    await controlLoadStructures();
  } catch (error) {
    console.error(error);
    structuresView.unrenderSpinner();
    helpers.renderError('ERREUR !', error.message);
  }
};

const controlDeleteStructure = function () {
  try {
    filterArrayByBooleans(
      model.state.structures.results,
      helpers.getCheckboxStates(
        document
          .querySelector('.table-structures')
          .querySelectorAll('input[type="checkbox"]')
      )
    ).forEach(async el => {
      structuresView.renderSpinner(
        'Suppression de la Structure ' + el.designation + '...'
      );
      await model.deleteStructure(el);
      structuresView.unrenderSpinner();
      await controlLoadStructures();
    });
  } catch (error) {
    console.error(error);
    structuresView.unrenderSpinner();
    helpers.renderError('ERREUR !', error.message);
  }
};

const controlEditStructure = function () {
  const target = this;
  const targetIndex = helpers.findNodeIndex(
    document.querySelectorAll('.details-btn-structures'),
    target
  );
  editStructureView.changeInputs(model.state.structures.results[targetIndex]);
};

const controlUpdateStructure = async function (oldStructure, newStructure) {
  try {
    // if (
    //   Object.entries(helpers.getUpdateObject(oldStructure, newStructure))
    //     .length === 0
    // )
    //   return;
    console.log(oldStructure, newStructure);
    console.log(helpers.getUpdateObject(oldStructure, newStructure));
    if (oldStructure.designation === newStructure.designation) return;
    structuresView.renderSpinner('Modification de la structure...');
    await model.updateStructure(oldStructure, newStructure);
    structuresView.unrenderSpinner();
    await controlLoadStructures();
  } catch (error) {
    console.error(error);
  }
};
editStructureView.addHandlerHideWindow();
editStructureView.addHandlerUpdate(controlUpdateStructure);
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/////// U S E R S  R E C H E R C H E #fff
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

const controlShowUsersEmail = async function () {
  try {
    const emails = await model.getResponsiblesEmail();
    addStructureView.addToSelection(emails, 'search-responsable');
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
    usersView.renderSpinner(
      "Suppression de l'utilisateur " + el.nom + ' ' + el.prenom + '...'
    );
    await helpers.delJSON(`${API_URL}/Users/deleteUser`, {
      email: el.email,
    });
    usersView.unrenderSpinner();
    // back to main menu
    await controlSearchResults();
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
  usersView.resetPointers();
};

// addUserView.addHandlerUpdateSelects(controlAddUserUpdateSelects);
const controlAddUserUpdateSelects = async function () {
  addUserView.renderSpinner('Veuillez attendre un moment...');
  editUserView.renderSpinner('Veuillez attendre un moment...');
  const roles = await model.getRoles();
  addUserView.addToSelection(roles, '#role-options', 'role');
  editUserView.addToSelection(roles, '#role-options-edit', 'role');
  const structures = await model.getStructures();
  addUserView.addToSelection(
    structures,
    '#structure-add-user-options',
    'structure'
  );
  editUserView.addToSelection(
    structures,
    '#structure-options-edit',
    'structure'
  );
  addUserView.unrenderSpinner();
  editUserView.unrenderSpinner();
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
    helpers.renderError('ERREUR', `Nom du Role déja utilisé, (${err.message})`);
  }
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
const controlProfile = async function () {
  sideView.divs.forEach(div => {
    div.classList.add('hidden');
  });
  sideView.divs[0].classList.remove('hidden');
  productsView.renderSpinner();
  profileView.render(model.state.me);
};

const controlRoleSwitch = (e, selectedIndex) => {
  controlEditRole(e, true, selectedIndex - 1);
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/////// B O N S  D E  C O M M A N D E S #fff
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// const controlCmdsSearch = function (query, filtersState) {};
// const controlCmdsFiltersChanges = function (newFiltersState = {}) {
//   model.state.bdc.filtersState = newFiltersState;

//   console.log(model.state.bdc.filtersState);
//   // switch
//   //trigger a new search (with the same current query, but new search pool (according to the new filter state))
// };

const controlCmdsFilters = filterValuesArr => {
  const beforeFilters = model.state.bdc.afterSearch;
  let afterFilters = [];

  switch (filterValuesArr[0]) {
    case 'dcd':
      afterFilters = beforeFilters.sort(
        (a, b) => new Date(b.date_commande) - new Date(a.date_commande)
      );
      break;
    case 'acd':
      afterFilters = beforeFilters.sort(
        (a, b) => new Date(a.date_commande) - new Date(b.date_commande)
      );
      break;
    case 'default':
      afterFilters = beforeFilters.sort(
        (a, b) => b.num_commande - a.num_commande
      );
      break;
  }
  switch (filterValuesArr[1]) {
    case 'all':
      afterFilters = beforeFilters;
      break;
    default:
      afterFilters = beforeFilters.filter(
        entry => entry.etat == `${filterValuesArr[1]}`
      );
      break;
  }
  model.state.bdc.rendered = afterFilters;
  model.state.bdc.afterFilters = afterFilters;
  cmdsView.render(afterFilters, true, model.state.me.permissions.all);
  // seeCmdsView.renderSpinner('Loading articles...');
  // seeCmdsView.renderSpinner('Loading fournisseurs...', true);
  // if (model.state.me.role == 'Service achat')
  // await controlUpdateFournisseursAndArticles();
  // seeCmdsView.unrenderSpinner(true);
  seeCmdsView.resetPointers();
  seeCmdsView.addSeeController(controlViewCmd);
  cmdsView.resetPointers();
  bonReceptionView.addHandlerShow(controlLoadBRec);
};

const controlCmdsSearch = searchInput => {
  const beforeSearch = model.state.bdc.allCommandes;
  let afterSearch = [];
  const fuze = model.fuseMakerCmds(beforeSearch);
  const results = fuze.search(searchInput);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  afterSearch = extractItems(results);
  if (afterSearch.length == 0) {
    if (searchInput !== '') {
      afterSearch = [];
    } else {
      afterSearch = beforeSearch;
    }
  }
  model.state.bdc.rendered = afterSearch;
  model.state.bdc.afterSearch = afterSearch;
  cmdsView.render(afterSearch, true, model.state.me.permissions.all);
  // seeCmdsView.renderSpinner('Loading articles...');
  // seeCmdsView.renderSpinner('Loading fournisseurs...', true);
  // if (model.state.me.role == 'Service achat')
  // await controlUpdateFournisseursAndArticles();
  // seeCmdsView.unrenderSpinner(true);
  seeCmdsView.resetPointers();
  seeCmdsView.addSeeController(controlViewCmd);
  cmdsView.resetPointers();
  bonReceptionView.addHandlerShow(controlLoadBRec);
};

cmdsView.addChangeFiltersHandler(controlCmdsFilters);
cmdsView.addHandlerCmdsSearch(controlCmdsSearch, controlCmdsFilters);

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
  cmdsView.resetPointers();
  seeCmdsView.renderSpinner('Loading articles...');
  seeCmdsView.renderSpinner('Loading fournisseurs...', true);
  if (model.state.me.role == 'Service achat')
    await controlUpdateFournisseursAndArticles();
  seeCmdsView.unrenderSpinner(true);
  seeCmdsView.resetPointers();
  seeCmdsView.addSeeController(controlViewCmd);
  bonReceptionView.addHandlerShow(controlLoadBRec);
};

// const controlLoadCommandeproducts = async function () {
//   const products = await model.loadCommandeproducts(8);
// };

//FOURNISSEURS & ARTICLES
const controlUpdateFournisseursAndArticles = async () => {
  //fetch all fournisseurs to model.state.fournisseurs
  const fournisseurs = await model.loadFournisseurs();
  model.state.fournisseurs.all = fournisseurs;
  const articles = await model.loadArticles();
  model.state.articles.all = articles;
};

//ON INPUT FOURNISSEURS:
const controlSearchFournisseursCmds = input => {
  const fuze = model.fuseMakerFournisseurs(model.state.fournisseurs.all);
  const results = fuze.search(input);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  let displayedResults = extractItems(results);
  // console.log(displayedResults);
  // addCmdsView.addToSuggestionsFournisseursAndEL(
  //   displayedResults,
  //   controlSelectFournisseur
  // );
  addCmdsView.addResultsToSuggestionsAndEL(
    extractItems(results),
    '.big-container',
    '.four-search-results-container',
    '#filter-fournisseur',
    controlSelectFournisseur
  );
  addCmdsView.resultVisibilityTogglers();
};

const controlSelectFournisseur = fournisseurName => {
  model.state.fournisseurs.selected = fournisseurName;
};

//ARTICLES

const controlSelectArticle = articleName => {
  model.state.articles.selected = articleName;
};

const controlSearchArticlesCmds = input => {
  //ON INPUT:
  console.log(model.state.articles.all);
  const fuze = model.fuseMakerArticles(model.state.articles.all);
  const results = fuze.search(input);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }

  addCmdsView.addResultsToSuggestionsAndEL(
    extractItems(results),
    '.big-container',
    '.article-search-results-container',
    '#filter-article',
    controlSelectArticle
  );
  addCmdsView.resultVisibilityTogglers();
};

// console.log(addCmdsView);
//PRODUCTS
//products.all are filtered by the selected article
const controlUpdateProducts = async articleName => {
  // addCmdsView.r
  // addCmdsView._btnsOpenAddProduct.classList.add('hidden');
  // addCmdsView.renderSpinner('', true);
  const products = await model.loadProducts(articleName);
  // addCmdsView.unrenderSpinner(true);
  // addCmdsView._btnsOpenAddProduct.classList.remove('hidden');
  model.state.bdc_products.all = products;
};

const controlSearchProducts = (input, type, view) => {
  //ON INPUT:
  // const fuze = model.fuseMakerProducts(
  //   helpers.subtractObjects(
  //     model.state.bdc_products.all,
  //     model.state.bdc_products.added,
  //     'designation'
  //   )
  // );
  // const results = fuze.search(input);
  // console.log(results);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  console.log('control');
  let fuze;
  let results;
  switch (view.constructor.name) {
    case 'AddCmdsView':
      fuze = model.fuseMakerProducts(
        helpers.subtractObjects(
          model.state.bdc_products.all,
          model.state.bdc_products.added,
          'designation'
        )
      );
      results = fuze.search(input);
      switch (type) {
        case 'add':
          view.addResultsToSuggestionsAndEL(
            extractItems(results),
            '.add-product-bdc-container',
            '.product-search-results-container',
            '#bdc-product'
          );
          break;
        case 'edit':
          view.addResultsToSuggestionsAndEL(
            extractItems(results),
            '.edit-product-bdc-container',
            '.product-search-results-container-edit',
            '#bdc-product-edit'
          );
          break;
      }
      break;
    case 'AddCmdsIntView':
      fuze = model.fuseMakerProducts(
        helpers.subtractObjects(
          model.state.bdci_products.all,
          model.state.bdci_products.added,
          'designation'
        )
      );
      results = fuze.search(input);
      switch (type) {
        case 'add':
          view.addResultsToSuggestionsAndEL(
            extractItems(results),
            '.add-product-bdci-container',
            '.bdci-product-search-results-container',
            '#bdci-product-add'
          );
          break;
        case 'edit':
          view.addResultsToSuggestionsAndEL(
            extractItems(results),
            '.edit-product-bdci-container',
            '.bdci-product-search-results-container-edit',
            '#bdci-product-edit'
          );
      }
    case 'EditCmdsIntView':
      fuze = model.fuseMakerProducts(
        helpers.subtractObjects(
          model.state.bdci_products.all,
          model.state.bdci_products.added,
          'designation'
        )
      );
      results = fuze.search(input);
      console.log(extractItems(results));
      switch (type) {
        case 'add':
          console.log(extractItems(results));
          view.addResultsToSuggestionsAndEL(
            extractItems(results),
            '.add-product-edit-bdci-container',
            '.edit-bdci-product-search-results-container',
            '#edit-bdci-product-add'
          );
          break;
        case 'edit':
          view.addResultsToSuggestionsAndEL(
            extractItems(results),
            '.edit-product-edit-bdci-container',
            '.edit-bdci-product-search-results-container-edit',
            '#edit-bdci-product-edit'
          );
      }
  }
  //TODO:
  // addCmdsView.resultVisibilityTogglers();
};

//in addCmdsView:
//add EL ONINPUT TO #input-box

const controlSelectArticlesCmds = async articleName => {
  await controlUpdateProducts(articleName);
};

const controlSelectProducts = productName => {
  model.state.bdc_products.selected = productName;
};

const controlTypeSelection = typeName => {
  model.state.type.selected = typeName;
};

const controlAddProductBdc = newProduct => {
  model.state.bdc_products.added.push(newProduct);
  addCmdsView.render(model.state.bdc_products.added);
  addCmdsView._checkboxesAddProduct =
    addCmdsView._parentElement.querySelectorAll('input[type="checkbox"]');
  addCmdsView.AddHandlerAddedProductsCheckboxes();
  addCmdsView.addHandlerShowEditProductWindow(
    '.details-btn-bdc-add',
    '.edit-product-bdc-container'
  );
  addCmdsView.addHandlerEditProductBtns(controlEditProductBtnsInt);
};

const handleAddedProducts = () => {
  if (model.state.bdc_products.added.length != 0) {
    const confirmFunction = () => {
      model.state.bdc_products.added = [];
      addCmdsView.render(model.state.bdc_products.added);
      addCmdsView._checkboxesAddProduct =
        addCmdsView._parentElement.querySelectorAll('input[type="checkbox"]');
      addCmdsView.AddHandlerAddedProductsCheckboxes();
      addCmdsView.addHandlerShowEditProductWindow(
        '.details-btn-bdc-add',
        '.edit-product-bdc-container'
      );
      addCmdsView.addHandlerEditProductBtns(controlEditProductBtnsInt);
    };
    const cancelFunction = () => {
      addCmdsView.resetAddingProductInputs(model.state);
    };
    let errorText = ` Vous êtes sur le point de changer le fournisseur et/ou l'article
    et/ou le type, cela entraînera la perte des produits que vous avez
    ajoutés. Êtes-vous sûr ?`;
    helpers.renderConfirmWindow(
      '.container-confirm-added-products',
      confirmFunction,
      cancelFunction,
      errorText
    );
  }
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
  addCmdsView.addHandlerShowEditProductWindow(
    '.details-btn-bdc-add',
    '.edit-product-bdc-container'
  );
  addCmdsView.addHandlerEditProductBtns(controlEditProductBtnsInt);
};

//TODO:
const controlEditProductBtns = function () {
  //ONCLICK OF A EDIT BUTTON
  //Get the index of the clicked edit button here
  const target = this;
  console.log(target);
  console.log(addCmdsView._btnsOpenEditProduct);
  const targetIndex = helpers.findNodeIndex(
    addCmdsView._btnsOpenEditProduct,
    target
  );
  console.log(targetIndex);
  console.log(model.state.bdc_products.added[targetIndex]);
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
  addCmdsView.addHandlerEditProductBtns(controlEditProductBtnsInt);
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
      cmdsView.renderSpinner('Suppression de la commande...  ');
      const responseNData = await model.deleteCmd(bdc.num_commande);
      console.log(responseNData);
      if (!responseNData[0].ok) {
        helpers.renderError(
          `Erreur lors de la suppression d'un Bon de Commande`,
          `Le Bon de Commande que vous voulez supprimer contient deja un bon de réception`
        );
      } else {
        cmdsView.unrenderSpinner();
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

const controlLoadBRec = async function (event = '', number = '') {
  if (event != '') {
    const target = event.currentTarget;
    const targetIndex = helpers.findNodeIndex(
      document.querySelectorAll('.view-btr-btn'),
      target
    );
    model.state.bdc.selected =
      model.state.bdc.allCommandes[targetIndex].num_commande;
  } else {
    console.log(number);
    model.state.bdc.selected = number;
  }
  console.log(model.state.bdc.selected);
  // TODO:
  // deleteBonReception.allowDeleteBtn(false, '.btn-delete-bdr');
  // TODO:
  deleteBonReception.addDeleteController(controlDeleteBonRec);
  bonReceptionView.renderSpinner('Chargement des bons de récéptions ...', true);
  // vvvvvvvvv model.state.bdr.all vvvvvvvv
  addBonReception._message.classList.add('hiddenTrans');
  addBonReception._btnOpen.classList.add('hidden');

  await model.loadBonRec(model.state.bdc.selected);
  bonReceptionView.unrenderSpinner(true);
  bonReceptionView.render(model.state.bdr.all);
  bonReceptionView.AddHandlerAddedProductsCheckboxes();
  addBonReception.allowBlueBtn(false, '.btn-add-bdr');
  // vvvvvv state.bdr_products.all  vvvvvvvv
  await model.loadBonCmdProducts(model.state.bdc.selected);
  addBonReception.renderSpinner('Chargement des produits');
  addBonReception.render(model.state.bdr_products.all);
  if (model.state.bdr_products.all.length != 0)
    addBonReception.allowBlueBtn(true, '.btn-add-bdr');
  // addBonReception.handleUpdate(controlAddBRec);
  addBonReception.resetPointers();
};

// const controlAddBDR = async function (
//   produits,
//   liv,
//   numLiv,
//   facture = '',
//   numFacture = ''
// ) {};
function fun() {
  console.log('fun');
}

// const controlAddBRec = async function (
//   products,
//   linkLivraison,
//   numBonLivraison,
//   linkFacture = '',
//   numFacture = ''
// ) {
//   // const currentDay = new Date();
//   // const year = currentDay.getFullYear();
//   // const month = String(currentDay.getMonth() + 1).padStart(2, '0');
//   // const day = String(currentDay.getDate()).padStart(2, '0');
//   // console.log(`${year}/${month}/${day}`);

//   const newReception = new FormData();
//   newReception.append('numCommande', model.state.bdc.selected);
//   newReception.append('numLivraison', numBonLivraison);
//   newReception.append(
//     'produits',
//     JSON.stringify(products.filter(prod => prod.quantite > 0))
//   );
//   newReception.append('bonLivraison', linkLivraison);
//   newReception.append('dateReception', helpers.getFormattedDate('/'));
//   if (numFacture.length != 0 && linkFacture.length != 0) {
//     newReception.append('numFacture', numFacture);
//     newReception.append('facture', linkFacture);
//   }
//   bonReceptionView.renderSpinner('Ajout du bon de récéption', true);
//   await model.addBonReception(newReception);
//   bonReceptionView.unrenderSpinner(true);
//   await controlLoadBRec('', model.state.bdc.selected);
//   // await controlLoadCmds();
// };

const controlAddBRec = async function (
  products,
  linkLivraison,
  numBonLivraison,
  linkFacture = '',
  numFacture = ''
) {
  try {
    const newReception = new FormData();
    newReception.append('numCommande', model.state.bdc.selected);
    newReception.append('numLivraison', numBonLivraison);
    newReception.append(
      'produits',
      JSON.stringify(products.filter(prod => prod.quantite > 0))
    );
    newReception.append('bonLivraison', linkLivraison);
    newReception.append('dateReception', helpers.getFormattedDate('/'));
    if (numFacture.length != 0 && linkFacture.length != 0) {
      newReception.append('numFacture', numFacture);
      newReception.append('facture', linkFacture);
    }

    bonReceptionView.renderSpinner('Ajout du bon de récéption', true);
    await model.addBonReception(newReception);
    // console.log(newReception);
    // await helpers.timeoutRes(5);
    bonReceptionView.unrenderSpinner(true);
    await controlLoadBRec('', model.state.bdc.selected);
    // await controlLoadCmds();  // Uncomment if needed
  } catch (error) {
    console.error('Error adding reception:', error);
    bonReceptionView.unrenderSpinner(true);
    // Handle the error appropriately (e.g., show an error message to the user)
  }
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
    bonReceptionView.renderSpinner(
      'Suppression du bon de reception  N°' + el.num_bon + '...',
      true
    );
    // await helpers.timeoutRes(1500);
    await model.deleteBonRec(el.num_bon, el.numCommande);
    bonReceptionView.unrenderSpinner(true);
    bonReceptionView.toggleWindow();
  });
  // back to main menu
  // controlLoadCmds();
  // window.location.reload();
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
  try {
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
      cmdsView.renderSpinner('Ajout de la commande...');
      await model.createBDC();
      cmdsView.unrenderSpinner('');
      await controlLoadCmds();
    }
  } catch (err) {
    cmdsView.unrenderSpinner('');
    helpers.renderError('ERROR! ', err);
    // helpers.renderError('ERROR! ', err.message);
    console.error(err);
  }
};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////// B O N S  D E  C O M M A N D E S  I N T E R N E S #fff
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

const controlCmdsIntFilters = filterValuesArr => {
  const beforeFilters = model.state.commandesInt.afterSearch;
  let afterFilters = [];
  console.log(filterValuesArr);
  switch (filterValuesArr[0]) {
    case 'dcd':
      afterFilters = beforeFilters.sort(
        (a, b) => new Date(b.date_demande) - new Date(a.date_demande)
      );
      break;
    case 'acd':
      afterFilters = beforeFilters.sort(
        (a, b) => new Date(a.date_demande) - new Date(b.date_demande)
      );
      break;
    case 'default':
      afterFilters = beforeFilters.sort(helpers.newCustomSortForCmdsInt);
      break;
  }
  switch (filterValuesArr[1]) {
    case 'all':
      afterFilters = beforeFilters;
      break;
    case 'demandee':
      afterFilters = beforeFilters.filter(entry => entry.etat == 'demandee');
      break;
    case 'visee par resp':
      afterFilters = beforeFilters.filter(
        entry => entry.etat == 'visee par resp'
      );
      break;
    case 'visee par dg':
      afterFilters = beforeFilters.filter(
        entry => entry.etat == 'visee par dg'
      );
      break;
    case 'prete':
      afterFilters = beforeFilters.filter(entry => entry.etat == 'pret');
      break;
    case 'servie':
      afterFilters = beforeFilters.filter(entry => entry.etat == 'servie');
      break;
  }
  cmdsIntView.render(afterFilters);
  model.state.commandesInt.rendered = afterFilters;
  seeCmdsIntView.resetPointers();
  seeCmdsIntView.addSeeController(controlViewCmdInt);
  cmdsIntView.resetPointers();
  validateCmdsIntView.resetPointers(controlValidatingCmdsInt);
  addCmdsIntView.allowDeleteBtn(false, '.btn-delete-bdci');
  addCmdsIntView.allowWhiteBtn(false, '.btn-edit-bdci');
  model.state.commandesInt.afterFilters = afterFilters;
};

const controlCmdsIntSearch = searchInput => {
  const beforeSearch = model.state.commandesInt.all;
  let afterSearch = [];
  const fuze = model.fuseMakerCmdsInt(beforeSearch);
  const results = fuze.search(searchInput);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  afterSearch = extractItems(results);
  if (afterSearch.length == 0) {
    if (searchInput !== '') {
      afterSearch = [];
    } else {
      afterSearch = beforeSearch;
    }
  }
  cmdsIntView.render(afterSearch);
  model.state.commandesInt.rendered = afterSearch;
  seeCmdsIntView.resetPointers();
  seeCmdsIntView.addSeeController(controlViewCmdInt);
  cmdsIntView.resetPointers();
  validateCmdsIntView.resetPointers(controlValidatingCmdsInt);
  addCmdsIntView.allowDeleteBtn(false, '.btn-delete-bdci');
  addCmdsIntView.allowWhiteBtn(false, '.btn-edit-bdci');
  model.state.commandesInt.afterSearch = afterSearch;
};
cmdsIntView.addChangeFiltersHandler(controlCmdsIntFilters);
cmdsIntView.addHandlerCmdsIntSearch(
  controlCmdsIntSearch,
  controlCmdsIntFilters
);
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
  cmdsIntView.restrictUsingRole(model.state.me.role);
  cmdsIntView.resetSearchInputs();
  //TODO: thisLine-16 used to be here

  cmdsIntHeaderView.render(model.state.me.role);
  addCmdsIntView.allowDeleteBtn(false, '.btn-delete-bdci');
  addCmdsIntView.allowWhiteBtn(false, '.btn-edit-bdci');
  addCmdsIntView.allowSavingBDC(false, '.btn-save-bdci-qt');
  editCmdsIntView.allowSavingBDC(false, '.btn-save-edit-bdci-qt');
  model.state.bdci_products.added = [];
  addCmdsIntView.render(model.state.bdci_products.added);
  cmdsIntView.renderSpinner('Chagement des produits ...');
  await controlUpdateAllProducts();
  cmdsIntView.unrenderSpinner();
  cmdsIntView.renderSpinner('Chagement des commandes internes ...');
  // TODO: cancelCmdsView.restrict(model.state.me.permissions.all);
  // TODO: addCmdsView.restrict(model.state.me.permissions.all);
  // TODO: deleteCmdsView.restrict(model.state.me.permissions.all);
  await model.loadCmdsInt();
  cmdsIntView.unrenderSpinner();
  cmdsIntView._role = model.state.me.role;
  validateCmdsIntView._role = model.state.me.role;
  // validateCmdsIntView._max = model.state.me.role;
  // switch(validateCmdsIntView._role){
  //   case 'Magasinier':
  //     validateCmdsIntView._max = ;

  // }
  validateCmdsIntView.changeHeader();
  // cmdsIntView._role = 'Magasinier';
  // cmdsIntView._role = 'Directeur';
  // cmdsIntView._role = 'Responsable directe';
  cmdsIntView.render(
    model.state.commandesInt.all,
    true,
    model.state.me.permissions.all
  );
  model.state.commandesInt.rendered = model.state.commandesInt.all;
  seeCmdsIntView.resetPointers();
  seeCmdsIntView.addSeeController(controlViewCmdInt);
  cmdsIntView.resetPointers();
  validateCmdsIntView.resetPointers(controlValidatingCmdsInt);
  // bonReceptionView.f();
  // bonReceptionView.addHandlerShow(controlLoadBRec);
  // const filter1Obj = {

  // }
  // const searchFilterObject = { $and: [filter1Obj, filter2Obj] };
  addCmdsIntView.restrict(model.state.me.permissions.all);
};

const controlAddProductBdcInt = newProduct => {
  // ON SUBMIT:
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

// #0f0
const controlSearchProductsInt = (input, type, view = editCmdsIntView) => {
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
      // view.addToSuggestionsProductsAndEL(extractItems(results), 'add');
      addCmdsIntView.addResultsToSuggestionsAndEL(
        extractItems(results),
        '.add-product-bdci-container',
        '.product-search-results-container',
        '#bdci-product'
      );
      view.resultVisibilityTogglers();
      break;
    case 'edit':
      // view.addToSuggestionsProductsAndEL(extractItems(results), 'edit');
      view.resultVisibilityTogglers();
      break;
    // case 'add':
    //   view.addResultsToSuggestionsAndEL(extractItems(results));
    //   view.resultVisibilityTogglers();
    //   break;
    // case 'edit':
    //   view.addToSuggestionsProductsAndEL(extractItems(results), 'edit');
    //   view.resultVisibilityTogglers();
    //   break;
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
  let productsArray;
  let target = e.currentTarget;
  let targetIndex;
  switch (view.constructor.name) {
    //TODO:
    case 'EditCmdsView':
      productsArray = model.state.commandesInt.selected.products;
      targetIndex = helpers.findNodeIndex(view._btnsOpenEditProduct, target);
      // model.state.commandesInt.selected.products = targetIndex;
      break;
    case 'AddCmdsView':
      productsArray = model.state.bdc_products.added;
      targetIndex = helpers.findNodeIndex(view._btnsOpenEditProduct, target);
      // model.state.commandes.selected.products = targetIndex;
      break;
    case 'EditCmdsIntView':
      productsArray = model.state.commandesInt.selected.products;
      targetIndex = helpers.findNodeIndex(view._btnsOpenEditProduct, target);
      model.state.commandesInt.selected.products = productsArray;
      break;
    case 'AddCmdsIntView':
      productsArray = model.state.bdci_products.added;
      targetIndex = helpers.findNodeIndex(view._btnsOpenEditProduct, target);
      model.state.commandesInt.selected.products = productsArray;
      break;
    case 'AddInvView':
      // productsArray = model.state.inventaires.rendered.produits;
      productsArray = model.state.inventaires.selected.renderedProducts;
      targetIndex = helpers.findNodeIndex(view._btnsOpenEditProduct, target);
      console.log(productsArray[targetIndex]);
      //TODO:
      model.state.inventaires.selected.selectedProduct = targetIndex;
      break;
  }

  view.changeInputs(productsArray[targetIndex]);
  model.state.bdc_products.changed = targetIndex;
  model.state.bdci_products.changed = targetIndex;
  model.state.commandesInt.selected.changed = targetIndex;
  // model.state.inventaires.new.selectedProduct = targetIndex;
};

const controlChangeProductInt = function (
  editedProduct,
  view = editCmdsIntView
) {
  console.log('controlChangeProductInt');
  let BdciProdsCurrState;
  let changed;
  switch (view.constructor.name) {
    case 'AddCmdsIntView':
      BdciProdsCurrState = model.state.bdci_products.added;
      changed = model.state.bdci_products.changed;
      break;
    case 'EditCmdsIntView':
      console.log(model.state.commandesInt);
      BdciProdsCurrState = model.state.commandesInt.selected.products;
      changed = model.state.commandesInt.selected.changed;
      break;
    case 'AddCmdsView':
      BdciProdsCurrState = model.state.bdc_products.added;
      changed = model.state.bdc_products.changed;
      break;
    //TODO: 'EditCmdsView'
    case 'EditCmdsView':
      BdciProdsCurrState = model.state.commandesInt.selected.products;
      changed = model.state.commandesInt.selected.changed;
      break;
  }
  if (
    helpers.isObjectInArray(BdciProdsCurrState, editedProduct) &&
    changed != helpers.objectIndexInArray(BdciProdsCurrState, editedProduct)
  ) {
    //TODO:
    helpers.renderError(
      'Erreur',
      `Le produit que vous essayez d'ajouter a déjà été ajouté à la commande.`
    );
  } else {
    BdciProdsCurrState[changed] = editedProduct;
    switch (view.constructor.name) {
      case 'AddCmdsView':
        view.render(BdciProdsCurrState);
        view.allowSavingBDC(true, '.btn-save-bdc');
        addCmdsView.addHandlerShowEditProductWindow(
          '.details-btn-bdc-add',
          '.edit-product-bdc-container'
        );
        break;

      //TODO: 'EditCmdsView'
      case 'EditCmdsView':
        view.changeDetails(BdciProdsCurrState);
        view.allowSavingBDC(true, '.btn-save-edit-bdci-qt');
        break;
      case 'AddCmdsIntView':
        view.render(BdciProdsCurrState);
        //TODO: make it depend on if the user has really changed the products or not
        view.allowSavingBDC(true, '.btn-save-bdci-qt');
        addCmdsIntView.addHandlerShowEditProductWindow(
          '.details-btn-bdci-add',
          '.edit-product-bdci-container'
        );
        break;
      case 'EditCmdsIntView':
        view.changeDetails(BdciProdsCurrState);
        view.allowSavingBDC(true, '.btn-save-edit-bdci-qt');
        editCmdsIntView.addHandlerShowEditProductWindow(
          '.details-btn-edit-bdci-add',
          '.edit-product-edit-bdci-container'
        );
        break;
    }
    view._checkboxesAddProduct = view._parentElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    view.AddHandlerAddedProductsCheckboxes();
    view.addHandlerEditProductBtns(controlEditProductBtnsInt);
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
    cmdsIntView.renderSpinner('Sauvegarde en cours... ');
    await model.createBDCI();
    cmdsIntView.unrenderSpinner();
    await controlLoadCmdsInt();
  }
};

const controlViewCmdInt = async function (target, view = seeCmdsIntView) {
  //ONCLICK OF A VIEW BUTTON
  //Get the index of the clicked view button here
  // const target = this;
  console.log(seeCmdsIntView._btnOpen);
  const targetIndex = helpers.findNodeIndex(seeCmdsIntView._btnOpen, target);
  console.log(targetIndex);
  seeCmdsIntView.renderSpinner('', true);
  // TODO:
  console.log(model.state.commandesInt.rendered);
  console.log(model.state.commandesInt.rendered[targetIndex]);
  const products = await model.loadCommandeIntProducts(
    model.state.commandesInt.rendered[targetIndex].num_demande
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
      model.state.commandesInt.rendered[targetIndex],
      products[1].demande
    );
  }
};

const controlDeleteCmdsInt = async function () {
  //ONCLICK OF the DELETE BUTTON
  //CONFIRM MSG
  const targetIndex = Array.from(cmdsIntView._checkboxes).findIndex(
    checkbox => checkbox.checked
  );
  const numDemande = model.state.commandesInt.rendered[targetIndex].num_demande;
  cmdsIntView.renderSpinner('Suppression en cours...');
  await model.deleteCmdInt(numDemande);
  cmdsIntView.unrenderSpinner();
  await controlLoadCmdsInt();
};

const controlModifyCmdsInt = async function () {
  //ONCLICK OF the EDIT BUTTON
  const targetIndex = Array.from(cmdsIntView._checkboxes).findIndex(
    checkbox => checkbox.checked
  );
  const numDemande = model.state.commandesInt.rendered[targetIndex].num_demande;
  editCmdsIntView.renderSpinner('', true);
  let selectedCmdIntProducts = await model.loadCommandeIntProducts(
    model.state.commandesInt.rendered[targetIndex].num_demande
  );
  editCmdsIntView.unrenderSpinner(true);
  selectedCmdIntProducts = selectedCmdIntProducts[1].demande;
  selectedCmdIntProducts = selectedCmdIntProducts.map(el => {
    return {
      designation: el.designation,
      quantite: el.quantite_demande,
    };
  });

  model.state.commandesInt.selected.numDemande = numDemande;
  model.state.commandesInt.selected.new.numDemande = numDemande;
  model.state.commandesInt.selected.old.numDemande = numDemande;

  model.state.commandesInt.selected.products = selectedCmdIntProducts;
  model.state.commandesInt.selected.old.products = selectedCmdIntProducts;
  editCmdsIntView.changeDetails(selectedCmdIntProducts, numDemande);
  editCmdsIntView._checkboxesAddProduct =
    editCmdsIntView._parentElement.querySelectorAll('input[type="checkbox"]');
  editCmdsIntView.AddHandlerAddedProductsCheckboxes();
  editCmdsIntView.addHandlerShowEditProductWindow(
    '.details-btn-edit-bdci-add',
    '.edit-product-edit-bdci-container'
  );
  editCmdsIntView.addHandlerEditProductBtns(controlEditProductBtnsInt);
};

const controlAddProductBdcIntEdit = newProduct => {
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
    editCmdsIntView._checkboxesAddProduct =
      editCmdsIntView._parentElement.querySelectorAll('input[type="checkbox"]');
    editCmdsIntView.AddHandlerAddedProductsCheckboxes();
    editCmdsIntView.addHandlerShowEditProductWindow(
      '.details-btn-edit-bdci-add',
      '.edit-product-edit-bdci-container'
    );
    editCmdsIntView.addHandlerEditProductBtns(controlEditProductBtnsInt);
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
    await controlLoadCmdsInt();
  }
};
const controlValidatingCmdsInt = async e => {
  //ONCLICK OF A VALIDATE BUTTON
  const targetIndex = helpers.findNodeIndex(
    validateCmdsIntView._btnOpen,
    e.currentTarget
  );
  validateCmdsIntView.renderSpinner('');
  let selectedCmdIntProducts = await model.loadCommandeIntProducts(
    ////#0f0 said thing here and after both filtering or searching
    model.state.commandesInt.rendered[targetIndex].num_demande
  );
  validateCmdsIntView.unrenderSpinner('');
  selectedCmdIntProducts = selectedCmdIntProducts[1].demande;
  selectedCmdIntProducts = helpers.fillMissingProperties(
    selectedCmdIntProducts
  );
  validateCmdsIntView.changeDetails(
    selectedCmdIntProducts,
    model.state.commandesInt.rendered[targetIndex]
  );
};

//#0f0 validate = valider
const controlValidateCmdsInt = async () => {
  let appObject = validateCmdsIntView.extractObject();
  let returnValue;
  validateCmdsIntView._btnClose.click();
  cmdsIntView.renderSpinner('Validation ...');
  switch (validateCmdsIntView._role) {
    case 'Responsable directe':
      returnValue = await model.resAppCmdInt(appObject);
      break;
    case 'Directeur':
      returnValue = await model.dirAppCmdInt(appObject);
      break;
    case 'Magasinier':
      returnValue = await model.magAppCmdInt(appObject);
      break;
  }
  cmdsIntView.unrenderSpinner('');
  await controlLoadCmdsInt();
};

//#0f0 use livrer == mettre a jour (something similar)
const updateAllProducts = async () => {
  let allProducts;
  allProducts = await model.loadAllInvProducts();
  console.log(allProducts[1]);
  model.state.allProducts = allProducts[1].response;
  return allProducts;
};
const controlDeliverCmdsInt = async view => {
  let postObj;
  if (
    model.state.commandesInt.rendered[
      Array.from(view._checkboxes).findIndex(cbx => cbx.checked == true)
    ].exterieur
  ) {
    //afficher fenetre
    deliverCmdsExtView.toggleWindow();
    //spinner in that window
    deliverCmdsExtView.renderSpinner('');
    //loading products
    let products = await model.loadCommandeIntProducts(
      model.state.commandesInt.rendered[
        Array.from(view._checkboxes).findIndex(cbx => cbx.checked == true)
      ].num_demande
    );
    products = products[1].demande;
    console.log(products);
    let newArrProducts = [];
    products.forEach(product => {
      for (let i = 1; i <= product.quantite_servie; i++) {
        newArrProducts.push({
          designation: product.designation,
        });
      }
    });
    model.state.commandesInt.deliver.products = newArrProducts;
    model.state.commandesInt.deliver.numDemande =
      model.state.commandesInt.rendered[
        Array.from(view._checkboxes).findIndex(cbx => cbx.checked == true)
      ].num_demande;
    console.log(newArrProducts);
    await updateAllProducts();
    deliverCmdsExtView.render(newArrProducts);
    deliverCmdsExtView.resetPointers(controlGetRefrenceSearchResults);
  } else {
    //#0f0 HERE (PT 2): this is livrer
    cmdsIntView.renderSpinner(
      `Validation finale de la commande N°${
        model.state.commandesInt.rendered[
          Array.from(view._checkboxes).findIndex(cbx => cbx.checked == true)
        ].num_demande
      } ...`
    );
    postObj = {
      numDemande:
        model.state.commandesInt.rendered[
          Array.from(view._checkboxes).findIndex(cbx => cbx.checked == true)
        ].num_demande,
      dateSortie: helpers.getFormattedDate(),
    };
    //#0f0
    await model.magLivrerCmdInt(postObj);
    cmdsIntView.unrenderSpinner('');
    await controlLoadCmdsInt();
  }
};
const controlGetRefrenceSearchResults = (inputValue, productName) => {
  // const fuze = model.fuseMakerInv(beforeSearch);
  console.log(model.state.allProducts);
  const fuze = model.fuseMakerRef(
    model.state.allProducts.filter(product => product.produit == productName)
  );
  const results = fuze.search(inputValue);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  console.log(extractItems(results));
  return extractItems(results).slice(0, 3);
};
const controlDechargerCmdsInt = async dataObj => {
  try {
    let postObj = {
      numDemande: model.state.commandesInt.deliver.numDemande,
      dateDecharge: helpers.getFormattedDate(),
      numDecharge: dataObj.numDecharge,
      products: [],
    };
    console.log(model.state.commandesInt.deliver.products);
    dataObj.refrencesArray.forEach((refrence, index) => {
      postObj.products.push({
        designation:
          model.state.commandesInt.deliver.products[index].designation,
        reference: refrence,
      });
    });
    cmdsIntView.renderSpinner(
      `Validation finale de la commande N°${
        model.state.commandesInt.rendered[
          Array.from(cmdsIntView._checkboxes).findIndex(
            cbx => cbx.checked == true
          )
        ].num_demande
      } ...`
    );
    if (!(await model.dechargerCmdsInt(postObj))) {
      sideView.btns[0].click();
      return;
    }
    cmdsIntView.unrenderSpinner('');
    await controlLoadCmdsInt();
  } catch (error) {
    helpers.renderError('ERREUR', error.message);
    console.error(error);
  }
};
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////// I N V E N T A I R E  #fff
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
const controlInvFilters = filterValuesArr => {
  const beforeFilters = model.state.inventaires.afterSearch;
  let afterFilters = [];
  console.log(filterValuesArr);
  switch (filterValuesArr[0]) {
    case 'dcd':
      afterFilters = beforeFilters.sort(
        (a, b) => new Date(b.date_inventaire) - new Date(a.date_inventaire)
      );
      break;
    case 'acd':
      afterFilters = beforeFilters.sort(
        (a, b) => new Date(a.date_inventaire) - new Date(b.date_inventaire)
      );
      break;
    case 'default':
      afterFilters = beforeFilters.sort(
        (a, b) => b.num_inventaire - a.num_inventaire
      );
      break;
  }
  switch (filterValuesArr[1]) {
    case 'all':
      afterFilters = beforeFilters;
      break;
    default:
      afterFilters = beforeFilters.filter(
        entry => entry.etat == filterValuesArr[1]
      );
      break;
  }
  invView.render(afterFilters, true, model.state.me.permissions.all, '', false);
  // model.state.inventaires.rendered = model.state.inventaires.all;
  //TODO: do something to make calls like these automatic upon any render (maybe give render something called renderRoutineInv that includes all these)
  model.updateRenderedInv(model.state.inventaires.all);
  invView.resetPointers();
  validateInvView.resetPointers(controlValidatingInv);
  addInvView.addHandlerView(controlContinueInv);
  model.state.inventaires.rendered = afterFilters;
  model.state.inventaires.afterFilters = afterFilters;
};

const controlInvSearch = searchInput => {
  const beforeSearch = model.state.inventaires.all;
  let afterSearch = [];
  const fuze = model.fuseMakerInv(beforeSearch);
  const results = fuze.search(searchInput);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  afterSearch = extractItems(results);
  if (afterSearch.length == 0) {
    if (searchInput !== '') {
      afterSearch = [];
    } else {
      afterSearch = beforeSearch;
    }
  }
  invView.render(afterSearch, true, model.state.me.permissions.all, '', false);
  // model.state.inventaires.rendered = model.state.inventaires.all;
  //TODO: do something to make calls like these automatic upon any render (maybe give render something called renderRoutineInv that includes all these)
  model.updateRenderedInv(model.state.inventaires.all);
  invView.resetPointers();
  validateInvView.resetPointers(controlValidatingInv);
  addInvView.addHandlerView(controlContinueInv);
  model.state.inventaires.rendered = afterSearch;
  model.state.inventaires.afterSearch = afterSearch;
};
invView.addChangeFiltersHandler(controlInvFilters);
invView.addHandlerInvSearch(controlInvSearch, controlInvFilters);

const controlLoadInv = async () => {
  invView.restrictActionsUsingRoleInv(model.state.me.role);
  invView.renderSpinner();
  invHeaderView.render({}, true, model.state.me.permissions.all);
  if (!(await model.loadAllInv())) {
    sideView.btns[0].click();
    return;
  }
  invView.render(
    model.state.inventaires.all,
    true,
    model.state.me.permissions.all,
    '',
    false
  );
  // model.state.inventaires.rendered = model.state.inventaires.all;
  //TODO: do something to make calls like these automatic upon any render (maybe give render something called renderRoutineInv that includes all these)
  model.updateRenderedInv(model.state.inventaires.all);
  invView.resetPointers();
  validateInvView.resetPointers(controlValidatingInv);
  addInvView.addHandlerView(controlContinueInv);
};

const controlInvProdFilters = filterValuesArr => {
  const beforeFilters = model.state.inventaires.selected.afterSearch;
  let afterFilters = [];
  afterFilters =
    filterValuesArr[0] == 'all'
      ? beforeFilters
      : beforeFilters.filter(entry => entry.chapitre == filterValuesArr[0]);
  afterFilters =
    filterValuesArr[1] == 'all'
      ? afterFilters
      : afterFilters.filter(entry => entry.article == filterValuesArr[1]);
  addInvView.renderProducts(afterFilters);
  model.state.inventaires.selected.renderedProducts = afterFilters;
  addInvView.resetPointers(controlInput, controlRefInput, controlNumInv);
  addInvView.addHandlerEditProductBtns(controlEditProductBtnsInt);
  model.state.inventaires.selected.afterFilters = afterFilters;
};

const controlInvProdSearch = searchInput => {
  const beforeSearch = model.state.inventaires.selected.produits;
  let afterSearch = [];
  const fuze = model.fuseMakerProdInv(beforeSearch);
  const results = fuze.search(searchInput);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  afterSearch = extractItems(results);
  if (afterSearch.length == 0) {
    if (searchInput !== '') {
      afterSearch = [];
    } else {
      afterSearch = beforeSearch;
    }
  }
  addInvView.renderProducts(afterSearch);
  model.state.inventaires.selected.renderedProducts = afterSearch;
  addInvView.resetPointers(controlInput, controlRefInput, controlNumInv);
  addInvView.addHandlerEditProductBtns(controlEditProductBtnsInt);
  model.state.inventaires.selected.afterSearch = afterSearch;
};
addInvView.addSearchController(controlInvProdSearch, controlInvProdFilters);
const controlUpdateAddInvFilters = async function () {
  model.state.inventaires.selected.chapitres = helpers.extractChapitres(
    model.state.inventaires.selected.renderedProducts
  );
  model.state.inventaires.selected.articles = helpers.extractArticles(
    model.state.inventaires.selected.renderedProducts
  );
  console.log(
    model.state.inventaires.selected.chapitres,
    model.state.inventaires.selected.articles
  );
  addInvView.updateFilterDropdownOptions(
    model.state.inventaires.selected.chapitres,
    model.state.inventaires.selected.articles
  );
};

addInvView.addChangeFiltersHandler(controlInvProdFilters);
const controlAddInv = async function () {
  //ONCLICK OF the Créer un état inventaire BUTTON
  addInvView.renderSpinner('');
  const allProducts = await model.loadAllInvProducts();

  model.prepareNewInventaire(allProducts[1].response);
  addInvView.render(model.state.inventaires.new);
  model.state.inventaires.selected = model.state.inventaires.new;
  model.state.inventaires.selected.renderedProducts =
    model.state.inventaires.new.produits;
  model.state.inventaires.selected.afterSearch =
    model.state.inventaires.new.produits;
  addInvView.resetPointers(controlInput, controlRefInput, controlNumInv);
  addInvView.addHandlerEditProductBtns(controlEditProductBtnsInt);
  controlUpdateAddInvFilters();
  //ADD EVENT LISTENNERS ?
};

const controlContinueInv = async function () {
  const targetIndex = Array.from(invView._checkboxes).findIndex(
    checkbox => checkbox.checked
  );
  const numInventaire = model.state.inventaires.all[targetIndex].num_inventaire;
  // // console.log();
  // await controlAddInv(numInventaire);
  //ONCLICK OF the Créer un état inventaire BUTTON

  addInvView.renderSpinner('');
  const responseBool = await model.loadInventaire(numInventaire);
  if (!responseBool) {
    addInvView._btnClose.click();
    return;
  }
  addInvView.render(model.state.inventaires.selected);
  model.state.inventaires.selected.renderedProducts =
    model.state.inventaires.selected.produits;
  console.log(model.state.inventaires.selected.renderedProducts);
  addInvView.resetPointers(controlInput, controlRefInput, controlNumInv);
  addInvView.addHandlerEditProductBtns(controlEditProductBtnsInt);
  controlUpdateAddInvFilters();
};

//TODO: incase you wanna only allow a specific number of inventaires
//ON INPUT OF NUMERO INVENTAIRE NUMBER:
const controlNumInv = value => {
  model.state.inventaires.selected.numInventaire = value;
  console.log(model.state.inventaires.selected);
};
//ON INPUT OF
const controlInput = (value, index) => {
  model.state.inventaires.selected.renderedProducts[index].present = value;
  console.log(model.state.inventaires.selected);
};
//ON INPUT OF
const controlRefInput = (value, index) => {
  model.state.inventaires.selected.renderedProducts[index].num_inventaire =
    value;
  console.log(model.state.inventaires.selected);
};
// const controlModifyCmdsInt = async function () {
const controlSetRemark = remark => {
  model.state.inventaires.selected.renderedProducts[
    model.state.inventaires.selected.selectedProduct
  ].raison = remark;
  addInvView.render(model.state.inventaires.selected);
  addInvView.resetPointers(controlInput, controlRefInput, controlNumInv);
  addInvView.resetSearchbar();
  console.log(model.state.inventaires.new);
  addInvView.addHandlerEditProductBtns(controlEditProductBtnsInt);
};

const controlSaveInv = async function (validityState) {
  if (model.state.inventaires.selected.numInventaire == '') {
    helpers.renderError(
      `Erreur lors de l'introduction des données `,
      `<p class="error-message"><b>Veuillez introduire le Numéro de l'inventaire.</b></p>
      `
    );
    return;
  } else {
    console.log(validityState);
    addInvView._btnClose.click();
    invView.renderSpinner('Sauvegarde en cours... ');
    await model.createInv();
    if (validityState) {
      invView.renderSpinner("Confirmation de l'état en cours... ");
      await model.confirmInv();
    }
    invView.unrenderSpinner();
    await controlLoadInv();
  }
};

const controlDeleteInv = async function () {
  //ONCLICK OF the DELETE BUTTON
  //CONFIRM MSG
  const targetIndex = Array.from(invView._checkboxes).findIndex(
    checkbox => checkbox.checked
  );
  const numInventaire = model.state.inventaires.all[targetIndex].num_inventaire;
  invView.renderSpinner('Suppression en cours...');
  // console.log();
  await model.deleteInv(numInventaire);
  invView.unrenderSpinner();
  await controlLoadInv();
};

const controlValidatingInv = async (e, view = false) => {
  console.log('controlValidatingInv');
  console.log(validateCmdsIntView._parentElement);
  validateCmdsIntView._parentElement.scrollTop = 0;
  //ONCLICK OF A VALIDATE BUTTON
  let targetIndex;
  if (view) {
    targetIndex = helpers.findNodeIndex(
      validateInvView._btnView,
      e.currentTarget
    );
  } else {
    targetIndex = helpers.findNodeIndex(
      validateInvView._btnOpen,
      e.currentTarget
    );
  }
  validateInvView.renderSpinner('', true);
  console.log(model.state.inventaires.rendered);
  let selectedInvProducts = await model.loadInventaire(
    model.state.inventaires.rendered[targetIndex].num_inventaire
  );
  validateInvView.resetPointers();
  if (!selectedInvProducts) {
    console.log(validateInvView);
    validateInvView._overlay.click();
    return;
  }
  validateInvView.unrenderSpinner(true);
  validateInvView.changeDetails(
    selectedInvProducts,
    model.state.inventaires.rendered[targetIndex].num_inventaire,
    view
  );
};

const controlValidateInv = async () => {
  // let appObject = validateCmdsIntView.extractObject();
  // let returnValue;
  console.log(validateInvView._btnClose);
  validateInvView._btnClose.click();
  invView.renderSpinner(`Validation de l'état de l'inventaire ...`);
  console.log('LIFE', validateInvView._InvNum);
  //#0f0
  await model.validateInv(validateInvView._InvNum);
  invView.unrenderSpinner('');
  await controlLoadInv();
};

const controlCrushInv = async function () {
  //ONCLICK OF the CRUSH METTRE A JOUR BUTTON
  //CONFIRM MSG
  const targetIndex = Array.from(invView._checkboxes).findIndex(
    checkbox => checkbox.checked
  );
  const numInventaire =
    model.state.inventaires.rendered[targetIndex].num_inventaire;
  invView.renderSpinner('Mise a jour en cours...');
  await model.crushInv(numInventaire);
  invView.unrenderSpinner();
  await controlLoadInv();
};
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////// Nomenclaturess #f00 #fff
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

const controlLoadChapters = async function () {
  try {
    if (
      !model.state.me.permissions.all.find(
        perm => perm.designation == 'show chapters'
      )
    ) {
      sideView.btns[0].click();
      helpers.renderError(
        'Erreur',
        'Vous semblez manquer des permissions nécessaires pour afficher cette section'
      );
      return;
    }
    chaptersView.restrict(model.state.me.permissions.all);
    // addChapterView.restrict(model.state.me.permissions.all);
    deleteChapterView.restrict(model.state.me.permissions.all);
    chaptersView.renderSpinner('Loading Chapters');
    await model.loadChapitres();
    chaptersView.render(model.state.chapters.all);
    // deleteStructureView.addDeleteController(controlDeleteStructure);

    numberChaptersView.render(model.state.chapters);
    numberChaptersView.updateMasterCheckbox();
    numberChaptersView.addHandlerNumber(controleSelectChapters);
    numberChaptersView.addHandlerMasterCheckbox(controleSelectChapters);
    chaptersView.addSearchController(controlSearchChapter);
    editChapterView.addHandlerShowWindow();
    editChapterView.addHandlerHideWindow();
    editChapterView.addHandlerEdit(controlEditChapter);
    // deleteChapterView.addDeleteController(controlDeleteStructure);
  } catch (error) {
    console.error(error);
  }
};

const controleSelectChapters = function (searched) {
  numberChaptersView._clear();
  if (searched) {
    model.state.chapters.searched.selected =
      numberChaptersView.calculateCheckboxes();
    numberChaptersView.render(model.state.chapters.searched);
    return;
  }
  model.state.chapters.selected = numberChaptersView.calculateCheckboxes();
  numberChaptersView.render(model.state.chapters);
};

const controlAddChapter = async function (newChapter) {
  try {
    await model.addChapter(newChapter);
    await controlLoadChapters();
    console.log(model.state.chapters.all);
    addChapterView.clearForm();
    //Close Window

    addChapterView.toggleWindow();
  } catch (error) {
    console.error(error);
  }
};

const controlEditChapter = function () {
  const target = this;
  const targetIndex = helpers.findNodeIndex(
    document.querySelectorAll('.details-btn-chapitres'),
    target
  );
  // console.log(targetIndex);
  console.log(model.state.chapters.all[targetIndex]);
  editChapterView.changeInputs(model.state.chapters.all[targetIndex]);
  editChapterView.addHandlerUpdate(controlUpdateChapter);
};

const controlUpdateChapter = async function (oldChapter, newChapter) {
  try {
    // if (
    //   Object.entries(helpers.getUpdateObject(oldStructure, newStructure))
    //     .length === 0
    // ) return;
    // console.log(oldStructure.designation, newStructure.designation);
    if (oldChapter.designation === newChapter.designation) return;
    chaptersView.renderSpinner('Modification de la structure...');
    await model.updateChapter(oldChapter, newChapter);
    await controlLoadChapters();
  } catch (error) {
    console.error(error);
  }
};

const controlDeleteChapter = async function () {
  filterArrayByBooleans(
    model.state.chapters.all,
    helpers.getCheckboxStates(
      document
        .querySelector('.results-chapitres')
        .querySelectorAll('input[type="checkbox"]')
    )
  ).forEach(async el => {
    console.log(el);
    chaptersView.renderSpinner(
      'Suppression du Chapitre ' + el.designation + '...'
    );
    await model.deleteChapter(el);
    // back to main menu
    await controlLoadChapters();
  });
};

const controlSearchChapter = async function (query) {
  model.state.chapters.searched.all = model.state.chapters.all.filter(chapter =>
    chapter.designation.toLowerCase().includes(query.toLowerCase())
  );
  // console.log(results);

  chaptersView.render(model.state.chapters.searched.all);
  numberChaptersView.render(model.state.chapters.searched);
  numberChaptersView.updateMasterCheckbox();
  numberChaptersView.addHandlerNumber(controleSelectChapters, true);
  numberChaptersView.addHandlerMasterCheckbox(controleSelectChapters, true);
};

const controlProdFilters = filterValuesArr => {
  const beforeFilters = model.state.products.afterSearch;
  let afterFilters = [];
  switch (filterValuesArr[0]) {
    case 'dcd':
      afterFilters = beforeFilters.sort(
        (a, b) => new Date(b.date_demande) - new Date(a.date_demande)
      );
      break;
    case 'acd':
      afterFilters = beforeFilters.sort(
        (a, b) => new Date(a.date_demande) - new Date(b.date_demande)
      );
      break;
    case 'default':
      afterFilters = beforeFilters.sort(helpers.newCustomSortForCmdsInt);
      break;
    default:
      afterFilters = beforeFilters;
  }
  switch (filterValuesArr[1]) {
    case 'all':
      afterFilters = beforeFilters;
      break;
    case 'demandee':
      afterFilters = beforeFilters.filter(entry => entry.etat == 'demandee');
      break;
    case 'visee par resp':
      afterFilters = beforeFilters.filter(
        entry => entry.etat == 'visee par resp'
      );
      break;
    case 'visee par dg':
      afterFilters = beforeFilters.filter(
        entry => entry.etat == 'visee par dg'
      );
      break;
    case 'prete':
      afterFilters = beforeFilters.filter(entry => entry.etat == 'pret');
      break;
    case 'servie':
      afterFilters = beforeFilters.filter(entry => entry.etat == 'servie');
      break;
    default:
      afterFilters = beforeFilters;
  }
  productsView.render(afterFilters);
  model.state.products.rendered = afterFilters;
  //TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
  // seeCmdsIntView.resetPointers();
  // seeCmdsIntView.addSeeController(controlViewCmdInt);
  // cmdsIntView.resetPointers();
  // validateCmdsIntView.resetPointers(controlValidatingCmdsInt);
  // addCmdsIntView.allowDeleteBtn(false, '.btn-delete-bdci');
  // addCmdsIntView.allowWhiteBtn(false, '.btn-edit-bdci');
  model.state.commandesInt.afterFilters = afterFilters;
};

const controlProdSearch = searchInput => {
  const beforeSearch = model.state.products.all;
  let afterSearch = [];
  console.log(beforeSearch);
  const fuze = model.fuseMakerProd(beforeSearch);
  const results = fuze.search(searchInput);
  function extractItems(data) {
    return data.map(entry => entry.item);
  }
  afterSearch = extractItems(results);
  if (afterSearch.length == 0) {
    if (searchInput !== '') {
      afterSearch = [];
    } else {
      afterSearch = beforeSearch;
    }
  }
  console.log(afterSearch);
  productsView.render(afterSearch);
  model.state.products.rendered = afterSearch;
  // TODO: seeCmdsIntView.resetPointers();
  // TODO: seeCmdsIntView.addSeeController(controlViewCmdInt);
  // TODO: cmdsIntView.resetPointers();
  // TODO: validateCmdsIntView.resetPointers(controlValidatingCmdsInt);
  // TODO: addCmdsIntView.allowDeleteBtn(false, '.btn-delete-bdci');
  // TODO: addCmdsIntView.allowWhiteBtn(false, '.btn-edit-bdci');
  model.state.products.afterSearch = afterSearch;
};

const controlLoadProducts = async function () {
  try {
    if (
      !model.state.me.permissions.all.find(
        perm => perm.designation == 'show products'
      )
    ) {
      sideView.btns[0].click();
      helpers.renderError(
        'Erreur',
        'Vous semblez manquer des permissions nécessaires pour afficher cette section'
      );
      return;
    }
    productsView.restrict(model.state.me.permissions.all);
    addProductsView.restrict(model.state.me.permissions.all);
    productsView.renderSpinner('Chargement des produits...');
    await model.loadAllProducts();
    productsView.render(model.state.products.all);
    // console.log(model.state.products.all);
    deleteProductView.addDeleteController(controlDeleteProduct);
    productsView.addSearchController(controlSearchProduct);
    editProductView.addHandlerShowWindow();
    editProductView.addHandlerHideWindow();
    editProductView.addHandlerEdit(controlEditProduct);

    // numberChaptersView.render(model.state.chapters);
    // numberChaptersView.updateMasterCheckbox();
    // numberChaptersView.addHandlerNumber(controleSelectChapters);
    // numberChaptersView.addHandlerMasterCheckbox(controleSelectChapters);
    // productsView.addSearchController(controlSearchProduct);
  } catch (error) {
    console.error(error);
  }
};

const controlSearchProduct = async function (query) {
  const results = model.state.products.all.filter(product =>
    product.designation.toLowerCase().includes(query.toLowerCase())
  );
  model.state.products.searched.all = results;

  productsView.render(model.state.products.searched.all);
  // numberChaptersView.render(model.state.chapters.searched);
  // numberChaptersView.updateMasterCheckbox();
  // numberChaptersView.addHandlerNumber(controleSelectChapters, true);
  // numberChaptersView.addHandlerMasterCheckbox(controleSelectChapters, true);
};

const controlAddProduct = async function (newProduct) {
  try {
    await model.loadArticles();
    if (
      !model.state.articles.all.some(
        article => article.designation === newProduct.article
      )
    )
      return helpers.renderError(
        'Article not found',
        `${newProduct.article} n'existe pas dans les article du systéme `
      );
    await model.addProduct(newProduct);
    addProductsView.toggleWindow();
    await controlLoadProducts();
    console.log(model.state.products.all);
    addProductsView.clearForm();
    //Close Window
  } catch (error) {
    console.error(error);
  }
};

const controlDeleteProduct = async function () {
  filterArrayByBooleans(
    model.state.products.all,
    helpers.getCheckboxStates(
      document
        .querySelector('.results-produits')
        .querySelectorAll('input[type="checkbox"]')
    )
  ).forEach(async el => {
    console.log(el);
    productsView.renderSpinner(
      'Suppression du Produit ' + el.designation + '...'
    );
    await model.deleteProduct(el);
    // back to main menu
    await controlLoadProducts();
  });
};

const controlEditProduct = function () {
  const target = this;
  const targetIndex = helpers.findNodeIndex(
    document.querySelectorAll('.details-btn-produits'),
    target
  );
  // console.log(targetIndex);
  console.log(model.state.products.all[targetIndex]);
  editProductView.changeInputs(model.state.products.all[targetIndex]);
  editProductView.addHandlerUpdate(controlUpdateProduit);
};

const controlUpdateProduit = async function (oldProduct, newProduct) {
  try {
    // if (
    //   Object.entries(helpers.getUpdateObject(oldStructure, newStructure))
    //     .length === 0
    // ) return;
    // console.log(oldStructure.designation, newStructure.designation);
    // if (oldProduct.designation === newProduct.designation) return;
    editProductView.renderSpinner('Modification du produit...');
    await model.updateProduct(oldProduct, newProduct);
    editProductView.unrenderSpinner();
    editProductView.toggleWindow();
    await controlLoadProducts();
  } catch (error) {
    editProductView.unrenderSpinner();
    console.error(error);
  }
};

const controlLoadArticles = async function () {
  try {
    if (
      !model.state.me.permissions.all.find(
        perm => perm.designation == 'show articles'
      )
    ) {
      sideView.btns[0].click();
      helpers.renderError(
        'Erreur',
        'Vous semblez manquer des permissions nécessaires pour afficher cette section'
      );
      return;
    }
    articlesView.restrict(model.state.me.permissions.all);
    addArticleView.restrict(model.state.me.permissions.all);
    deleteArticleView.restrict(model.state.me.permissions.all);
    articlesView.renderSpinner('Loading Articles ...');
    await model.loadArticles();
    articlesView.render(model.state.articles.all);
    // deleteStructureView.addDeleteController(controlDeleteStructure);

    // numberChaptersView.render(model.state.chapters);
    numberArticlesView.render(model.state.articles);
    numberArticlesView.updateMasterCheckbox();
    numberArticlesView.addHandlerNumber(controlSelectArticles);
    numberArticlesView.addHandlerMasterCheckbox(controlSelectArticles);
    articlesView.addSearchController(controlSearchArticles);
    editArticleView.addHandlerShowWindow();
    editArticleView.addHandlerHideWindow();
    editArticleView.addHandlerEdit(controlEditArticle);
    // deleteChapterView.addDeleteController(controlDeleteStructure);
  } catch (error) {
    console.error(error);
  }
};

const controlSelectArticles = function (searched) {
  numberArticlesView._clear();
  if (searched) {
    model.state.articles.searched.selected =
      numberArticlesView.calculateCheckboxes();
    numberArticlesView.render(model.state.articles.searched);
    return;
  }
  model.state.articles.selected = numberArticlesView.calculateCheckboxes();
  numberArticlesView.render(model.state.articles);
};

const controlSearchArticles = function (query) {
  const results = model.state.articles.all.filter(article =>
    article.designation.toLowerCase().includes(query.toLowerCase())
  );
  model.state.articles.searched.all = results;

  articlesView.render(model.state.articles.searched.all);
  // numberArticlesView.render(model.state.articles.searched);
  numberArticlesView.updateMasterCheckbox();
  numberArticlesView.addHandlerNumber(controlSearchArticles, true);
  numberArticlesView.addHandlerMasterCheckbox(controlSearchArticles, true);
};

const controlAddArticle = async function (newArticle) {
  try {
    await model.loadChapitres();
    if (
      !model.state.chapters.all.some(
        chapter => chapter.designation === newArticle.chapitre
      )
    )
      return helpers.renderError(
        'Chapter not found',
        `${newArticle.chapitre} n'existe pas dans les chapitre du systéme `
      );
    await model.addArticle(newArticle);
    addArticleView.toggleWindow();
    await controlLoadArticles();
    console.log(model.state.articles.all);
    addArticleView.clearForm();
    //Close Window

    // addArticleView.toggleWindow();
  } catch (error) {
    console.error(error);
  }
};

const controlEditArticle = function () {
  const target = this;
  const targetIndex = helpers.findNodeIndex(
    document.querySelectorAll('.details-btn-articles'),
    target
  );
  // console.log(targetIndex);
  console.log(model.state.articles.all[targetIndex]);
  editArticleView.changeInputs(model.state.articles.all[targetIndex]);
  editArticleView.addHandlerUpdate(controlUpdateArticle);
};

const controlDeleteArticle = async function () {
  filterArrayByBooleans(
    model.state.articles.all,
    helpers.getCheckboxStates(
      document
        .querySelector('.results-articles')
        .querySelectorAll('input[type="checkbox"]')
    )
  ).forEach(async el => {
    console.log(el);
    articlesView.renderSpinner(
      'Suppression du Article ' + el.designation + '...'
    );
    await model.deleteArticle(el);
    // back to main menu
    await controlLoadArticles();
  });
};

const controlUpdateArticle = async function (oldArticle, newArticle) {
  try {
    // if (
    //   Object.entries(helpers.getUpdateObject(oldStructure, newStructure))
    //     .length === 0
    // ) return;
    // console.log(oldStructure.designation, newStructure.designation);
    // if (oldArticle.designation === newArticle.designation) return;
    editArticleView.renderSpinner("Modification de l'article...");
    await model.updateArticle(oldArticle, newArticle);
    await controlLoadArticles();
  } catch (error) {
    console.error(error);
  }
};

const controlLoadFournisseurs = async function () {
  try {
    if (
      !model.state.me.permissions.all.find(
        perm => perm.designation == 'show fournisseurs'
      )
    ) {
      sideView.btns[0].click();
      helpers.renderError(
        'Erreur',
        'Vous semblez manquer des permissions nécessaires pour afficher cette section'
      );
      return;
    }
    fournisseurView.restrict(model.state.me.permissions.all);
    // addArticleView.restrict(model.state.me.permissions.all);
    // deleteChapterView.restrict(model.state.me.permissions.all);
    fournisseurView.renderSpinner('Loading Fournisseur ...');
    await model.loadFournisseurs();
    fournisseurView.render(model.state.fournisseur.all);
    // deleteStructureView.addDeleteController(controlDeleteStructure);

    // numberChaptersView.render(model.state.chapters);
    // numberChaptersView.updateMasterCheckbox();
    // numberChaptersView.addHandlerNumber(controleSelectChapters);
    // numberChaptersView.addHandlerMasterCheckbox(controleSelectChapters);
    fournisseurView.addSearchController(controlSearchFournisseurs);
    editFournisseurView.addHandlerShowWindow();
    editFournisseurView.addHandlerHideWindow();
    editFournisseurView.addHandlerEdit(controlEditFournisseur);
    detailFournisseurView.addHandlerShowWindow();
    detailFournisseurView.addHandlerHideWindow();
    detailFournisseurView.addHandlerEdit(controlDetailFournisseur);
    deleteFournisseurView.addDeleteController(controlDeleteFournisseur);
  } catch (error) {
    console.error(error);
  }
};

const controlAddFournisseur = async function (newFournisseur) {
  try {
    await model.addFournisseur(newFournisseur);
    await controlLoadFournisseurs();
    console.log(model.state.fournisseur.all);
    addFournisseurView.clearForm();
    //Close Window
    addFournisseurView.toggleWindow();
  } catch (error) {
    console.error(error);
  }
};

const controlSearchFournisseurs = function (query) {
  const results = model.state.fournisseur.all.filter(fournisseur =>
    fournisseur.raison_sociale.toLowerCase().includes(query.toLowerCase())
  );
  model.state.fournisseur.searched.all = results;

  fournisseurView.render(model.state.fournisseur.searched.all);
};

const controlEditFournisseur = function () {
  const target = this;
  const targetIndex = helpers.findNodeIndex(
    document.querySelectorAll('.edit-fournisseur-btn'),
    target
  );
  console.log('targetIndex', targetIndex);
  console.log(model.state.fournisseur.all[targetIndex]);
  editFournisseurView.changeInputs(model.state.fournisseur.all[targetIndex]);
  editFournisseurView.addHandlerUpdate(controlUpdateFournisseur);
};
const controlDetailFournisseur = function () {
  const target = this;
  const targetIndex = helpers.findNodeIndex(
    document.querySelectorAll('.details-btn-fournisseur'),
    target
  );
  // console.log(model.state.fournisseur.all[targetIndex]);
  detailFournisseurView.changeInputs(model.state.fournisseur.all[targetIndex]);
};

const controlUpdateFournisseur = async function (
  oldFournisseur,
  newFournisseur
) {
  try {
    if (helpers.areValuesEqual(oldFournisseur, newFournisseur)) return;
    editFournisseurView.renderSpinner('Modification du Fournisseur...');
    await model.updateFournisseur(newFournisseur);
    editFournisseurView.toggleWindow();
    await controlLoadFournisseurs();
  } catch (error) {
    console.error(error);
    editFournisseurView.unrenderSpinner();
  }
};

const controlDeleteFournisseur = async function () {
  filterArrayByBooleans(
    model.state.fournisseur.all,
    helpers.getCheckboxStates(
      document
        .querySelector('.results-fournisseur')
        .querySelectorAll('input[type="checkbox"]')
    )
  ).forEach(async el => {
    console.log(el);
    fournisseurView.renderSpinner(
      'Suppression du Fournisseur ' + el.raison_sociale + '...'
    );
    await model.deleteFournisseur(el);
    // back to main menu
    await controlLoadFournisseurs();
  });
};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////////////// S T A T I S T I Q U E S #fff//////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

const setupGraphContainers = async function (statLinks) {
  document.querySelector('.container-mini-carts').innerHTML = '';
  document.querySelector('.grid-statistiques').innerHTML = '';

  for (const statLink of statLinks) {
    const config = STAT_LINK_CONFIG[statLink.code];
    if (config) {
      const { title, size, optionsName, optionsLink, optionsPostObj } = config;
      let html;
      let parentElement;
      let options = [];
      let dropdownOptions = '';

      //TODO: SPINNER HERE
      statsView.renderSpinner('');

      // Fetch dynamic options if required
      if (optionsLink) {
        switch (optionsName) {
          case 'article':
            if (model.state.articles.all.length === 0) {
              const response = await model.fetchDynamicOptions(optionsLink);
              model.state.articles.all = response;
            }
            options = model.state.articles.all;
            break;
          case 'structure':
            if (model.state.structures.all.length === 0) {
              const response = await model.fetchDynamicOptions(optionsLink);
              model.state.structures.all = response;
            }
            options = model.state.structures.all;
            break;
          case 'fournisseur':
            if (model.state.fournisseurs.all.length === 0) {
              const response = await model.fetchDynamicOptions(optionsLink);
              model.state.fournisseurs.all = response;
            }
            options = model.state.fournisseurs.all;
            break;
          case 'produit':
            if (model.state.products.all.length === 0) {
              const response = await model.fetchDynamicOptions(optionsLink);
              model.state.products.all = response;
            }
            options = model.state.products.all;
            break;
        }
        dropdownOptions = options
          .map(
            option =>
              `<option value="${option.designation}">${option.designation}</option>`
          )
          .join('');
      }

      const currentYear = new Date().getFullYear();
      const yearOptions = Array.from(
        { length: currentYear - 2013 + 1 },
        (_, i) => currentYear - i
      )
        .map(year => `<option value="${year}">${year}</option>`)
        .join('');

      const minDateDebut = '2014-09-14';
      const maxDateFin = new Date().toISOString().split('T')[0];
      console.log(maxDateFin);

      let extraInputsHtml = '';
      if (optionsPostObj) {
        optionsPostObj.forEach(option => {
          if (option === 'year') {
            extraInputsHtml += `<select class="stat-${option}-input stat-dropdown" data-title="${title}" data-option="${option}">
                            ${yearOptions}
                          </select>`;
          } else if (option === 'dateDebut') {
            extraInputsHtml += `<input type="date" class="stat-${option}-input stat-dropdown" placeholder="${option}" data-title="${title}" data-option="${option}" min="${minDateDebut}" max="${maxDateFin}" value="${minDateDebut}"/>`;
          } else if (option === 'dateFin') {
            extraInputsHtml += `<input type="date" class="stat-${option}-input stat-dropdown" placeholder="${option}" data-title="${title}" data-option="${option}" min="${minDateDebut}" max="${maxDateFin}" value="${maxDateFin}"/>`;
          }
        });
      }

      switch (size) {
        case 'g1':
          html = `
            <div class="grid-1">
              <div class="top-statistiques-cart">
                <p class="cart-description-statistiques">${title}</p>
              </div>
              <div class="extra-inputs">${extraInputsHtml}</div>
              <div class="graph-statistiques spinner-parent ${title.replace(
                /\s/g,
                ''
              )} style="height: 100%; width: 100%; position: static">
                <div class="spinner"></div>
              </div>
            </div>`;
          parentElement = '.grid-statistiques';
          break;
        case 'g2':
          html = `
            <div class="grid-2" style="min-height: 317px;">
              <p class="cart-description-statistiques">${title}</p>
              ${
                dropdownOptions
                  ? `<select class="stat-dropdown stat-${optionsName}-input" data-title="${title}" data-option="${optionsName}">
                  ${dropdownOptions}
                </select>`
                  : ''
              }
              <div class="extra-inputs">${extraInputsHtml}</div>
              <div class="graph-statistiques spinner-parent ${title.replace(
                /\s/g,
                ''
              )}" style="height: 100%; width: 100%; position: static">
                <div class="spinner"></div>
              </div>
            </div>`;
          parentElement = '.grid-statistiques';
          break;
        case 'mini':
          html = `
            <div class="mini-carts">
              <div class="cart">
                <div class="cart-title">
                  <p class="cart-description">${title}</p>
                  <ion-icon name="arrow-up-outline" class="statistiques-icons md hydrated" role="img"></ion-icon>
                </div>
                <div class="extra-inputs">${extraInputsHtml}</div>
                <div class="cart-info">
                  <p class="cart-number ${title.replace(/\s/g, '')}">140</p>
                </div>
              </div>
            </div>`;
          parentElement = '.container-mini-carts';
          break;
      }
      statsView.unrenderSpinner();
      document
        .querySelector(parentElement)
        .insertAdjacentHTML('beforeend', html);
    } else {
      console.error(
        `Configuration for statLink "${statLink.code}" not found in statLinkConfig.`
      );
    }
  }
};

const setupEventListeners = statLinks => {
  document
    .querySelectorAll(
      '.stat-dropdown, .extra-inputs select, .extra-inputs input'
    )
    .forEach(element => {
      element.addEventListener('change', async event => {
        const container = event.target.closest('.grid-2, .grid-1, .mini-carts');
        const { title } = container.querySelector('.stat-dropdown').dataset;
        console.log(title);
        const statLink = statLinks.find(
          link => STAT_LINK_CONFIG[link.code].title === title
        );
        const selectedOption = container.querySelector(
          `.stat-dropdown[data-title="${title}"]`
        ).value;

        const postObject = {};
        postObject[STAT_LINK_CONFIG[statLink.code].optionsName] =
          selectedOption;
        STAT_LINK_CONFIG[statLink.code].optionsPostObj.forEach(option => {
          postObject[option] = container.querySelector(
            `.stat-${option}-input[data-title="${title}"]`
          ).value;
        });
        console.log(postObject);
        // Validate dateDebut < dateFin
        const dateDebutInput = container.querySelector('.stat-dateDebut-input');
        const dateFinInput = container.querySelector('.stat-dateFin-input');

        if (dateDebutInput && dateFinInput) {
          const dateDebutValue = new Date(dateDebutInput.value);
          const dateFinValue = new Date(dateFinInput.value);

          if (dateDebutValue >= dateFinValue) {
            // Force user to input acceptable values
            dateDebutInput.value = ''; // Clear invalid value
            dateFinInput.value = ''; // Clear invalid value
            // alert('Please ensure Date Début is earlier than Date Fin.');
            return;
          }
        }
        await fetchAndRenderGraphData(statLink.code, postObject);
      });
    });
};

const controlLoadStatistiques = async () => {
  const statLinks =
    model.state.me.permissions.wellFormed.filter(
      e => e.groupName === 'Statistiques'
    )[0]?.permissions || [];

  // Setup graph containers first
  await setupGraphContainers(statLinks);
  setupEventListeners(statLinks);

  // Render data as promises resolve
  await renderGraphData(statLinks);
};

const renderGraphData = async function (statLinks) {
  for (const statLink of statLinks) {
    const config = STAT_LINK_CONFIG[statLink.code];
    if (config) {
      const { title, dataName, old, style } = config;

      const parentElement = '.grid-statistiques';
      const graphElement = document
        .querySelector(parentElement)
        .querySelector(`.${title.replace(/\s/g, '')}`);
      let postObject = {};
      const container = graphElement.closest('.grid-2, .grid-1, .mini-carts');
      config?.optionsPostObj?.forEach(option => {
        console.log(`.stat-${option}-input[data-title="${title}"]`);
        postObject[option] = container.querySelector(
          `.stat-${option}-input[data-title="${title}"]`
        ).value;
      });
      const promise = model.getGraphPromise(
        statLink.code,
        postObject ? postObject : null
      );
      graphElement.innerHTML = `<div class="spinner-parent">
      <div class="spinner small-spinner"></div>
     </div>`;
      const results = await promise;
      if (graphElement) {
        graphElement.innerHTML = `<canvas id="${title.replace(
          /\s/g,
          ''
        )}"></canvas>`;

        if (style === 'bar') {
          if (old) {
            helpers.createChartOld(
              graphElement.querySelector(`#${title.replace(/\s/g, '')}`),
              results.response,
              dataName
            );
          } else {
            helpers.createChart(
              graphElement.querySelector(`#${title.replace(/\s/g, '')}`),
              results.response,
              dataName
            );
          }
        } else if (style === 'pie') {
          helpers.createPieChart(
            graphElement.querySelector(`#${title.replace(/\s/g, '')}`),
            results.response,
            dataName
          );
        } else if (style == 'monthly') {
          helpers.createMonthlyChart(
            document
              .querySelector(parentElement)
              .querySelector(`.${title.replace(/\s/g, '')}`)
              .querySelector(`#${title.replace(/\s/g, '')}`),
            results.response,
            dataName
          );
        }

        document
          .querySelector(parentElement)
          .querySelectorAll('.grid-2')
          .forEach(elem => {
            elem.style.height = 'auto';
          });

        // Add loaded class for animation
        graphElement.classList.add('loaded');
      } else {
        console.error(`Graph element for ${title} not found.`);
      }
    } else {
      console.error(
        `Configuration for statLink "${statLink.code}" not found in statLinkConfig.`
      );
    }
  }
};

const fetchAndRenderGraphData = async (statLinkCode, selectedOption) => {
  const config = STAT_LINK_CONFIG[statLinkCode];
  if (config) {
    const { title, size, dataName, old, style } = config;
    const promise = model.getGraphPromise(statLinkCode, selectedOption); // Pass the selected option
    const parentElement = '.grid-statistiques';
    const graphContainer = document
      .querySelector(parentElement)
      .querySelector(`.${title.replace(/\s/g, '')}`);
    graphContainer.innerHTML = `<div class="spinner-parent">
     <div class="spinner small-spinner"></div>
    </div>`;
    const results = await promise;
    graphContainer.innerHTML = `<canvas id="${title.replace(
      /\s/g,
      ''
    )}"></canvas>`;
    console.log(selectedOption, results.response);
    if (style === 'bar') {
      if (old) {
        helpers.createChartOld(
          graphContainer.querySelector(`#${title.replace(/\s/g, '')}`),
          results.response,
          dataName
        );
      } else {
        helpers.createChart(
          graphContainer.querySelector(`#${title.replace(/\s/g, '')}`),
          results.response,
          dataName
        );
      }
    } else if (style === 'pie') {
      helpers.createPieChart(
        graphContainer.querySelector(`#${title.replace(/\s/g, '')}`),
        results.response,
        dataName
      );
    } else if (style == 'monthly') {
      console.log(graphContainer.querySelector(`#${title.replace(/\s/g, '')}`));
      helpers.createMonthlyChart(
        document
          .querySelector(parentElement)
          .querySelector(`.${title.replace(/\s/g, '')}`)
          .querySelector(`#${title.replace(/\s/g, '')}`),
        results.response,
        dataName
      );
    }
    graphContainer.classList.add('loaded');
  } else {
    console.error(
      `Configuration for statLink "${statLinkCode}" not found in statLinkConfig.`
    );
  }
};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////// M O D I F I C A T I O N S  #fff
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

const controlLoadMod = async () => {
  const dropArea = document.getElementById('drop-area');
  const inputFile = document.getElementById('input-logo');
  const imageView = document.getElementById('img-modif-view');
  const dropArea2 = document.getElementById('drop-area-2');
  const inputFile2 = document.getElementById('input-preambule');
  const imageView2 = document.getElementById('img-modif-view-2');

  inputFile.addEventListener('change', uploadImage);

  async function uploadImage() {
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage = `url(${imgLink})`;
    imageView.textContent = '';
    console.log(inputFile.files[0]);

    const formData = new FormData();
    formData.append('logo', inputFile.files[0]);

    try {
      uploadLogoView.renderSpinner('Modifier Logo...');
      const res = await fetch('http://localhost:3000/Parametre/uploadLogo', {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('JWT'),
        },
        body: formData,
      });

      const data = await res.json();
      console.log(`upload successful`, data);
    } catch (error) {
      console.error(`upload failed`, error);
    } finally {
      uploadLogoView.unrenderSpinner();
    }
  }

  dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
  });
  dropArea.addEventListener('drop', async function (e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    await uploadImage();
  });

  inputFile2.addEventListener('change', uploadImage2);

  async function uploadImage2() {
    let imgLink = URL.createObjectURL(inputFile2.files[0]);
    imageView2.style.backgroundImage = `url(${imgLink})`;
    imageView2.textContent = '';
    console.log(imgLink);

    const formData = new FormData();
    formData.append('header', inputFile2.files[0]);

    try {
      uploadHeaderView.renderSpinner('Modifier Header...');
      const res = await fetch('http://localhost:3000/Parametre/uploadHeader', {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('JWT'),
        },
        body: formData,
      });

      const data = await res.json();
      console.log(`upload successful`, data);
    } catch (error) {
      console.error(`upload failed`, error);
    } finally {
      uploadHeaderView.unrenderSpinner();
    }
  }

  dropArea2.addEventListener('dragover', function (e) {
    e.preventDefault();
  });
  dropArea2.addEventListener('drop', async function (e) {
    e.preventDefault();
    inputFile2.files = e.dataTransfer.files;
    await uploadImage2();
  });
};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////// F I N #fff
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
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
  controlLoadMod,
  controlLoadStatistiques,
  ,
  controlLoadArticles,
  controlLoadChapters,
  controlLoadProducts,
  controlLoadCmds,
  controlLoadCmdsInt,
  controlLoadInv,
  controlLoadFournisseurs,
];
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////// B A C K  O '  B E Y O N D #fff
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
await controlProfile();

addCmdsView.addHandlerDeleteAddedProducts(controlDeleteAddedProducts);
addCmdsIntView.addHandlerDeleteAddedProducts(controlDeleteAddedProductsInt);
editCmdsIntView.addHandlerDeleteAddedProducts(controlDeleteAddedProductsInt);

deleteCmdsView.addDeleteController(controlDeleteCmds);
cancelCmdsView.addCancelController(controlCancelCmds);

addCmdsView.addHandlerSavingBDC(controlSavingBDC, model.state);
addCmdsIntView.addHandlerSavingBDC(controlSavingBDCI, model.state);
editCmdsIntView.addHandlerSavingBDC(controlSavingBDCIEdit, model.state);

addRoleView.addHandlerUpload(controlAddRole);
editPermsView.addHandlerUpload(controlUpdateRole);
editPermsView.addHandlerSwitch(controlRoleSwitch);
sideView.addHandlerBtns(controllers, '', model.state.me.permissions.all);
console.log(model.state.me.permissions.all);
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
addStructureView.addHandlerUpload(controlAddStructure);

deleteStructureView.addDeleteController(controlDeleteStructure);
deleteChapterView.addDeleteController(controlDeleteChapter);
deleteArticleView.addDeleteController(controlDeleteArticle);
sideView.hideAllDivs();
deleteRoleView.addDeleteController(controlDeleteRoles);
addChapterView.addHandlerUpload(controlAddChapter);
addArticleView.addHandlerUpload(controlAddArticle);
addProductsView.addHandlerUpload(controlAddProduct);
addFournisseurView.addHandlerUpload(controlAddFournisseur);

addCmdsView.addHandlerFournisseurSearch(
  controlSearchFournisseursCmds,
  model.state.fournisseur
);
// #F00
// controlUpdateArticles();
// controlUpdateFournisseurs();

//#f00 TODO:
addBonReception.addHandlerNext();
addBonReception.addHandlerBack();
addBonReception.addHandlerSave(controlAddBRec);
productsView.addHandlerProdSearch(controlProdSearch, controlProdFilters);

addCmdsView.addHandlerArticleSearch(
  controlSearchArticlesCmds,
  model.state.articles
);
addCmdsView.addTypeSelectHandler(controlTypeSelection);

addCmdsView.addHandlerProductSearch(
  controlSearchProducts,
  model.state.bdc_products
);
addCmdsIntView.addHandlerProductSearch(
  controlSearchProducts,
  model.state.bdci_products
);

editCmdsIntView.addHandlerProductSearch(
  controlSearchProducts,
  model.state.bdci_products
);

addCmdsView.addHandlerAddProduct(
  controlAddProductBdc,
  model.state.bdc_products
);
addCmdsIntView.addHandlerAddProduct(
  controlAddProductBdcInt,
  model.state.bdci_products
);
// addCmdsIntView.addHandlerCheckboxedBtn('.check-bdd', controlCommandeExterne);
editCmdsIntView.addHandlerAddProduct(
  controlAddProductBdcIntEdit,
  model.state.bdci_products
);

addCmdsView.addHandlerChangeProduct(
  controlChangeProductInt,
  model.state.bdc_products
);
addCmdsIntView.addHandlerChangeProduct(
  controlChangeProductInt,
  model.state.bdci_products
);
editCmdsIntView.addHandlerChangeProduct(
  controlChangeProductInt,
  model.state.bdci_products
);

//TODO: add after every render
// const controlNumberAddProducts = function () {
//   numberRoleView._clear();
//   model.state.bdc_products.selectedProducts =
//     numberAddProductsView.calculateCheckboxes();
//   numberRoleView.render(model.state);
// };

editCmdsIntView.addHandlerEdit(controlModifyCmdsInt);
validateCmdsIntView.addHandlerValidate(controlValidateCmdsInt);
validateCmdsIntView.addHandlerDeliver(controlDeliverCmdsInt);
deliverCmdsExtView.addHandlerHideWindow(
  '.btn-cancel-livrer-bdd',
  '.big-container-bdd'
);
deliverCmdsExtView.addHandlerDeliver(controlDechargerCmdsInt);
deleteCmdsIntView.addDeleteController(controlDeleteCmdsInt);
deleteInvView.addDeleteController(controlDeleteInv);

addInvView.addHandlerSetRemark(controlSetRemark);
addInvView.addHandlerEdit(controlAddInv);
addInvView.addHandlerSavingInv(controlSaveInv);
validateInvView.addHandlerValidate(controlValidateInv);
validateInvView.addHandlerDeliver(controlCrushInv);
// validateInvView.(controlValidateInv);

addCmdsView.addHandlerAddingProduct(
  controlSelectArticlesCmds,
  model.state,
  handleAddedProducts
);
addBonReception.addHandlerCancel();
