import { CmdsView } from '../commandes/cmdsView.js';
import * as helpers from '../../helpers.js';
function enableBtns(btnsArray) {
  btnsArray.forEach(btn => {
    if (btn) {
      btn.disabled = false;
      switch (btn.dataset.type) {
        case 'red':
          btn.classList.remove('disabled-delete-button');
          break;
        case 'blue':
          btn.classList.remove('disabled-save-button');
          break;
        default:
          btn.classList.remove('disabled-button');
          break;
      }
    }
  });
}
function disableBtns(btnsArray) {
  btnsArray.forEach(btn => {
    if (btn) {
      btn.disabled = true;
      switch (btn.dataset.type) {
        case 'red':
          btn.classList.add('disabled-delete-button');
          break;
        case 'blue':
          btn.classList.add('disabled-save-button');
          break;
        default:
          btn.classList.add('disabled-button');
          break;
      }
    }
  });
}
export class CmdsIntView extends CmdsView {
  constructor() {
    super();
  }
  _parentElement = document
    .querySelector('#main-table-bdci')
    .querySelector('.results');
  _searchBox = document.querySelector('.searchbar-text-bdci');
  _btnDeleteBdci = document.querySelector('.btn-delete-bdci');
  // _btnCancelBdc = document.querySelector('.btn-cancel-bdc');
  _filters = document.querySelectorAll('.filters-bdci');
  _btnModifyBdci = document.querySelector('.btn-edit-bdci');
  _btnLivrerBdci = document.querySelector('.btn-deliver-bdci');
  _role;
  _filters = document.querySelector('.container-filter-bdci');

  // date_demande
  // :
  // "2004-05-27T23:00:00.000Z"
  // etat
  // :
  // "demande"
  // num_demande
  // :
  // 1

  _generateMarkup() {
    if (this._data.length == 0)
      return `<tr><td colspan=${
        document.querySelector('.load-bdci-container').querySelectorAll('th')
          .length
      }><b>Aucune Commande Interne n'a été trouvée</b></td></tr>`;
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }
  _generateMarkupPreview(result, perms = []) {
    // console.log(this._role);
    const html = `<tr>
    <td>
      <div class="checkbox-colomn">
        <input type="checkbox" id="checkbox-table">
        <p class="colomn-tags-name">${result.num_demande}</p>
      </div>
    </td>

    ${
      this._role.includes('Consommateur')
        ? ''
        : `<td>${result.id_demandeur}</td>`
    }

    <td>${helpers.formatDate(result.date_demande)}</td>
    <td><p class="status ${helpers.getStatusClass(result.etat)}">${
      result.etat
    }</p></td>

    ${
      this._role.includes('Consommateur')
        ? `
        <td class="td-view-bdci">
          <button class="details-btn print-bdci-btn">
          <span class="material-icons-sharp info-icon">
            info
          </span>
          </button>
        </td>
        `
        : ''
    }

    ${
      this._role.includes('Responsable direct')
        ? `
      <td class="td-verif-bdci-RD">
        <button class="verif-bdci-RD ${
          result.etat.includes('demandee') ? '' : 'hidden'
        }">
          <span class="material-icons-sharp verif-icon">
            check_circle
          </span>
        </button>
      </td>`
        : ``
    }

    ${
      this._role.includes('Directeur')
        ? `
      <td class="td-verif-bdci-RD">
        <button class="verif-bdci-RD ${
          result.etat.includes('visee par resp') ||
          (result.etat.includes('demandee') && result.exterieur)
            ? ''
            : 'hidden'
        }">
          <span class="material-icons-sharp verif-icon">
            check_circle
          </span>
        </button>
      </td>`
        : ``
    }
    
    ${
      this._role.includes('Magasinier')
        ? `
      <td class="td-verif-bdci-RD">
        <button class="verif-bdci-RD ${
          result.etat.includes('visee par dg') ? '' : 'hidden'
        }">
          <span class="material-icons-sharp verif-icon">
            check_circle
          </span>
        </button>
      </td>
      <td class="td-print-bdci">${
        result.etat.includes('servie')
          ? `
    <a class="print-bdci-btnnn" href="../../backend/sortie/sortie${result.num_demande}.pdf" target="_blank">
      <span class="material-icons-sharp info-icon">
        print
      </span>
    </a>
    `
          : ''
      }
        
      </td>`
        : ``
    }


  </tr>`;
    return html;
  }
  addEventListenerCheckboxesChange(handler = '') {
    disableBtns([
      this._btnDeleteBdci,
      this._btnCancelBdc,
      this._btnDeleteInv,
      this._btnModifyInv,
      this._btnUpdateInv,
      this._btnModifyBdci,
      this._btnLivrerBdci,
    ]);

    this._checkboxes.forEach(cbx =>
      cbx.addEventListener('change', e => {
        const tthis = e.currentTarget;
        let etat =
          this._data[helpers.findNodeIndex(this._checkboxes, tthis)].etat;
        if (tthis.checked) {
          helpers.findClosestTrParent(tthis).classList.add('selected-row');
          this._checkboxes.forEach(otherCheckbox => {
            if (otherCheckbox !== tthis) {
              helpers
                .findClosestTrParent(otherCheckbox)
                .classList.remove('selected-row');
              otherCheckbox.checked = false;
            }
          });
        } else {
          helpers.findClosestTrParent(tthis).classList.remove('selected-row');
        }
        this._checkedCheckboxes = this._parentElement.querySelectorAll(
          'input[type="checkbox"]:checked'
        );
        if (this._checkedCheckboxes.length === 0) {
          disableBtns([
            this._btnCancelBdc,
            this._btnDeleteBdci,
            this._btnModifyBdci,
            this._btnLivrerBdci,
            this._btnDeleteInv,
            this._btnModifyInv,
            this._btnUpdateInv,
          ]);
        } else if (this._checkedCheckboxes.length === 1) {
          switch (etat) {
            case 'demandee':
              enableBtns([
                this._btnCancelBdc,
                this._btnDeleteBdci,
                this._btnModifyBdci,
              ]);
              break;
            case 'pret':
              enableBtns([this._btnLivrerBdci]);
              break;
            case 'no valid':
              console.log([this._btnDeleteInv, this._btnModifyInv]);
              enableBtns([this._btnDeleteInv, this._btnModifyInv]);
              break;
            case 'valid':
              enableBtns([this._btnUpdateInv]);
              break;
            default:
              disableBtns([
                this._btnCancelBdc,
                this._btnDeleteBdci,
                this._btnModifyBdci,
                this._btnLivrerBdci,
                this._btnUpdateInv,
                this._btnDeleteInv,
                this._btnModifyInv,
              ]);
              break;
          }
        }
      })
    );
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
  addHandlerCmdsIntSearch(handler, filterHandler) {
    this._searchBox.addEventListener('input', e => {
      handler(this._searchBox.value);
      filterHandler(
        Array.from(this._filters.querySelectorAll('select')).map(
          select => select.value
        )
      );
    });
  }
  resetSearchInputs() {
    this._searchBox.value = '';
    this._filters
      .querySelectorAll('select')
      .forEach(filter => (filter.selectedIndex = 0));
  }
  restrictUsingRole(role) {
    switch (role) {
      case 'Magasinier':
        this._btnLivrerBdci.classList.remove('hidden');
        break;
      case 'Consommateur':
        this._btnDeleteBdci.classList.remove('hidden');
        this._btnModifyBdci.classList.remove('hidden');
        break;
      default:
        break;
    }
  }
  _restricted = [, 'none'];
}
export default new CmdsIntView();
