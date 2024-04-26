import { CmdsView } from '../commandes/cmdsView.js';
import * as helpers from '../../helpers.js';
class CmdsIntView extends CmdsView {
  constructor() {
    super();
  }
  _parentElement = document
    .querySelector('#main-table-bdci')
    .querySelector('.results');
  _searchBox = document.querySelector('.searchbar-text-bdci');
  _btnDeleteBdc = document.querySelector('.btn-delete-bdci');
  // _btnCancelBdc = document.querySelector('.btn-cancel-bdc');
  _filters = document.querySelectorAll('.filters-bdci');
  _btnModifyBdc = document.querySelector('.btn-edit-bdci');

  // date_demande
  // :
  // "2004-05-27T23:00:00.000Z"
  // etat
  // :
  // "demande"
  // num_demande
  // :
  // 1
  _generateMarkupPreview(result, perms = []) {
    return `<tr>
    <td>
      <div class="checkbox-colomn">
        <input type="checkbox" id="checkbox-table">
        <p class="colomn-tags-name">${result.num_demande}</p>
      </div>
    </td>

    <td>${helpers.formatDate(result.date_demande)}</td>
    <td><p class="status ${helpers.getStatusClass(result.etat)}">${
      result.etat
    }</p></td>
    <td class="td-view-bdc">
      <button class="details-btn print-bdci-btn">
        <span class="material-icons-sharp info-icon">
          info
        </span>
      </button>
    </td>
  </tr>`;
  }
  _restricted = [, 'none'];
}
export default new CmdsIntView();
