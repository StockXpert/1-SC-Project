import { state } from '../model.js';
import View from './view.js';

export class AddUserView extends View {
  _window = document.querySelector('.add-user-container');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.add-users-btn');
  _btnClose = document.getElementsByClassName('close-btn')[0];
  _parentElement = document.querySelector('.add-user-cart');

  constructor(bool = true) {
    super();
    if (bool) this.handlersOfShowAndHideAdder();
  }

  handlersOfShowAndHideAdder() {
    console.log('added to :');
    console.log(this);
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    console.log(
      `${
        this._overlay.classList.contains('hidden') ? 'hid' : 'revealed'
      } the overlay`
    );
    // this._window = document.querySelector('.add-user-container');
    console.log(
      `about to toggle with the ${this._window.className.split(' ')[0]} window `
    );
    this._window.classList.toggle('hidden');
    console.log(
      `${this._window.classList.contains('hidden') ? 'hid' : 'revealed'} the ${
        this._window.className.split(' ')[0]
      } window`
    );
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    // this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler, classOfForm) {
    // console.log(this._parentElement);
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // this = document.querySelector('.inputs');
      console.log(this);
      const dataArr = [...new FormData(this.querySelector(classOfForm))];
      // dataArr.forEach(([key, value]) => {
      //   console.log(`Key: ${key}, Value: ${value}`);
      // });
      // this=== this._parentElement (the upload form)
      // console.log(dataArr);
      const data = Object.fromEntries(dataArr);
      console.log(data);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddUserView();
