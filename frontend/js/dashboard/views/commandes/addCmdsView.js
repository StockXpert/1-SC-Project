import { AddUserView } from '../addUserView.js';

class AddCmdsView extends AddUserView {
  _restricted = [[this._btnOpen, 'bon commande'], 'none'];
}

export default new AddCmdsView();
