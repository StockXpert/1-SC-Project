import * as helpers from '../helpers.js';
import * as model from '../model.js';

HTMLInputElement.prototype.changeInputValidity = function (
  validityMessage = 'Invalid Input !',
  isValid = false
) {
  // Get the parent element of the input
  const parent = this.parentElement;
  const validityDiv = parent.querySelector('.validity-message');
  // Check if the message is empty (neutral)
  if (validityMessage.length == 0) {
    validityDiv.classList.add('hidden');
    validityDiv.style.color = '#313131';
    parent.classList.remove('input-product--invalid');
    parent.classList.remove('input-product--valid');
  } else {
    //valid (for some reason)
    if (isValid) {
      validityDiv.classList.remove('hidden');
      validityDiv.innerHTML = validityMessage;
      validityDiv.style.color = '#07b60e';
      parent.classList.remove('input-product--invalid');
      parent.classList.add('input-product--valid');
      //invalid (for some reason)
    } else {
      validityDiv.classList.remove('hidden');
      validityDiv.innerHTML = validityMessage;
      validityDiv.style.color = '#c91111';
      parent.classList.remove('input-product--valid');
      parent.classList.add('input-product--invalid');
    }
  }
};
export default class View {
  enableBtns(btnsArray) {
    btnsArray.forEach(btn => {
      if (btn) {
        btn.disabled = false;
        switch (btn.dataset.type) {
          case 'red':
            btn.classList.remove('disabled-delete-button');
            break;
          case 'blue':
            btn.classList.remove('disabled-save-button');
            break;
          default:
            btn.classList.remove('disabled-button');
            break;
        }
      }
    });
  }
  disableBtns(btnsArray) {
    btnsArray.forEach(btn => {
      if (btn) {
        btn.disabled = true;
        switch (btn.dataset.type) {
          case 'red':
            btn.classList.add('disabled-delete-button');
            break;
          case 'blue':
            btn.classList.add('disabled-save-button');
            break;
          default:
            btn.classList.add('disabled-button');
            break;
        }
      }
    });
  }

  _permissions = model.state.me.permissions.all;
  _restricted;
  _data;
  allowDeleteBtn(allow = true, btnClass) {
    const btn = document.querySelector(btnClass);
    btn.disabled = !allow;
    allow
      ? btn.classList.remove('disabled-delete-button')
      : btn.classList.add('disabled-delete-button');
  }
  allowWhiteBtn(allow = true, btnClass) {
    const btn = document.querySelector(btnClass);
    btn.disabled = !allow;
    allow
      ? btn.classList.remove('disabled-button')
      : btn.classList.add('disabled-button');
  }
  allowBlueBtn(allow = true, btnClass) {
    const btn = document.querySelector(btnClass);
    btn.disabled = !allow;
    allow
      ? btn.classList.remove('disabled-save-button')
      : btn.classList.add('disabled-save-button');
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  _trueClear() {
    this._trueParentElement.innerHTML = '';
  }
  // ["DJEZIRI Oussama", "KAZI Kamil"]
  addToSelection(options, selectClassName, type = 'responsable') {
    console.log(this._window.querySelector(selectClassName), selectClassName);
    helpers.removeChildrenFromSecond(document.querySelector(selectClassName));
    options.forEach((option, index) => {
      const optionElement = document.createElement('option');
      switch (type) {
        case 'responsable':
          optionElement.value = option.email;
          optionElement.textContent = option?.nom
            ? `${option?.nom} ${option.prenom}`
            : `${option?.role}`;
          break;
        case 'structure':
          optionElement.value = option;
          optionElement.textContent = `${index + 1} : ${option}`;
          break;
        case 'role':
          optionElement.value = option;
          optionElement.textContent = `${index + 1} : ${option}`;
          break;
      }
      this._window.querySelector(selectClassName).appendChild(optionElement);
    });
  }

  // addToSelection(options) {
  //   options.forEach(option => {
  //     const optionElement = document.createElement('option');
  //     optionElement.value = option.email;
  //     optionElement.textContent = `${option.nom} ${option.prenom}`;
  //     this._selectionUsers.appendChild(optionElement);
  //   });
  // }

  render(
    data,
    render = true,
    perms = '',
    containerClass = '',
    isSuccessive = false
  ) {
    this._perms = perms;
    //TODO: RenderError()
    // console.log('rendering', this._data);
    // console.log(data);
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return console.log('something went wrong while trying to render this...');
    // this.renderError();

    //this here is pointing towards an instance of the viewclass (or subclasses)
    this._data = data; // updating the _data field that child classes use in their _generateMarkup functions
    const markup = this._generateMarkup(); // to each child class its _generateMarkup
    if (!render) return markup;
    // console.log('rendering', markup);
    if (!isSuccessive) this._clear();
    if (containerClass == '') {
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    } else {
      document.querySelector(containerClass).innerHTML = '';
      document
        .querySelector(containerClass)
        .insertAdjacentHTML('afterbegin', markup);
    }
  }
  renderSpinner = function (message = '', isTrueParent = false) {
    let height = helpers.getVisibleHeight2(this._parentElement);
    const markup = `
      <div class="spinner-parent" ${
        !isTrueParent ? `style="max-height: ${height}px;` : ''
      }">
      <b>${!message ? '' : `<div class="spinner"></div>`} ${message}</b>
      ${message ? '' : `<div class="spinner"></div>`}
      </div>
    `;
    if (isTrueParent) {
      this._trueParentElement.insertAdjacentHTML('afterbegin', markup);
    } else {
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
  };
  unrenderSpinner = function (isTrueParent = false) {
    if (isTrueParent) {
      this._trueParentElement.querySelector('.spinner-parent').remove();
    } else {
      this._parentElement.querySelector('.spinner-parent').remove();
    }
  };
  restrict(perms) {
    this._restricted.forEach(btnNPerm => {
      if (btnNPerm != 'none') {
        if (helpers.includesDesignation(perms, btnNPerm[1])) {
          document
            .querySelectorAll(btnNPerm[0])
            .forEach(element => element.classList.remove('hidden'));
        } else {
          document
            .querySelectorAll(btnNPerm[0])
            .forEach(element => element.classList.add('hidden'));
        }
      }
    });
  }
}
