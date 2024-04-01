import { AddUserView } from '../addUserView.js';

class AddCmdsView extends AddUserView {
  _window = document.querySelector('.big-container');
  _btnOpen = document.querySelector('.add-bdc-btn');
  _overlay = document.querySelector('.overlayAddCmd');
  _restricted = [[this._btnOpen, 'bon commande'], 'none'];
  constructor() {
    super();
    this.addHandlerShowWindow('.add-bdc-btn', '.big-container');
    // this.addHandlerHideWindow('.add-dbc-btn','.big-container');
  }
}

export default new AddCmdsView();
