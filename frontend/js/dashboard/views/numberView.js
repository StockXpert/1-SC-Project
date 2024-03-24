import View from './view.js';
import * as model from '../model.js';

class NumberView extends View {
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

  // export const state = {
  //   search: {
  //     query: '',
  //     results: [],
  //   },
  //   displayed: {
  //     role: 'all',
  //     status: 'all',
  //     selected: 0,
  //   },
  // };

  _generateMarkup() {
    //TODO: displayed, change the Tout les utilisateurs dynamically
    return `
      <p class="table-text">
      
        Tout les Utilisateurs (<b class="number-users">${this._data.search.results.length}</b>)
      </p>
      <p class="table-text">
        Selectionnés (<b class="number-users">${this._data.displayed.selected}</b>)
      </p>
  `;
  }
  addHandlerMasterCheckbox(controller) {
    const checkboxes = this._checkboxes;
    const masterCheckbox = this._masterCheckbox;
    const toggleCheckboxes = function toggleCheckboxes() {
      checkboxes.forEach(checkbox => {
        checkbox.checked = masterCheckbox.checked;
      });
    };
    this._masterCheckbox.addEventListener('change', function (e) {
      console.log();
      toggleCheckboxes();
      controller();
    });
  }

  addHandlerNumber(fn) {
    fn();
    this._table = document.querySelector('.results');
    this._checkboxes = this._table.querySelectorAll('input[type="checkbox"]');
    this._checkboxes.forEach(el =>
      el.addEventListener('change', e => {
        fn();
      })
    );
  }
}
export default new NumberView();
