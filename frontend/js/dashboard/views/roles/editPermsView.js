import { getCheckboxStates } from '../../helpers.js';
import { EditUserView } from '../editUserView.js';
import * as helpers from '../../helpers.js';
import * as model from '../../model.js';

class EditPermsView extends EditUserView {
  // constructor(){
  _parentElement = document.querySelector('.container-checkboxes-permissions');
  _trueParentElement = document.querySelector('.container-permissions');
  _role = document.querySelector('#pick-role-options');
  _data;
  _btnClose = document.querySelector('.cancel-permission-btn');
  _checkboxes = this._parentElement.querySelectorAll('.input[type=checkbox]');
  _changedSpinnerContainer = document.querySelector('.container-permissions');
  _form = document.querySelector('.main-container-permissions');

  updateThisCheckboxesPointers() {
    this._checkboxes = this._parentElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    return this._checkboxes;
  }
  // }

  changeInputs(NewInputValuesObj) {
    // Example usage:
    const nodeList = document.querySelectorAll('input[type="checkbox"]');
    const specialArray = ['A', 'C'];
    const booleanArray = helpers.checkSpecialArray(nodeList, specialArray);
    console.log(booleanArray); // Output: [true, false, true]
  }

  _generateMarkup() {
    if (this._data === '')
      return `
    <div class="no-role-selected">
      <p>Les Permissions s’afficherons ici !</p>
      <p>Selectionnez un rôle pour afficher ses permissions</p>
    </div>
    `;
    const next = this._generateMarkupPreview;
    return this._data.map(next).join('');
  }
  // _generateMarkupPreviewPreview
  _generateMarkupPreview(group) {
    const next = function (permission) {
      let permCode = permission.code + '';
      return `
        <div class="checkbox-colomn-permissions">
          <input type="checkbox" class="checkbox-table-permissions" name="${permCode}">
          <p class="colomn-tags-name-permissions">
            ${
              permission.name
                ? `${permission.name} (${permission.code})`
                : `${permission.code}`
            }
          </p>
        </div>
      `;
    };
    return `<p class="heading-permission-text">${group.groupName}</p>
    ${group.permissions.map(next).join('')}
  `;
  }

  addHandlerUpload(handler) {
    const closeBtn = this._btnClose;
    let checkboxes = [];
    let newStateOfCheckboxes = [];
    const form = this._form;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      checkboxes = this.updateThisCheckboxesPointers();
      newStateOfCheckboxes = helpers.getCheckboxStates(checkboxes);
      const changesObj = helpers.compareAndGetUpdates(
        helpers.checkSpecialArray(
          checkboxes,
          model.state.roles.selected.droits
        ),
        newStateOfCheckboxes
      );
      await handler(changesObj);
      document.querySelector('.roles-btn').click();
      // e.preventDefault();
    });
  }

  setSelector(targetIndex) {
    this._role.selectedIndex = targetIndex;
  }

  addHandlerSwitch(handler) {
    this._role.addEventListener('change', e => {
      const { selectedIndex: selectedValue } = e.target;
      console.log(selectedValue);
      handler(e, selectedValue);
    });
  }

  addHandlerDeleteCancelBtns(fn) {
    let newState = fn(this._checkboxes);
    this._checkboxes.forEach(el =>
      el.addEventListener('change', e => {
        console.log('CHANGE');
        newState = fn(this._checkboxes);
        if (newState) {
          document
            .querySelector('.permissions-save-btns')
            .classList.add('hidden');
        } else {
          document
            .querySelector('.permissions-save-btns')
            .classList.remove('hidden');
        }
      })
    );
  }
}
export default new EditPermsView();
