import View from './view.js';
import { AddUserView } from './addUserView.js';
export class DeleteUserView extends AddUserView {
  _window = document.querySelector('.container-supp-user');
  _overlay = document.querySelector('.overlayDel');
  _btnOpen = document.querySelector('.btn-delete-user');
  _btnClose = document.querySelector('.supp-user-annuler');
  _confirm = document.querySelector('.supp-user-confirmer');

  constructor() {
    super();
    // this._confirm = document.querySelector('.supp-user-confirmer');
    // console.log(this._confirm);
    console.log(document.querySelector('.supp-user-annuler'));
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addDeleteController(ctrler) {
    const closeBtn = this._btnClose;
    console.log(this._confirm);
    this._confirm.addEventListener('click', async function (e) {
      // e.preventDefault();
      console.log(e.target);
      console.log('CONFIRM !');
      closeBtn.click();
      await ctrler();
      // this.toggleWindow();
    });
  }
}
export default new DeleteUserView();
