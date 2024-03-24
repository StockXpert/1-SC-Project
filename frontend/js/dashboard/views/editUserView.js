import { state } from '../model.js';
import View from './view.js';
import { AddUserView } from './addUserView.js';

export class EditUserView extends AddUserView {
  setter() {
    this._window = document.querySelector('.edit-user-container');
    this._overlay = document.querySelector('.overlay');
    this._btnOpen = document.querySelectorAll('.details-btn');
    this._btnClose = document.querySelector('.close-btn-edit');
    this._parentElement = document.querySelector('.edit-user-cart');
  }

  constructor() {
    super(false);
    this.setter();
    this.handlersOfShowAndHideAdder();
  }

  _addHandlerShowWindow() {
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
