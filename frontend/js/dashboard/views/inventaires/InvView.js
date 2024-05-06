import { CmdsIntView } from '../commandesInt/cmdsIntView.js';
import * as helpers from '../../helpers.js';
export class InvView extends CmdsIntView {
  constructor() {
    super();
  }
  _parentElement = document.querySelector('.results-inv');
  _trueParentElement = document.querySelector('.table-top-inv');
  _searchBox = document.querySelector('.searchbar-text-inv');
  _generateMarkupPreview(result, perms = []) {
    return `
  <tr>
    <td>
      <div class="checkbox-colomn">
        <input type="checkbox" id="checkbox-table" />
        <p class="colomn-tags-name">${result.num_inventaire}</p>
      </div>
    </td>
    <td>${helpers.formatDate(result.date_inventaire)}</td>
    <td>
      <p class="status-inv ${
        result.etat == 'valid' ? 'valide-status' : 'novalide-status'
      }">${result.etat}</p>
    </td>

    <!-- btns pour info pour Magasinier -->
    ${
      perms.includes('show inventaire')
        ? `<td class="td-view-inv">
    <button class="details-inv-btn">
      <span class="material-icons-sharp info-icon">
        info
      </span>
    </button>
  </td>`
        : ``
    }
    
    <!-- btns verif+print pour Directeur -->
    ${
      perms.includes('valid inventaire')
        ? `<td class="td-verif-inv">
        <button class="verif-inv">
          <span class="material-icons-sharp verif-icon">
            check_circle
          </span>
        </button>
      </td>`
        : ``
    }
    <td class="td-print-inv">
      <button class="details-btn print-inv-btn">
        <span class="material-icons-sharp info-icon">
          print
        </span>
      </button>
    </td>
  </tr>`;
  }
}
export default new InvView();
