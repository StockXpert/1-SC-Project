import { AddCmdsIntView } from '../commandesInt/addCmdsIntView.js';
import * as helpers from '../../helpers.js';

// Product === Info
class AddInvView extends AddCmdsIntView {
  _inputs = this._window.querySelectorAll('.quantity-ph input');
  _parentElement = document.querySelector('.results-produits-inv');
  _window = document.querySelector('.big-container-inv');
  _form = this._window.querySelector('.inv-cart');
  _overlay = document.querySelector('.overlayInv');
  _btnOpen = document.querySelector('.add-inv-btn');
  _product = document.querySelector('#justify');
  _editProductForm;
  _windowEditProduct;
  _btnsOpenEditProduct;
  _btnCloseEditProduct;
  _save = this._window.querySelector('.btn-save-inv');
  constructor(isNerfed = false) {
    super(true);
    if (!isNerfed) {
      this.addHandlerShowWindow('.add-inv-btn', '.big-container-inv');
      this.addHandlerHideWindow('.btn-cancel-inv', '.big-container-inv');
      this.addHandlerHideEditProductWindow(
        '.cancel-btn-edit-info',
        '.edit-info-container',
        false
      );
      this._editProductForm =
        this._windowEditProduct.querySelector('.inputs-info');
    }
  }
  addHandlerEdit(controller) {
    this._btnOpen.addEventListener('click', async e => await controller());
    // this.addHandlerEdit();
  }
  addHandlerSetRemark(handler) {
    this._editProductForm.addEventListener('submit', e => {
      e.preventDefault();
      handler(this._product.value);
      this._btnCloseEditProduct.click();
    });
  }

  // this.addHandlerEditProductBtns() :
  // addHandlerEditRemarkBtn(controller) {
  //   const btnOpenArray = Array.from(this._btnsOpenEditProduct);
  //   btnOpenArray.forEach(async btn => {
  //     btn.addEventListener('click', async e => {
  //       await controller(this, e);
  //     });
  //   });
  // }

  resetPointers(controlInput) {
    this.addHandlerShowEditProductWindow(
      '.info-btn-inv',
      '.edit-info-container',
      false
    );
    this._inputs = this._window.querySelectorAll('.quantity-ph input');
    this._inputs.forEach(input => {
      helpers.validateIntegerInput(input);
      input.addEventListener('input', e => {
        let currentIndex = helpers.findNodeIndex(this._inputs, e.currentTarget);
        controlInput(input.value, currentIndex);
        if (
          e.currentTarget.value == this._data.produits[currentIndex].quantiteLog
        ) {
          e.currentTarget.classList.remove('red-qt');
          e.currentTarget.classList.add('green-qt');
          this._btnsOpenEditProduct[currentIndex].classList.add('hidden');
        } else {
          e.currentTarget.classList.add('red-qt');
          e.currentTarget.classList.remove('green-qt');
          this._btnsOpenEditProduct[currentIndex].classList.remove('hidden');
        }
        this._resetWindows(this._windowEditProduct);
      });
    });
  }
  _resetWindows(...windows) {
    windows.forEach(window => {
      window.querySelectorAll('input').forEach(input => (input.value = ''));
      window.classList.add('hidden');
    });
  }
  _generateMarkup() {
    if (this._data.length == 0) {
      return `<td colspan="4" class="empty-table--products">
      Aucun Produit
    </td>`;
    } else {
      return this._data.produits
        .map(result => this._generateMarkupPreview(result, this._perms))
        .join('');
    }
  }
  _generateMarkupPreview(result, permissions) {
    const html = `<tr>
    <td>
      <div class="colomn-product-des">
        <p class="colomn-des-name-product">${result.designation}</p>
      </div>
    </td>
    <td>${result.quantiteLog}</td>
    <td class="quantity-ph">
      <input class="${
        result.quantitePhys == result.quantiteLog ? 'green-qt' : 'red-qt'
      }" type="text" value="${result.quantitePhys}" required autocomplete="off">
      <span class="material-icons-sharp">
        drive_file_rename_outline
      </span>
    </td>
    <td class="td-justify">
      <button class="info-btn-inv ${
        result.raison == '' ? 'red-info' : 'green-info'
      } ${result.quantitePhys == result.quantiteLog ? 'hidden' : ''}">
        <span class="material-icons-sharp info-icon">
          info
        </span>
      </button>
    </td>
  </tr>`;
    return html;
  }
  getValidityState() {
    console.log(this._inputs);
    let arrayFromNodeList = [...this._inputs];
    return arrayFromNodeList.every(input => {
      return (
        (input.classList.contains('green-qt') &&
          this._btnsOpenEditProduct[
            helpers.findNodeIndex(this._inputs, input)
          ].classList.contains('hidden')) ||
        (input.classList.contains('red-qt') &&
          !this._btnsOpenEditProduct[
            helpers.findNodeIndex(this._inputs, input)
          ].classList.contains('hidden') &&
          this._btnsOpenEditProduct[
            helpers.findNodeIndex(this._inputs, input)
          ].classList.contains('green-info'))
      );
    });
  }
  addHandlerSavingInv(handler) {
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      handler(this.getValidityState());
    });
  }
}
export default new AddInvView();
