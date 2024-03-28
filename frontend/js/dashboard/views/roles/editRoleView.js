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
    sideView.addHandlerBtns(_, 3);
    // this.currTarget = e.target;
  };
}
export default new EditRoleView();
