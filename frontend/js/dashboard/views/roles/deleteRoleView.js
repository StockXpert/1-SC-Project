import { DeleteUserView } from '../deleteUserView.js';

class DeleteRoleView extends DeleteUserView {
  _window = document.querySelector('.container-supp-user');
  _overlay = document.querySelector('.overlayDel');
  _btnOpen = document.querySelector('.btn-delete-user');
  _btnClose = document.querySelector('.supp-user-annuler');
  _confirm = document.querySelector('.supp-user-confirmer');

  constructor() {
    super();
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
}
export default new DeleteRoleView();
