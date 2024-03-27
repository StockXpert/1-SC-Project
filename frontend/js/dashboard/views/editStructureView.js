import addStructureView from './addStructureView.js';
import View from './view.js';

class EditStructureView extends View {
  _window = document.querySelector('.edit-structure-container');
  _overlay = document.querySelector('.overlayEdit');
  _btnOpen;
  _parentElement = document.querySelector('.edit-structure-cart');
  _form = document.querySelector('.edit-structure-inputs');
  _btnClose = this._parentElement.querySelector('.close-btn');
  currTarget;

  constructor() {
    super();
  }

  addHandlerShowWindow(OpClassName, windowClassName) {
    const addEventListenerCallback = e => {
      this.toggleWindow.bind(this)();
      this.currTarget = e.target;
    };
    this._window = document.querySelector(windowClassName);
    this._btnOpen = document.querySelectorAll(OpClassName);
    const btnOpenArray = Array.from(this._btnOpen);
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', addEventListenerCallback);
    });
  }

  addHandlerEdit(controller) {
    this._btnOpen = document.querySelectorAll('.details-btn-structures');
    const btnOpenArray = Array.from(this._btnOpen);
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', controller);
    });
  }

  changeInputs(NewInputValuesObj) {
    // Get the form element
    const formElement = this._form;
    // Create a new FormData object from the form
    const formData = new FormData(formElement);
    console.log(formData);
    for (const key in NewInputValuesObj) {
      if (NewInputValuesObj.hasOwnProperty(key)) {
        const input = formElement.elements[key];
        if (input) {
          input.value = NewInputValuesObj[key];
        }
      }
    }
  }
}

export default new EditStructureView();
