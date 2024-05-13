import { UsersView } from '../usersView.js';
import View from '../view.js';
import * as helpers from '../../helpers.js';

class RolesView extends UsersView {
  _parentElement = document.querySelector('.roles-cart');
  //preview        next      next2
  //result(role)-> groupe -> permission
  _generateMarkup() {
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }

  _generateMarkupPreview(result, perms = []) {
    const next = function (groupe) {
      return `
      <div class="groupe-role-container">
        <div class="groupe-role-title">
          <p>${groupe.groupName}</p>
        </div>
        <div class="groupe-permissions">
          <p>${groupe.permissions.map(next2).join('')}</p>
        </div>
      </div>
      `;
    };
    const next2 = function (permission) {
      return `
      <p>${permission.name}</p>
      `;
    };
    return `
    <div class="role">
      <div class="blue-backgroud-role"></div>
      <div class="heading-role-user">
        <input type="checkbox" />
        <h1 class="heading-primary-roles">${result.role}</h1>
      </div>
      <div class="text-permissions">
        ${
          helpers.includesDesignation(perms, 'show permissions')
            ? result.droits.map(next).join('')
            : ''
        }
      </div>
    </div>
  `;
  }
}
export default new RolesView();
