import View from './view.js';

class EditStructureView extends View {
  _window = document.querySelector('.edit-structure-container');
  _overlay = document.querySelector('.overlayEditStr');
  _btnOpen = document.querySelectorAll('.details-btn-structures');
  _parentElement = document.querySelector('.edit-structure-cart');
  _form = document.querySelector('.edit-structure-inputs');
  _btnClose = this._parentElement.querySelector('.close-btn');
  currTarget;
  currStructure;

  constructor() {
    super();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    const btnOpenArray = Array.from(
      document.querySelectorAll('.details-btn-structures')
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
    this._btnClose.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
    });
  }

  addHandlerEdit(controller) {
    const btnOpenArray = Array.from(
      document.querySelectorAll('.details-btn-structures')
    );
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', controller);
    });
    this._form.addEventListener('submit', e => {});
  }

  changeInputs(inputValuesObj) {
    this.currStructure = inputValuesObj;
    // Get the form element
    const formElement = document.querySelector('.edit-structure-inputs');
    // Create a new FormData object from the form
    const formData = new FormData(formElement);
    // console.log('🚀 ~ EditStructureView ~ changeInputs ~ formData:', formData);
    formElement.querySelector('#name-structure-edit').value =
      inputValuesObj.designation;
    const options = formElement.querySelector('#search-structure-edit').options;
    for (let i = 0; i < options.length; i++) {
      console.log(options[i].innerText, inputValuesObj.responsible);
      if (options[i].innerText === inputValuesObj.responsible) {
        options[i].selected = true;
        return;
      }
    }
  }

  addHandlerUpdate(controller) {
    const formElement = document.querySelector('.edit-structure-inputs');

    this._form.addEventListener('submit', e => {
      e.preventDefault();
      const newStructure = {
        designation: formElement.querySelector('#name-structure-edit').value,
      };
      this._btnClose.click();
      controller(this.currStructure, newStructure);
    });
  }
}

export default new EditStructureView();
