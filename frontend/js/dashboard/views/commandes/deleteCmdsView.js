import { DeleteUserView } from '../deleteUserView.js';
export class DeleteCmdsView extends DeleteUserView {
  _window = document.querySelector('.container-supp-bdc');
  _overlay = document.querySelector('.overlayDelBdc');
  _btnOpen = document.querySelector('.btn-delete-bdc');
  _btnClose = document.querySelector('.supp-bdc-annuler');
  _confirm = document.querySelector('.supp-bdc-confirmer');

  constructor(nerfed = false) {
    super(true);
    if (!nerfed) {
      this._btnClose.addEventListener('click', e => {
        e.preventDefault();
        this.toggleWindow.bind(this)();
      });
      this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }
  }

  addDeleteController(controller) {
    const closeBtn = this._btnClose;
    this._confirm.addEventListener('click', async function (e) {
      e.preventDefault();
      closeBtn.click();
      await controller();
    });
  }

  // restrict(perms = []) {
  //   if (perms.all.includes('delete user')) {
  //     this._btnOpen.classList.remove('hidden');
  //   } else {
  //     this._btnOpen.classList.add('hidden');
  //   }
  _restricted = [['.btn-delete-bdc', 'delete commande'], 'none'];
}
export default new DeleteCmdsView();
