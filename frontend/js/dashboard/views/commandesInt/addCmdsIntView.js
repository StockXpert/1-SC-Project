import { AddCmdsView } from '../commandes/addCmdsView.js';
export class AddCmdsIntView extends AddCmdsView {
  _window = document.querySelector('.big-container-bdci');
  _btnOpen = document.querySelector('.add-bdci-btn');
  _overlay = document.querySelector('.overlayBDCI');
  _addProductForm = document.querySelector('.inputs-add-product-bdci');
  _editProductForm = document.querySelector('.inputs-edit-product-bdci');
  _parentElement = document.querySelector('.results-bdci-produits');
  _product = document.querySelector('#bdci-product-add');
  _productEdit = document.querySelector('#bdci-product-edit');
  _editProductForm = document.querySelector('.inputs-edit-product-bdci');
  _btnDeleteProducts = document.querySelector('.btn-delete-produits-bdci');
  // _btnModifyProducts = document.querySelector('.btn-delete-produits-bdci');
  _checkboxesAddProduct;
  _save = document.querySelector('.btn-save-bdci-qt');
  // _btnModifyProducts = document.querySelector('.btn-edit-produits-bdc');
  // _btnOpenAddProduct;
  // _btnCloseAddProduct;
  // _windowAddProduct;
  // _restricted = [[this._btnOpen, 'bon commande'], 'none'];
  constructor(nerfed = false) {
    // #F00
    super(true);
    if (!nerfed) {
      this.addHandlerShowWindow('.add-bdci-btn', '.big-container-bdci');
      this.addHandlerHideWindow('#add-bdci-close', '.big-container-bdci');
      this.addHandlerHideAddProductWindow(
        '.cancel-btn-add-bdci',
        '.add-product-bdci-container'
      );
      this.addHandlerShowAddProductWindow(
        '.btn-add-product-bdci',
        '.add-product-bdci-container'
      );
      this.addHandlerHideEditProductWindow(
        '.cancel-btn-edit-bdci',
        '.edit-product-bdci-container'
      );
      this.addHandlerShowEditProductWindow(
        '.details-btn-bdci-add',
        '.edit-product-bdci-container'
      );
    }
  }
  // #F00 resultVisibilityTogglers()
  _generateMarkupPreview(result, perms = []) {
    return `
    <tr>
    <td>
      <div class="checkbox-colomn-bdc-add">
        <input
          class=""
          type="checkbox"
          id="checkbox-table-bdci-add"
        />
        <p class="colomn-tags-name-bdc">${this._data.indexOf(result) + 1}</p>
      </div>
    </td>
    <td>${result.designation}</td>

    <td class="input-changeble quantity-produit-bdci">
      <input type="text" placeholder="${result.quantite}" />
    </td>

    <td>
      <button class="details-btn-bdci-add">
        <span class="material-icons-sharp info-icon">
          edit
        </span>
      </button>
    </td>
  </tr>
    `;
  }
}
export default new AddCmdsIntView();
