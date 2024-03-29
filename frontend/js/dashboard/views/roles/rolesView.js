import { UsersView } from '../usersView.js';
import View from '../view.js';

class RolesView extends UsersView {
  _parentElement = document.querySelector('.roles-cart');
  // _trueParentElement = document.getElementById('main-table-roles');

  _generateMarkupPreview(result) {
    // TODO: console.log(result);
    // console.log(result.active);
    // const id = window.location.hash.slice(1);
    return `
    <div class="role">
    <div class="blue-backgroud-role"></div>
      <div class="heading-role-user">
        <input type="checkbox"/>
        <h1 class="heading-primary-roles">${result.role}</h1>
      </div>
      <div class="text-permissions">
          ${result.droits
            .map(
              droit => `
            <p>- ${droit}</p>
            `
            )
            .join('')}
      </div>
    </div>
  `;
  }
}
export default new RolesView();
