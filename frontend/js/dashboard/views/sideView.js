import View from './view.js';
class SideView extends View {
  btns = [
    document.querySelector('.utilisateurs'),
    document.querySelector('.structures-btn'),
    document.querySelector('.roles-btn'),
    document.querySelector('.permissions-btn'),
    document.querySelector('.modification-btn'),
    document.querySelector('.statistiques-btn'),
    document.querySelector('.archive-btn'),
  ];

  addHandlerBtns(controller) {
    this.btns.forEach(el =>
      el.addEventListener('click', e => {
        e.preventDefault();
        const targeto = e.currentTarget;
        console.log();
        // console.log(targeto.h3);
        this.btns.forEach(btn => {
          btn.classList.remove('active');
        });
        targeto.classList.add('active');
        if (targeto.classList.contains('utilisateurs')) controller();
      })
    );
  }
}
export default new SideView();
