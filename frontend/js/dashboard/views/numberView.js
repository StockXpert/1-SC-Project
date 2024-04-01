import View from './view.js';

export class NumberView extends View {
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
    // console.log(this._checkboxes.length);
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
      </p>
  `;
  }

  selectionUpdater(customTableClass = '.results') {
    console.log('selectionUpdater');
    this._table = document.querySelector(customTableClass);
    const checkboxes = this._table.querySelectorAll('input[type="checkbox"]');
    this._checkboxes = checkboxes;
    return checkboxes;
  }

  masterSelectionUpdater() {
    this._table = document.querySelector('.results');
    const checkboxes = this._table.querySelectorAll('input[type="checkbox"]');
    const masterCheckbox = this._masterCheckbox;
    return masterCheckbox;
  }

  toggleCheckboxes() {
    const checkboxes = document
      .querySelector('.results')
      .querySelectorAll('input[type="checkbox"]');
    const masterCheckbox = document.getElementById('checkbox-table-all');
    checkboxes.forEach(checkbox => {
      checkbox.checked = masterCheckbox.checked;
    });
  }
  addHandlerMasterCheckbox(controller) {
    // const checkboxes = this.selectionUpdater();
    // console.log(checkboxes);
    // this._masterCheckbox = document.getElementById('checkbox-table-all');
    const masterCheckbox = this._masterCheckbox;
    // console.log(masterCheckbox);
    const tcb = this.toggleCheckboxes;
    this._masterCheckbox.addEventListener('change', function (e) {
      // console.log('CHANGE');
      tcb();
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
    this._checkboxes.forEach(el =>
      el.addEventListener('change', e => {
        this.updateMasterCheckbox();
        fn();
        // console.log('CHANGE IN A CHECKBOX');
      })
    );
  }
}
export default new NumberView();
