// import icons from '../../../img/icons.svg';
import * as helpers from '../helpers.js';

export default class View {
  _data;
  _clear() {
    this._parentElement.innerHTML = '';
  }
  _trueClear() {
    this._trueParentElement.innerHTML = '';
  }
  // ["DJEZIRI Oussama", "KAZI Kamil"]
  addToSelection(options, selectClassName, type = 'responsable') {
    helpers.removeChildrenFromSecond(document.getElementById(selectClassName));
    options.forEach((option, index) => {
      const optionElement = document.createElement('option');
      switch (type) {
        case 'responsable':
          optionElement.value = option.email;
          optionElement.textContent = `${option?.nom} ${option.prenom}`;
          break;
        case 'structure':
          optionElement.value = option;
          optionElement.textContent = `${index + 1} : ${option}`;
          break;
        case 'role':
          optionElement.value = option;
          optionElement.textContent = `${index + 1} : ${option}`;
          break;
      }
      document.getElementById(selectClassName).appendChild(optionElement);
    });
  }

  // addToSelection(options) {
  //   options.forEach(option => {
  //     const optionElement = document.createElement('option');
  //     optionElement.value = option.email;
  //     optionElement.textContent = `${option.nom} ${option.prenom}`;
  //     this._selectionUsers.appendChild(optionElement);
  //   });
  // }

  render(data, render = true) {
    //TODO: RenderError()
    // console.log('rendering', this._data);
    // console.log(data);
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return console.log('something went wrong while trying to render this...');
    // this.renderError();

    //this here is pointing towards an instance of the viewclass (or subclasses)
    this._data = data; // updating the _data field that child classes use in their _generateMarkup functions
    const markup = this._generateMarkup(); // to each child class its _generateMarkup
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSpinner = function (message = '', isTrueParent = false) {
    console.log('rendering spinner');
    //   const markup = `
    //   <div class="spinner-parent">
    //   <b>${!message ? '' : `<div class="spinner"></div>`} ${message}</b>
    //   ${message ? '' : `<div class="spinner"></div>`}
    //   </div>
    // `;
    if (isTrueParent) {
      this._trueParentElement.insertAdjacentHTML('afterbegin', markup);
    } else {
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
  };
  unrenderSpinner = function (isTrueParent = false) {
    if (isTrueParent) {
      this._trueParentElement.querySelector('.spinner-parent').remove();
    } else {
      this._parentElement.querySelector('.spinner-parent').remove();
    }
  };
}
