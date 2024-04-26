import { AddCmdsIntView } from './addCmdsIntView.js';
class EditCmdsIntView extends AddCmdsIntView {
  constructor() {
    super(true);
    this.addHandlerShowWindow('.btn-edit-bdci', '.big-container-edit-bdci');
    this.addHandlerHideWindow('#edit-bdci-close', '.big-container-edit-bdci');
    this.addHandlerHideAddProductWindow(
      '.cancel-btn-add-edit-bdci',
      '.add-product-edit-bdci-container'
    );
    this.addHandlerShowAddProductWindow(
      '.btn-add-product-edit-bdci',
      '.add-product-edit-bdci-container'
    );
    this.addHandlerHideEditProductWindow(
      '.cancel-btn-edit-bdci',
      '.edit-product-edit-bdci-container'
    );
    this.addHandlerShowEditProductWindow(
      '.details-btn-bdci-add',
      '.edit-product-edit-bdci-container'
    );
  }
  _btnOpen = document.querySelector('.btn-edit-bdci');
  _btnModifyBdc = document.querySelector('.btn-edit-bdci');
  _overlay = document.querySelector('.overlayEditBDCI');
  _window = document.querySelector('.big-container-edit-bdci');
  _btnClose = document.querySelector('#edit-bdci-close');
  _addProductForm = document.querySelector('.inputs-add-product-edit-bdci');
  _editProductForm = document.querySelector('.inputs-edit-product-edit-bdci');
  _parentElement = document.querySelector('.results-edit-bdci-produits');
  _trueParentElement = document.querySelector(
    '.big-container-edit-bdci .add-bdc-cart'
  );
  _product = document.querySelector('#edit-bdci-product-add');
  _productEdit = document.querySelector('#edit-bdci-product-edit');
  _editProductForm = document.querySelector('.inputs-edit-product-edit-bdci');
  _btnDeleteProducts = document.querySelector('.btn-delete-produits-edit-bdci');
  _save = document.querySelector('.btn-save-edit-bdci-qt');
  _checkboxesAddProduct;

  // _form = document.querySelector('.inputs-edit');
  async addHandlerEdit(controller) {
    // const btnOpenArray = Array.from(this._btnOpen);
    // btnOpenArray.forEach(btn => {
    //   btn.addEventListener('click', controller);
    // });
    this._btnOpen.addEventListener('click', await controller);
  }

  changeInputs(numDemande, selectedCmdIntProducts) {
    // Get the form element (EditUserView.js)
  }
}
export default new EditCmdsIntView();
