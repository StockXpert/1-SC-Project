import { state } from '../model.js';
import View from './view.js';
import poppupView from './poppupView.js';

export class AddUserView extends View {
  _window = document.querySelector('.add-user-container');
  _overlay = document.querySelector('.overlayAdd');
  _btnOpen;
  _btnClose;
  _parentElement = document.querySelector('.add-user-cart');
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
    this._passwordIcons.forEach(icon => {
      icon.addEventListener('click', e => {
        e.preventDefault();
        this.togglePasswordVisibility();
      });
    });
  }
  _boundToggleWindow = e => {
    e.preventDefault();
    this.toggleWindow.bind(this)();
  };
  //in boundToggleWindow : THIS in toggleWindow logic points to the addUserView object
  addHandlerShowWindow(OpClassName, windowClassName) {
    this._window = document.querySelector(windowClassName);
    this._btnOpen = document.querySelector(OpClassName);
    this._btnOpen.addEventListener('click', this._boundToggleWindow);
  }
  toggleTypeConsumer(hide) {
    if (hide) {
      this._typeConsumer.classList.add('hidden');
    } else {
      this._typeConsumer.classList.remove('hidden');
    }
  }
  handleConsumerChange = e => {
    {
      console.log('consumer change !');
      e.preventDefault();
      const filterInput = e.target;
      // console.log;
      if (
        filterInput.options[filterInput.selectedIndex].value == 'Consommateur'
      )
        this.toggleTypeConsumer.bind(this)(false);
      else {
        this.toggleTypeConsumer.bind(this)(true);
      }
    }
  };
  async addHandlerUpload(handler) {
    const closeBtn = this._btnClose;
    this._role.addEventListener('change', this.handleConsumerChange);
    this._form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const form = this;
      const dataArr = [...new FormData(form)];
      const data = Object.fromEntries(dataArr);
      closeBtn.click();
      await handler(data);
    });
  }

  togglePasswordVisibility = () => {
    const passwordType =
      this._password.type === 'password' ? 'text' : 'password';
    const confirmPasswordType =
      this._confirmPassword.type === 'password' ? 'text' : 'password';

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
    // console.log(document.querySelector(CloserClassName));
    this._btnClose.addEventListener('click', this._boundToggleWindow);
    this._overlay.addEventListener('click', this._boundToggleWindow);
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _generateMarkup() {}
}

export default new AddUserView();
