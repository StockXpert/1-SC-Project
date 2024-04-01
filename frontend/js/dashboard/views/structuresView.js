import View from './view.js';
import * as helpers from '../helpers.js';
class StructuresView extends View {
  _parentElement = document.querySelector('.table-structures');

  _generateMarkup() {
    //TODO: Refactoring
    // console.log(this._data.map(this._generateMarkupPreview).join(''));
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }

  _generateMarkupPreview(result, perms = []) {
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
      ${
        //TODO:
        helpers.includesDesignation(perms, 'update structure')
          ? `
        <button class="details-btn-structures">
           <span class="material-icons-sharp info-icon">
             edit
           </span>
        </button>`
          : ``
      }
      </td>
    </tr>
    `;
  }
  _restricted = ['none'];
}

export default new StructuresView();
