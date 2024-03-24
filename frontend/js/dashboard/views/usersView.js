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
    // TODO: console.log(result);
    // const id = window.location.hash.slice(1);
    return `
    <tr>
    <td>
      <div class="checkbox-colomn">
        <input type="checkbox" id="checkbox-table">
        <p class="colomn-tags-name">${result.nom + ' ' + result.prenom} </p>
      </div>
    </td>
    <td>${result.email}</td>
    <td class="table-status active-status">${result.active}</td>
    <td><p class="admin-role">${result.role}</p></td>
    <td class="table-structure">${result.structure}</td>
    <td>
      <button class="details-btn">
        <span class="material-icons-sharp info-icon">
          edit
        </span>
      </button>
    </td>
  </tr>
  `;
  }
}
export default new UsersView();
