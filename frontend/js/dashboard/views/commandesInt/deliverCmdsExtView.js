import { ValidateCmdsIntView } from './validateCmdsIntView.js';
class DeliverCmdsExtView extends ValidateCmdsIntView {
  constructor() {
    super(true);
  }
  _window = document.querySelector('.big-container-bdd');
  _overlay = document.querySelector('.overlayBDD');
  _parentElement = document.querySelector('.results-bdd-produits');
  _save = document.querySelector('.btn-save-livrer-bdd');
  _btnClose = document.querySelector('.btn-cancel-livrer-bdd');
  _numDecharge = document.querySelector('.input-num-bdd');
  _form = document.querySelector('.bdd-cart');
  _refrences;
  _generateMarkup() {
    if (this._data.length == 0) {
      return `<td colspan="2" class="empty-table--products">
      Aucun Produit !
    </td>`;
    } else {
      return this._data
        .map(result => this._generateMarkupPreview(result, this._perms))
        .join('');
    }
  }
  _generateMarkupPreview(produit) {
    return `
    <tr>
      <td>
        <div class="colomn-product-des">
          <p class="colomn-des-name-product">${produit.designation}</p>
        </div>
      </td>
      <td class="reference">
        <input class="green-ref" type="text" value="" autocomplete="off" required>
        <span class="material-icons-sharp">
          drive_file_rename_outline
        </span>
        <div class="suggestions-box"></div>
      </td>
    </tr>
    `;
  }
  resetPointers(inputHandler) {
    document.addEventListener('click', event => {
      if (!event.target.matches('.green-ref')) {
        document.querySelectorAll('.suggestions-box').forEach(box => {
          box.style.display = 'none';
        });
      }
    });
    this._refrences = document.querySelectorAll('.reference .green-ref');
    this._refrences.forEach(input =>
      input.addEventListener('input', e => {
        console.log(e.target.value);
        const suggestionBox = input.nextElementSibling.nextElementSibling;
        const filter = input.value.toLowerCase();
        suggestionBox.innerHTML = '';
        if (!filter) {
          suggestionBox.style.display = 'none';
          return;
        }
      })
    );
  }
  addHandlerDeliver(ctrl) {
    // console.log(this._save);
    this._form.addEventListener('submit', async e => {
      e.preventDefault();
      let refrencesArray = [];
      this._refrences.forEach(input => {
        refrencesArray.push(input.value);
      });
      this._btnClose.click();
      await ctrl({
        numDecharge: this._numDecharge.value,
        refrencesArray: refrencesArray,
      });
    });
  }

  // _header = document.querySelector('.verif-bdci-header');
  // _btnOpen;
  // _role;
  // _btnClose;
  // _btnLivrerBdci = document.querySelector('.btn-deliver-bdci');
  // _checkboxes;
}
export default new DeliverCmdsExtView();
