import View from '../../view.js';

class AddProductsView extends View {
  _window = document.querySelector('.add-produits-container');
  _overlay = document.querySelector('.overlayAddProducts');
  _btnOpen = document.querySelector('.add-produits-btn');
  _btnClose = this._window.querySelector('.close-btn');
  _parentElement = document.querySelector('.add-produits-inputs');

  constructor() {
    super();
    this._addHandlerHideWindow();
    this._addHandlerShowWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    // console.log(this._parentElement);
    const formElement = document.querySelector('.add-produits-inputs');
    const checkbox = document.querySelector('#consommable');
    const valueDisplay = document.getElementById('value-display');
    checkbox.addEventListener('change', () => {
      const value = checkbox.checked;
      valueDisplay.textContent = `${value ? ' ' : 'Non'} consommable`;
    });
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // this = document.querySelector('.inputs');
      const newProduct = {
        designation: formElement.querySelector('#Designation').value,
        article: formElement.querySelector('#Article').value,
        seuil: formElement.querySelector('#Seuil').value,
        consommable: checkbox.checked,
      };
      console.log(newProduct);
      handler(newProduct);
      console.log(this);
    });
  }

  clearForm() {
    this._parentElement.reset();
  }
  // addToSelection(options) {
  //   options.forEach(option => {
  //     const optionElement = document.createElement('option');
  //     optionElement.value = option.email;
  //     optionElement.textContent = `${option.nom} ${option.prenom}`;
  //     this._selectionUsers.appendChild(optionElement);
  //   });
  // }

  _generateMarkup() {}

  _restricted = [['.add-produits-btn', 'add chapter'], 'none'];
}

export default new AddProductsView();
