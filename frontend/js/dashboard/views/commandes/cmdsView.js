import { UsersView } from '../usersView.js';
import * as helpers from '../../helpers.js';

export class CmdsView extends UsersView {
  _parentElement = document
    .querySelector('#main-table-bdc')
    .querySelector('.results');
  _searchBox = document.querySelector('.searchbar-text-bdc');
  addHandlerCmdsSearch(handler, filterState) {
    this._searchBox.addEventListener('input', e => {
      handler(this._searchBox.value, filterState);
    });
  }
  _checkboxes;
  _checkedCheckboxes;
  _btnDeleteBdc = document.querySelector('.btn-delete-bdc');
  _btnCancelBdc = document.querySelector('.btn-cancel-bdc');

  addEventListenerCheckboxesChange(handler = '') {
    this._btnDeleteBdc.disabled = true;
    this._btnCancelBdc.disabled = true;
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
          this._btnCancelBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
          this._btnDeleteBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
        } else if (this._checkedCheckboxes.length === 1) {
          this._btnCancelBdc.disabled = false;
          this._btnDeleteBdc.disabled = false;
          this._btnCancelBdc.classList.remove('disabled-delete-button'); // Remove disabled appearance
          this._btnDeleteBdc.classList.remove('disabled-delete-button'); // Remove disabled appearance
        } else {
          this._btnCancelBdc.disabled = false;
          this._btnDeleteBdc.disabled = false;
          this._btnCancelBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
          this._btnDeleteBdc.classList.remove('disabled-delete-button'); // Remove disabled appearance
        }
      })
    );
  }

  resetPointers() {
    //checkboxes
    this._checkboxes = this._parentElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    this.addEventListenerCheckboxesChange();
  }

  _filters = document.querySelectorAll('.filters-bdc');
  addHandlerCmdsFiltersChange(handler) {
    let newFiltersState = ['', ''];
    this._filters.forEach((filter, index) => {
      filter.addEventListener('change', e => {
        newFiltersState[index] = filter.value;
        handler(newFiltersState);
      });
    });
  }
  _generateMarkup() {
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }
  _generateMarkupPreview(result, perms = []) {
    return `
        <tr>
          <td>
            <div class="checkbox-colomn">
              <input type="checkbox" id="checkbox-table" class="checkbox-bdc" />
              <p class="colomn-tags-name">${result.num_commande}</p>
            </div>
          </td>
          <td>${result.fournisseur}</td>
          <td>${result.objet}</td>
          <td>${helpers.formatDate(result.date_commande)}</td>
          <td><p class="status ${
            result.etat == 'en cours'
              ? 'encour-status'
              : result.etat == 'delivrer'
              ? 'finish-status'
              : 'canceled-status'
          }">${result.etat}</p></td>
          <td class="td-view-bdc">
            ${
              helpers.includesDesignation(perms, 'show commandes') &&
              helpers.includesDesignation(perms, 'show commande products')
                ? `<button class="view-btc-btn">
              <p>Voir Bon de commande</p>
            </button>`
                : ``
            }
            ${
              helpers.includesDesignation(perms, 'show bon reception')
                ? `<button class="view-btr-btn">
                <p>Voir Bons de Receptions</p>
                   </button>`
                : ``
            }
          </td>
          <td>
            <a target="_blank" class="details-btn print-bdc-btn" href="../../backend/${
              result.link
            }" >
              <span class="material-icons-sharp info-icon">
                print
              </span>
            </a>
          </td>
        </tr>
      `;
  }
  _restricted = [, 'none'];
}
export default new CmdsView();
