import { AddUserView } from '../addUserView.js';

class AddRoleView extends AddUserView {
  _window = document.querySelector('.add-user-container');
  _overlay = document.querySelector('.overlayAdd');
  _btnOpen = document.querySelector('.add-users-btn');
  _btnClose;
  _parentElement = document.querySelector('.add-user-container');
  _form = document.querySelector('.add-user-inputs');
  _inputsContainer = document.querySelector('.groupe-2-add');
}
export default new AddRoleView();
