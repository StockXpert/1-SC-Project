import { DeleteUserView } from '../deleteUserView.js';

class DeleteRoleView extends DeleteUserView {
  _window = document.querySelector('.container-supp-role');
  _overlay = document.querySelector('.overlayDel');
  _btnOpen = document.querySelector('#supp-btn-role');
  _btnClose = document.querySelector('.supp-role-annuler');
  _confirm = document.querySelector('.supp-role-confirmer');

  constructor() {
    super();
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addDeleteController(ctrler) {
    const closeBtn = this._btnClose;
    this._confirm.addEventListener('click', async function (e) {
      e.preventDefault();
      closeBtn.click();
      await ctrler();
    });
  }

  toggleWindow(e) {
    e.preventDefault();
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
}
export default new DeleteRoleView();
