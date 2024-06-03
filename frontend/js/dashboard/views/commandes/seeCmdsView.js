import { DeleteUserView } from '../deleteUserView.js';
import * as helpers from '../../helpers.js';
export class SeeCmdsView extends DeleteUserView {
  _window = document.querySelector('.see-bdc-container');
  _parentElement = document.querySelector('.view-bdc-produits');
  _overlay = document.querySelector('.overlaySeeBdc');
  _btnOpen;
  _btnClose = document.querySelector('.see-bdc-close');
  _trueParentElement = document.querySelector('.see-bdc-container');
  // _confirm = document.querySelector('.cancel-bdc-confirmer');
  toggleWindow() {
    console.log(this._overlay);
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  constructor(nerfed = false) {
    super();
    if (!nerfed) {
      this._btnClose.addEventListener('click', e => {
        e.preventDefault();
        this.toggleWindow.bind(this)();
      });
      this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }
  }

  resetPointers() {
    //voir bon de commande
    this._btnOpen = document.querySelectorAll('.view-btc-btn');
  }
  // {
  // "num_commande": 8,
  // "type": "fourniture",
  // "link": "BonCommande/commande8.pdf",
  // "date_commande": "2004-05-27T23:00:00.000Z",
  // "etat": "en cours",
  // "objet": "Papier d'enseignement",
  // "fournisseur": "MACIF FOURNITURE"
  // }
  addSeeController(ctrler) {
    const toggleWindow = function () {
      this._overlay.classList.toggle('hidden');
      this._window.classList.toggle('hidden');
    };
    const newThis = this;
    this._btnOpen.forEach(btn =>
      btn.addEventListener('click', async function (e) {
        e.preventDefault();
        toggleWindow.bind(newThis)();
        await ctrler(this);
      })
    );
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
    //   {
    //     "designation": "Duplicopieur - Monochrome - A4",
    //     "quantite": 5,
    //     "quantite_recu": 0,
    //     "prix_unitaire": 69
    // }
    let numero = 0;
    let productsHTML = products
      .map(product => {
        console.log(product);
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
                    <td class="input-changeble price-produit">
                      <input type="text" placeholder="${
                        product.prix_unitaire
                      } DA" />
                    </td>
                    <td class="price-produit-montant">${
                      product.quantite * product.prix_unitaire
                    } DA</td>
                    <td class="reste-livre">${
                      product.quantite - product.quantite_recu
                    }</td>
                  </tr>`;
      })
      .join('');
    this._parentElement.innerHTML = '';
    this._parentElement.innerHTML = productsHTML;
  }

  // restrict(perms = []) {
  //   if (perms.all.includes('delete user')) {
  //     this._btnOpen.classList.remove('hidden');
  //   } else {
  //     this._btnOpen.classList.add('hidden');
  //   }
  //TODO:
  // _restricted = [['.view-btc-btn', 'delete user'], 'none'];
}
export default new SeeCmdsView();
