import { AddUserView } from '../addUserView.js';

class AddCmdsView extends AddUserView {
  _window = document.querySelector('.big-container');
  _btnOpen = document.querySelector('.add-bdc-btn');
  _overlay = document.querySelector('.overlayAddCmd');
  _btnClose;
  _btnOpenAddProduct; //TODO:
  _btnCloseAddProduct; //TODO:
  _windowAddProduct; //TODO:
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
  _boundToggleAddProductWindow = e => {
    e.preventDefault();
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
    console.log(this._articleResults);
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
    console.log(this._productResults);
    this._productResults.forEach(el => {
      return el.addEventListener('click', e => {
        controlSelectProduct(e.currentTarget.innerHTML);
        this._product.value = e.currentTarget.innerHTML;
        this._resultsContainerProduct.innerHTML = '';
      });
    });
  }

  addTypeSelectHandler(selectHandler) {
    this._type.addEventListener('change', e => selectHandler(e.target.value));
  }

  addHandlerShowAddProd(handler) {}
}

export default new AddCmdsView();
