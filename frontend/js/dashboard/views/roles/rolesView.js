import { UsersView } from '../usersView.js';
import View from '../view.js';

class RolesView extends UsersView {
  _parentElement = document.querySelector('.roles-cart');
  //preview        next      next2
  //result(role)-> groupe -> permission
  _generateMarkupPreview(result) {
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
        ${result.droits.map(next).join('')}
      </div>
    </div>
  `;
  }
}
export default new RolesView();
