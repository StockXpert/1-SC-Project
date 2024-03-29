import { EditUserView } from '../editUserView.js';

class EditPermsView extends EditUserView {
  // constructor(){
  _parentElement = document.querySelector('.container-checkboxes-permissions');
  _data;
  _changedSpinnerContainer = document.querySelector('.container-permissions');
  // }

  changeInputs(NewInputValuesObj) {
    function checkSpecialArray(nodeList, specialArray) {
      const result = [];
      nodeList.forEach(checkbox => {
        result.push(specialArray.includes(checkbox.name));
      });
      return result;
    }

    // Example usage:
    const nodeList = document.querySelectorAll('input[type="checkbox"]');
    const specialArray = ['A', 'C'];
    const booleanArray = checkSpecialArray(nodeList, specialArray);
    console.log(booleanArray); // Output: [true, false, true]
  }

  _generateMarkup() {
    //#add DONE
    console.log(this._data);
    const next = this._generateMarkupPreview;
    return this._data.map(next).join('');
  }
  // _generateMarkupPreviewPreview
  _generateMarkupPreview(group) {
    const next = function (permission) {
      return `
        <div class="checkbox-colomn-permissions">
          <input type="checkbox" id="checkbox-table-permissions name=${permission.code}">
          <p class="colomn-tags-name-permissions">
            ${permission.name} (${permission.code})
          </p>
        </div>
      `;
    };
    return `<p class="heading-permission-text">${group.groupName}</p>
    ${group.permissions.map(next).join('')}
  `;
  }
}
export default new EditPermsView();
