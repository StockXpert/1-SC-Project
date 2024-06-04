import View from '../../view.js';

class EditProductView extends View {
  _window = document.querySelector('.edit-produits-container');
  _overlay = document.querySelector('.overlayEditProducts');
  _btnOpen = document.querySelectorAll('.details-btn-produits');
  _parentElement = document.querySelector('.edit-produits-cart');
  _form = document.querySelector('.edit-produits-inputs');
  _btnClose = this._parentElement.querySelector('.close-btn');
  currTarget;
  currProduit;

  constructor() {
    super();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    const btnOpenArray = Array.from(
      document.querySelectorAll('.details-btn-produits')
    );
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        this.toggleWindow();
        this.currTarget = e.target;
        console.log(this.currTarget);
      });
    });
  }

  addHandlerHideWindow() {
    const btnClose = this._parentElement.querySelector('.close-btn');
    btnClose.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
    });
  }

  addHandlerEdit(controller) {
    const btnOpenArray = Array.from(
      document.querySelectorAll('.details-btn-produits')
    );
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', controller);
    });
  }

  changeInputs(inputValuesObj) {
    this.currProduit = inputValuesObj;
    // Get the form element
    const formElement = document.querySelector('.edit-produits-inputs');
    console.log(inputValuesObj);
    // Create a new FormData object from the form
    // console.log('🚀 ~ EditStructureView ~ changeInputs ~ formData:', formData);
    formElement.querySelector('#Designation').value =
      inputValuesObj.designation;
    formElement.querySelector('#seuil').value = inputValuesObj.seuil;
  }

  addHandlerUpdate(controller) {
    const formElement = document.querySelector('.edit-produits-inputs');

    formElement.addEventListener('submit', e => {
      e.preventDefault();
      const newProduit = {
        designation: formElement.querySelector('#Designation').value,
        seuil: formElement.querySelector('#seuil').value,
      };
      console.log(this.currProduit, newProduit);
      controller(this.currProduit, newProduit);
      // this.toggleWindow();
    });
  }
}

export default new EditProductView();
