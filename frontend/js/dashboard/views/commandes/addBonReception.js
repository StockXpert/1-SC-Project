import { AddUserView } from '../addUserView.js';

class AddBonReception extends AddUserView {
  _btnOpen = document.querySelector('.btn-add-bdr');
  _btnClose = document.querySelector('.cancel-btn-add-bdr');
  _window = document.querySelector('.big-container-bdr-add');
  _parentElement = document.querySelector('.results-bdr-produits');

  toggleWindow() {
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
    });
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
      console.log('suppp');
    });
  }

  f() {
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _generateMarkup() {
    console.log(this._data);
    if (this._data.length === 0) return `<div><p>No data yet</p></div>`;
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }

  _generateMarkupPreview(result) {
    return `
      <tr>
        <td>
          <div class="checkbox-colomn-bdr-add">
            <p class="colomn-tags-name-bdr-qt">1</p>
          </div>
        </td>
        <td>${result.designation}</td>

        <td>${result.quantite}</td>
        <td class="quantity">
          <input class="green-qt" type="text" value="0" />
          <span class="material-icons-sharp">
            drive_file_rename_outline
          </span>
        </td>
        <td class="red-reste">32</td>
      </tr>
    `;
  }
}

export default new AddBonReception();
