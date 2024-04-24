import { AddUserView } from '../addUserView.js';
import * as helpers from '../../helpers.js';

class AddCmdsView extends AddUserView {
  _save = document.querySelector('.btn-save-bdc-qt');
  _parentElement = document.querySelector('.results-bdc-produits');
  _window = document.querySelector('.big-container');
  _btnOpen = document.querySelector('.add-bdc-btn');
  _overlay = document.querySelector('.overlayAddCmd');
  _btnClose = document.querySelector('.btn-add-bdr-qt');
  _btnOpenAddProduct;
  _btnCloseAddProduct;
  _windowAddProduct;
  _restricted = [[this._btnOpen, 'bon commande'], 'none'];
  _four = document.querySelector('#filter-fournisseur');
  _article = document.querySelector('#filter-article');
  _product = document.querySelector('#bdc-product');
  _productEdit = document.querySelector('#bdc-product-edit');
  _resultsContainer = document.querySelector('.four-search-results-container');
  _resultsContainerArticle = document.querySelector(
    '.article-search-results-container'
  );
  _resultsContainerProduct = document.querySelector(
    '.product-search-results-container'
  );
  _fourResults;
  _articleResults;
  _productResults;
  _type = document.querySelector('#type-options');
  _ajouterProduitbtn = document.querySelector('.btn-add-product');
  _ajouterProduitWindow = document.querySelector('.add-product-bdc-container');
  _addProductForm = document.querySelector('.inputs-add-product-bdc');
  _editProductForm = document.querySelector('.inputs-edit-product-bdc');
  _btnDeleteProducts = document.querySelector('.btn-delete-produits-bdc');
  // _btnModifyProducts = document.querySelector('.btn-edit-produits-bdc');
  _checkboxesAddProduct;
  _btnsOpenEditProduct;
  _btnCloseEditProduct;
  // toggleDivVisibility(inputClass, divClass) {
  // const input = document.querySelector(inputClass);
  // const div = document.querySelector(divClass);
  // // input.addEventListener('focus', () => {
  // //   div.classList.remove('hidden');
  // // });
  // // Add event listener for blur event on input
  // input.addEventListener('blur', e => {
  //   // Check if the blur event originated from a click on the div
  //   if (!div.contains(e.target)) {
  //     div.classList.add('hidden'); // Add the 'hidden' class to hide the div
  //     console.log(div.contains(e.target));
  //   }
  // });
  // // Add event listener for click event on the div
  // div.addEventListener('click', () => {
  //   input.focus(); // Focus the input when the div is clicked
  // });
  // document.addEventListener('click', function (event) {
  //   const isClickedInside = div.contains(event.target);
  //   if (!isClickedInside) {
  //     console.log('clicked outside');
  //     div.classList.add('hidden');
  //   }
  // });
  // }

  allowSavingBDC(allow = true) {
    this._btnDeleteProducts.disabled = !allow;
    allow
      ? this._btnDeleteProducts.classList.remove('disabled-save-button')
      : this._btnDeleteProducts.classList.add('disabled-save-button');
  }
  addHandlerSavingBDC(handler, state) {
    const typeInput = this._type;
    const fourInput = this._four;
    const articleInput = this._article;
    // const productInput = this._product;
    // const productEditInput = this._productEdit;
    this._save.addEventListener('click', e => {
      e.preventDefault();
      // articleInput.setCustomValidity('');
      // typeInput.setCustomValidity('');
      // fourInput.setCustomValidity('');
      handler();
      this._btnClose.click();
    });
  }

  // toggleDivVisibility(inputClass, divClass) {
  //   const input = document.querySelector(inputClass);
  //   const div = document.querySelector(divClass);
  //   document.addEventListener('click', function (event) {
  //     console.log();
  //     const isClickedInside =
  //       div.contains(event.target) || input.contains(event.target);

