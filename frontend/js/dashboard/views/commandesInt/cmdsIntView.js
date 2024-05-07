import { CmdsView } from '../commandes/cmdsView.js';
import * as helpers from '../../helpers.js';
export class CmdsIntView extends CmdsView {
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
          result.etat.includes('demande') ? '' : 'hidden'
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
          result.etat.includes('visee par resp') ? '' : 'hidden'
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
      <td class="td-print-bdciii">${
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
    // this._btnDeleteBdc = document.querySelector('.btn-delete-bdc');
    // this._btnCancelBdc = document.querySelector('.btn-cancel-bdc');
    this._btnDeleteBdc.disabled = true;
    this._btnCancelBdc.disabled = true;
    if (this._btnModifyBdc) this._btnModifyBdc.disabled = true;
    if (this._btnLivrerBdci) this._btnLivrerBdci.disabled = true;
    this._checkboxes.forEach(cbx =>
      cbx.addEventListener('change', e => {
        const tthis = e.currentTarget;
        if (tthis.checked) {
          this._checkboxes.forEach(otherCheckbox => {
            if (otherCheckbox !== tthis) {
              otherCheckbox.checked = false;
            }
          });
        }
        this._checkedCheckboxes = this._parentElement.querySelectorAll(
          'input[type="checkbox"]:checked'
        );
        if (this._checkedCheckboxes.length === 0) {
          this._btnCancelBdc.disabled = true;
          this._btnDeleteBdc.disabled = true;
          this._btnLivrerBdci ? (this._btnLivrerBdci.disabled = true) : '';
          this._btnModifyBdc ? (this._btnModifyBdc.disabled = true) : '';
          this._btnCancelBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
          this._btnDeleteBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
          this._btnModifyBdc
            ? this._btnModifyBdc.classList.add('disabled-button')
            : ''; // Apply disabled appearance)
          this._btnLivrerBdci
            ? this._btnLivrerBdci.classList.add('disabled-save-button')
            : '';
        } else if (this._checkedCheckboxes.length === 1) {
          console.log(
            helpers.findNodeIndex(this._checkboxes, this._checkedCheckboxes[0])
          );
          console.log(
            this._data[
              helpers.findNodeIndex(
                this._checkboxes,
                this._checkedCheckboxes[0]
              )
            ].etat
          );
          if (
            this._data[
              helpers.findNodeIndex(
                this._checkboxes,
                this._checkedCheckboxes[0]
              )
            ].etat === 'demande'
          ) {
            this._btnCancelBdc.disabled = false;
            this._btnDeleteBdc.disabled = false;
            this._btnModifyBdc ? (this._btnModifyBdc.disabled = false) : '';
            this._btnCancelBdc.classList.remove('disabled-delete-button'); // Remove disabled appearance
            this._btnDeleteBdc.classList.remove('disabled-delete-button'); // Remove disabled appearance
            this._btnModifyBdc
              ? this._btnModifyBdc.classList.remove('disabled-button') // Remove disabled appearance
              : '';
          } else if (
            this._data[
              helpers.findNodeIndex(
                this._checkboxes,
                this._checkedCheckboxes[0]
              )
            ].etat === 'pret'
          ) {
            this._btnLivrerBdci ? (this._btnLivrerBdci.disabled = false) : '';
            this._btnLivrerBdci
              ? this._btnLivrerBdci.classList.remove('disabled-save-button')
              : '';
          } else {
            this._btnCancelBdc.disabled = true;
            this._btnDeleteBdc.disabled = true;
            this._btnModifyBdc ? (this._btnModifyBdc.disabled = true) : '';
            this._btnLivrerBdci ? (this._btnLivrerBdci.disabled = true) : '';
            this._btnCancelBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
            this._btnDeleteBdc.classList.add('disabled-delete-button'); // Remove disabled appearance
            this._btnModifyBdc
              ? this._btnModifyBdc.classList.add('disabled-button') // Remove disabled appearance
              : '';
            this._btnLivrerBdci
              ? this._btnLivrerBdci.classList.add('disabled-save-button')
              : '';
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
      // const event = new Event('change');
      // this._filters.dispatchEvent(event);
      handler(this._searchBox.value);
      filterHandler(
        Array.from(this._filters.querySelectorAll('select')).map(
          select => select.value
        )
      );
    });
  }
  _restricted = [, 'none'];
}
export default new CmdsIntView();
