import View from '../../view.js';

class ChaptersView extends View {
  _parentElement = document.querySelector('.results-chapitres');

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }

  _generateMarkupPreview(result, perms = []) {
    return `
    <tr>
      <td>
        <div class="checkbox-colomn-chapitres">
          <input type="checkbox" id="checkbox-table-chapitres" />
          <p class="colomn-tags-name">${result.num_chap}</p>
        </div>
      </td>
      <td>${result.designation}</td>
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

  _restricted = [, 'none'];
}

export default new ChaptersView();
