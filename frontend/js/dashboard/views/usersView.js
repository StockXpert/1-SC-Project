import View from './view.js';
import * as helpers from '../helpers.js';
export class UsersView extends View {
  _parentElement = document.querySelector('.results');
  _trueParentElement = document.querySelector('.table-container');
  _checkboxes = this._parentElement.querySelectorAll('input[type="checkbox"]');
  _checkedCheckboxes = this._parentElement.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  _btnDeleteUser = document.querySelector('.btn-delete-user');
  addEventListenerCheckboxesChange(handler = '') {
    this.disableBtns([this._btnDeleteUser]);
    this._checkboxes.forEach(cbx =>
      cbx.addEventListener('change', e => {
        this.disableBtns([this._btnDeleteUser]);
        const tthis = e.currentTarget;
        if (tthis.checked) {
          helpers.findClosestTrParent(tthis).classList.add('selected-row');
          // this._checkboxes.forEach(otherCheckbox => {
          //   if (otherCheckbox !== tthis) {
          //     helpers
          //       .findClosestTrParent(otherCheckbox)
          //       .classList.remove('selected-row');
          //     otherCheckbox.checked = false;
          //   }
          // });
        } else {
          helpers.findClosestTrParent(tthis).classList.remove('selected-row');
        }
        this._checkedCheckboxes = this._parentElement.querySelectorAll(
          'input[type="checkbox"]:checked'
        );
        if (this._checkedCheckboxes.length === 0) {
          this.disableBtns([this._btnDeleteUser]);
        } else {
          this.enableBtns([this._btnDeleteUser]);
        }
      })
    );
  }

  resetPointers() {
    this._checkboxes = this._parentElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    this.addEventListenerCheckboxesChange();
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }
  _generateMarkupPreview(result, perms = []) {
    return `
      <tr>
      <td>
        <div class="checkbox-colomn">
          <input type="checkbox" id="checkbox-table">
          <p class="colomn-tags-name">${result.nom + ' ' + result.prenom} </p>
        </div>
      </td>
      <td>${result.email}</td>
      <td class="table-status ${
        result.active === 'Activé' ? 'active-status' : 'inactif-status'
      }">${result.active}</td>
      <td><p class="admin-role">${
        result.role ? helpers.roleTranslator(result.role) : 'Aucun'
      }</p></td>
      <td class="table-structure">${
        result.structure ? result.structure : 'Aucune'
      }</td>
      <td>
        ${
          helpers.includesDesignation(perms, 'update user') ||
          helpers.includesDesignation(perms, 'change status') ||
          helpers.includesDesignation(perms, 'rattacher')
            ? `
                    <button class="details-btn">
                      <span class="material-icons-sharp info-icon">
                        edit
                      </span>
                    </button>`
            : ``
        }
      </td>
    </tr>
    `;
  }
  _restricted = [, 'none'];
}
export default new UsersView();
