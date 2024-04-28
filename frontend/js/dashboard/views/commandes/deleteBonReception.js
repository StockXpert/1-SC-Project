import View from '../View.js';
class DeleteBonReception extends View {
  _btnOpen = document.querySelector('.btn-delete-bdr');
  _window = document.querySelector('.container-supp-bdr');
  _annuler = document.querySelector('.supp-bdr-annuler');
  _confirm = document.querySelector('.supp-bdr-confirmer');

  constructor() {
    super();
    this.addHandlerHideWindow();
    this.addHandlerShowWindow();
  }

  toggleWindow(e) {
    e.preventDefault();
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
      console.log('CONF');
      ctrler();
      closeBtn.click();
    });
  }
}

export default new DeleteBonReception();
