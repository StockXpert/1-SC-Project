import View from '../../view.js';

class DetailFournisseurView extends View {
  _window = document.querySelector('.view-fournisseur-container');
  _overlay = document.querySelector('.overlayEdit');
  _btnOpen = document.querySelectorAll('.details-btn-fournisseur');
  _parentElement = document.querySelector('.view-fournisseur-cart');
  _form = document.querySelector('.view-fournisseur-inputs');
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
      document.querySelectorAll('.details-btn-fournisseur')
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
      document.querySelectorAll('.details-btn-fournisseur')
    );
    btnOpenArray.forEach(btn => {
      btn.addEventListener('click', controller);
    });
  }

  changeInputs(inputValuesObj) {
    this.currChapter = inputValuesObj;
    // Get the form element
    const formElement = document.querySelector('.view-fournisseur-inputs');
    // Create a new FormData object from the form
    // console.log('🚀 ~ EditStructureView ~ changeInputs ~ formData:', formData);
    formElement.querySelector('.raison-social').value =
      inputValuesObj.raison_sociale;
    formElement.querySelector('.adresse').value = inputValuesObj.adresse;
    formElement.querySelector('.Telephone').value = inputValuesObj.telephone;
    formElement.querySelector('.fax').value = inputValuesObj.fax;
    formElement.querySelector('.nif').value = inputValuesObj.nif;
    formElement.querySelector('.nis').value = inputValuesObj.nis;
    formElement.querySelector('.rib').value = inputValuesObj.rib_ou_rip;
    formElement.querySelector('.numRegistre').value =
      inputValuesObj.num_registre;
  }

  // addHandlerUpdate(controller) {
  //   const formElement = document.querySelector('.edit-chapitre-inputs');

  //   this._form.addEventListener('submit', e => {
  //     e.preventDefault();
  //     const newChapter = {
  //       designation: formElement.querySelector('.raison-social').value,
  //     };
  //     console.log(this.currChapter, newChapter);
  //     controller(this.currChapter, newChapter);
  //     this.toggleWindow();
  //   });
  // }
}

export default new DetailFournisseurView();