  //     if (!isClickedInside) {
  //       div.classList.add('hidden');
  //     } else {
  //       div.classList.remove('hidden');
  //     }
  //   });
  // }
  toggleDivVisibility(inputClass, divClass) {
    const input = document.querySelector(inputClass);
    const div = document.querySelector(divClass);

    // // Add event listener for focus event on input
    // input.addEventListener('focus', () => {
    //   div.classList.remove('hidden'); // Remove the 'hidden' class to reveal the div
    // });

    // // Add event listener for blur event on input
    // input.addEventListener('blur', () => {
    //   // Delay to ensure the active element is updated after click on the div
    //   setTimeout(() => {
    //     if (!div.contains(document.activeElement)) {
    //       div.classList.add('hidden'); // Add the 'hidden' class to hide the div
    //     }
    //   }, 10000);
    // });

    // // Add event listener for click event on the div
    // div.addEventListener('click', () => {
    //   input.focus(); // Focus the input when the div is clicked
    // });
  }
  constructor() {
    super();
    //INITIALZR
    this.addHandlerShowWindow('.add-bdc-btn', '.big-container');
    this.addHandlerHideWindow('#add-bdc-close', '.big-container');
    // this.addHandlerHideAddProductWindow(
    // '.cancel-btn-add-bdc',
    // '.add-product-bdc-container'
    // );
    this.addHandlerShowAddProductWindow(
      '.btn-add-product',
      '.add-product-bdc-container'
    );
    this.addHandlerHideEditProductWindow(
      '.cancel-btn-edit-bdc',
      '.edit-product-bdc-container'
    );
    this.addHandlerShowEditProductWindow(
      '.details-btn-bdc-add',
      '.edit-product-bdc-container'
    );
  }
  resultVisibilityTogglers() {
    this.toggleDivVisibility('#bdc-product', '.add-product-search-results');
    this.toggleDivVisibility(
      '#bdc-product-edit',
      '.edit-product-search-results'
    );
    this.toggleDivVisibility('#filter-fournisseur', '.four-search-results');
    this.toggleDivVisibility('#filter-article', '.article-search-results');
  }
  addHandlerHideAddProductWindow(CloserClassName, windowClassName) {
    this._windowAddProduct = document.querySelector(windowClassName);
    this._btnCloseAddProduct = document.querySelector(CloserClassName);
    this._btnCloseAddProduct.addEventListener(
      'click',
      this._boundToggleAddProductWindow
    );
  }
  addHandlerShowAddProductWindow(OpClassName, windowClassName) {
    this._windowAddProduct = document.querySelector(windowClassName);
    this._btnOpenAddProduct = document.querySelector(OpClassName);
    this._btnOpenAddProduct.addEventListener(
      'click',
      this._boundToggleAddProductWindow
    );
  }
  toggleAddProductWindow() {
    this._windowAddProduct.classList.toggle('hidden');
  }
  clearAddProductForm() {
    const inputs = this._addProductForm.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  _boundToggleAddProductWindow = e => {
    e.preventDefault();
    this.clearAddProductForm();
    this.toggleAddProductWindow.bind(this)();
  };
  addHandlerFournisseurSearch(fournisseurSearchHandler) {
    this._four.addEventListener('input', e => {
      fournisseurSearchHandler(e.target.value);
    });
  }
  addToSuggestionsFournisseursAndEL(results = [], controlSelectFournisseur) {
    this._resultsContainer.innerHTML = '';

    const mappedResults = results.map(
      (result, index) => `<li>${result.raison_sociale}</li>`
      // {
      // if (index === results.length - 1) {
      //   return `<li>Sélectionner "<i>${result.raison_sociale}</i>" comme fournisseur personnalisé</li>`;
      // } else {
      //   return `<li>${result.raison_sociale}</li>`;
      // }
      // }
    );
    const markup = mappedResults.join('');
    this._resultsContainer.insertAdjacentHTML('afterbegin', markup);
    this._fourResults = document
      .querySelector('.four-search-results-container')
      .querySelectorAll('li');
    this._fourResults.forEach(el =>
      el.addEventListener('click', e => {
        this._four.setCustomValidity('');
        controlSelectFournisseur(
          results[helpers.findNodeIndex(this._fourResults, e.currentTarget)]
            .raison_sociale
        );
        this._four.value =
          results[
            helpers.findNodeIndex(this._fourResults, e.currentTarget)
          ].raison_sociale;
        this._resultsContainer.innerHTML = '';
      })
    );
  }
  addHandlerArticleSearch(articleSearchHandler) {
    this._article.addEventListener('input', e => {
      articleSearchHandler(e.target.value);
    });
  }
  addToSuggestionsArticlesAndEL(results = [], controlSelectArticle) {
    this._resultsContainerArticle.innerHTML = '';
    const markup = results
      .map(result => `<li>${result.designation}</li>`)
      .slice(0, 10)
      .join('');
    this._resultsContainerArticle.insertAdjacentHTML('afterbegin', markup);
    this._articleResults = document
      .querySelector('.article-search-results-container')
      .querySelectorAll('li');
    this._articleResults.forEach(el => {
      this._article.setCustomValidity('');
      return el.addEventListener('click', e => {
        controlSelectArticle(e.currentTarget.innerHTML);
        this._article.value = e.currentTarget.innerHTML;
        this._resultsContainerArticle.innerHTML = '';
      });
    });
  }

  addHandlerProductSearch(productSearchHandler) {
    this._product.addEventListener('input', e => {
      productSearchHandler(e.target.value, 'add');
    });
    //TODO: ALSO ADD THE EL TO the modifier search
    this._productEdit.addEventListener('input', e => {
      productSearchHandler(e.target.value, 'edit');
    });
  }
  addToSuggestionsProductsAndEL(
    results = [],
    resultsContainerClass = '.product-search-results-container'
  ) {
    document.querySelector(resultsContainerClass).innerHTML = '';
    const markup = results
      .map(result => `<li>${result.designation}</li>`)
      .slice(0, 10)
      .join('');
    document
      .querySelector(resultsContainerClass)
      .insertAdjacentHTML('afterbegin', markup);
    this._productResults = document
      .querySelector(resultsContainerClass)
      .querySelectorAll('li');
    this._productResults.forEach(el => {
      return el.addEventListener('click', e => {
        this._product.setCustomValidity('');
        // controlSelectProduct(e.currentTarget.innerHTML);
        this._product.value = e.currentTarget.innerHTML;
        this._productEdit.value = e.currentTarget.innerHTML;
        document.querySelector(resultsContainerClass).innerHTML = '';
      });
    });
  }

  addTypeSelectHandler(selectHandler) {
    this._type.addEventListener('change', e => selectHandler(e.target.value));
  }
  addHandlerAddProduct(handler) {
    this._addProductForm.addEventListener('submit', e => {
      e.preventDefault();
      const formElement = this._addProductForm;
      const formData = new FormData(formElement);
      // formData.forEach(function (value, key) {
      //   console.log(key + ': ' + value);
      // });
      // Convert FormData object to object with key-value pairs
      const formDataObj = {};
      formData.forEach(function (value, key) {
        formDataObj[key] = value;
      });
      handler(formDataObj);
      this.clearAddProductForm();
      this.toggleAddProductWindow.bind(this)();
    });
  }

  AddHandlerAddedProductsCheckboxes() {
    this._checkboxesAddProduct = this._parentElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    const handleCheckboxChange = () => {
      const checkedCheckboxes = this._parentElement.querySelectorAll(
        'input[type="checkbox"]:checked'
      );
      if (checkedCheckboxes.length === 0) {
        // this._btnModifyProducts.disabled = true;
        this._btnDeleteProducts.disabled = true;
        // this._btnModifyProducts.classList.add('disabled-button'); // Apply disabled appearance
        this._btnDeleteProducts.classList.add('disabled-delete-button'); // Apply disabled appearance
      } else if (checkedCheckboxes.length === 1) {
        // this._btnModifyProducts.disabled = false;
        this._btnDeleteProducts.disabled = false;
        // this._btnModifyProducts.classList.remove('disabled-button'); // Remove disabled appearance
        this._btnDeleteProducts.classList.remove('disabled-delete-button'); // Remove disabled appearance
      } else {
        // this._btnModifyProducts.disabled = true;
        this._btnDeleteProducts.disabled = false;
        // this._btnModifyProducts.classList.add('disabled-button'); // Apply disabled appearance
        this._btnDeleteProducts.classList.remove('disabled-delete-button'); // Remove disabled appearance
      }
    };
    handleCheckboxChange();
    this._checkboxesAddProduct.forEach(cbx =>
      cbx.addEventListener('change', handleCheckboxChange)
    );
  }
  _generateMarkup() {
    if (this._data.length == 0) {
      return `<td colspan="6" class="empty-table--products">
      Les produits que vous ajouterez apparaîtront ici !
    </td>`;
    } else {
      return this._data
        .map(result => this._generateMarkupPreview(result, this._perms))
        .join('');
    }
  }
  addHandlerDeleteAddedProducts(handler) {
    this._btnDeleteProducts.addEventListener('click', handler);
  }
  _generateMarkupPreview(result, perms = []) {
    return `
    <tr>
    <td>
      <div class="checkbox-colomn-bdc-add">
        <input
          class=""
          type="checkbox"
          id="checkbox-table-bdc-add"
        />
        <p class="colomn-tags-name-bdc">${this._data.indexOf(result) + 1}</p>
      </div>
    </td>
    <td>${result.designation}</td>

    <td class="input-changeble quantity-produit">
      <input type="text" placeholder="${result.quantite}" />
    </td>
    <td class="input-changeble price-produit">
      <input type="text" placeholder="${result.prixUnitaire} DA" />
    </td>
    <td class="price-produit-montant">${
      result.prixUnitaire * result.quantite
    } DA</td>
    <td>
      <button class="details-btn-bdc-add">
        <span class="material-icons-sharp info-icon">
          edit
        </span>
      </button>
    </td>
  </tr>
    `;
  }
  // addHandlerEditProductsBtns() {}

  addHandlerHideEditProductWindow(CloserClassName, windowClassName) {
    this._windowEditProduct = document.querySelector(windowClassName);
    this._btnCloseEditProduct = document.querySelector(CloserClassName);
    this._btnCloseEditProduct.addEventListener(
      'click',
      this._boundToggleEditProductWindow
    );
  }
  addHandlerShowEditProductWindow(OpClassName, windowClassName) {
    this._windowEditProduct = document.querySelector(windowClassName);
    this._btnsOpenEditProduct = document.querySelectorAll(OpClassName);
    this._btnsOpenEditProduct.forEach(btn =>
      btn.addEventListener('click', this._boundToggleEditProductWindow)
    );
  }
  toggleEditProductWindow() {
    this._windowEditProduct.classList.toggle('hidden');
  }
  clearEditProductForm() {
    const inputs = this._editProductForm.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  _boundToggleEditProductWindow = e => {
    e.preventDefault();
    this.clearEditProductForm();
    this.toggleEditProductWindow.bind(this)();
  };
  addHandlerEditProductBtns(controller) {
    const btnOpenArray = Array.from(this._btnsOpenEditProduct);
    btnOpenArray.forEach(async btn => {
      btn.addEventListener('click', await controller);
    });
  }

  changeInputs(NewInputValuesObj) {
    // Get the form element
    const formElement = this._editProductForm;
    // Create a new FormData object from the form
    const formData = new FormData(formElement);
    // TODO:
    // formData.forEach(function (value, key) {
    //   console.log(key + ': ' + value);
    // });
    // Update form fields with new values
    for (const key in NewInputValuesObj) {
      if (NewInputValuesObj.hasOwnProperty(key)) {
        const input = formElement.elements[key];
        if (input) {
          input.value = NewInputValuesObj[key];
        }
      }
    }
  }

  addHandlerChangeProduct(handler) {
    const closeBtn = this._btnCloseEditProduct;
    this._editProductForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const form = this;
      let inputs = Array.from(form.getElementsByTagName('input'));
      // const select = Array.from(form.getElementsByTagName('select'));
      // inputs = inputs.concat(select);
      const allFilled = inputs.every(input => {
        const isRequired = input.required;
        if (isRequired) {
          return input.value.trim() !== '';
        }
        return true;
      });
      if (allFilled) {
        const dataArr = [...new FormData(form)];
        const data = Object.fromEntries(dataArr);
        closeBtn.click();
        handler(data);
      } else {
        alert('Please fill in all fields before submitting.');
      }
    });
  }
  _restricted = [['.add-bdc-btn', 'bon commande'], 'none'];
}

export default new AddCmdsView();
