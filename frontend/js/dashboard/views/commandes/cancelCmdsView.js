import { DeleteUserView } from '../deleteUserView.js';
export class CancelCmdsView extends DeleteUserView {
  _window = document.querySelector('.container-cancel-bdc');
  _overlay = document.querySelector('.overlayCancelBdc');
  _btnOpen = document.querySelector('.btn-cancel-bdc');
  _btnClose = document.querySelector('.cancel-bdc-annuler');
  _confirm = document.querySelector('.cancel-bdc-confirmer');

  constructor() {
    super();
    this._btnClose.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow.bind(this)();
    });
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addCancelController(ctrler) {
    const closeBtn = this._btnClose;
    this._confirm.addEventListener('click', async function (e) {
      e.preventDefault();
      closeBtn.click();
      await ctrler();
    });
  }

  // restrict(perms = []) {
  //   if (perms.all.includes('delete user')) {
  //     this._btnOpen.classList.remove('hidden');
  //   } else {
  //     this._btnOpen.classList.add('hidden');
  //   }
  //TODO:
  _restricted = [[this._btnOpen, 'delete user'], 'none'];
}
export default new CancelCmdsView();
