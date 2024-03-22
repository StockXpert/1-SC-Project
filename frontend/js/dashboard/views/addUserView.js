import { state } from '../model.js';
import View from 'View.js';

class AddUserView extends View {
  _window = document.querySelector('.add-user-container');
  _overlay = document.querySelector('#overlay');
  _btnOpen = document.querySelector('.add-users-btn');
  _btnClose = document.querySelector('.close-btn');

  constructor() {
    console.log('made');
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

  _generateMarkup() {}
}

export default new AddRecipeView();
