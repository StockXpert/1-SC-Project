import View from './view.js';
class SearchView extends View {
  #parentEl = document.querySelector('.searchbar');
  #searchInput = document.querySelector('.searchbar-text');
  #filters = [
    document.querySelector('#filter-role-options'),
    document.querySelector('#filter-status-options'),
  ];
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
  addHandlerSearchV2(Controller, isFilterring = false) {
    this.#searchInput.addEventListener('input', () => {
      const searchKeyword = this.getQuery();
      Controller(searchKeyword, isFilterring);
    });
  }

  addHandlerFilter(Controller) {
    // console.log(this.#filters);
    const newFilterValues = ['', ''];
    this.#filters.forEach((filterInput, index) => {
      filterInput.addEventListener('change', e => {
        newFilterValues.splice(
          index,
          1,
          filterInput.options[filterInput.selectedIndex].value == 'all' ||
            filterInput.options[filterInput.selectedIndex].value == ''
            ? ''
            : filterInput.options[filterInput.selectedIndex].value
        );

        // SINCE THE WAY THE FILTERED SEARCH IS WORKING, DEPENDS ON THE PREVIOUS QUERY'S RESULTS (if set to true), and doesn't otherwise,
        // you gotta first look in the general results first (on the first filter)
        Controller(newFilterValues[0], false);
        Controller(newFilterValues[1], true);
      });
    });
  }
}
export default new SearchView();
