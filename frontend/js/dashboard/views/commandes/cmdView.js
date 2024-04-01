import { UsersView } from '../usersView.js';
import * as helpers from '../../helpers.js';

class CmdsView extends UsersView {
  _parentElement = document
    .querySelector('#main-table-bdc')
    .querySelector('.results');
  _generateMarkupPreview(result, perms = []) {
    return `
        <tr>
          <td>
            <div class="checkbox-colomn">
              <input type="checkbox" id="checkbox-table" />
              <p class="colomn-tags-name">${result.num_commande}</p>
            </div>
          </td>
          <td>${result.fournisseur}</td>
          <td>${result.objet}</td>
          <td>${helpers.formatDate(result.date_commande)}</td>
          <td><p class="status ${
            result.etat == 'en cours'
              ? 'encour-status'
              : result.etat == 'termine'
              ? 'finish-status'
              : 'canceled-status'
          }">${result.etat}</p></td>
          <td class="td-view-bdc">
            <button class="view-btc-btn">
              <p>Voir Bon de commande</p>
            </button>
          </td>
          <td class="td-view-bdr hidden">
            <button class="view-btr-btn">
              <p>Voir Bons de Receptions</p>
            </button>
          </td>
        </tr>
      `;
  }
  _restricted = [, 'none'];
}
export default new CmdsView();
