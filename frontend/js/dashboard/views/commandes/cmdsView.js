import { UsersView } from '../usersView.js';
import * as helpers from '../../helpers.js';

class CmdsView extends UsersView {
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
  // _btnPrintBdc = document.querySelector('.print-bdc-btn');

  addEventListenerCheckboxesChange(handler = '') {
    this._btnDeleteBdc.disabled = true;
    this._checkboxes.forEach(cbx =>
      cbx.addEventListener('change', e => {
        this._checkedCheckboxes = this._parentElement.querySelectorAll(
          'input[type="checkbox"]:checked'
        );
        if (this._checkedCheckboxes.length === 0) {
          // this._btnPrintBdc.disabled = true;
          this._btnDeleteBdc.disabled = true;
          // this._btnPrintBdc.classList.add('disabled-button'); // Apply disabled appearance
          this._btnDeleteBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
        } else if (this._checkedCheckboxes.length === 1) {
          // this._btnPrintBdc.disabled = false;
          this._btnDeleteBdc.disabled = false;
          // this._btnPrintBdc.classList.remove('disabled-button'); // Remove disabled appearance
          this._btnDeleteBdc.classList.remove('disabled-delete-button'); // Remove disabled appearance
        } else {
          // this._btnPrintBdc.disabled = true;
          this._btnDeleteBdc.disabled = false;
          // this._btnPrintBdc.classList.add('disabled-button'); // Apply disabled appearance
          this._btnDeleteBdc.classList.remove('disabled-delete-button'); // Remove disabled appearance
        }
      })
    );
  }
  reSettingDynamicElementsPointersAndELs(checkboxesHandler = '') {
    //checkboxes
    this._checkboxes = this._parentElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    this.addEventListenerCheckboxesChange(checkboxesHandler);
    //voir 1

    //voir 2

    //imprimer
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
              : result.etat == 'termine'
              ? 'finish-status'
              : 'canceled-status'
          }">${result.etat}</p></td>
          <td class="td-view-bdc">
            <button class="view-btc-btn">
              <p>Voir Bon de commande</p>
            </button>
          </td>
          <td class="td-view-bdr hidden">
            <button class="view-btr-btn">
              <p>Voir Bons de Receptions</p>
            </button>
          </td>
        </tr>
      `;
  }
  _restricted = [, 'none'];
}
export default new CmdsView();
