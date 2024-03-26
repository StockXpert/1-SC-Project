import View from './View.js';

class StructuresView extends View {
  _parentElement = document.querySelector('.table-structures');

  _generateMarkup() {
    //TODO: Refactoring
    // console.log(this._data.map(this._generateMarkupPreview).join(''));
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
    <tr>
      <td>
        <div class="checkbox-colomn">
           <input type="checkbox" id="checkbox-table" />
          <p class="colomn-tags-name">${result.designation}</p>
        </div>
      </td>
      <td>${result.responsible}</td>
      <td>
        <button class="details-btn-structures">
           <span class="material-icons-sharp info-icon">
             edit
           </span>
        </button>
      </td>
    </tr>
    `;
  }
}

export default new StructuresView();
