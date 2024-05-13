import View from '../../View.js';

class DeleteChapterView extends View {
  _window = document.querySelector('.container-supp-chapter');
  _overlay = document.querySelector('.overlayDelChapter');
  _btnOpen = document.querySelector('.btn-delete-chapitres');
  _parentElement = this._window.querySelector('.supp-user-cart');
  _annuler = document.querySelector('.supp-chapter-annuler');
  _confirm = document.querySelector('.supp-chapter-confirmer');

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
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addDeleteController(ctrler) {
    const closeBtn = this._annuler;
    const confirmBtn = this._confirm;
    confirmBtn.addEventListener('click', e => {
      e.preventDefault();
      console.log('CONF');
      closeBtn.click();
      ctrler();
    });
  }
  _restricted = [['.btn-delete-chapitres', 'delete chapter'], 'none'];
}

export default new DeleteChapterView();
