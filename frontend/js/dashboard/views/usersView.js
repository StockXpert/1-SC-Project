import View from './view.js';
import * as helpers from '../helpers.js';
export class UsersView extends View {
  _parentElement = document.querySelector('.results');
  _trueParentElement = document.querySelector('.table-container');

  _generateMarkup() {
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
      <td class="table-structure">${result.structure}</td>
      <td>
        ${
          perms.includes('update user') ||
          perms.includes('change status') ||
          perms.includes('rattacher')
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
