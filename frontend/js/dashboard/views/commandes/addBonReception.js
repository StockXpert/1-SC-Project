import { AddUserView } from '../addUserView.js';

class AddBonReception extends AddUserView {
  _btnOpen = document.querySelector('.btn-add-bdr');
  _btnClose = document.querySelector('.cancel-btn-add-bdr');
  _window = document.querySelector('.big-container-bdr-add');
  _parentElement = document.querySelector('.results-bdr-produits');
  _sauvgarde = document.querySelector('.btn-save-bdr-qt');

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
    const inputQuatite =
      this._parentElement.querySelector('input[type="text"]');
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
      </tr>
    `;
  }

  handleUpdate() {
    const bonLivraisonInput = document.getElementById('bonLivraisonInput');
    const factureInput = document.getElementById('factureInput');
    this._sauvgarde.addEventListener('click', e => {
      e.preventDefault();
      console.log('SAUVGARDE');
      if (bonLivraisonInput.files.length > 0)
        console.log(URL.createObjectURL(bonLivraisonInput.files[0]));
      else console.log('no bon Livraison');
      if (factureInput.files.length > 0)
        console.log(URL.createObjectURL(factureInput.files[0]));
      else console.log('no facture');
    });
  }
}

export default new AddBonReception();
