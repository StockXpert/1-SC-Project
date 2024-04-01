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
  addHandlerSearchV2(Controller) {
    this.#searchInput.addEventListener('input', () => {
      const searchKeyword = this.getQuery();
      console.log('addHandlerSearchV2(Controller) executed');
      Controller(searchKeyword);
    });
  }

  addHandlerFilter(Controller) {
    const newFilterValues = ['', ''];
    this.#filters.forEach((filterInput, index) => {
      newFilterValues.splice(
        index,
        1,
        filterInput.options[filterInput.selectedIndex].value
      );
      // Controller(
      //   newFilterValues,
      //   newFilterValues.some(el => el !== '')
      // );
      filterInput.addEventListener('change', e => {
        newFilterValues.splice(
          index,
          1,
          filterInput.options[filterInput.selectedIndex].value
        );
        Controller(
          newFilterValues,
          newFilterValues.some(el => el !== '')
        );
      });
    });
  }
}
export default new SearchView();
