import { EditCmdsIntView } from './editCmdsIntView.js';
import * as helpers from '../../helpers.js';
class ValidateCmdsIntView extends EditCmdsIntView {
  _window;
  _overlay = document.querySelector('.overlayValidateBDCI');
  _header = document.querySelector('.verif-bdci-header');
  _save = document.querySelector('.btn-save-verif-bdci-qt');
  _btnOpen;
  _role;
  _btnClose;
  _parentElement = document.querySelector('.results-bdci-produits-verif');
  _btnLivrerBdci = document.querySelector('.btn-deliver-bdci');
  _checkboxes;
  addHandlerShowWindow(OpClassName, windowClassName) {
    this._window = document.querySelector(windowClassName);
    // console.log(this, this._window);
    this._btnOpen = document.querySelectorAll(OpClassName);
    console.log(this._btnOpen);
    // Array.from(this._btnOpen)
    this._btnOpen.forEach(btn =>
      btn.addEventListener('click', this._boundToggleWindow)
    );
  }
  addHandlerEdit(controller) {
    // const btnOpenArray = Array.from(this._btnOpen);
    // btnOpenArray.forEach(btn => {
    //   btn.addEventListener('click', controller);
    // });
    this._btnOpen.forEach(async btn =>
      btn.addEventListener('click', await controller)
    );
  }
  constructor() {
    super(true);
    this.addHandlerHideWindow(
      '.btn-cancel-verif-bdci-qt',
      '.big-container-verif-bdci'
    );
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
              <td>${product.quantite_demande}</td>
              <td class="quantity-verif-RD ${
                this._role.includes('Responsable directe') ? '' : 'hidden'
              }">
                <input class="green-qt" type="number" value="${
                  product.quantite_accorde
                }" data-max="${product.quantite - product.seuil}" ${
                this._role.includes('Responsable directe')
                  ? 'name="quantite"'
                  : ''
              }>
                <span class="material-icons-sharp">
                  drive_file_rename_outline
                </span>
              </td>
              <td class="quantity-verif-D ${
                this._role.includes('Directeur') ? '' : 'hidden'
              }">
                <input class="green-qt" type="number" data-max="${
                  product.quantite - product.seuil
                }"  ${
                this._role.includes('Directeur') ? 'name="quantite"' : ''
              }/>
                <span class="material-icons-sharp">
                  drive_file_rename_outline
                </span>
              </td>
              <td class="quantity-verif-M ${
                this._role.includes('Magasinier') ? '' : 'hidden'
              }">
                <input class="green-qt" type="number"  data-max="${Math.max(
                  ...[
                    product.quantite_accorde,
                    product.quantite - product.seuil,
                  ]
                )} " ${
                this._role.includes('Magasinier') ? 'name="quantite"' : ''
              }/>
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
      .forEach(input => helpers.validateIntegerInput(input, input.dataset.max));
  }

  changeHeader() {
    console.log(this._role);
    this._header.innerHTML = '';
    const html = `
        <th>
          <div class="first-col">
            <p class="colomn-tags">Designation</p>
          </div>
        </th>
        <th>Quantité demandée</th>
        ${
          this._role.includes('Responsable directe')
            ? '<th>Quantité accordée(RD)</th>'
            : ''
        }
        ${
          this._role.includes('Directeur')
            ? '<th>Quantité accordée(D)</th>'
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
    // console.log(this._save);
    this._save.addEventListener('click', ctrl);
  }
  addHandlerDeliver(ctrl) {
    this._btnLivrerBdci.addEventListener('click', e => {
      ctrl(this);
    });
  }
}
export default new ValidateCmdsIntView();
