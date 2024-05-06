import { CmdsIntHeaderView } from '../commandesInt/cmdsIntHeaderView.js';
export class InvHeaderView extends CmdsIntHeaderView {
  constructor() {
    super();
  }
  _parentElement = document.querySelector('.load-inv-container');
  _generateMarkup(perms = []) {
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
      perms.includes('show inventaire')
        ? `<th class="view-bdc">Détails</th>`
        : ``
    }
    <!-- btns pour directeur -->

    ${
      perms.includes('valid inventaire')
        ? `<th class="verif-Magasinier">Valider</th>`
        : ``
    }
    
    <th class="print-bdci">Imprimer</th>
  </tr>`;
  }
}
export default new InvHeaderView();
