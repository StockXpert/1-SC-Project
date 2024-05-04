import { AddCmdsIntView } from './addCmdsIntView.js';
export class EditCmdsIntView extends AddCmdsIntView {
  constructor(nerfed = false) {
    super(true);
    if (!nerfed) {
      this.addHandlerShowWindow('.btn-edit-bdci', '.big-container-edit-bdci');
      this.addHandlerHideWindow('#edit-bdci-close', '.big-container-edit-bdci');
      this.addHandlerHideAddProductWindow(
        '.cancel-btn-add-edit-bdci',
        '.add-product-edit-bdci-container'
      );
      this.addHandlerShowAddProductWindow(
        '.add-product-bdci',
        '.add-product-edit-bdci-container'
      );
      this.addHandlerHideEditProductWindow(
        '.cancel-btn-edit-edit-bdci',
        '.edit-product-edit-bdci-container'
      );
      this.addHandlerShowEditProductWindow(
        '.details-btn-bdci-add',
        '.edit-product-edit-bdci-container'
      );
    }
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
  _btnsOpenEditProduct;
  _product = document.querySelector('#edit-bdci-product-add');
  _productEdit = document.querySelector('#edit-bdci-product-edit');
  _editProductForm = document.querySelector('.inputs-edit-product-edit-bdci');
  _btnDeleteProducts = document.querySelector('.btn-delete-produits-edit-bdci');
  _save = document.querySelector('.btn-save-edit-bdci-qt');
  _checkboxesAddProduct;
  _resultsContainerProduct = document.querySelector(
    '.edit-bdci-product-search-results-container'
  );
  _resultsContainerProductEdit = document.querySelector(
    '.edit-bdci-product-search-results-container-edit'
  );
  // _form = document.querySelector('.inputs-edit');
  async addHandlerEdit(controller) {
    // const btnOpenArray = Array.from(this._btnOpen);
    // btnOpenArray.forEach(btn => {
    //   btn.addEventListener('click', controller);
    // });
    this._btnOpen.addEventListener('click', await controller);
  }

  // changeInputs(numDemande, selectedCmdIntProducts) {
  //   // Get the form element (EditUserView.js)
  // }

  changeDetails(products, cmd = '') {
    if (cmd != '') {
      const heading = this._window.querySelector('.edit-bdci-title');
      heading.innerHTML = `Commande N°${cmd}`;
    }
    console.log("editCmdsintView's change inputs got called");
    let productsHTML =
      products.length != 0
        ? products
            .map(product => {
              return `    <tr>
              <td>
                <div class="checkbox-colomn-bdc-add">
                  <input
                    class=""
                    type="checkbox"
                    id="checkbox-table-bdci-add"
                  />
                  <p class="colomn-tags-name-bdc">${
                    products.indexOf(product) + 1
                  }</p>
                </div>
              </td>
              <td>${product.designation}</td>
          
              <td class="input-changeble quantity-produit-bdci">
                <input type="text" placeholder="${product.quantite}" />
              </td>
          
              <td>
                <button class="details-btn-edit-bdci-add">
                  <span class="material-icons-sharp info-icon">
                    edit
                  </span>
                </button>
              </td>
            </tr>`;
            })
            .join('')
        : `<td colspan=4 class="empty-table--products"><b>Aucun Produit</b></td>`;
    this._parentElement.innerHTML = '';
    this._parentElement.innerHTML = productsHTML;
  }
}
export default new EditCmdsIntView();
