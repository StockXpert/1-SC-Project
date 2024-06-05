import { CmdsIntView } from '../commandesInt/cmdsIntView.js';
import * as helpers from '../../helpers.js';
export class InvView extends CmdsIntView {
  constructor() {
    super();
  }
  _checkboxes;
  _btnContinueInv = document.querySelector('.btn-continue-inv');
  _btnAddInv = document.querySelector('.add-inv-btn');
  _btnUpdateInv = document.querySelector('.btn-maj-inv');
  _btnDeleteInv = document.querySelector('.btn-delete-inv');
  _btnModifyInv = document.querySelector('.btn-edit-inv');
  _parentElement = document.querySelector('.results-inv');
  _trueParentElement = document.querySelector('.table-top-inv');
  _searchBox = document.querySelector('.searchbar-text-inv');
  _filters = document.querySelector('.container-filter-inv');
  _generateMarkup() {
    if (this._data.length == 0)
      return `<tr><td colspan=${
        document.querySelector('.load-inv-container').querySelectorAll('th')
          .length
      }><b>Aucun Etat d'inventaire n'a été trouvée</b></td></tr>`;
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }
  _generateMarkupPreview(result, perms = []) {
    return `
  <tr>
    <td>
      <div class="checkbox-colomn">
        <input type="checkbox" id="checkbox-table" />
        <p class="colomn-tags-name">${result.num_inventaire}</p>
      </div>
    </td>
    <td>${helpers.formatDate(result.date_inventaire)}</td>
    <td>
      <p class="status-inv ${
        result.etat == 'valid' ? 'valide-status' : 'novalide-status'
      }">${result.etat}</p>
    </td>

    <!-- btns pour info pour Magasinier -->
    ${
      this._perms
        .map(({ designation }) => designation)
        .includes('show inventaire')
        ? `<td class="td-view-inv">
    <button class="details-inv-btn">
      <span class="material-icons-sharp info-icon">
        info
      </span>
    </button>
  </td>`
        : ``
    }
    
    <!-- btns verif+print pour Directeur -->
    ${
      this._perms
        .map(({ designation }) => designation)
        .includes('valid inventaire')
        ? `<td class="td-verif-inv">
              <button class="verif-inv ${
                result.etat == 'confirme' ? `` : `hidden`
              }">
                <span class="material-icons-sharp verif-icon">
                  check_circle
                </span>
              </button>

      </td>`
        : ``
    }
    <td class="td-print-inv">

    ${
      result.etat == 'valid'
        ? `
      <a class="details-btn print-inv-btn" href="/backend/registre/registre${result.num_inventaire}.pdf" target="_blank">
        <span class="material-icons-sharp info-icon">
          print
        </span>
      </a>`
        : ``
    }


    </td>
  </tr>`;
  }
  restrictActionsUsingRoleInv(role) {
    switch (role) {
      case 'Directeur':
        this._btnUpdateInv.classList.remove('hidden');
        break;
      case 'Magasinier':
        this._btnDeleteInv.classList.remove('hidden');
        this._btnContinueInv.classList.remove('hidden');
        //TODO:
        // this._btnModifyInv.classList.remove('hidden');
        this._btnAddInv.classList.remove('hidden');
        break;
      default:
        break;
    }
  }
  addHandlerInvSearch(handler, filterHandler) {
    this._searchBox.addEventListener('input', e => {
      handler(this._searchBox.value);
      filterHandler(
        Array.from(this._filters.querySelectorAll('select')).map(
          select => select.value
        )
      );
    });
  }
  addChangeFiltersHandler(handler) {
    this._filters.addEventListener('change', e => {
      handler(
        Array.from(this._filters.querySelectorAll('select')).map(
          select => select.value
        )
      );
    });
  }
}

export default new InvView();
