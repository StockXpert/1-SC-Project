import { state } from '../model.js';
import View from './view.js';
import poppupView from './poppupView.js';

export class AddUserView extends View {
  _window = document.querySelector('.add-user-container');
  _overlay = document.querySelector('.overlayAdd');
  _btnOpen = document.querySelector('.add-users-btn');
  _btnClose;
  _parentElement = document.querySelector('.add-user-container');
  _form = document.querySelector('.add-user-inputs');
  _inputsContainer = document.querySelector('.groupe-2-add');
  _passwordIcons = this._inputsContainer.querySelectorAll('.password-icon');
  _password = this._inputsContainer.querySelector('.password');
  _confirmPassword = this._inputsContainer.querySelector('.password-confirm');
  _typeConsumer = document
    .querySelector('.groupe-3-add')
    .querySelector('.dropdown-structure');
  _role = document.querySelector('#role-options');
  constructor() {
    super();
  }
  _boundToggleWindow = e => {
    e.preventDefault();
    this.toggleWindow.bind(this)();
  };
  addpasswordIconsEL() {
    this._passwordIcons.forEach(icon => {
      icon.addEventListener('click', e => {
        e.preventDefault();
        this.togglePasswordVisibility();
      });
    });
  }
  //in boundToggleWindow : THIS in toggleWindow logic points to the addUserView object
  addHandlerShowWindow(OpClassName, windowClassName) {
    this._window = document.querySelector(windowClassName);
    this._btnOpen = document.querySelector(OpClassName);
    this._btnOpen.addEventListener('click', this._boundToggleWindow);
  }
  //COMMENTED IN CONTROLLER.JS
  addHandlerOpenWindowAndUpdateSelect(handler) {
    this._btnOpen.addEventListener('click', handler);
  }
  toggleTypeConsumer(hide) {
    if (hide) {
      this._typeConsumer.classList.add('hidden');
      this._typeConsumer.querySelector(
        '#consommateur-add-user-options'
      ).required = false;
    } else {
      this._typeConsumer.classList.remove('hidden');
      this._typeConsumer.querySelector(
        '#consommateur-add-user-options'
      ).required = true;
    }
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
  addHandlerUpload(handler, hasConsumer = true) {
    const closeBtn = this._btnClose;
    if (hasConsumer)
      this._role.addEventListener('change', this.handleConsumerChange);
    this._form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const form = this;
      let inputs = Array.from(form.getElementsByTagName('input'));
      const select = Array.from(form.getElementsByTagName('select'));
      inputs = inputs.concat(select);
      const allFilled = inputs.every(input => {
        const isRequired = input.required;
        if (isRequired) {
          return input.value.trim() !== '';
        }
        return true;
      });
      if (allFilled) {
        const dataArr = [...new FormData(form)];
        const data = Object.fromEntries(dataArr);
        console.log(closeBtn);
        closeBtn.click();
        await handler(data);
      } else {
        alert('Please fill in all fields before submitting.');
      }
    });
  }

  togglePasswordVisibility = () => {
    const passwordType =
      this._password.type === 'password' ? 'text' : 'password';
    const confirmPasswordType =
      this._confirmPassword.type === 'password' ? 'text' : 'password';
    console.log(this._password);
    this._password.type = this._confirmPassword.type = passwordType;
    this._passwordIcons.forEach(icon =>
      icon.querySelectorAll('.input-icon').forEach(child => {
        child.classList.toggle('hidden');
      })
    );
    const confirmPasswordInput = this._confirmPassword;
    const newPasswordInput = this._password;
    confirmPasswordInput.addEventListener('input', function () {
      if (confirmPasswordInput.value !== newPasswordInput.value) {
        confirmPasswordInput.setCustomValidity(
          'Les mots de passe saisis ne sont pas identiques.'
        );
      } else {
        confirmPasswordInput.setCustomValidity('');
      }
    });
  };

  //THIS ===> the addUserView object

  addHandlerHideWindow(CloserClassName, windowClassName) {
    this._window = document.querySelector(windowClassName);
    this._btnClose = document.querySelector(CloserClassName);
    this._btnClose.addEventListener('click', this._boundToggleWindow);
    this._overlay.addEventListener('click', this._boundToggleWindow);
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _generateMarkup() {
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }

  _restricted = [[this._btnOpen, 'register'], 'none'];
}

export default new AddUserView();
