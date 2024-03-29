import View from './view.js';
import * as helpers from '../helpers.js';
export class UsersView extends View {
  _parentElement = document.querySelector('.results');
  _trueParentElement = document.querySelector('.table-container');

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
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
export default new UsersView();
// <p class="heading-permission-text">Utilisateurs</p>
// <div class="checkboxes-permission">
//   <div class="checkbox-colomn-permissions">
//     <input type="checkbox" id="checkbox-table-permissions">
//     <p class="colomn-tags-name-permissions">
//       Ajouter Utilisateur
//     </p>
//   </div>
//   <div class="checkbox-colomn-permissions">
//     <input type="checkbox" id="checkbox-table-permissions">
//     <p class="colomn-tags-name-permissions">
//       Modifier Utilisateur
//     </p>
//   </div>
//   <div class="checkbox-colomn-permissions">
//     <input type="checkbox" id="checkbox-table-permissions">
//     <p class="colomn-tags-name-permissions">
//       Supprimer Utilisateur
//     </p>
//   </div>
//   <div class="checkbox-colomn-permissions">
//     <input type="checkbox" id="checkbox-table-permissions">
//     <p class="colomn-tags-name-permissions">
//       Voir Utilisateur
//     </p>
//   </div>
// </div>
