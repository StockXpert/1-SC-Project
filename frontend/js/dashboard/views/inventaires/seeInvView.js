import ValidateInvView from './validateInvView.js';

export class SeeInvView extends ValidateInvView {
  _InvNum;
  _windowRaison;
  _btnsOpenRaison;
  _btnCloseRaison;
  _window = document.querySelector('.big-container-inv-verif');
  _overlay = document.querySelector('.overlayValidateInv');
  _title = document.querySelector('.inv-title-verif');
  _header = document.querySelector('.header-inv-verif');
  _save = document.querySelector('.btn-save-verif-bdci-qt');
  _form = document.querySelector('.inv-cart-verif');
  _btnOpen = document.querySelectorAll('.verif-inv');
  _role;
  _btnClose = document.querySelector('.btn-cancel-inv-verif');
  _parentElement = document.querySelector('.results-produits-inv-verif');
  _raisonContainer = document.querySelector('#justify-verif');
}
export default new SeeInvView();
