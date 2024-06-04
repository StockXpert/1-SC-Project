import View from '../../view.js';

class EditFournisseurView extends View {
  _window = document.querySelector('.edit-fournisseur-container');
  _overlay = document.querySelector('.overlayEditFournisseur');
  _btnOpen = document.querySelectorAll('.edit-fournisseur-btn');
  _parentElement = document.querySelector('.edit-fournisseur-cart');
  _form = document.querySelector('.edit-fournisseur-inputs');
  _btnClose = this._parentElement.querySelector('.close-btn');
  currTarget;
  currFournisseur;

  constructor() {
    super();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    const btnOpenArray = Array.from(
      document.querySelectorAll('.edit-fournisseur-btn')
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
      document.querySelectorAll('.edit-fournisseur-btn')
    );
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', controller);
    });
  }

  changeInputs(inputValuesObj) {
    this.currFournisseur = inputValuesObj;
    // Get the form element
    const formElement = document.querySelector('.edit-fournisseur-inputs');
    console.log(inputValuesObj);
    // Create a new FormData object from the form
    // console.log('🚀 ~ EditStructureView ~ changeInputs ~ formData:', formData);
    formElement.querySelector('.raison-social').value =
      inputValuesObj.raison_sociale;
    formElement.querySelector('.adresse').value = inputValuesObj.adresse;
    formElement.querySelector('.Telephone').value = inputValuesObj.telephone;
    formElement.querySelector('.fax').value = inputValuesObj.fax;
    formElement.querySelector('.nif').value = +inputValuesObj.nif;
    formElement.querySelector('.nis').value = +inputValuesObj.nis;
    formElement.querySelector('.ribRip').value = inputValuesObj.rib_ou_rip;
    formElement.querySelector('.numRegistre').value =
      inputValuesObj.num_registre;
  }

  addHandlerUpdate(controller) {
    const formElement = document.querySelector('.edit-fournisseur-inputs');

    this._form.addEventListener('submit', e => {
      e.preventDefault();
      const newFournisseur = {
        raisonSociale: formElement.querySelector('.raison-social').value,
        nis: formElement.querySelector('.nis').value,
        nif: formElement.querySelector('.nif').value,
        ribRip: formElement.querySelector('.ribRip').value,
        numRegistre: formElement.querySelector('.numRegistre').value,
        fax: formElement.querySelector('.fax').value,
        telephone: formElement.querySelector('.Telephone').value,
        adresse: formElement.querySelector('.adresse').value,
      };
      console.log(this.currFournisseur, newFournisseur);
      controller(this.currFournisseur, newFournisseur);
      // this.toggleWindow();
    });
  }
}

export default new EditFournisseurView();
