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
  _btnClose = this._window.querySelector('.edit-btn-decline');
  _parentElement = document.querySelector('.edit-user-cart');
  _form = document.querySelector('.inputs-edit');

  _typeConsumer = document
    .querySelector('.groupe-4')
    .querySelector('.dropdown-consumer');
  _nom = document.querySelector('.groupe-1').children[0];
  _statut = document.querySelector('.groupe-1').children[1];
  _roleContainer = document.querySelector('.groupe-1').children[2];
  _role = document.querySelector('#role-options-edit');
  _prenom = document.querySelector('.groupe-2').children[0];
  _ddn = document.querySelector('.groupe-2').children[1];
  _str = document.querySelector('.groupe-2').children[2];
  _email = document.querySelector('.groupe-3');

  constructor() {
    super();
  }

  addEventListenerCallback = e => {
    this.toggleWindow.bind(this)();
    // this.currTarget = e.target;
  };
  addHandlerShowWindow(OpClassName, windowClassName) {
    this._window = document.querySelector(windowClassName);
    this._btnOpen = document.querySelectorAll(OpClassName);
    const btnOpenArray = Array.from(this._btnOpen);
    btnOpenArray.forEach((btn, index) => {
      btn.addEventListener('click', this.addEventListenerCallback);
    });
  }
  handleConsumerChange = e => {
    {
      console.log('consumer change !');
      e.preventDefault();
      const filterInput = e.target;
      if (
        filterInput.options[filterInput.selectedIndex].value == 'Consommateur'
      )
        this.toggleTypeConsumer.bind(this)(false);
      else {
        this.toggleTypeConsumer.bind(this)(true);
      }
    }
  };
  changeInputs(NewInputValuesObj) {
    console.log(NewInputValuesObj);
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
      const input = formElement.elements[key];
      if (input) {
        input.value = NewInputValuesObj[key];
      }
    }
  }

  addHandlerEdit(controller) {
    const btnOpenArray = Array.from(this._btnOpen);
    btnOpenArray.forEach(async btn => {
      btn.addEventListener('click', await controller);
    });
  }

  _generateMarkup() {}

  _restricted = [
    ['.edit-nom', 'update user'],
    ['.edit-statut', 'change status'],
    ['.edit-prenom', 'update user'],
    ['.edit-ddn', 'update user'],
    ['.edit-str', 'rattacher'],
    ['.edit-email', 'update user'],
    ['.edit-role', 'update user'],
    'none',
  ];
}

export default new EditUserView();
