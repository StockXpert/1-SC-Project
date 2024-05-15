import { UsersView } from '../usersView.js';

class ProductsView extends UsersView {
  // _parentElement=
  constructor() {
    super();
  }

  _generateMarkupPreview(result, perms = []) {
    console.log(result);
    return `
    <tr>
    <td>
      <div class="checkbox-colomn-bdc-add">
        <input
          class=""
          type="checkbox"
          id="checkbox-table-bdc-add"
        />
        <p class="colomn-tags-name-bdc">1</p>
      </div>
    </td>
    <td>Pc dell xps</td>

    <td class="input-changeble quantity-produit">
      <input type="text" placeholder="8" />
    </td>
    <td class="input-changeble price-produit">
      <input type="text" placeholder="10.000" />
    </td>
    <td class="price-produit-montant">80.000</td>
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
  _restricted = [, 'none'];
}
export default new ProductsView();
