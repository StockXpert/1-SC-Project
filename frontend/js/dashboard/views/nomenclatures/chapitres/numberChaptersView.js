import View from '../../View.js';
class NumberChaptersView extends View {
  _parentElement = document.querySelector('.heading-table-text-chapitres');
  _table = document.querySelector('.results-chapitres');
  _checkboxes = this._table.querySelectorAll('input[type="checkbox"]');
  _masterCheckbox = document
    .querySelector('.table-container-chapitres')
    .querySelector('#checkbox-table-all');
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

  /** 
  getCheckedStructures() {
    const result = [];
    this._checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        // console.log(checkbox.nextElementSibling.innerHTML);
        checkbox.parentElement.parentElement.parentElement.classList.add(
          'selected-row'
        );
      } else
        checkbox.parentElement.parentElement.parentElement.classList.remove(
          'selected-row'
        );
    });
    console.log(result);
    return result;
  }
  **/

  _generateMarkup() {
    // console.log(this._data);
    //TODO: displayed, change the Tout les utilisateurs dynamically
    return `
      <p class="table-text">
        Tout les Chapitres (<b class="number-users">${
          this._data.all.length
        }</b>)
      </p>
      ${
        this._data.selected
          ? `<p class="table-text">
                Selectionnés (<b class="number-users">${this._data.selected}</b>)
            </p>`
          : ''
      }
    `;
  }

  addHandlerMasterCheckbox(controller, paramatres = false) {
    const checkboxes = this._checkboxes;
    const masterCheckbox = this._masterCheckbox;

    const toggleCheckboxes = function () {
      checkboxes.forEach(checkbox => {
        checkbox.checked = masterCheckbox.checked;
      });
    };

    this._masterCheckbox.addEventListener('change', function (e) {
      toggleCheckboxes();
      controller(paramatres);
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

  addHandlerNumber(controller, paramatres = false) {
    // fn();
    this._table = document.querySelector('.results-chapitres');
    this._checkboxes = this._table.querySelectorAll('input[type="checkbox"]');

    this._checkboxes.forEach(el =>
      el.addEventListener('change', e => {
        this.updateMasterCheckbox();
        controller(paramatres);
      })
    );
  }
}

export default new NumberChaptersView();
