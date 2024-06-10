import { AddUserView } from '../addUserView.js';
import { EditUserView } from '../editUserView.js';
import sideView from '../sideView.js';
import * as helpers from '../../helpers.js';

class EditRoleView extends EditUserView {
  _window = document.querySelector('.edit-user-container');
  _overlay = document.querySelector('.overlayEdit');
  _btnOpen;
  _btnClose = document.querySelector('.cancel-permission-btn');
  _parentElement = document.querySelector('.edit-user-cart');
  _form = document.querySelector('.inputs-edit');
  currTarget;
  theNull = () => {};

  constructor() {
    super();
  }

  addEventListenerCallback = e => {
    // console.log(this._btnOpen);
    // console.log(e.target.type === 'checkbox');
    if (e.target.type === 'checkbox') {
      return;
    }
    // e.stopPropagation();
    // console.log(e.target);
    // this.toggleWindow.bind(this)();
    //SWITCH WINDOWS TO PERM (3 on the index (index is set))
    sideView.addHandlerBtns('', 4);
    console.log('callback1');
    // this.currTarget = e.target;
  };

  addHandlerShowWindow(OpClassName, Controller = () => {}) {
    this._btnOpen = document.querySelectorAll(OpClassName);
    const btnOpenArray = Array.from(this._btnOpen);

    btnOpenArray.forEach((btn, index) => {
      btn.addEventListener('click', this.addEventListenerCallback);
    });
  }
  addHandlerHideWindow(CloserClassName, ctrl = '') {
    this._btnClose = document.querySelector(CloserClassName);
    if (ctrl != '') this._btnClose.addEventListener('click', ctrl);
  }
}
export default new EditRoleView();
