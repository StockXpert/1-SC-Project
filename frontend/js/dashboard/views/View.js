export default class View {
  _data;
  _clear() {
    this._parentElement.innerHTML = '';
  }

  render(data, render = true) {
    //TODO: RenderError()
    // console.log(data);
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return console.log('something went wrong while trying to render this...');
    // this.renderError();

    this._data = data; // updating the _data field that child classes use in their _generateMarkup functions
    const markup = this._generateMarkup(); // to each child class its _generateMarkup
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
