import { UsersView } from '../usersView.js';
import View from '../view.js';

class RolesView extends UsersView {
  _generateMarkupPreview(result) {
    // TODO: console.log(result);
    // console.log(result.active);
    // const id = window.location.hash.slice(1);
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
      <button class="details-btn">
        <span class="material-icons-sharp info-icon">
          edit
        </span>
      </button>
    </td>
  </tr>
  `;
  }
}
export default new RolesView();
