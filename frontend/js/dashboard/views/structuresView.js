import View from './View.js';

class structuresView extends View {
  _parentElement = document.querySelector('.main-table-structure');

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
      <td>${result.id}</td>
      <td>${result.responsible}</td>
      <td class="table-structure">${result.Assignment}</td>
    </tr>
    `;
  }
}

export default new structuresView();
