import { ValidateCmdsIntView } from '../commandesInt/validateCmdsIntView.js';
import * as helpers from '../../helpers.js';

export class ValidateInvView extends ValidateCmdsIntView {
  _InvNum;
  _windowRaison;
  _btnsOpenRaison;
  _btnCloseRaison;
  _window = document.querySelector('.big-container-inv-verif');
  _overlay = document.querySelector('.overlayValidateInv');
  _title = document.querySelector('.inv-title-verif');
  _header = document.querySelector('.header-inv-verif');
  // _save = document.querySelector('.btn-save-verif-bdci-qt');
  _save = document.querySelector('.btn-save-inv-verif');
  _form = document.querySelector('.inv-cart-verif');
  _trueParentElement = this._form;
  _btnOpen = document.querySelectorAll('.verif-inv');
  _role;
  _btnClose = document.querySelector('.btn-cancel-inv-verif');
  _parentElement = document.querySelector('.results-produits-inv-verif');
  _raisonContainer = document.querySelector('#justify-verif');
  _raisons;
  // TODO: _btnLivrerBdci = document.querySelector('.btn-deliver-bdci');
  // _checkboxes;

  constructor(nerfed = false) {
    super(true);
    if (!nerfed) {
      // this.addHandlerHideWindow(
      //   '.btn-cancel-inv-verif',
      //   '.big-container-inv-verif'
      // );
    }
  }

  //#0f0 use (call upon render)
  addHandlerShowWindowView(OpClassName, windowClassName) {
    this._window = document.querySelector(windowClassName);
    this._btnView = document.querySelectorAll(OpClassName);
    this._btnView.forEach(btn =>
      btn.addEventListener('click', this._boundToggleWindow)
    );
  }
  //use (call upon render)
  resetPointers(controller) {
    this.addHandlerShowWindow('.verif-inv', '.big-container-inv-verif');
    this.addHandlerShowWindowView(
      '.details-inv-btn',
      '.big-container-inv-verif'
    );
    this.addHandlerEdit(controller);
    this.addHandlerView(controller);
  }

  addHandlerView(controller) {
    this._btnView.forEach(btn =>
      btn.addEventListener('click', async e => {
        await controller(e, true);
      })
    );
  }

  //TODO: reset pointers inside

  //use addHandlerValidate(ctrl)

  changeDetails(products, cmd = '', view = false) {
    if (cmd != '') {
      this._InvNum = parseInt(cmd);
      const heading = this._title;
      heading.innerHTML = `${
        !view ? "Validation de l'" : ''
      }état d'inventaire N°${cmd}`;
    }
    let productsHTML =
      products.length != 0
        ? products
            .map(product => {
              return `<tr>
              <td>
                <div class="colomn-product-des">
                  <p class="colomn-des-name-product">${product.designation}</p>
                </div>
              </td>
              <td>${product.quantite}</td>
              <td class="quantity-ph">${product.quantite_phys}</td>
              <td class="td-justify">
                <button class="info-btn-inv ${
                  product.raison == '' ? 'red-info' : 'green-info'
                } ${
                product.quantite_phys == product.quantite ? 'hidden' : ''
              } ">
                  <span class="material-icons-sharp info-icon">
                    info
                  </span>
                </button>
              </td>
            </tr>`;
            })
            .join('')
        : `<td colspan=4 class="empty-table--products"><b>Aucun Produit</b></td>`;
    this._parentElement.innerHTML = '';
    this._parentElement.innerHTML = productsHTML;

    this.addHandlerShowRaisonWindow(
      '.info-btn-inv',
      '.add-info-container-verif',
      false
    );
    this.addHandlerHideRaisonWindow(
      '.close-info-verif',
      '.add-info-container-verif',
      false
    );
    this._window.querySelector('.heading-table-btns-inv-verif').innerHTML = view
      ? `<button class="heading-table-btn-bdr cancel-btn-add-bdr btn-cancel-inv-verif">
      Annuler
    </button>`
      : `
        <button class="heading-table-btn-bdr cancel-btn-add-bdr btn-cancel-inv-verif">
          Annuler
        </button>
        <button class="heading-table-btn-bdr add-users-btn btn-save-inv-verif">
          Valider
        </button>
      `;
    this.addHandlerHideWindow(
      '.btn-cancel-inv-verif',
      '.big-container-inv-verif'
    );
    this._raisons = products.map(product => product.raison);

    //TODO: inner reselector/el adder here
    // this._parentElement
    //   .querySelectorAll('td input[type="number"]')
    //   .forEach(input => console.log(input, input.dataset.max));
    // this._parentElement
    //   .querySelectorAll('td input[type="number"]')
    //   .forEach(input => helpers.validateIntegerInput(input, input.dataset.max));
  }

  addHandlerShowRaisonWindow(OpClassName, windowClassName) {
    this._windowRaison = document.querySelector(windowClassName);
    this._btnsOpenRaison = this._window.querySelectorAll(OpClassName);
    this._btnsOpenRaison.forEach(btn => {
      btn.addEventListener('click', e => {
        this._boundToggleRaisonWindowRemove(e);
      });
    });
  }
  addHandlerHideRaisonWindow(CloserClassName, windowClassName) {
    this._windowRaison = document.querySelector(windowClassName);
    this._btnCloseRaison = this._windowRaison.querySelector(CloserClassName);
    this._btnCloseRaison.addEventListener('click', e =>
      this._boundToggleRaisonWindowAdd(e)
    );
  }
  // _boundToggleRaisonWindow = e => {
  //   e.preventDefault();
  //   this.toggleRaisonWindow();
  // };
  // toggleRaisonWindow() {
  //   this._windowRaison.classList.toggle('hidden');
  // }
  _boundToggleRaisonWindowAdd = e => {
    e.preventDefault();
    this.toggleRaisonWindowAdd();
  };
  _boundToggleRaisonWindowRemove = e => {
    e.preventDefault();
    this.toggleRaisonWindowRemove();
    this._raisonContainer.innerHTML = this._raisons[
      helpers.findNodeIndex(this._btnsOpenRaison, e.currentTarget)
    ]
      ? this._raisons[
          helpers.findNodeIndex(this._btnsOpenRaison, e.currentTarget)
        ]
      : 'Aucune Raison Trouvée';
  };
  toggleRaisonWindowRemove() {
    this._windowRaison.classList.remove('hidden');
  }
  toggleRaisonWindowAdd() {
    this._windowRaison.classList.add('hidden');
  }
}
export default new ValidateInvView();
