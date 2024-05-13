import View from '../../view.js';

class EditChapterView extends View {
  _window = document.querySelector('.edit-chapitre-container');
  _overlay = document.querySelector('.overlayEdit');
  _btnOpen = document.querySelectorAll('.details-btn-chapitres');
  _parentElement = document.querySelector('.edit-chapitre-cart');
  _form = document.querySelector('.edit-chapitre-inputs');
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
    formElement.querySelector('#name-chapitre').value =
      inputValuesObj.designation;
  }

  addHandlerUpdate(controller) {
    const formElement = document.querySelector('.edit-chapitre-inputs');

    this._form.addEventListener('submit', e => {
      e.preventDefault();
      const newChapter = {
        designation: formElement.querySelector('#name-chapitre').value,
      };
      console.log(this.currChapter, newChapter);
      controller(this.currChapter, newChapter);
      this.toggleWindow();
    });
  }
}

export default new EditChapterView();
