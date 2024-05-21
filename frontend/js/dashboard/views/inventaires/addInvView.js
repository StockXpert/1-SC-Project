import { AddCmdsIntView } from '../commandesInt/addCmdsIntView.js';
import * as helpers from '../../helpers.js';

// Product === Info
class AddInvView extends AddCmdsIntView {
  // _inputs = this._window.querySelectorAll('.quantity-ph input');
  _numberContainer;
  _btnContinueInv = document.querySelector('.btn-continue-inv');
  _refInputs;
  _parentElement = document.querySelector('.results-produits-inv');
  _window = document.querySelector('.big-container-inv');
  _numberContainer = this._window.querySelector('.heading-table-text-add-inv');
  _inputs = this._window.querySelectorAll('.td-exist input');
  _title = this._window.querySelector('.inv-title');
  _form = this._window.querySelector('.heading-table-btns-inv');
  _numInventaire = this._window.querySelector('.input-num-inv');
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
  resetPointers(controlInput, controlRefInput) {
    this.addHandlerShowEditProductWindow(
      '.info-btn-inv',
      '.edit-info-container',
      false
    );
    this._inputs = this._window.querySelectorAll('.td-exist input');

    this._refInputs = this._window.querySelectorAll('.ref-intenre-input input');

    this._inputs.forEach(input => {
      // helpers.validateIntegerInput(input);
      input.addEventListener('input', e => {
        e.preventDefault();
        let currentIndex = helpers.findNodeIndex(this._inputs, e.currentTarget);
        controlInput(input.checked, currentIndex);
        if (e.currentTarget.checked) {
          this._btnsOpenEditProduct[currentIndex].classList.add('hidden');
        } else {
          this._btnsOpenEditProduct[currentIndex].classList.remove('hidden');
        }
        this._resetWindows(this._windowEditProduct);
      });
    });
    this._refInputs.forEach(input => {
      //TODO:
      // helpers.validateIntegerInput(input);
      input.addEventListener('input', e => {
        console.log(
          helpers.findNodeIndex(
            this._parentElement.querySelectorAll('.ref-interne'),
            e.currentTarget.parentElement.parentElement
          )
        );
        let currentIndex = helpers.findNodeIndex(
          this._parentElement.querySelectorAll('.ref-interne'),
          e.currentTarget.parentElement.parentElement
        );
        controlRefInput(input.value, currentIndex);
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
    let counter = 0;
    if (this._data.length == 0) {
      return `<td colspan="4" class="empty-table--products">
      Aucun Produit
    </td>`;
    } else {
      return this._data.produits
        .map((result, index) =>
          this._generateMarkupPreview(result, this._perms, index)
        )
        .join('');
    }
  }
  _generateMarkupPreview(result, permissions, index) {
    /*    const html = `<tr>
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
  </tr>`;*/
    console.log(result);

    const html = `<tr>
    <td>
      <div class="colomn-product-des">
        <p class="colomn-des-name-product">${result.designation}</p>
      </div>
    </td>
    <td>
      <div class="ref-externe">${result.reference}</div>
    </td>
    <td class="ref-interne">
    ${
      result.num_inventaire
        ? `<div class="">${result.num_inventaire}</div>`
        : ` <div class="ref-intenre-input">
              <input class="green-ref-inv" type="text" value="55" placeholder="numInventaire" autocomplete="off">
              <span class="material-icons-sharp">
                drive_file_rename_outline
              </span>
            </div>`
    }    
    </td>
    <td class="td-exist blue-exist">
      <button class="exist-btn-inv">
        <div class="checkbox-wrapper-18">
          <div class="round">
            <input type="checkbox" id="checkbox-${index}" ${
      result.present ? 'checked' : 'unchecked'
    }>
            <label for="checkbox-${index}"></label>
          </div>
        </div>
      </button>
    </td>
    <td class="td-justify ">
      <button type="button" class="info-btn-inv  ${
        result.raison == '' ? 'red-info' : 'green-info'
      } ${result.present ? 'hidden' : ''}">
        <span class="material-icons-sharp info-icon">
          info
        </span>
      </button>
    </td>
  </tr>`;
    return html;
  }
  getValidityState() {
    let arrayFromNodeList = [...this._inputs];
    let arrayFromNodeList2 = [...this._refInputs];
    console.log(
      arrayFromNodeList.every(input => {
        return (
          input.checked ||
          (input.checked &&
            this._data[helpers.findNodeIndex(this._inputs, input)].raison !==
              '')
        );
      }),
      arrayFromNodeList2.every(input => {
        input != '';
      })
    );
    return (
      arrayFromNodeList.every(input => {
        return (
          input.checked ||
          (input.checked &&
            this._data[helpers.findNodeIndex(this._inputs, input)].raison !==
              '')
        );
      }) &&
      arrayFromNodeList2.every(input => {
        input != '';
      })
    );
  }
  addHandlerSavingInv(handler) {
    this._form.addEventListener('submit', e => {
      // // Get the form element
      // const formElement = this._form;

      // Create a new FormData object from the form - to console.log it if you need
      // const formData = new FormData(formElement);
      // console.log(formData);
      // formData.forEach((value, key) => {
      //   console.log(key + ': ' + value);
      // });

      // // Update form fields with new values
      // for (const key in NewInputValuesObj) {
      //   if (NewInputValuesObj.hasOwnProperty(key)) {
      //     const input = formElement.elements[key];
      //     if (input) {
      //       input.value = NewInputValuesObj[key];
      //     }
      //   }
      // }
      const numInventaire = this._numInventaire.value;
      console.log(e.target);
      console.log(e.currentTarget);
      console.log('SUBMIT', this.getValidityState());
      e.preventDefault();
      handler(this.getValidityState(), numInventaire);
    });
  }

  render(data, numeroInv = '') {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    if (numeroInv != '') {
      this._numberContainer.innerHTML = '';
    } else {
      this._numberContainer.innerHTML = `
        <div class="num-inv-inputs">
          <p>Entez le numero de l'état d'inventaire :</p>
          <input
            value=""
            class="input-num-inv"
            name="numInventaire"
            type="number"
            autocomplete="off"
            required
          />
        </div>`;
    }
    this._title.innerHTML = `Etat de l'inventaire ${
      numeroInv ? `N°${numeroInv}` : ``
    }`;
  }
}
export default new AddInvView();
