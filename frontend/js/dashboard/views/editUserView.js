import { state } from '../model.js';
import View from './view.js';
import { AddUserView } from './addUserView.js';
import poppupView from './poppupView.js';

class EditUserView extends AddUserView {
  // setter() {
  _window = document.querySelector('.edit-user-container');
  _overlay = document.querySelector('.overlayEdit');
  _btnOpen;
  _btnClose;
  _parentElement = document.querySelector('.edit-user-cart');
  // }

  constructor() {
    super();
    // this.adderOfShowAndHideHandlers();
  }

  addHandlerShowWindow(OpClassName, windowClassName) {
    this._window = document.querySelector(windowClassName);
    this._btnOpen = document.querySelectorAll(OpClassName);
    const btnOpenArray = Array.from(this._btnOpen);
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', this.toggleWindow.bind(this));
    });
  }

  // addHandlerUpload(handler) {
  //   // console.log(this._parentElement);
  //   this._parentElement.addEventListener('submit', function (e) {
  //     e.preventDefault();
  //     // this = document.querySelector('.inputs');
  //     console.log(this);
  //     const dataArr = [...new FormData(this.querySelector('.inputs'))];
  //     // dataArr.forEach(([key, value]) => {
  //     //   console.log(`Key: ${key}, Value: ${value}`);
  //     // });
  //     // this=== this._parentElement (the upload form)
  //     // console.log(dataArr);
  //     const data = Object.fromEntries(dataArr);
  //     console.log(data);
  //     handler(data);
  //   });
  // }

  _generateMarkup() {}
}

export default new EditUserView();
