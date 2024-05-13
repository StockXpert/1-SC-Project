import View from '../../view.js';

class EditArticleView extends View {
  _window = document.querySelector('.edit-article-container');
  _overlay = document.querySelector('.overlayEditArticle');
  _btnOpen = document.querySelectorAll('.details-btn-articles');
  _parentElement = document.querySelector('.edit-article-cart');
  _form = document.querySelector('.edit-article-inputs');
  _btnClose = this._parentElement.querySelector('.close-btn');
  currTarget;
  currArticle;

  constructor() {
    super();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    const btnOpenArray = Array.from(
      document.querySelectorAll('.details-btn-articles')
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
      document.querySelectorAll('.details-btn-articles')
    );
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', controller);
    });
  }

  changeInputs(inputValuesObj) {
    this.currChapter = inputValuesObj;
    // Get the form element
    const formElement = document.querySelector('.edit-article-inputs');
    // Create a new FormData object from the form
    // console.log('🚀 ~ EditStructureView ~ changeInputs ~ formData:', formData);
    formElement.querySelector('#name-chapitre').value =
      inputValuesObj.designation;
  }

  addHandlerUpdate(controller) {
    const formElement = document.querySelector('.edit-article-inputs');

    this._form.addEventListener('submit', e => {
      e.preventDefault();
      // const newArticle = {
      //   designation: formElement.querySelector('#numArticle').value,
      // };
      console.log(this.currArticle, newArticle);
      controller(this.currArticle, newArticle);
      this.toggleWindow();
    });
  }
}

export default new EditArticleView();
