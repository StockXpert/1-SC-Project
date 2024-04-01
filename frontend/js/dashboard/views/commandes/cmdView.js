import { UsersView } from '../usersView.js';

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
              <p class="colomn-tags-name">24299</p>
            </div>
          </td>
          <td>Frounisseur1</td>
          <td>21.11</td>
          <td>21/12/2023</td>
          <td><p class="status encour-status">En Cour</p></td>
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
