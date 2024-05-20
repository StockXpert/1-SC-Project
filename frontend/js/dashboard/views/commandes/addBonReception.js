import { AddUserView } from '../addUserView.js';
import * as helpers from '../../helpers.js';
import { AddCmdsIntView } from '../commandesInt/addCmdsIntView.js';

class AddBonReception extends AddCmdsIntView {
  _btnOpen = document.querySelector('.btn-add-bdr');
  _btnClose = document.querySelector('.cancel-btn-add-bdr');
  _window = document.querySelector('.big-container-bdr-add');
  _message = document.querySelector('.bdr-title');
  _parentElement = document.querySelector('.results-bdr-produits');
  _numericInputs;
  _sauvegarde = document.querySelector('.btn-save-bdr-qt');
  _sauvegardeForm = this._window.querySelector('.add-bdr-cart');
  _overlay = document.querySelector('.overlayAddBDR');
  _trueParentElement = document.querySelector('.add-bdr-cart');
  _inputNumFactureContainer = this._window.querySelector(
    '.heading-table-file-add-1-bdr'
  );
  _next = this._window.querySelector('.btn-next');
  _back = this._window.querySelector('.btn-back');
  _inputFactureContainer = this._window.querySelector(
    '.heading-table-file-add-2-bdr'
  );
  _inputRemainings = [];
  _inputNumFacture =
    this._inputNumFactureContainer.querySelector('.input-num-bdr');
  _inputNumLiv = this._window.querySelector('input[name="num-livraison"]');
  _inputLiv = this._window.querySelector('#bonLivraisonInput');
  _inputFacture = this._inputFactureContainer.querySelector('#factureInput');
  _headflexibles = [
    this._window.querySelector('.container-heading-table-add-bdr'),
    this._window.querySelector('.heading-table-text-add-ref'),
  ];
  _containerflexibles = [
    this._window.querySelector('.table-container-add-bdr'),
    this._window.querySelector('.table-container-ref'),
  ];
  _refrences = [];
  addHandlerHideWindow(CloserClassName, windowClassName) {
    this._window = document.querySelector(windowClassName);
    this._btnClose = document.querySelector(CloserClassName);
    // this._btnClose.addEventListener('click', this._boundToggleWindow);
    // this._overlay.addEventListener('click', this._boundToggleWindow);
  }
  constructor(nerfed = false) {
    super(true);
    if (!nerfed) {
      this.addHandlerShowWindow('.btn-add-bdr', '.big-container-bdr-add');
      //TODO: what happens when you close it.. (any resets? maybe when opening they happen?)
      this.addHandlerHideWindow(
        '.cancel-btn-add-bdr',
        '.big-container-bdr-add'
      );
      [
        this._inputFacture,
        this._inputLiv,
        this._inputNumFacture,
        this._inputNumLiv,
      ].forEach(input => {
        input.addEventListener('input', e => {
          this.allowBlueBtn(
            !this._inputRemainings.includes(NaN) &&
              this._inputFacture.checkValidity() &&
              this._inputNumFacture.checkValidity() &&
              this._inputNumLiv.checkValidity() &&
              this._inputLiv.checkValidity(),
            '.btn-next'
          );
        });
      });
    }
  }
  /*
  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
    });
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
    });
    this._overlay.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
    });
  }

  addControllerWindow() {
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
*/
  _generateMarkup() {
    console.log(this._data);
    if (this._data.length === 0)
      return `<tr><td colspan=${
        document
          .querySelector('.table-container-bdc-produits')
          .querySelector('thead')
          .querySelectorAll('th').length
      }><b>Aucun Produit est trouvé pour ce bon de Commande </b></td></tr>`;
    if (
      this._data.every(result => result.quantite - result.quantite_recu === 0)
    ) {
      this._message.classList.remove('hiddenTrans');
    } else {
      this._btnOpen.classList.remove('hidden');
    }
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }

