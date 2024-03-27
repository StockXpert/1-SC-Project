import addStructureView from './addStructureView.js';
import View from './view.js';

class EditStructureView extends View {
  _window = document.querySelector('.edit-structure-container');
  _overlay = document.querySelector('.overlayEdit');
  _btnOpen = document
    .querySelector('.table-structures')
    .querySelectorAll('.details-btn-structures');
  _parentElement = document.querySelector('.edit-structure-cart');
  _form = document.querySelector('.edit-structure-inputs');
  _btnClose = this._parentElement.querySelector('.close-btn');
  currTarget;

  constructor() {
    super();
    this.addHandlerShowWindow();
  }

  addHandlerShowWindow() {
    // const addEventListenerCallback = e => {
    //   this.toggleWindow.bind(this)();
    //   console.log(e.target);
    //   this.currTarget = e.target;
    // };
    console.log(this._window);

    const btnOpenArray = Array.from(this._btnOpen);
    console.log(
      '🚀 ~ EditStructureView ~ addHandlerShowWindow ~ btnOpenArray:',
      btnOpenArray
    );
    btnOpenArray.forEach(btn => {
      console.log(btn);
      btn.addEventListener('click', e => {
        e.preventDefault();
        console.log(this);
        console.log(e);
      });
      // btn.addEventListener('click', e => {
      //   e.preventDefault();
      //   console.log(e.target);
      // });
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
