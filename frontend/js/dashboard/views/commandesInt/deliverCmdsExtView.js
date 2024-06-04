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
  _suggestions = [];
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
  changeWhatsSuggested(handler) {
    this._refrences.forEach((input, index) => {
      input.addEventListener('input', e => {
        this._suggestions[index] = handler(
          input.value,
          this._refrences[index].parentElement.previousElementSibling
            .firstElementChild.firstElementChild.innerHTML
        );
      });
    });
  }
  resetPointers(suggestionChangeHandler) {
    document.addEventListener('click', event => {
      if (!event.target.matches('.green-ref')) {
        document.querySelectorAll('.suggestions-box').forEach(box => {
          box.style.display = 'none';
        });
      }
    });
    this._refrences = document.querySelectorAll('.reference .green-ref');
    this.changeWhatsSuggested(suggestionChangeHandler);
    this._suggestions = [];
    this._refrences.forEach((input, index) => {
      this._suggestions.push(['']);
      input.addEventListener('input', e => {
        console.log(this._suggestions);
        console.log(e.target.value);
        const suggestionBox = input.nextElementSibling.nextElementSibling;
        const filter = input.value.toLowerCase();
        suggestionBox.innerHTML = '';
        if (!filter) {
          suggestionBox.style.display = 'none';
          return;
        }
        if (this._suggestions[index].length == 0) {
          const suggestionItem = document.createElement('p');
          suggestionItem.textContent = 'Aucun Résultat';
          suggestionItem.onclick = () => {
            input.value = '';
            suggestionBox.style.display = 'none';
          };
          suggestionBox.appendChild(suggestionItem);
        } else {
          this._suggestions[index].forEach(suggestion => {
            const suggestionItem = document.createElement('p');
            suggestionItem.textContent = suggestion.reference;
            suggestionItem.onclick = () => {
              input.value = suggestion.reference;
              suggestionBox.style.display = 'none';
            };
            suggestionBox.appendChild(suggestionItem);
          });
        }
        suggestionBox.style.display =
          suggestionBox.childElementCount > 0 ? 'block' : 'none';
        adjustPosition(suggestionBox);
      });
    });

    function adjustPosition(box) {
      const rect = box.getBoundingClientRect();
      console.log(rect);
      // console.log(box.getBoundingClientRect());
      if (rect.bottom > window.innerHeight) {
        box.style.top = `-${rect.height}px`;
      } else {
        box.style.top = '100%';
      }
    }
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
