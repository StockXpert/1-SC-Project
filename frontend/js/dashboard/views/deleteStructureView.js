import View from './view.js';

class DeleteStructureView extends View {
  _window = document.querySelector('.container-supp-structure');
  _overlay = document.querySelector('.overlayDelStr');
  _btnOpen = document.getElementById('supp-btn-structure');
  _parentElement = document.querySelector('.supp-user-cart');
  _annuler = document.querySelector('.supp-str-annuler');
  _confirm = document.querySelector('.supp-str-confirmer');

  constructor() {
    super();
    this.addHandlerHideWindow();
    this.addHandlerShowWindow();
  }

  toggleWindow(e) {
    e.preventDefault();
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerHideWindow() {
    this._annuler.addEventListener('click', this.toggleWindow.bind(this));
  }

  addDeleteController(ctrler) {
    const closeBtn = this._annuler;
    const confirmBtn = this._confirm;
    confirmBtn.addEventListener('click', e => {
      e.preventDefault();
      closeBtn.click();
      ctrler();
    });
  }
  _restricted = [['#supp-btn-structure', 'delete structure'], 'none'];
}

export default new DeleteStructureView();
