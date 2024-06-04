import * as helpers from '../../../helpers.js';
import View from '../../view.js';
class AddFournisseurView extends View {
  _window = document.querySelector('.add-fournisseur-container');
  _overlay = document.querySelector('.overlayAddChapter');
  _btnOpen = document.querySelector('.add-fournisseur-btn');
  _btnClose = this._window.querySelector('.close-btn');
  _parentElement = document.querySelector('.add-fournisseur-inputs');

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
    const numbersInput = [
      this._parentElement.querySelector('.Telephone'),
      this._parentElement.querySelector('.fax'),
    ];
    numbersInput.forEach(input =>
      input.addEventListener('input', function (e) {
        const input = e.target;
        let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

        if (value.length > 10) {
          value = value.slice(0, 9); // Limit to 10 digits
        }

        // Format the value
        const formattedValue = value.replace(
          /(\d{3})(\d{2})(\d{2})(\d{2})/,
          '$1-$2-$3-$4'
        );
        input.value = formattedValue;
      })
    );
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // this = document.querySelector('.inputs');
      if (
        !numbersInput.every(input => {
          const regex = /^0\d{2}-\d{2}-\d{2}-\d{2}$/;
          return regex.test(input.value);
        })
      )
        return helpers.renderError(
          'Erreur dans numéro fax ou telephone',
          'ils doient avoir la forme suivante /^0d{2}-d{2}-d{2}-d{2}$/'
        );
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      for (const key in data) {
        if (!data[key])
          return helpers.renderError(
            'data is empty',
            'il faut remplir tous les champs'
          );
      }
      console.log(data);
      handler(data);
    });
  }

  clearForm() {
    this._parentElement.reset();
  }

  _generateMarkup() {}

  _restricted = [['.add-fournisseur-btn', 'add fournisseur'], 'none'];
}

export default new AddFournisseurView();
