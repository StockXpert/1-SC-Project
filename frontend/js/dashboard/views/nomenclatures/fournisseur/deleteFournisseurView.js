import View from '../../view.js';

class DeleteFournisseurView extends View {
  _window = document.querySelector('.container-supp-fournisseur');
  _overlay = document.querySelector('.overlayDelFournisseur');
  _btnOpen = document.querySelector('.btn-delete-fournisseur');
  _parentElement = document.querySelector('.supp-fournisseur-cart');
  _annuler = document.querySelector('.supp-fournisseur-annuler');
  _confirm = document.querySelector('.supp-fournisseur-confirmer');

  constructor() {
    super();
    this.addHandlerHideWindow();
    this.addHandlerShowWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerHideWindow() {
    this._annuler.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addDeleteController(ctrler) {
    const closeBtn = this._annuler;
    const confirmBtn = this._confirm;
    confirmBtn.addEventListener('click', e => {
      e.preventDefault();
      console.log('CONF');
      this.toggleWindow();
      ctrler();
    });
  }
  _restricted = [['.btn-delete-fournisseur', 'delete fournisseur'], 'none'];
}

export default new DeleteFournisseurView();
