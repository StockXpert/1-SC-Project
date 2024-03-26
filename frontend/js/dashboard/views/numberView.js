import View from './view.js';
import * as model from '../model.js';

class NumberView extends View {
  _parentElement = document.querySelector('.heading-table-text');
  _table = document.querySelector('.results');
  _checkboxes = this._table.querySelectorAll('input[type="checkbox"]');
  _masterCheckbox = document.getElementById('checkbox-table-all');
  _elements = this._table.querySelectorAll('tr');
  calculateCheckboxes() {
    let checkedCount = 0;
    const func = checkbox => {
      // console.log(this._data);
      if (checkbox.checked) {
        checkedCount++;
        checkbox.parentElement.parentElement.parentElement.classList.add(
          'selected-row'
        );
      } else {
        checkbox.parentElement.parentElement.parentElement.classList.remove(
          'selected-row'
        );
      }
    };
    this._checkboxes.forEach(func);
    return checkedCount;
  }

  updateSelectabilityVisually() {}

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
      
        Tout les Utilisateurs (<b class="number-users">${
          this._data.search.results.length
        }</b>)
      </p>
      <p class="table-text">

      ${
        this._data.displayed.selected
          ? this._data.displayed.selected === this._data.search.results.length
            ? `Tous Selectionnés (<b class="number-users">${this._data.displayed.selected}</b>) `
            : `Selectionnés (<b class="number-users">${this._data.displayed.selected}</b>)`
          : ''
      }

      ${true ? '' : 'nothing'}
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
      toggleCheckboxes();
      controller();
    });
  }

  updateMasterCheckbox() {
    const slaveCheckboxes = this._checkboxes;
    const masterCheckbox = this._masterCheckbox;
    let allChecked = Array.from(slaveCheckboxes).every(
      checkbox => checkbox.checked
    );
    if (!slaveCheckboxes.length) {
      allChecked = false;
    }
    masterCheckbox.checked = allChecked;
  }
  addHandlerNumber(fn) {
    fn();
    this._table = document.querySelector('.results');
    this._checkboxes = this._table.querySelectorAll('input[type="checkbox"]');

    this._checkboxes.forEach(el =>
      el.addEventListener('change', e => {
        this.updateMasterCheckbox();
        fn();
      })
    );
  }
}
export default new NumberView();
