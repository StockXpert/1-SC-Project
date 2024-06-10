import View from '../../view.js';

class ArticlesView extends View {
  _parentElement = document.querySelector('.results-articles');
  _searchQuery = document.querySelector('.searchbar-text-article');

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
        <div class="checkbox-colomn-articles">
          <input type="checkbox" id="checkbox-table-articles" />
          <p class="colomn-tags-name">${result.num_article}</p>
        </div>
      </td>
      <td>${result.designation}</td>
      <td>${result.chapitre}</td>
      <td>${result.tva}%</td>
      <td>
        <button class="details-btn-articles">
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

export default new ArticlesView();
