import { SeeCmdsView } from '../commandes/seeCmdsView.js';
class SeeCmdsIntView extends SeeCmdsView {
  _window = document.querySelector('.big-container-see-bdci');
  _parentElement = document.querySelector('.results-bdci-produits-see');
  _overlay = document.querySelector('.overlaySeeBdci');
  //TODO:
  _btnOpen;
  _btnClose = document.querySelector('.btn-close-see-bdci');
  //TODO:
  // _btnClose = document.querySelector('.see-bdci-close');
  _trueParentElement = document.querySelector('.see-bdci-container');
  constructor() {
    super(true);
    this._btnClose.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow.bind(this)();
    });
    // this._overlay = document.querySelector('.overlaySeeBdci');
    this._overlay.addEventListener('click', e => {
      // console.log('SHOWING :', this._overlay);
      this.toggleWindow.bind(this)();
    });
  }

  resetPointers() {
    //voir bon de commande
    this._btnOpen = document.querySelectorAll('.print-bdci-btn');
    // console.log(this._btnOpen);
  }

  changeDetails(cmd, products) {
    const heading = this._window.querySelector('.see-bdci-title');
    heading.innerHTML = `Commande N°${cmd.num_demande}`;

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
              <td>${product.quantite_demande}</td>
            </tr>`;
            })
            .join('')
        : `<td colspan=2><b>Aucun Produit</b></td>`;
    this._parentElement.innerHTML = '';
    this._parentElement.innerHTML = productsHTML;
  }

  //TODO:
  // _restricted = [['.view-btc-btn', 'delete user'], 'none'];
}
export default new SeeCmdsIntView();
