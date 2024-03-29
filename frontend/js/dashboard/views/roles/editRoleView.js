import { AddUserView } from '../addUserView.js';
import { EditUserView } from '../editUserView.js';
import sideView from '../sideView.js';

class EditRoleView extends EditUserView {
  _window = document.querySelector('.edit-user-container');
  _overlay = document.querySelector('.overlayEdit');
  _btnOpen;
  _btnClose;
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

  addHandlerShowWindow(OpClassName, windowClassName) {
    // this._window = document.querySelector(windowClassName);
    this._btnOpen = document.querySelectorAll(OpClassName);
    const btnOpenArray = Array.from(this._btnOpen);
    btnOpenArray.forEach((btn, index) => {
      btn.addEventListener('click', this.addEventListenerCallback);
    });
  }
}
export default new EditRoleView();
