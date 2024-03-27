import { state } from '../model.js';
import View from './view.js';
import { AddUserView } from './addUserView.js';
import poppupView from './poppupView.js';
import * as helpers from '../helpers.js';

export class EditUserView extends AddUserView {
  // setter() {
  _window = document.querySelector('.edit-user-container');
  _overlay = document.querySelector('.overlayEdit');
  _btnOpen;
  _btnClose;
  _parentElement = document.querySelector('.edit-user-cart');
  _form = document.querySelector('.inputs-edit');
  currTarget;
  // }

  constructor() {
    super();
  }

  addHandlerShowWindow(OpClassName, windowClassName) {
    const addEventListenerCallback = e => {
      this.toggleWindow.bind(this)();
      this.currTarget = e.target;
    };
    this._window = document.querySelector(windowClassName);
    this._btnOpen = document.querySelectorAll(OpClassName);
    const btnOpenArray = Array.from(this._btnOpen);
    btnOpenArray.forEach((btn, index) => {
      btn.addEventListener('click', addEventListenerCallback);
    });
  }

  changeInputs(NewInputValuesObj) {
    // Get the form element
    const formElement = this._form;
    // Create a new FormData object from the form
    const formData = new FormData(formElement);
    // TODO:
    // formData.forEach(function (value, key) {
    //   console.log(key + ': ' + value);
    // });
    // Update form fields with new values
    for (const key in NewInputValuesObj) {
      if (NewInputValuesObj.hasOwnProperty(key)) {
        const input = formElement.elements[key];
        if (input) {
          input.value = NewInputValuesObj[key];
        }
      }
    }
  }

  addHandlerEdit(controller) {
    this._btnOpen = document.querySelectorAll('.details-btn');
    const btnOpenArray = Array.from(this._btnOpen);
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', controller);
    });
  }

  _generateMarkup() {}
}

export default new EditUserView();
