import View from './view.js';
class SideView extends View {
  utilisateurs = document.querySelector('.utilisateurs');
  addHandlerUtilisateurs(fn) {
    this.utilisateurs.addEventListener('click', e => {
      e.preventDefault();
      fn();
    });
  }
}
export default new SideView();
