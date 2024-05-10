import { DeleteCmdsView } from '../commandes/deleteCmdsView.js';
export class DeleteCmdsIntView extends DeleteCmdsView {
  constructor(nerfed = false) {
    super(true);
    if (!nerfed) {
      this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
      this._btnClose.addEventListener('click', e => {
        e.preventDefault();
        this.toggleWindow.bind(this)();
      });
      this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    // permissions = [
    //   { designation: 'show user' },
    //   { designation: 'change password auth' },
    //   { designation: 'show products' },
    //   { designation: 'update quantite' },
    //   { designation: 'show commandes' },
    //   { designation: 'show commande products' },
    //   { designation: 'show bon reception products' },
    //   { designation: 'update reception' },
    //   { designation: 'delete reception' },
    //   { designation: 'show bon reception' },
    //   { designation: 'demande fourniture' },
    //   { designation: 'approuve fourniture by magasinier' },
    //   { designation: 'livrer' },
    //   { designation: 'update approuve by magasinier' },
    //   { designation: 'show all demandes' },
    //   { designation: 'show demande' },
    //   { designation: 'read notif' },
    //   { designation: 'read all notif' },
    //   { designation: 'show new demandes' },
    //   { designation: 'create inventaire' },
    //   { designation: 'show inventaires' },
    //   { designation: 'show inventaire' },
    //   { designation: 'delete inventaire' },
    //   { designation: 'update inventaire' },
    //   { designation: 'upload bon de reception' },
    //   { designation: 'upload bon de commande' },
    //   { designation: 'upload bon decharge' },
    //   { designation: 'upload sortie' },
    // ];
  }
  _window = document.querySelector('.container-supp-bdci');
  _overlay = document.querySelector('.overlayDelBdci');
  _btnOpen = document.querySelector('.btn-delete-bdci');
  _btnClose = document.querySelector('.supp-bdci-annuler');
  _confirm = document.querySelector('.supp-bdci-confirmer');

  _restricted = [['.btn-delete-bdc', 'delete commande interne'], 'none'];
}
export default new DeleteCmdsIntView();
