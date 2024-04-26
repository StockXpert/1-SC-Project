import { SeeCmdsView } from '../commandes/seeCmdsView.js';
class SeeCmdsIntView extends SeeCmdsView {
  constructor() {
    super();
    this._btnClose.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow.bind(this)();
    });
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  _window = document.querySelector('.big-container-see-bdci');
  _parentElement = document.querySelector('.results-bdci-produits-see');
  _overlay = document.querySelector('.overlaySeeBdci');
  //TODO:
  _btnOpen;
  //TODO:
  // _btnClose = document.querySelector('.see-bdci-close');
  _trueParentElement = document.querySelector('.see-bdci-container');

  resetPointers() {
    //voir bon de commande
    this._btnOpen = document.querySelectorAll('.print-bdci-btn');
    console.log(this._btnOpen);
  }

  changeDetails(cmd, products) {
    const heading = this._window.querySelector('.see-bdci-title');
    heading.innerHTML = `Commande N°${cmd.num_commande}`;
    const formElement = document.querySelector('.see-bdc-cart');
    for (const key in cmd) {
      const input = formElement.elements[key];
      if (input) {
        if (key == 'date_commande') {
          input.value = helpers.formatDate(cmd[key]);
        } else input.value = cmd[key];
      }
    }
    let productsHTML = products
      .map(product => {
        return `<tr>
                    <td>${product.designation}</td>
                    <td class="input-changeble quantity-produit">
                      <input type="text" placeholder="${product.quantite}" />
                    </td>
                  </tr>`;
      })
      .join('');
    this._parentElement.innerHTML = '';
    this._parentElement.innerHTML = productsHTML;
  }

  //TODO:
  // _restricted = [['.view-btc-btn', 'delete user'], 'none'];
}
export default new SeeCmdsIntView();
