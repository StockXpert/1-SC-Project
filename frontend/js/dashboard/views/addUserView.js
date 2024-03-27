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
  constructor() {
    super();
  }
  //THIS ===> the addUserView object
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

  addHandlerUpload(handler) {
    const userBtn = document.querySelector('.utilisateurs-btn');
    const closeBtn = document.querySelector('.close-btn-edit');
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      const form = this;
      const dataArr = [...new FormData(form)];
      const data = Object.fromEntries(dataArr);
      console.log(document.querySelector('.utilisateurs-btn'));
      handler(data);
      // console.log(closeBtn);
      // userBtn.click();
      closeBtn.click();
    });
  }

  _generateMarkup() {}
}

export default new AddUserView();
