import { UsersView } from '../usersView.js';

class BonReceptionView extends UsersView {
  _btnOpen = document.querySelectorAll('.view-btr-btn');
  _window = document.querySelector('.big-container-bdr');
  _overlay = document.querySelector('.overlayBDR');
  _btnClose = document.getElementById('bdr-close');
  _parentElement = document.querySelector('.results-bdrs');
  _trueParentElement = document.querySelector('.show-bdr-cart');

  constructor() {
    super();
  }
  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    const btnsOpen = Array.from(document.querySelectorAll('.view-btr-btn'));
    btnsOpen.forEach(btn =>
      btn.addEventListener('click', e => {
        e.preventDefault();
        this.toggleWindow();
      })
    );
  }

  addHandlerShow(controller) {
    const btnsOpen = Array.from(document.querySelectorAll('.view-btr-btn'));
    btnsOpen.forEach(btn => btn.addEventListener('click', controller));
  }
  _addHandlerHideWindow() {
    document.getElementById('bdr-close').addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
    });
    this._overlay.addEventListener('click', e => {
      e.preventDefault();
      this.toggleWindow();
    });
  }

  f() {
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _generateMarkup() {
    console.log(this._data);
    if (this._data.length === 0) return `<div><p>No data yet</p></div>`;
    return this._data
      .map(result => this._generateMarkupPreview(result, this._perms))
      .join('');
  }

  _generateMarkupPreview(result) {
    const date = new Date(result.date_reception);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

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
        <td>${day}/${month}/${year}</td>
        <td class="td-view-bdl">
          <a class="view-bdl-btn" href="../../backend/${result.link_livraison}">
            <p>Voir Bon de livraison</p>
          </a>
        </td>
        <td class="td-view-fac">
          <a class="view-fac-btn" href="../../backend/${result.link_facture}">
            <p>Voir Facture</p>
          </a>
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
