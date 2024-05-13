import View from '../../view.js';

class ProductsView extends View {
  _parentElement = document.querySelector('.results-produits');
  _searchQuery = document.querySelector('.searchbar-text-produit');

  addSearchController(controller) {
    this._searchQuery.addEventListener('input', e => {
      const query = e.target.value;
      controller(query);
    });
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }

  _generateMarkupPreview(result, perms = []) {
    return `
    <tr>
      <td>
        <div class="checkbox-colomn-produits">
           <input type="checkbox" id="checkbox-table-produits" />
           <p class="colomn-tags-name">21-11 .11</p>
        </div>
      </td>
      <td>${result.designation}</td>
      <td>${result.description}</td>
      <td>${result.quantite}</td>
      <td>
        <button class="details-btn-produits">
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
