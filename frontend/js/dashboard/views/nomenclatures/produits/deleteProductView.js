import View from '../../view.js';

class DeleteProductView extends View {
  _window = document.querySelector('.container-supp-produits');
  _overlay = document.querySelector('.overlayDelProducts');
  _btnOpen = document.querySelector('.btn-delete-produits');
  _parentElement = document.querySelector('.supp-produits-cart');
  _annuler = document.querySelector('.supp-produits-annuler');
  _confirm = document.querySelector('.supp-produits-confirmer');

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
  _restricted = [['.btn-delete-produits', 'delete product'], 'none'];
}

export default new DeleteProductView();
