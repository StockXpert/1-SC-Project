import { ValidateCmdsIntView } from '../commandesInt/validateCmdsIntView.js';

class ValidateInvView extends ValidateCmdsIntView {
  _window = document.querySelector('.big-container-inv-verif');
  _overlay = document.querySelector('.overlayValidateInv');
  _header = document.querySelector('.header-inv-verif');
  _save = document.querySelector('.btn-save-verif-bdci-qt');
  _form = document.querySelector('.inv-cart-verif');
  // TODO: _btnOpen = document.querySelectorAll('.info-btn-inv');
  _btnOpen = document.querySelectorAll('.verif-inv');
  _role;
  _btnClose = document.querySelector('.btn-cancel-inv-verif');
  _parentElement = document.querySelector('.results-produits-inv-verif');
  // TODO: _btnLivrerBdci = document.querySelector('.btn-deliver-bdci');
  // _checkboxes;

  constructor(nerfed = false) {
    super(true);
    if (!nerfed) {
      this.addHandlerHideWindow(
        '.btn-cancel-inv-verif',
        '.big-container-inv-verif'
      );
    }
  }
  //use (call upon render)
  resetPointers(controller) {
    this.addHandlerShowWindow('.verif-inv', '.big-container-inv-verif');
    this.addHandlerEdit(controller);
  }

  //use addHandlerValidate(ctrl)
}
export default new ValidateInvView();
