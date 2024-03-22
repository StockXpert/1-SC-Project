import View from './view.js';
class UsersView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    //TODO: Refactoring
    // return this._data.map(result => previewView.render(result, false)).join('');
    // console.log(`${this._data.map(this._generateMarkupPreview).join('')}`);
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    console.log(result);
    // const id = window.location.hash.slice(1);
    return `
    <tr>
    <td>
      <div class="checkbox-colomn">
        <input type="checkbox" id="checkbox-table" />
        <p class="colomn-tags-name">${result.prenom + ' ' + result.nom}</p>
      </div>
    </td>
    <td>${result.email}</td>
    <td class="table-status ${
      result.active ? 'active-status' : 'inactif-status'
    }">${result.active ? 'Actif' : 'Inactif'}</td>
    <td><p class="admin-role">${result.roles}</p></td>
    <td>
      <button class="details-btn">
        <span class="material-icons-sharp info-icon">
          info
        </span>
      </button>
    </td>
  </tr>
  `;
  }
}
export default new UsersView();
