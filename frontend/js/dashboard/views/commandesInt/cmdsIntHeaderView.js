import { CmdsIntView } from './cmdsIntView.js';
export class CmdsIntHeaderView extends CmdsIntView {
  constructor() {
    super();
  }
  _parentElement = document.querySelector('.load-bdci-container');
  _generateMarkup() {
    return `
        <tr>
          <th>
            <div class="checkbox-colomn-bdci">
              <p class="colomn-tags-bdci">N°Commande</p>
            </div>
          </th>
          <!-- btns pour all sauf consommateur -->
          ${this._data.includes('Consommateur') ? '' : '<th>Email</th>'}
          <th>Date</th>
          <th>Statut</th>

          <!-- btns pour consommateur -->
          ${
            this._data.includes('Consommateur')
              ? '<th class="view-bdc">Détails</th>'
              : ''
          }
          <!-- btns pour Responsable direct -->
          ${
            this._data.includes('Responsable directe')
              ? '<th class="verif-RD">Vérifier</th>'
              : ''
          }
          <!-- btns pour Directeur -->
          ${
            this._data.includes('Directeur')
              ? '<th class="verif-Directeur">Vérifier</th>'
              : ''
          }
          <!-- btns pour Magasinier -->
          ${
            this._data.includes('Magasinier')
              ? `
              <th class="verif-Magasinier">Vérifier</th> 
              <th class="print-bdci">Imprimer</th>`
              : ''
          }
        </tr>`;
  }
}
export default new CmdsIntHeaderView();
