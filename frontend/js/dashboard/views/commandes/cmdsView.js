import { UsersView } from '../usersView.js';
import * as helpers from '../../helpers.js';

export class CmdsView extends UsersView {
  constructor() {
    super();
  }

  _parentElement = document
    .querySelector('#main-table-bdc')
    .querySelector('.results');
  _searchBox = document.querySelector('.searchbar-text-bdc');
  addHandlerCmdsSearch(handler, filterState) {
    this._searchBox.addEventListener('input', e => {
      handler(this._searchBox.value, filterState);
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
  _checkboxes;
  _checkedCheckboxes;
  _btnDeleteBdc = document.querySelector('.btn-delete-bdc');
  _btnCancelBdc = document.querySelector('.btn-cancel-bdc');

  // addEventListenerCheckboxesChange(handler = '') {
  //   //TODO:
  //   this._btnDeleteBdc.disabled = true;
  //   this._btnCancelBdc.disabled = true;
  //   if (this._btnModifyBdc) this._btnModifyBdc.disabled = true;
  //   this._checkboxes.forEach(cbx =>
  //     cbx.addEventListener('change', e => {
  //       console.log('CHANGE');
  //       const tthis = e.currentTarget;
  //       if (tthis.checked) {
  //         helpers.findClosestTrParent(tthis).classList.add('selected-row');
  //         this._checkboxes.forEach(otherCheckbox => {
  //           if (otherCheckbox !== tthis) {
  //             helpers
  //               .findClosestTrParent(otherCheckbox)
  //               .classList.remove('selected-row');
  //             otherCheckbox.checked = false;
  //           }
  //         });
  //       } else {
  //         helpers.findClosestTrParent(tthis).classList.remove('selected-row');
  //       }
  //       this._checkedCheckboxes = this._parentElement.querySelectorAll(
  //         'input[type="checkbox"]:checked'
  //       );
  //       if (this._checkedCheckboxes.length === 0) {
  //         this._btnCancelBdc.disabled = true;
  //         this._btnDeleteBdc.disabled = true;
  //         this._btnModifyBdc ? (this._btnModifyBdc.disabled = true) : '';
  //         this._btnCancelBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
  //         this._btnDeleteBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
  //         this._btnModifyBdc
  //           ? this._btnModifyBdc.classList.add('disabled-button')
  //           : ''; // Apply disabled appearance)
  //       } else if (this._checkedCheckboxes.length === 1) {
  //         this._btnCancelBdc.disabled = false;
  //         this._btnDeleteBdc.disabled = false;
  //         this._btnModifyBdc ? (this._btnModifyBdc.disabled = false) : '';
  //         this._btnCancelBdc.classList.remove('disabled-delete-button'); // Remove disabled appearance
  //         this._btnDeleteBdc.classList.remove('disabled-delete-button'); // Remove disabled appearance
  //         this._btnModifyBdc
  //           ? this._btnModifyBdc.classList.remove('disabled-button') // Remove disabled appearance
  //           : '';
  //       } else {
  //         this._btnCancelBdc.disabled = true;
  //         this._btnDeleteBdc.disabled = false;
  //         this._btnModifyBdc ? (this._btnModifyBdc.disabled = true) : '';
  //         this._btnCancelBdc.classList.add('disabled-delete-button'); // Apply disabled appearance
  //         this._btnDeleteBdc.classList.remove('disabled-delete-button'); // Remove disabled appearance
  //         this._btnModifyBdc
  //           ? this._btnModifyBdc.classList.add('disabled-button') // Remove disabled appearance
  //           : '';
  //       }
  //     })
  //   );
  // }

  addEventListenerCheckboxesChange(handler = '') {
    this.disableBtns([
      this._btnDeleteBdc,
      this._btnCancelBdc,
      // this._btnDeleteInv,
      // this._btnModifyInv,
      // this._btnUpdateInv,
      // this._btnModifyBdci,
      // this._btnLivrerBdci,
      // this._btnContinueInv,
    ]);

    this._checkboxes.forEach(cbx =>
      cbx.addEventListener('change', e => {
        this.disableBtns([
          this._btnDeleteBdc,
          this._btnCancelBdc,
          // this._btnDeleteInv,
          // this._btnModifyInv,
          // this._btnUpdateInv,
          // this._btnModifyBdci,
          // this._btnLivrerBdci,
          // this._btnContinueInv,
        ]);
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
          this.disableBtns([
            this._btnCancelBdc,
            this._btnDeleteBdc,
            // this._btnModifyBdci,
            // this._btnLivrerBdci,
            // this._btnDeleteInv,
            // this._btnModifyInv,
            // this._btnUpdateInv,
            // this._btnContinueInv,
          ]);
        } else if (this._checkedCheckboxes.length === 1) {
          switch (etat) {
            case 'en cours':
              this.enableBtns([
                this._btnCancelBdc,
                this._btnDeleteBdc,
                // this._btnModifyBdc,
              ]);
              break;
            // case 'prete':
            //   enableBtns([this._btnLivrerBdci]);
            //   break;
            // case 'no valid':
            //   console.log([this._btnDeleteInv, this._btnModifyInv]);
            //   enableBtns([this._btnDeleteInv, this._btnModifyInv]);
            //   break;
            // case 'valid':
            //   enableBtns([this._btnUpdateInv]);
            //   break;
            // case 'refusee':
            //   enableBtns([this._btnDeleteBdci]);
            //   break;
            // case null:
            //   console.log('null');
            //   enableBtns([this._btnDeleteBdci]);
            //   break;
            // case 'en cours':
            //   enableBtns([
            //     this._btnContinueInv,
            //     this._btnDeleteInv,
            //     this._btnModifyInv,
            //   ]);
            //   break;
            default:
              this.disableBtns([
                this._btnCancelBdc,
                this._btnDeleteBdc,
                // this._btnModifyBdci,
                // this._btnLivrerBdci,
                // this._btnUpdateInv,
                // this._btnDeleteInv,
                // this._btnModifyInv,
                // this._btnContinueInv,
              ]);
              break;
          }
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

  // _filters = document.querySelectorAll('.filters-bdc');
  _filters = document.querySelector('.container-filter-bdc');
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
}
export default new CmdsView();
