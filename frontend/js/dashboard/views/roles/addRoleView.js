import { AddUserView } from '../addUserView.js';

class AddRoleView extends AddUserView {
  _window = document.querySelector('.add-role-container');
  _overlay = document.querySelector('.overlayAddRole');
  _btnOpen = document.querySelector('.add-btn-role');
  _btnClose;
  _parentElement = document.querySelector('.add-user-container');
  _form = document.querySelector('.add-role-inputs');
  // _inputsContainer = document.querySelector('.groupe-2-add');
}
export default new AddRoleView();
