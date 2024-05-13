import View from '../../view.js';

class EditFournisseurView extends View {
  _window = document.querySelector('.edit-fournisseur-container');
  _overlay = document.querySelector('.overlayEdit');
  _btnOpen = document.querySelectorAll('.details-btn-fournisseur');
  _parentElement = document.querySelector('.edit-fournisseur-cart');
  _form = document.querySelector('.edit-fournisseur-inputs');
  _btnClose = this._parentElement.querySelector('.close-btn');
  currTarget;
  currChapter;

  constructor() {
    super();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    const btnOpenArray = Array.from(
      document.querySelectorAll('.details-btn-chapitres')
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
      document.querySelectorAll('.details-btn-chapitres')
    );
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', controller);
    });
  }

  changeInputs(inputValuesObj) {
    this.currChapter = inputValuesObj;
    // Get the form element
    const formElement = document.querySelector('.edit-chapitre-inputs');
    // Create a new FormData object from the form
    // console.log('🚀 ~ EditStructureView ~ changeInputs ~ formData:', formData);
    formElement.querySelector('.raison-social').value =
      inputValuesObj.raison_social;
  }

  addHandlerUpdate(controller) {
    const formElement = document.querySelector('.edit-chapitre-inputs');

    this._form.addEventListener('submit', e => {
      e.preventDefault();
      const newChapter = {
        designation: formElement.querySelector('.raison-social').value,
      };
      console.log(this.currChapter, newChapter);
      controller(this.currChapter, newChapter);
      this.toggleWindow();
    });
  }
}

export default new EditFournisseurView();