  _generateMarkupPreview(result) {
    const qtRest = result.quantite - result.quantite_recu;
    return `
      <tr>
        <td>
          <div class="checkbox-colomn-bdr-add">
            <p class="colomn-tags-name-bdr-qt">1</p>
          </div>
        </td>
        <td>${result.designation}</td>

        <td>${result.quantite}</td>
        <td class="red-qt">${qtRest < 0 ? 0 : qtRest}</td>
        <td class="quantity">
          ${
            qtRest > 0
              ? `
              <input class="green-qt" type="number" value="" data-max="${qtRest}" placeholder="qté"/>
                <span class="material-icons-sharp">
                  drive_file_rename_outline
                </span>
              `
              : '<p>Ce produit a été completement livré</p>'
          }
        </td>
      </tr>
    `;
  }
  /*[
    {
        "designation": "Duplicopieur - Monochrome - A3",
        "quantite": 2,
        "quantite_recu": 0,
        "prix_unitaire": 200
    },
    {
        "designation": "Duplicopieur - Monochrome - A4",
        "quantite": 10,
        "quantite_recu": 0,
        "prix_unitaire": 100
    }
    ] */
  //handle displaying/hiding numFacture
  resetPointers() {
    this._window
      .querySelector('.table-container-add-bdr')
      .classList.remove('hidden');
    this._window
      .querySelector('.container-heading-table-add-bdr')
      .classList.remove('hidden');
    this._window.querySelector('.table-container-ref').classList.add('hidden');
    this._window
      .querySelector('.heading-table-text-add-ref')
      .classList.add('hidden');
    this._next.classList.remove('hidden');
    this.allowBlueBtn(false, '.btn-next');
    // this.allowBlueBtn(false, '.btn-back');
    this._back.classList.add('hidden');
    this.allowBlueBtn(false, '.btn-save-bdr-qt');
    this._sauvegarde.classList.add('hidden');
    this._inputRemainings = [];
    this._numericInputs = this._parentElement.querySelectorAll(
      'input[type="number"]'
    );
    this._inputFacture.value = '';
    this._inputNumFacture.value = '';
    this._inputLiv.value = '';
    this._inputNumLiv.value = '';

    this._numericInputs.forEach((input, index) => {
      this._inputRemainings.push(NaN);
      helpers.validateIntegerInput(input, input.dataset.max);
      input.addEventListener('input', e => {
        this._inputRemainings[index] = e.target.value
          ? e.target.value - this._data[index].quantite
          : NaN;
        const allZero = this._inputRemainings.every(value => value === 0);
        this._inputFactureContainer.classList.toggle('hidden', !allZero);
        this._inputNumFactureContainer.classList.toggle('hidden', !allZero);
        this._inputFacture.required = allZero;
        this._inputNumFacture.required = allZero;
        this.allowBlueBtn(
          !this._inputRemainings.includes(NaN) &&
            this._inputFacture.checkValidity() &&
            this._inputNumFacture.checkValidity() &&
            this._inputNumLiv.checkValidity() &&
            this._inputLiv.checkValidity(),
          '.btn-next'
        );
      });
    });
  }

