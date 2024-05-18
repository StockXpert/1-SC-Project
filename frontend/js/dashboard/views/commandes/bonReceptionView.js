import * as helpers from '../../helpers.js';
import { EditCmdsIntView } from '../commandesInt/editCmdsIntView.js';
import View from '../view.js';
// import { EditCmdsView } from './editCmdsView.js';
// import * as model from '../../model.js';

class BonReceptionView extends EditCmdsIntView {
  _btnOpen = document.querySelectorAll('.view-btr-btn');
  _window = document.querySelector('.big-container-bdr');
  _overlay = document.querySelector('.overlayBDR');
  _btnClose = document.querySelector('#bdr-close');
  _parentElement = document.querySelector('.results-bdrs');
  _trueParentElement = document.querySelector('.show-bdr-cart');

  addHandlerShowWindow(OpClassName, windowClassName) {
    this._window = document.querySelector(windowClassName);
    this._btnOpen = document.querySelectorAll(OpClassName);
    this._btnOpen.forEach(btn => {
      btn.addEventListener('click', this._boundToggleWindow);
    });
  }
  constructor() {
    super(true);
  }
  addHandlerShow(controller) {
    this.addHandlerShowWindow('.view-btr-btn', '.big-container-bdr');
    this.addHandlerHideWindow('#bdr-close', '.big-container-bdr');
    this._btnOpen.forEach(btn =>
      btn.addEventListener('click', async e => {
        await controller(e);
      })
    );
  }

  _generateMarkup() {
    if (this._data.length === 0)
      return `<tr><td colspan=${
        document
          .querySelector('.table-container-bdc')
          .querySelector('thead')
          .querySelectorAll('th').length
      }><b>Aucun bon de réception n'a été trouvé !</b></td></tr>`;
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }

  _generateMarkupPreview(result) {
    return `
      <tr>
        <td>
          <div class="checkbox-colomn-bdr-show">
            <input
              class=""
               type="checkbox"
               id="checkbox-table-bdr-show"
            />
            <p class="colomn-tags-name-bdc">${result.num_bon}</p>
          </div>
        </td>
        <td>${helpers.formatDate(result.date_reception)}</td>
        <td class="td-view-bdl">
          <a class="view-bdl-btn" href="../../backend/${
            result.link_livraison
          }" target="_blank">
            <p>Voir Bon de livraison</p>
          </a>
        </td>
        <td class="td-view-fac">
        ${
          result.num_facture
            ? `
            <a class="view-fac-btn" href="../../backend/${result.link_facture}" target="_blank">
              <p>Voir Facture</p>
            </a>`
            : '<p>Pas de facture</p>'
        }
          
        </td>
        <td>
          <a
            target="_blank"
             class="details-btn print-bdr-btn"
             href="../../backend/bonReception/reception${result.num_bon}.pdf"
          >
            <span class="material-icons-sharp info-icon">
               print
            </span>
          </a>
        </td>
      </tr>
    `;
  }
}

export default new BonReceptionView();
