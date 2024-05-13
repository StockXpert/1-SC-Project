import View from '../view.js';

class StatsView extends View {
  renderGraphSpin(title, size) {
    let html;
    let parentElement;
    switch (size) {
      case 'g1':
        html = `
          <div class="grid-1">
            <div class="top-statistiques-cart">
              <p class="cart-description-statistiques">${title}</p>
            </div>
            <div class="graph-statistiques">
              <canvas></canvas>
            </div>
          </div>`;
        parentElement = '.container-mini-carts';
        break;
      case 'g2':
        html = `
          <div class="grid-2">
            <p class="cart-description-statistiques">${title}</p>
            <div class="graph-statistiques">
              <canvas></canvas>
            </div>
          </div>`;
        parentElement = '.grid-statistiques';
        break;
      case 'mini':
        html = `
          <div class="mini-carts">
            <div class="cart">
              <div class="cart-title">
                <p class="cart-description">${title}</p>
                <ion-icon name="arrow-up-outline" class="statistiques-icons md hydrated" role="img"></ion-icon>
              </div>
              <div class="cart-info">
                <p class="cart-number">140</p>
                <canvas></canvas>
              </div>
            </div>
          </div>`;
        parentElement = '.grid-statistiques';
        break;
    }
    document
      .querySelector(parentElement)
      .insertAdjacentHTML('afterbegin', html);
  }
}
export default new StatsView();
