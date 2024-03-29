import View from './view.js';
import * as helpers from '../helpers.js';
class SideView extends View {
  btns = [
    document.querySelector('.utilisateurs'),
    document.querySelector('.structures-btn'),
    document.querySelector('.roles-btn'),
    document.querySelector('.permissions-btn'),
    document.querySelector('.modification-btn'),
    document.querySelector('.statistiques-btn'),
    document.querySelector('.archive-btn'),
    document.querySelector('.articles-btn'),
    document.querySelector('.chapitres-btn'),
    document.querySelector('.produits-btn'),
    document.querySelector('.bon-de-commandes-btn'),
  ];
  divs = [
    document.getElementById('main-table-users'),
    document.getElementById('main-table-structures'),
    document.getElementById('main-table-roles'),
    document.getElementById('main-table-permissions'),
    ,
    ,
    ,
    document.getElementById('main-table-articles'),
    document.getElementById('main-table-chapitres'),
    document.getElementById('main-table-produits'),
    document.getElementById('main-table-bdc'),
  ];

  addHandlerBtns(controllers, index = '') {
    this.btns.forEach(el =>
      el.addEventListener('click', e => {
        e.preventDefault();
        const targeto = e.currentTarget;
        // console.log(targeto.h3);
        this.btns.forEach(btn => {
          btn.classList.remove('active');
        });
        this.divs.forEach(btn => {
          btn.classList.add('hidden');
        });
        this.divs[helpers.findNodeIndex(this.btns, targeto)].classList.remove(
          'hidden'
        );
        targeto.classList.add('active');
        console.log(helpers.findNodeIndex(this.btns, targeto));
        controllers[helpers.findNodeIndex(this.btns, targeto)]();
      })
    );
    if (index !== '') {
      this.divs.forEach(div => {
        div.classList.add('hidden');
      });
      this.divs[index].classList.remove('hidden');
    }
  }
}
export default new SideView();
