import { NumberView } from '../numberView.js';

class NumberRoleView extends NumberView {
  _parentElement = document.querySelector('#heading-table-text-roles');
  _table = document.querySelector('.roles-cart');
  _checkboxes = this._table.querySelectorAll('input[type="checkbox"]');
  // _masterCheckbox = document.getElementById('checkbox-table-all');
  _elements = this._table.querySelectorAll('.role');
  constructor() {
    super();
  }

  //model.state.roles.all
  _generateMarkup() {
    return `
      <p class="table-text">
        Tout les Roles (<b class="number-users">${this._data.length}</b>)
      </p>
      <p class="table-text">
  `;
  }
}
export default new NumberRoleView();
// ${
//   this._data.displayed.selected
//     ? this._data.displayed.selected === this._data.search.results.length
//       ? `Tous Selectionnés (<b class="number-users">${this._data.displayed.selected}</b>) `
//       : `Selectionnés (<b class="number-users">${this._data.displayed.selected}</b>)`
//     : ''
// }

// ${true ? '' : 'nothing'}
// </p>