  addHandlerCancel() {
    let confirmFunction = e => {
      this._window
        .querySelector('.table-container-add-bdr')
        .classList.remove('hidden');
      this._window
        .querySelector('.container-heading-table-add-bdr')
        .classList.remove('hidden');
      this._window
        .querySelector('.table-container-ref')
        .classList.add('hidden');
      this._window
        .querySelector('.heading-table-text-add-ref')
        .classList.add('hidden');
      this._next.classList.remove('hidden');
      this.allowBlueBtn(false, '.btn-next');
      // this.allowBlueBtn(false, '.btn-back');
      this._back.classList.add('hidden');
      this.allowBlueBtn(false, '.btn-save-bdr-qt');
      this._sauvegarde.classList.add('hidden');
      this._inputRemainings = [];
      this._numericInputs = this._parentElement.querySelectorAll(
        'input[type="number"]'
      );
      this._numericInputs.forEach(input => {
        input.value = '';
      });
      this._inputFacture.value = '';
      this._inputNumFacture.value = '';
      this._inputLiv.value = '';
      this._inputNumLiv.value = '';
      this._boundToggleWindow(e);
      this._refrences = [];
      this._inputRemainings = [];
    };
    [this._btnClose, this._overlay].forEach(triggerer =>
      triggerer.addEventListener('click', e => {
        e.preventDefault();
        console.log('CANCEL CLICK', triggerer);
        helpers.resetConfirmWindowBtnsEventListenners(
          '.container-confirm-added-products'
        );

        if (
          (this._refrences.some(el => el != null) &&
            this._refrences.length != 0) ||
          (this._inputRemainings.some(el => !isNaN(el)) &&
            this._inputRemainings.length != 0)
        ) {
          helpers.renderConfirmWindow(
            '.container-confirm-added-products',
            confirmFunction,
            () => {},
            `En cliquant sur confirmer, vous allez perdre les références ainsi que les quantités que vous avez ajoutées, êtes-vous sûr ?`,
            e
          );
        } else {
          confirmFunction(e);
        }
      })
    );
  }
  addHandlerBack() {
    let confirmFunction = () => {
      console.log('confirm Function');
      [...this._containerflexibles, ...this._headflexibles].forEach(flexible =>
        flexible.classList.toggle('hidden')
      );
      this.allowBlueBtn(false, '.btn-back');
      this._back.classList.add('hidden');
      this.allowBlueBtn(true, '.btn-next');
      this._next.classList.remove('hidden');
      this.allowBlueBtn(false, '.btn-save-bdr-qt');
      this._sauvegarde.classList.add('hidden');
      console.log(
        [...this._containerflexibles, ...this._headflexibles],
        this._back,
        this._next,
        this._sauvegarde
      );
    };
    this._back.addEventListener('click', e => {
      e.preventDefault();
      // console.log(this._refrences);
      helpers.resetConfirmWindowBtnsEventListenners(
        '.container-confirm-added-products'
      );
      if (this._refrences.some(el => el !== null)) {
        helpers.renderConfirmWindow(
          '.container-confirm-added-products',
          confirmFunction,
          () => {},
          `En cliquant sur confirmer, vous allez perdre les références que vous avez ajoutées, êtes-vous sûr ?`
        );
      } else {
        confirmFunction();
      }
    });
  }
  renderRefTable(dataArray, quantityArray) {
    let html = dataArray
      .map((produit, idx) =>
        `                   <tr>
                              <td>
                                <div class="colomn-product-des">
                                  <p class="colomn-des-name-product">${produit.designation}</p>
                                </div>
                              </td>
                              <td class="reference-produit">
                                <input
                                  class="green-ref"
                                  type="text"
                                  value=""
                                  placeholder="Entrez la Reference ici ..."
                                  autocomplete="off"
                                />
                                <span class="material-icons-sharp">
                                  drive_file_rename_outline
                                </span>
                              </td>
                            </tr>`.repeat(quantityArray[idx])
      )
      .join('');
    this._containerflexibles[1].querySelector(
      '.results-ref-produits'
    ).innerHTML = html;
  }

  addHandlerNext(controllerToRenderNext) {
    this._next.addEventListener('click', e => {
      e.preventDefault();
      console.log([this._containerflexibles, this._headflexibles]);
      [...this._containerflexibles, ...this._headflexibles].forEach(flexible =>
        flexible.classList.toggle('hidden')
      );
      this.renderRefTable(
        this._data.filter(el => el.quantite > el.quantite_recu),
        [...this._numericInputs].map(input => input.value)
      );
      this._refrences = [];
      this.allowBlueBtn(true, '.btn-back');
      this._back.classList.remove('hidden');
      this.allowBlueBtn(false, '.btn-save-bdr-qt');
      this._sauvegarde.classList.remove('hidden');
      this.allowBlueBtn(false, '.btn-next');
      this._next.classList.add('hidden');

      this._containerflexibles[1]
        .querySelectorAll('input[type="text"]')
        .forEach((input, idx) => {
          this._refrences.push(null);
          input.addEventListener('input', e => {
            this._refrences[idx] = e.target.value ? e.target.value : null;
            this.allowBlueBtn(
              !this._refrences.includes(null),
              '.btn-save-bdr-qt'
            );
          });
        });
    });
  }

