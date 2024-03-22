import { state } from '../model.js';
import View from './view.js';

class AddUserView extends View {
  _window = document.querySelector('.add-user-container');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.add-users-btn');
  _btnClose = document.querySelector('.close-btn');
  _parentElement = document.querySelector('.add-user-cart');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    // console.log(this._parentElement);
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // console.log(this);
      const dataArr = [...new FormData(this)];
      // this=== this._parentElement (the upload form)
      const data = Object.fromEntries(dataArr);
      console.log(data);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddUserView();
