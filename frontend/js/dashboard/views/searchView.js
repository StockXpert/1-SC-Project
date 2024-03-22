class SearchView {
  #parentEl = document.querySelector('.searchbar');

  getQuery() {
    const query = this.#parentEl.querySelector('.searchbar-text').value;
    this.#clearInput();
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
}
export default new SearchView();
