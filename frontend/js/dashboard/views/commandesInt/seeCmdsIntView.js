import { SeeCmdsView } from '../commandes/seeCmdsView.js';
class SeeCmdsIntView extends SeeCmdsView {
  constructor() {
    super();
  }
  _window = document.querySelector('.see-bdci-container');
  _parentElement = document.querySelector('.view-bdci-produits');
  _overlay = document.querySelector('.overlaySeeBdci');
  //TODO:
  _btnOpen;
  _btnClose = document.querySelector('.see-bdci-close');
  _trueParentElement = document.querySelector('.see-bdci-container');

  resetPointers() {
    //voir bon de commande
    this._btnOpen = document.querySelectorAll('.print-bdci-btn');
    console.log(this._btnOpen);
  }

  changeDetails(cmd, products) {
    const heading = this._window.querySelector('.bdc-title');
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

    let numero = 0;
    let productsHTML = products
      .map(product => {
        return `<tr>
                    <td>
                      <div class="checkbox-colomn-bdc-add">
                        <p class="colomn-tags-name-bdc">${++numero}</p>
                      </div>
                    </td>
                    <td>${product.designation}</td>
                    <td class="input-changeble quantity-produit">
                      <input type="text" placeholder="${product.quantite}" />
                    </td>
                    <td class="price-produit-montant">${
                      product.quantite * product.prix_unitaire
                    }</td>
                    <td class="reste-livre">1</td>
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
