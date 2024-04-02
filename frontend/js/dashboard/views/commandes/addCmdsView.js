import { AddUserView } from '../addUserView.js';

class AddCmdsView extends AddUserView {
  _parentElement = document.querySelector('.results-bdc-produits');
  _window = document.querySelector('.big-container');
  _btnOpen = document.querySelector('.add-bdc-btn');
  _overlay = document.querySelector('.overlayAddCmd');
  _btnClose;
  _btnOpenAddProduct;
  _btnCloseAddProduct;
  _windowAddProduct;
  _restricted = [[this._btnOpen, 'bon commande'], 'none'];
  _four = document.querySelector('#filter-fournisseur');
  _article = document.querySelector('#filter-article');
  _product = document.querySelector('#bdc-product');
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
  constructor() {
    super();
    //INITIALZR
    this.addHandlerShowWindow('.add-bdc-btn', '.big-container');
    this.addHandlerHideWindow('#add-bdc-close', '.big-container');
    this.addHandlerHideAddProductWindow(
      '.cancel-btn-add-bdc',
      '.add-product-bdc-container'
    );
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
    const markup = results
      .map(result => `<li>${result.raison_sociale}</li>`)
      .slice(0, 10)
      .join('');
    this._resultsContainer.insertAdjacentHTML('afterbegin', markup);
    this._fourResults = document
      .querySelector('.four-search-results-container')
      .querySelectorAll('li');
    this._fourResults.forEach(el => {
      return el.addEventListener('click', e => {
        controlSelectFournisseur(e.currentTarget.innerHTML);
        this._four.value = e.currentTarget.innerHTML;
        this._resultsContainer.innerHTML = '';
      });
    });
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
      return el.addEventListener('click', e => {
        controlSelectArticle(e.currentTarget.innerHTML);
        this._article.value = e.currentTarget.innerHTML;
        this._resultsContainerArticle.innerHTML = '';
      });
    });
  }
  addHandlerProductSearch(productSearchHandler) {
    this._product.addEventListener('input', e => {
      productSearchHandler(e.target.value);
    });
  }
  addToSuggestionsProductsAndEL(results = [], controlSelectProduct) {
    this._resultsContainerProduct.innerHTML = '';
    const markup = results
      .map(result => `<li>${result.designation}</li>`)
      .slice(0, 10)
      .join('');
    this._resultsContainerProduct.insertAdjacentHTML('afterbegin', markup);
    this._productResults = document
      .querySelector('.product-search-results-container')
      .querySelectorAll('li');
    this._productResults.forEach(el => {
      return el.addEventListener('click', e => {
        // controlSelectProduct(e.currentTarget.innerHTML);
        this._product.value = e.currentTarget.innerHTML;
        this._resultsContainerProduct.innerHTML = '';
      });
    });
  }
  addTypeSelectHandler(selectHandler) {
    this._type.addEventListener('change', e => selectHandler(e.target.value));
  }
  addHandlerAddProduct(handler) {
    let numero = 1;
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
      formDataObj.numero = numero++;
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
        <p class="colomn-tags-name-bdc">${result.numero}</p>
      </div>
    </td>
    <td>${result.designation}</td>

    <td class="input-changeble quantity-produit">
      <input type="text" placeholder="${result.quantite}" />
    </td>
    <td class="input-changeble price-produit">
      <input type="text" placeholder="${result.prix_unitaire}" />
    </td>
    <td class="price-produit-montant">${
      result.prix_unitaire * result.quantite
    }</td>
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

  addHandlerChangeProduct(handler, hasConsumer = true) {
    const closeBtn = this._btnCloseEditProduct;
    // if (hasConsumer)
    //   this._role.addEventListener('change', this.handleConsumerChange);
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
}

export default new AddCmdsView();
