import View from '../view.js';
import * as helpers from '../../helpers.js';
class StatsView extends View {
  async renderGraphSpin(
    title,
    size,
    promise,
    dataName,
    old = true,
    style = 'bar'
  ) {
    let html;
    let parentElement;
    //
    switch (size) {
      case 'g1':
        html = `
          <div class="grid-1">
            <div class="top-statistiques-cart">
              <p class="cart-description-statistiques">${title}</p>
            </div>
            <div
            class="graph-statistiques spinner-parent ${title.replace(
              /\s/g,
              ''
            )}"
            style="height: 100%; width: 100%; position: static"
          >
            <div class="spinner"></div>
          </div>
          </div>`;
        parentElement = '.grid-statistiques';
        break;
      case 'g2':
        html = `
          <div class="grid-2" ">
          <p class="cart-description-statistiques">${title}</p>
          <div
          class="graph-statistiques spinner-parent ${title.replace(/\s/g, '')}"
          style="height: 100%; width: 100%; position: static" 
        >
          <div class="spinner"></div>
          </div>
          </div>`;
        parentElement = '.grid-statistiques';
        break;
      case 'mini':
        html = `
          <div class="mini-carts ">
            <div class="cart">
              <div class="cart-title">
                <p class="cart-description">${title}</p>
                <ion-icon name="arrow-up-outline" class="statistiques-icons md hydrated" role="img"></ion-icon>
              </div>
              <div class="cart-info">
                <p class="cart-number ${title.replace(/\s/g, '')}">140</p>
  
              </div>
            </div>
          </div>`;
        parentElement = '.container-mini-carts';
        break;
    }
    document.querySelector(parentElement).insertAdjacentHTML('beforeend', html); // Changed to append at the bottom
    const results = await promise;
    document
      .querySelector(parentElement)
      .querySelector(
        `.${title.replace(/\s/g, '')}`
      ).innerHTML = `<canvas id="${title.replace(/\s/g, '')}"></canvas>`;
    if (style == 'bar')
      if (old) {
        helpers.createChartOld(
          document
            .querySelector(parentElement)
            .querySelector(`.${title.replace(/\s/g, '')}`)
            .querySelector(`#${title.replace(/\s/g, '')}`),
          results.response,
          dataName
        );
      } else
        helpers.createChart(
          document
            .querySelector(parentElement)
            .querySelector(`.${title.replace(/\s/g, '')}`)
            .querySelector(`#${title.replace(/\s/g, '')}`),
          results.response,
          dataName
        );
    else if (style == 'pie') {
      helpers.createPieChart(
        document
          .querySelector(parentElement)
          .querySelector(`.${title.replace(/\s/g, '')}`)
          .querySelector(`#${title.replace(/\s/g, '')}`),
        results.response,
        dataName
      );
    }
    document
      .querySelector(parentElement)
      .querySelectorAll('.grid-2')
      .forEach(elem => (elem.style.height = 'auto'));
  }

  _clearParentElement(sizeType) {
    let parentElement;
    switch (sizeType) {
      case 'g1':
        parentElement = '.grid-statistiques';
        break;
      case 'g2':
        parentElement = '.grid-statistiques';
        break;
      case 'mini':
        parentElement = '.container-mini-carts';
        break;
    }
    document.querySelector(parentElement).innerHTML = '';
  }
}
export default new StatsView();
