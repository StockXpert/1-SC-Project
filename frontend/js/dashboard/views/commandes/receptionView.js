import { AddUserView } from '../addUserView.js';

class ReceptionView extends AddUserView {
  _btnOpen = document.querySelector('.view-btr-btn');
  _window = document.querySelector('.big-container-bdr');
  _overlay = document.querySelector('.overlayBDR');
  _btnClose = document.getElementById('bdr-close');

  constructor() {
    super();
  }
  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    document.querySelector('.view-btr-btn').addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
    });
  }
  _addHandlerHideWindow() {
    document.getElementById('bdr-close').addEventListener('click', e => {
      e.preventDefault();
      console.log(this._window);
      this.toggleWindow();
    });
  }

  f() {
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
}

export default new ReceptionView();
