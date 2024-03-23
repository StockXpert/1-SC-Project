import View from './view.js';
import * as model from '../model.js';

export default class NumberView extends View {
  _parentElement = document.querySelector('.heading-table-text');
  _table = document.querySelector('.results');
  _checkboxes = this._table.querySelectorAll('input[type="checkbox"]');
  _masterCheckbox = document.getElementById('checkbox-table-all');

  calculateCheckboxes() {
    console.log(this._checkboxes);
    let checkedCount = 0;
    this._checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkedCount++;
      }
    });
    return checkedCount;
  }

  _generateMarkup() {
    //TODO: displayed, change the Tout les utilisateurs dynamically
    return `
      <p class="table-text">
      
        Tout les Utilisateurs (<b class="number-users">${
          this._data.search.results.length
        }</b>)
      </p>
      <p class="table-text">
        Selectionnés (<b class="number-users">${this.calculateCheckboxes()}</b>)
      </p>
  `;
  }
  // addHandlerMasterCheckbox(controller) {
  //   const checkboxes = this._checkboxes;
  //   const toggleCheckboxes = function toggleCheckboxes() {
  //     checkboxes.forEach(checkbox => {
  //       checkbox.checked = masterCheckbox.checked;
  //     });
  //   };
  //   this._masterCheckbox.addEventListener('change', function (e) {
  //     toggleCheckboxes();
  //     controller();
  //   });
  // }

  addHandlerNumber(fn) {
    fn();
    this._checkboxes.forEach(el =>
      el.addEventListener('change', e => {
        fn();
      })
    );
  }
}
// export default new NumberView();
