import { EditCmdsIntView } from './editCmdsIntView.js';
import * as helpers from '../../helpers.js';
export class ValidateCmdsIntView extends EditCmdsIntView {
  _window;
  _overlay = document.querySelector('.overlayValidateBDCI');
  _header = document.querySelector('.verif-bdci-header');
  _save = document.querySelector('.btn-save-verif-bdci-qt');
  _form = document.querySelector('.verif-bdci-cart');
  _btnOpen;
  _role;
  _btnClose;
  _parentElement = document.querySelector('.results-bdci-produits-verif');
  _btnLivrerBdci = document.querySelector('.btn-deliver-bdci');
  _checkboxes;
  addHandlerShowWindow(OpClassName, windowClassName) {
    this._window = document.querySelector(windowClassName);
    this._btnOpen = document.querySelectorAll(OpClassName);
    this._btnOpen.forEach(btn =>
      btn.addEventListener('click', this._boundToggleWindow)
    );
  }
  addHandlerEdit(controller) {
    this._btnOpen.forEach(async btn =>
      btn.addEventListener('click', await controller)
    );
  }
  constructor(nerfed = false) {
    super(true);
    if (!nerfed) {
      this.addHandlerHideWindow(
        '.btn-cancel-verif-bdci-qt',
        '.big-container-verif-bdci'
      );
    }
  }
  // TODO:
  resetPointers(controller) {
    this.addHandlerShowWindow('.verif-bdci-RD', '.big-container-verif-bdci');
    this.addHandlerEdit(controller);
    this._checkboxes = document
      .querySelector('.table-container-bdci .results')
      .querySelectorAll('input[type="checkbox"]');
  }

  changeDetails(products, cmd = '') {
    console.log(this._role.includes('Directeur'));
    if (cmd != '') {
      const heading = this._window.querySelector('.verif-bdci-title');
      heading.innerHTML = `Commande N°${cmd}`;
    }
    console.log("validateCmdsintView's change inputs got called");
    let productsHTML =
      products.length != 0
        ? products
            .map(product => {
              return `
            <tr>
              <td>
                <div class="colomn-product-des">
                  <p class="colomn-des-name-product">${product.designation}</p>
                </div>
              </td>

              <td>${
                this._role.includes('Magasinier')
                  ? product.quantite_accorde
                  : product.quantite_demande
              }</td>

              ${
                this._role.includes('Directeur')
                  ? `<td>${product.quantite_accorde}</td>`
                  : ``
              }

              <td class="quantity-verif-${
                this._role.includes('Responsable directe')
                  ? 'RD'
                  : this._role.includes('Directeur')
                  ? 'D'
                  : 'M'
              }">
                <input class="green-qt" type="number" ${
                  this._role.includes('Responsable directe')
                    ? `value="${product.quantite_accorde}"`
                    : ''
                } data-max=${
                this._role.includes('Magasinier')
                  ? `${Math.min(
                      ...[
                        product.quantite_accorde,
                        product.quantite - product.seuil,
                      ]
                    )}`
                  : `${product.quantite - product.seuil}`
              }
                name="quantite"
                required>
                <span class="material-icons-sharp">
                  drive_file_rename_outline
                </span>
              </td>
            </tr>`;
            })
            .join('')
        : `<td colspan=3 class="empty-table--products"><b>Aucun Produit</b></td>`;
    this._parentElement.innerHTML = '';
    this._parentElement.innerHTML = productsHTML;
    this._parentElement
      .querySelectorAll('td input[type="number"]')
      .forEach(input => console.log(input, input.dataset.max));
    this._parentElement
      .querySelectorAll('td input[type="number"]')
      .forEach(input => helpers.validateIntegerInput(input, input.dataset.max));
  }

  changeHeader() {
    // console.log(this._role);
    this._header.innerHTML = '';
    const html = `
        <th>
          <div class="first-col">
            <p class="colomn-tags">Designation</p>
          </div>
        </th>
        <th>Quantité ${
          this._role.includes('Magasinier') ? 'Accodrée' : 'Demandée'
        }</th>
        ${
          this._role.includes('Responsable directe') ||
          this._role.includes('Directeur')
            ? '<th>Quantité accordée(RD)</th>'
            : ''
        }
        ${
          this._role.includes('Directeur')
            ? `<th>Quantité accordée(D)</th>`
            : ''
        }
        ${
          this._role.includes('Magasinier')
            ? '<th>Quantité accordée(M)</th>'
            : ''
        }
        `;
    this._header.innerHTML = html;
  }

  extractObject() {
    let arrayOfProducts = [];
    arrayOfProducts = this._parentElement.querySelectorAll('tr');
    console.log(arrayOfProducts);
    arrayOfProducts = Array.from(arrayOfProducts);
    // arrayOfProducts.map()
    arrayOfProducts = arrayOfProducts.map(product => ({
      quantite: product.querySelector('input[name="quantite"]').value,
      designation: product.querySelector('.colomn-des-name-product').innerHTML,
    }));
    return {
      numDemande: this._window
        .querySelector('.verif-bdci-title')
        .innerHTML.match(/\d+$/)[0],
      produits: arrayOfProducts,
    };
  }
  addHandlerValidate(ctrl) {
    this._form.addEventListener('submit', async e => {
      e.preventDefault();
      await ctrl();
    });
  }
  addHandlerDeliver(ctrl) {
    this._btnLivrerBdci.addEventListener('click', e => {
      ctrl(this);
    });
  }
}
export default new ValidateCmdsIntView();
