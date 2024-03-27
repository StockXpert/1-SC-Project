// import icons from '../../../img/icons.svg';

export default class View {
  _data;
  _clear() {
    this._parentElement.innerHTML = '';
  }
  _trueClear() {
    this._trueParentElement.innerHTML = '';
  }

  render(data, render = true) {
    //TODO: RenderError()
    // console.log(data);
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return console.log('something went wrong while trying to render this...');
    // this.renderError();

    //this here is pointing towards an instance of the viewclass (or subclasses)
    this._data = data; // updating the _data field that child classes use in their _generateMarkup functions
    const markup = this._generateMarkup(); // to each child class its _generateMarkup
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSpinner = function (message) {
    const markup = `
    <div class="spinner-parent">
    <b>${message}</b>
    ${message ? '' : `<div class="spinner"></div>`}
    </div>
  `;
    // this._clear();
    // this._trueClear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}
