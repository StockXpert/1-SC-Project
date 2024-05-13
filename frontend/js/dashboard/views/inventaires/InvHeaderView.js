import { CmdsIntHeaderView } from '../commandesInt/cmdsIntHeaderView.js';
export class InvHeaderView extends CmdsIntHeaderView {
  _perms;
  constructor() {
    super();
  }
  _parentElement = document.querySelector('.load-inv-container');
  _generateMarkup() {
    //this._perms
    return `
  <tr>
    <th>
      <div class="checkbox-colomn-bdci">
        <p class="colomn-tags-inv">N° D'état d'inventaire</p>
      </div>
    </th>
    <th>Date</th>
    <th>Statut</th>
    <!-- btns pour Magasinier -->

    ${
      // ''
      this._perms
        .map(({ designation }) => designation)
        .includes('show inventaire')
        ? `<th class="view-bdc">Détails</th>`
        : ``
    }
    <!-- btns pour directeur -->

    ${
      this._perms
        .map(({ designation }) => designation)
        .includes('valid inventaire')
        ? `<th class="verif-Magasinier">Valider</th>`
        : ``
    }
    
    <th class="print-bdci">Imprimer</th>
  </tr>`;
  }
}
export default new InvHeaderView();
