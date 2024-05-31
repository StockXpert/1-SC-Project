import { EditCmdsIntView } from '../commandesInt/editCmdsIntView.js';
import { AddCmdsView } from './addCmdsView.js';

export class EditCmdsView extends AddCmdsView {
  constructor(nerfed = false) {
    super(true);
    if (!nerfed) {
      this.addHandlerShowWindow('.btn-edit-bdc', '.big-container-edit');
      this.addHandlerHideWindow('#add-bdc-close', '.big-container-edit');
      this.addHandlerHideAddProductWindow(
        '.cancel-btn-add-bdc',
        '.add-product-bdc-container'
      );
      this._windowAddProduct = this._window.querySelector(
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
  }
  _raison;
  _window = document.querySelector('.big-container-edit');
  _parentElement = this._window.querySelector('.results-bdc-produits');
  _trueParentElement = this._window.querySelector('.inputs-add-product-bdc');
  _save = this._window.querySelector('.btn-save-bdc');
  _btnOpen = document.querySelector('.btn-edit-bdc');
  _overlay = document.querySelector('.overlayEditCmd');
  _btnClose = this._window.querySelector('.btn-add-bdr-qt');
  // _btnsOpenAddProduct = this._window.querySelector('.btn-add-product');
  _btnCloseAddProduct;
  _windowAddProduct;
  _restricted = [[this._btnOpen, 'update bon commande'], 'none'];
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
  _resultsContainerProductEdit = document.querySelector(
    '.product-search-results-container-edit'
  );
  _fourResults;
  _articleResults;
  _productResults;
  _type = document.querySelector('#type-options');
  _addingProductForm = this._window.querySelector('.container-select-bdc');
  _ajouterProduitbtn = document.querySelector('.btn-add-product');
  _ajouterProduitWindow = document.querySelector('.add-product-bdc-container');
  _addProductForm = document.querySelector('.inputs-add-product-bdc');
  _editProductForm = document.querySelector('.inputs-edit-product-bdc');
  _btnDeleteProducts = document.querySelector('.btn-delete-produits-bdc');
  // _btnModifyProducts = document.querySelector('.btn-edit-produits-bdc');
  _checkboxesAddProduct;
  _btnsOpenEditProduct;
  _btnCloseEditProduct;
}
export default new EditCmdsView();
