import { CmdsView } from '../commandes/cmdsView.js';
class CmdsIntView extends CmdsView {
  constructor() {
    super();
  }
  _parentElement = document
    .querySelector('#main-table-bdci')
    .querySelector('.results');
  _searchBox = document.querySelector('.searchbar-text-bdci');
  _btnDeleteBdc = document.querySelector('.btn-delete-bdci');
  _btnCancelBdc = document.querySelector('.btn-cancel-bdci');
  _filters = document.querySelectorAll('.filters-bdci');
  _generateMarkupPreview(result, perms = []) {
    return `<tr>
    <td>
      <div class="checkbox-colomn">
        <input type="checkbox" id="checkbox-table">
        <p class="colomn-tags-name">24299</p>
      </div>
    </td>

    <td>21/12/2023</td>
    <td><p class="status enattente-status">En Attente</p></td>
    <td class="td-view-bdc">
      <button class="details-btn print-bdci-btn">
        <span class="material-icons-sharp info-icon">
          info
        </span>
      </button>
    </td>
    <td class="td-view-bdr hidden">
      <button class="view-btr-btn">
        <p>Voir Bons de Receptions</p>
      </button>
    </td>
    <td class="hidden">
      <button class="details-btn print-bdc-btn">
        <span class="material-icons-sharp info-icon">
          print
        </span>
      </button>
    </td>
  </tr>`;
  }
  _restricted = [, 'none'];
}
export default new CmdsIntView();
