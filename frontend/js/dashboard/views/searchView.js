import View from './view.js';
class SearchView extends View {
  #parentEl = document.querySelector('.searchbar');
  #searchInput = document.querySelector('.searchbar-text');

  getQuery() {
    const query = this.#parentEl.querySelector('.searchbar-text').value;
    // this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.searchbar-text').value = '';
  }

  addHandlerSearch(fn) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      fn();
    });
  }
  addHandlerSearchV2(Controller) {
    this.#searchInput.addEventListener('input', () => {
      const searchKeyword = this.getQuery();
      Controller(searchKeyword);
    });
  }
}
export default new SearchView();
