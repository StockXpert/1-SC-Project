import { AddUserView } from '../addUserView.js';
import * as helpers from '../../helpers.js';

class AddBonReception extends AddUserView {
  _btnOpen = document.querySelector('.btn-add-bdr');
  _btnClose = document.querySelector('.cancel-btn-add-bdr');
  _window = document.querySelector('.big-container-bdr-add');
  _parentElement = document.querySelector('.results-bdr-produits');
  _sauvgarde = document.querySelector('.btn-save-bdr-qt');
  _overlay = document.querySelector('.overlayAddBDR');
  _trueParentElement = document.querySelector('.add-bdr-cart');

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
      console.log('suppp');
    });
    this._overlay.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
      console.log('suppp');
    });
  }

  addControllerWindow() {
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

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
      helpers.renderError('Tout Est livré', 'Il rest plus a livré');
      this._sauvgarde.classList.toggle('hidden');
    }
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }

  _generateMarkupPreview(result) {
    const qtRest = result.quantite - result.quantite_recu;
    console.log(qtRest);
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
              <input class="green-qt" type="number" value="0"/>
                <span class="material-icons-sharp">
                  drive_file_rename_outline
                </span>
              `
              : '<p>Ce produit est livré</p>'
          }
        </td>
      </tr>
    `;
  }

  async handleUpdate(control) {
    const numberInputs = this._parentElement.querySelectorAll(
      'input[type="number"]'
    );

    const bonLivraisonInput = this._window.querySelector(
      'input[name="bonLivraison"]'
    );
    const factureInput = this._window.querySelector('input[name="facture"]');
    const numBonLivraison = this._window.querySelector(
      'input[name="num-livraison"]'
    );
    const numFacture = this._window.querySelector('input[name="num-facture"');
    const tableRows = this._parentElement.querySelectorAll('tr');
    console.log('handleUpdate');
    const results = new Array(tableRows.length).fill(1);
    let mustIncludeFacture;
    tableRows.forEach((row, i) => {
      const elementQuantite = +row.querySelector('td:nth-child(4)').textContent;
      row
        .querySelector('input[type="number"]')
        ?.addEventListener('input', e => {
          const enteredValue = parseInt(e.target.value);
          if (isNaN(enteredValue)) {
            // If entered value is not a number, reset to empty string
            e.target.value = '';
          } else if (enteredValue < 0 || enteredValue > elementQuantite) {
            // If entered value is outside the range, reset to the nearest limit
            e.target.value = Math.min(
              Math.max(enteredValue, 0),
              elementQuantite
            );
          }

          results[i] = e.target.value - elementQuantite;
          mustIncludeFacture = results.every(el => el === 0);
          if (mustIncludeFacture) {
            factureInput.parentElement.classList.remove('hidden');
            numFacture.parentElement.classList.remove('hidden');
          } else if (!factureInput.parentElement.classList.contains('hidden')) {
            factureInput.parentElement.classList.add('hidden');
            numFacture.parentElement.classList.add('hidden');
          }
        });
    });

    this._sauvgarde.addEventListener('click', async e => {
      e.preventDefault();

      const dataArray = [];
      tableRows.forEach(row => {
        const elementQuantite =
          +row.querySelector('td:nth-child(3)').textContent;
        let inputQuatite;
        try {
          inputQuatite = +row.querySelector('input[type="number"]').value;
        } catch (error) {
          helpers.renderError('Tout Est livré', 'Il rest plus a livré');
        }
        console.log(elementQuantite);
        if (!inputQuatite) return;
        if (inputQuatite <= elementQuantite) {
          const dataObject = {
            designation: row.querySelector('td:nth-child(2)').textContent,
            quantite: inputQuatite,
          };
          console.log(dataObject);
          dataArray.push(dataObject);
        } else throw new Error('Quantité Errorr');
      });
      if (dataArray.length === 0)
        return helpers.renderError(
          'Aucune modification',
          'Click sur anuler si vous ne voulez pas ajouter un bon de réception'
        );
      console.log('SAUVGARDE', numBonLivraison.value, numFacture.value);
      if (bonLivraisonInput.files.length === 0 && !numBonLivraison.value)
        return helpers.renderError(
          'Tu doit ajouté un bon de livraison ',
          'Le bon de livraison est obligatoire'
        );
      if (!mustIncludeFacture) {
        console.log(dataArray);
        await control(
          +numBonLivraison.value,
          dataArray,
          bonLivraisonInput.files[0]
        );
      } else {
        if (factureInput.files.length === 0 && !numFacture.value)
          return helpers.renderError(
            'Tu doit ajouté une facture',
            'La facture est obligatoire lorsque tous les produit sont livré'
          );
        console.log(dataArray);
        await control(
          +numBonLivraison.value,
          dataArray,
          bonLivraisonInput.files[0],
          numFacture.value,
          factureInput.files[0]
        );
      }

      this.toggleWindow();
    });
  }
}

export default new AddBonReception();