  addHandlerSave(savingHandler) {
    this._sauvegardeForm.addEventListener('submit', async e => {
      e.preventDefault();
      let productsArray = this._data
        .filter(el => el.quantite > el.quantite_recu)
        .map(el => el.designation);
      let quantities = [...this._numericInputs].map(input => input.value);
      this._data.forEach(product => {
        if ((product.quantite = product.quantite_recu)) {
          productsArray.push(product.designation);
          quantities.push(0);
        }
      });

      // console.log(
      //   helpers.organizeProducts(productsArray, quantities, this._refrences),
      //   this._inputLiv.files[0],
      //   this._inputNumLiv.value,
      //   this._inputFacture.required ? this._inputFacture.files[0] : '',
      //   this._inputNumFacture.required ? this._inputNumFacture.value : ''
      // );
      // this._btnClose.click();
      this.toggleWindow.bind(this)();
      console.log('SUBMIT!');
      await helpers.timeoutRes(5);
      // console.log('finished');
      await savingHandler(
        helpers.organizeProducts(productsArray, quantities, this._refrences),
        this._inputLiv.files[0],
        this._inputNumLiv.value,
        this._inputFacture.required ? this._inputFacture.files[0] : '',
        this._inputNumFacture.required ? this._inputNumFacture.value : ''
      );
    });
  }
  // async handleUpdate(control) {
  //   const bonLivraisonInput = this._window.querySelector(
  //     'input[name="bonLivraison"]'
  //   );
  //   const factureInput = this._window.querySelector('input[name="facture"]');
  //   const numBonLivraison = this._window.querySelector(
  //     'input[name="num-livraison"]'
  //   );
  //   const numFacture = this._window.querySelector('input[name="num-facture"');
  //   const tableRows = this._parentElement.querySelectorAll('tr');
  //   let results = [];
  //   let mustIncludeFacture;
  //   tableRows.forEach(row => {
  //     const elementQuantite = +row.querySelector('td:nth-child(4)').textContent;
  //     // helpers.validateInput(row.querySelector('input[type="number"]'));
  //     row
  //       .querySelector('input[type="number"]')
  //       ?.addEventListener('input', e => {
  //         e.target.value = e.target.value.replace(/^0+/, '');
  //         const enteredValue = parseInt(e.target.value);
  //         if (parseInt(e.target.value) < 1 || isNaN(parseInt(e.target.value))) {
  //           // If entered value is not a number, reset to empty string
  //           e.target.value = '';
  //         } else if (enteredValue < 0 || enteredValue > elementQuantite) {
  //           // If entered value is outside the range, reset to the nearest limit
  //           e.target.value = Math.min(
  //             Math.max(enteredValue, 0),
  //             elementQuantite
  //           );
  //         }
  //         results.push(e.target.value - elementQuantite);
  //       });
  //     row
  //       .querySelector('input[type="number"]')
  //       ?.addEventListener('input', e => {
  //         mustIncludeFacture = results.every(el => el === 0);
  //         if (mustIncludeFacture) {
  //           factureInput.parentElement.classList.remove('hidden');
  //           numFacture.parentElement.classList.remove('hidden');
  //         } else {
  //           factureInput.parentElement.classList.add('hidden');
  //           numFacture.parentElement.classList.add('hidden');
  //         }
  //       });
  //   });

  //   this._sauvgarde.addEventListener('click', async e => {
  //     e.preventDefault();

  //     const dataArray = [];
  //     tableRows.forEach(row => {
  //       const elementQuantite =
  //         +row.querySelector('td:nth-child(3)').textContent;
  //       let inputQuatite;
  //       try {
  //         inputQuatite = +row.querySelector('input[type="number"]').value;
  //       } catch (error) {
  //         helpers.renderError(
  //           'Tout Est livré',
  //           'Il ne reste plus rien à livrer'
  //         );
  //       }
  //       console.log(elementQuantite);
  //       if (!inputQuatite) return;
  //       if (inputQuatite <= elementQuantite) {
  //         const dataObject = {
  //           designation: row.querySelector('td:nth-child(2)').textContent,
  //           quantite: inputQuatite,
  //         };
  //         console.log(dataObject);
  //         dataArray.push(dataObject);
  //       } else throw new Error('Quantité Errorr');
  //     });
  //     if (dataArray.length === 0)
  //       return helpers.renderError(
  //         'Aucune modification',
  //         'Cliquez sur annuler si vous ne voulez pas ajouter un bon de réception'
  //       );
  //     console.log('SAUVEGARDE', numBonLivraison.value, numFacture.value);
  //     if (bonLivraisonInput.files.length === 0 && !numBonLivraison.value)
  //       return helpers.renderError(
  //         'Vous devez ajouter un bon de livraison ',
  //         'Le bon de livraison est obligatoire'
  //       );
  //     if (!mustIncludeFacture) {
  //       console.log(dataArray);
  //       await control(
  //         +numBonLivraison.value,
  //         dataArray,
  //         bonLivraisonInput.files[0]
  //       );
  //     } else {
  //       if (factureInput.files.length === 0 && !numFacture.value)
  //         return helpers.renderError(
  //           'Vous devez ajouter une facture',
  //           'La facture est obligatoire lorsque tous les produit sont livré'
  //         );
  //       console.log(dataArray);
  //       await control(
  //         +numBonLivraison.value,
  //         dataArray,
  //         bonLivraisonInput.files[0],
  //         numFacture.value,
  //         factureInput.files[0]
  //       );
  //     }

  //     this.toggleWindow();
  //   });
  // }
}

export default new AddBonReception();
