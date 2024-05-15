import View from '../../view.js';

class FournisseurView extends View {
  _parentElement = document.querySelector('.results-fournisseur');
  _searchQuery = document.querySelector('.searchbar-text-fournisseur');

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
        <div class="checkbox-colomn-fournisseur">
          <input
            type="checkbox"
            id="checkbox-table-fournisseur"
          />
          <p class="colomn-tags-name">1</p>
        </div>
      </td>
      <td>${result.raison_sociale}</td>

      <td>${result.adresse}</td>
      <td>${result.telephone}</td>
      <td class="td-view-fournisseur">
        <button class="details-btn-fournisseur">
          <span class="material-icons-sharp info-icon">
            info
          </span>
        </button>
      </td>
      <td>
        <button class="edit-fournisseur-btn">
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

export default new FournisseurView();
