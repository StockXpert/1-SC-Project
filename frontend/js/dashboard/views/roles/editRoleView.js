import { AddUserView } from '../addUserView.js';
import { EditUserView } from '../editUserView.js';
import sideView from '../sideView.js';

class EditRoleView extends EditUserView {
  _window = document.querySelector('.edit-user-container');
  _overlay = document.querySelector('.overlayEdit');
  _btnOpen;
  _btnClose = document.querySelector('.cancel-permission-btn');
  _parentElement = document.querySelector('.edit-user-cart');
  _form = document.querySelector('.inputs-edit');
  currTarget;

  constructor() {
    super();
  }

  addEventListenerCallback = e => {
    // this.toggleWindow.bind(this)();
    //SWITCH WINDOWS TO PERM (3 on the index)
    sideView.addHandlerBtns('', 3);
    // this.currTarget = e.target;
  };
  addEventListenerCallback2 = e => {
    sideView.addHandlerBtns('', 2);
  };

  addHandlerShowWindow(OpClassName) {
    this._btnOpen = document.querySelectorAll(OpClassName);
    const btnOpenArray = Array.from(this._btnOpen);
    btnOpenArray.forEach((btn, index) => {
      btn.addEventListener('click', this.addEventListenerCallback);
    });
  }
  addHandlerHideWindow(CloserClassName, ctrl = '') {
    this._btnClose = document.querySelector(CloserClassName);
    // console.log(document.querySelector(CloserClassName));
    this._btnClose.addEventListener('click', this.addEventListenerCallback2);
    ctrl();
  }
}
export default new EditRoleView();
