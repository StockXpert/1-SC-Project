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
  _role;

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
    console.log(this._role);
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
        <td class="td-view-bdc">
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
      <td class="td-print-bdci">
        <button class="details-btn print-bdci-btn">
          <span class="material-icons-sharp info-icon">
            print
          </span>
        </button>
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
          this._btnModifyBdc ? (this._btnModifyBdc.disabled = true) : '';
          this._btnCancelBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
          this._btnDeleteBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
          this._btnModifyBdc
            ? this._btnModifyBdc.classList.add('disabled-button')
            : ''; // Apply disabled appearance)
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
          console.log(this._btnCancelBdc);
          console.log(this._btnDeleteBdc);
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
          } else {
            console.log('TRIGGERED');
            this._btnCancelBdc.disabled = true;
            this._btnDeleteBdc.disabled = true;
            this._btnModifyBdc ? (this._btnModifyBdc.disabled = true) : '';
            this._btnCancelBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
            this._btnDeleteBdc.classList.add('disabled-delete-button'); // Remove disabled appearance
            this._btnModifyBdc
              ? this._btnModifyBdc.classList.add('disabled-button') // Remove disabled appearance
              : '';
          }
        }
      })
    );
  }
  _restricted = [, 'none'];
}
export default new CmdsIntView();
