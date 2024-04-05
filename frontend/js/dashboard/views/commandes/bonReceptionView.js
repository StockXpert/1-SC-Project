import { UsersView } from '../usersView.js';

class BonReceptionView extends UsersView {
  _btnOpen = document.querySelectorAll('.view-btr-btn');
  _window = document.querySelector('.big-container-bdr');
  _overlay = document.querySelector('.overlayBDR');
  _btnClose = document.getElementById('bdr-close');
  _parentElement = document.querySelector('.results-bdrs');

  constructor() {
    super();
  }
  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    const btnsOpen = Array.from(document.querySelectorAll('.view-btr-btn'));
    btnsOpen.forEach(btn =>
      btn.addEventListener('click', e => {
        e.preventDefault();
        this.toggleWindow();
      })
    );
  }

  addHandlerShow(controller) {
    const btnsOpen = Array.from(document.querySelectorAll('.view-btr-btn'));
    btnsOpen.forEach(btn => btn.addEventListener('click', controller));
  }
  _addHandlerHideWindow() {
    document.getElementById('bdr-close').addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
    });
  }

  f() {
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
}

export default new BonReceptionView();
