import { AddUserView } from '../addUserView.js';
import * as helpers from '../../helpers.js';

export class AddCmdsView extends AddUserView {
  _raison;
  _window = document.querySelector('.big-container');
  _parentElement = this._window.querySelector('.results-bdc-produits');

  _trueParentElement = this._window.querySelector('.inputs-add-product-bdc');
  _save = this._window.querySelector('.btn-save-bdc');
  _btnOpen = document.querySelector('.add-bdc-btn');
  _overlay = document.querySelector('.overlayAddCmd');
  _btnClose = this._window.querySelector('.btn-add-bdr-qt');
  // _btnsOpenAddProduct = this._window.querySelector('.btn-add-product');
  _btnCloseAddProduct;
  _windowAddProduct;
  _restricted = [[this._btnOpen, 'bon commande'], 'none'];
  _four = document.querySelector('#filter-fournisseur');
  _article = document.querySelector('#filter-article');
  _product = document.querySelector('#bdc-product');
  _productEdit = document.querySelector('#bdc-product-edit');
  _resultsContainer = document.querySelector('.four-search-results-container');
  _resultsContainerArticle = document.querySelector(
    '.article-search-results-container'
  );
  _resultsContainerProduct = document.querySelector(
    '.product-search-results-container'
  );
  _resultsContainerProductEdit = document.querySelector(
    '.product-search-results-container-edit'
  );
  _fourResults;
  _articleResults;
  _productResults;
  _type = document.querySelector('#type-options');
  _addingProductForm = this._window.querySelector('.container-select-bdc');
  _ajouterProduitbtn = document.querySelector('.btn-add-product');
  _ajouterProduitWindow = document.querySelector('.add-product-bdc-container');
  _addProductForm = document.querySelector('.inputs-add-product-bdc');
  _editProductForm = document.querySelector('.inputs-edit-product-bdc');
  _btnDeleteProducts = document.querySelector('.btn-delete-produits-bdc');
  // _btnModifyProducts = document.querySelector('.btn-edit-produits-bdc');
  _checkboxesAddProduct;
  _btnsOpenEditProduct;
  _btnCloseEditProduct;
  // toggleDivVisibility(inputClass, divClass) {
  // const input = document.querySelector(inputClass);
  // const div = document.querySelector(divClass);
  // // input.addEventListener('focus', () => {
  // //   div.classList.remove('hidden');
  // // });
  // // Add event listener for blur event on input
  // input.addEventListener('blur', e => {
  //   // Check if the blur event originated from a click on the div
  //   if (!div.contains(e.target)) {
  //     div.classList.add('hidden'); // Add the 'hidden' class to hide the div
  //     console.log(div.contains(e.target));
  //   }
  // });
  // // Add event listener for click event on the div
  // div.addEventListener('click', () => {
  //   input.focus(); // Focus the input when the div is clicked
  // });
  // document.addEventListener('click', function (event) {
  //   const isClickedInside = div.contains(event.target);
  //   if (!isClickedInside) {
  //     console.log('clicked outside');
  //     div.classList.add('hidden');
  //   }
  // });
  // }

  allowSavingBDC(allow = true, btnClass = '.btn-delete-produits-bdc') {
    const btn = document.querySelector(btnClass);
    btn.disabled = !allow;
    allow
      ? btn.classList.remove('disabled-save-button')
      : btn.classList.add('disabled-save-button');
  }
  //TODO: FORM INSTEAD OF SAVE
  addHandlerSavingBDC(handler, state) {
    this._save.addEventListener('click', e => {
      e.preventDefault();
      this._btnClose.click();
      handler();
    });
  }

  // toggleDivVisibility(inputClass, divClass) {
  //   const input = document.querySelector(inputClass);
  //   const div = document.querySelector(divClass);
  //   document.addEventListener('click', function (event) {
  //     console.log();
  //     const isClickedInside =
  //       div.contains(event.target) || input.contains(event.target);

  //     if (!isClickedInside) {
  //       div.classList.add('hidden');
  //     } else {
  //       div.classList.remove('hidden');
  //     }
  //   });
  // }
  toggleDivVisibility(inputClass, divClass) {
    const input = document.querySelector(inputClass);
    const div = document.querySelector(divClass);

    // // Add event listener for focus event on input
    // input.addEventListener('focus', () => {
    //   div.classList.remove('hidden'); // Remove the 'hidden' class to reveal the div
    // });

    // // Add event listener for blur event on input
    // input.addEventListener('blur', () => {
    //   // Delay to ensure the active element is updated after click on the div
    //   setTimeout(() => {
    //     if (!div.contains(document.activeElement)) {
    //       div.classList.add('hidden'); // Add the 'hidden' class to hide the div
    //     }
    //   }, 10000);
    // });

    // // Add event listener for click event on the div
    // div.addEventListener('click', () => {
    //   input.focus(); // Focus the input when the div is clicked
    // });
  }
  constructor(nerfed = false) {
    super();
    //INITIALZR
    if (!nerfed) {
      this.addHandlerShowWindow('.add-bdc-btn', '.big-container');
      this.addHandlerHideWindow('#add-bdc-close', '.big-container');
      // #F00
      this.addHandlerHideAddProductWindow(
        '.cancel-btn-add-bdc',
        '.add-product-bdc-container'
      );
      // this.addHandlerShowAddProductWindow(
      //   '.btn-add-product',
      //   '.add-product-bdc-container'
      // );
      this._windowAddProduct = this._window.querySelector(
        '.add-product-bdc-container'
      );
      this.addHandlerHideEditProductWindow(
        '.cancel-btn-edit-bdc',
        '.edit-product-bdc-container'
      );
      this.addHandlerShowEditProductWindow(
        '.details-btn-bdc-add',
        '.edit-product-bdc-container'
      );
    }
  }
  //unused yet
  resultVisibilityTogglers() {
    this.toggleDivVisibility('#bdc-product', '.add-product-search-results');
    this.toggleDivVisibility(
      '#bdc-product-edit',
      '.edit-product-search-results'
    );
    this.toggleDivVisibility('#filter-fournisseur', '.four-search-results');
    this.toggleDivVisibility('#filter-article', '.article-search-results');
  }
  addHandlerHideAddProductWindow(
    CloserClassName,
    windowClassName,
    needsvalidity = true
  ) {
    this._windowAddProduct = this._window.querySelector(windowClassName);
    this._btnCloseAddProduct =
      this._windowAddProduct.querySelector(CloserClassName);
    this._product.parentElement.classList.remove('input-product--valid');
    this._btnCloseAddProduct.addEventListener('click', e =>
      this._boundToggleAddProductWindow(e, needsvalidity)
    );
  }
  addHandlerShowAddProductWindow(
    OpClassName,
    windowClassName,
    needsvalidity = true
  ) {
    this._windowAddProduct = this._window.querySelector(windowClassName);
    this._btnsOpenAddProduct = this._window.querySelectorAll(OpClassName);
    this._btnsOpenAddProduct.forEach(btn =>
      btn.addEventListener('click', e =>
        this._boundToggleAddProductWindow(e, needsvalidity)
      )
    );
  }
  toggleAddProductWindow() {
    this._windowAddProduct.classList.toggle('hidden');
  }
  clearAddProductForm() {
    const inputs = this._addProductForm.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  _boundToggleAddProductWindow = (e, validity) => {
    e.preventDefault();
    this.clearAddProductForm();
    if (validity) this._product.changeInputValidity('');
    this.toggleAddProductWindow.bind(this)();
  };
  addHandlerFournisseurSearch(fournisseurSearchHandler, fournisseursObj) {
    // this._four.addEventListener('input', e => {
    //   fournisseurSearchHandler(e.target.value);
    // });
    this._four.addEventListener('input', e => {
      let fourDesignations = fournisseursObj.all;
      const currentDesignations = fourDesignations.map(
        entry => entry.raison_sociale
      );
      this._resultsContainer.classList.remove('hidden');

      if (currentDesignations.includes(e.target.value)) {
        this._four.changeInputValidity('Ce Fournisseur Existe !', true);
      } else {
        this._four.changeInputValidity('');
      } //                                     TODO:
      fournisseurSearchHandler(e.target.value /*, 'add-bdc-add'*/);
    });
  }
  addToSuggestionsFournisseursAndEL(results = [], controlSelectFournisseur) {
    this._resultsContainer.innerHTML = '';

    const mappedResults = results.map(
      (result, index) => `<li>${result.raison_sociale}</li>`
      // {
      // if (index === results.length - 1) {
      //   return `<li>Sélectionner "<i>${result.raison_sociale}</i>" comme fournisseur personnalisé</li>`;
      // } else {
      //   return `<li>${result.raison_sociale}</li>`;
      // }
      // }
    );
    const markup = mappedResults.join('');
    this._resultsContainer.insertAdjacentHTML('afterbegin', markup);
    this._fourResults = document
      .querySelector('.four-search-results-container')
      .querySelectorAll('li');
    this._fourResults.forEach(el =>
      el.addEventListener('click', e => {
        this._four.setCustomValidity('');
        controlSelectFournisseur(
          results[helpers.findNodeIndex(this._fourResults, e.currentTarget)]
            .raison_sociale
        );
        this._four.value =
          results[
            helpers.findNodeIndex(this._fourResults, e.currentTarget)
          ].raison_sociale;
        this._resultsContainer.innerHTML = '';
      })
    );
  }
  addHandlerArticleSearch(articleSearchHandler, articleObj) {
    // this._article.addEventListener('input', e => {
    //   articleSearchHandler(e.target.value);
    // });
    this._article.addEventListener('input', e => {
      let articleDesignations = articleObj.all;
      const currentDesignations = articleDesignations.map(
        entry => entry.designation
      );
      this._resultsContainerArticle.classList.remove('hidden');

      if (currentDesignations.includes(e.target.value)) {
        this._article.changeInputValidity('Cet article Existe !', true);
      } else {
        this._article.changeInputValidity('');
      } //                                     TODO:
      articleSearchHandler(e.target.value /*, 'add-bdc-add'*/);
    });
  }
  addResultsToSuggestionsAndEL(
    results = [],
    windowClass,
    resultsDirectContainerClass,
    inputClass,
    onClickofASuggestionSpecialCode = ''
  ) {
    const theContainer = document
      .querySelector(windowClass)
      .querySelector(resultsDirectContainerClass);
    theContainer.innerHTML = '';
    const input = document.querySelector(windowClass).querySelector(inputClass);

    if (results.length == 0 && input.value != '') {
      theContainer.insertAdjacentHTML(
        'afterbegin',
        `<li> Aucun Resulat n'a été trouvé</li>`
      );
      theContainer.querySelector('li').addEventListener('click', e => {
        e.target.parentElement.innerHTML = '';
      });
    } else {
      const markup = results
        .map(
          result =>
            `<li>${
              result.designation ? result.designation : result.raison_sociale
            }</li>`
        )
        .slice(0, 10)
        .join('');

      theContainer.insertAdjacentHTML('afterbegin', markup);
      theContainer.querySelectorAll('li').forEach(el => {
        return el.addEventListener('click', e => {
          input.setCustomValidity('');
          input.value = e.currentTarget.innerHTML;
          const event = new Event('input', {
            bubbles: true,
            cancelable: true,
          });
          input.dispatchEvent(event);
          theContainer.innerHTML = '';
          if (onClickofASuggestionSpecialCode != '')
            onClickofASuggestionSpecialCode(input.value);
        });
      });
    }
  }
  addToSuggestionsArticlesAndEL(results = [], controlSelectArticle) {
    this._resultsContainerArticle.innerHTML = '';
    const markup = results
      .map(result => `<li>${result.designation}</li>`)
      .slice(0, 10)
      .join('');
    this._resultsContainerArticle.insertAdjacentHTML('afterbegin', markup);
    this._articleResults = document
      .querySelector('.article-search-results-container')
      .querySelectorAll('li');
    this._articleResults.forEach(el => {
      this._article.setCustomValidity('');
      return el.addEventListener('click', e => {
        controlSelectArticle(e.currentTarget.innerHTML);
        this._article.value = e.currentTarget.innerHTML;
        this._resultsContainerArticle.innerHTML = '';
      });
    });
  }

  addInputValidation(form, type) {
    form
      .querySelector(`input[name="${type}"]`)
      ?.addEventListener('input', e => helpers.validateInput(e.target, type));
  }

  // addHandlerProductSearch(productSearchController, productDesignations) {
  //   this._product.addEventListener('input', e => {
  //     console.log(productDesignations);
  //     productDesignations = productDesignations.map(entry => entry.designation);
  //     this._resultsContainerProduct.classList.remove('hidden');
  //     // console.log(this._resultsContainerProduct);
  //     console.log(productDesignations);
  //     console.trace('hi');
  //     if (productDesignations.includes(e.target.value)) {
  //       this._product.changeInputValidity('Ce Produit Existe !', true);
  //     } else {
  //       this._product.changeInputValidity('');
  //     }
  //     productSearchController(e.target.value, 'add', this);
  //   });

  //   //ALSO ADD THE EL TO the modifier search
  //   this._productEdit.addEventListener('input', e => {
  //     console.log(productDesignations);
  //     if (productDesignations.includes(e.target.value)) {
  //       this._productEdit.changeInputValidity('Ce Produit Existe !', true);
  //     } else {
  //       this._productEdit.changeInputValidity('');
  //     }
  //     productSearchController(e.target.value, 'edit', this);
  //   });

  //   //also add the EL for numberic value inputs
  //   this.addInputValidation(this._addProductForm, 'quantite');
  //   this.addInputValidation(this._editProductForm, 'quantite');

  //   //also add the EL for numberic price value inputs
  //   this.addInputValidation(this._addProductForm, 'prixUnitaire');
  //   this.addInputValidation(this._editProductForm, 'prixUnitaire');
  // }
  /*
//TODO:
  addHandlerSearch(
    windowClass,
    searchController,
    inputClass,
    parentObject,
    parentObjectTreatment,
    containerClass,
    validMessage,
    formsToBeValidatedAndTypesArr
  ) {
    const windowEl = document.querySelector(windowClass);
    const inputEl = windowEl.querySelector(inputClass);
    const containerEl = windowEl.querySelector(containerClass);
    inputEl.addEventListener('input', e => {
      const elements = parentObjectTreatment(parentObject);
      containerEl.classList.remove('hidden');
      if (elements.includes(e.target.value)) {
        inputEl.changeInputValidity(validMessage, true);
      } else {
        inputEl.changeInputValidity('');
      }
      searchController(e.target.value, 'add-bdc-add');
    });

    formsToBeValidatedAndTypesArr.forEach(e =>
      helpers.addInputValidation(e.form, e.type)
    );
  }
  }*/

  addHandlerProductSearch(productSearchController, productsObj) {
    this._product.addEventListener('input', e => {
      let productDesignations = productsObj.all;
      const currentDesignations = productDesignations.map(
        entry => entry.designation
      );
      this._resultsContainerProduct.classList.remove('hidden');

      if (currentDesignations.includes(e.target.value)) {
        this._product.changeInputValidity('Ce Produit Existe !', true);
      } else {
        this._product.changeInputValidity('');
      }
      productSearchController(e.target.value, 'add', this);
    });

    this._productEdit.addEventListener('input', e => {
      let productDesignations = productsObj.all;
      const currentDesignations = productDesignations.map(
        entry => entry.designation
      );
      this._resultsContainerProduct.classList.remove('hidden');

      if (currentDesignations.includes(e.target.value)) {
        this._productEdit.changeInputValidity('Ce Produit Existe !', true);
      } else {
        this._productEdit.changeInputValidity('');
      }
      productSearchController(e.target.value, 'edit', this);
    });

    // Add input validation
    this.addInputValidation(this._addProductForm, 'quantite');
    this.addInputValidation(this._editProductForm, 'quantite');
    this.addInputValidation(this._addProductForm, 'prixUnitaire');
    this.addInputValidation(this._editProductForm, 'prixUnitaire');
  }
  addToSuggestionsProductsAndEL(results = [], type) {
    let theContainer;
    switch (type) {
      case 'add':
        theContainer = this._resultsContainerProduct;
        break;
      case 'edit':
        theContainer = this._resultsContainerProductEdit;
        break;
    }
    theContainer.innerHTML = '';
    if (
      results.length == 0 &&
      (this._product.value != '' || this._productEdit.value != '')
    ) {
      theContainer.insertAdjacentHTML(
        'afterbegin',
        `<li> Aucun Produit n'a été trouvé</li>`
      );
      theContainer.querySelector('li').addEventListener('click', e => {
        e.target.parentElement.innerHTML = '';
      });
    } else {
      const markup = results
        .map(result => `<li>${result.designation}</li>`)
        .slice(0, 10)
        .join('');

      theContainer.insertAdjacentHTML('afterbegin', markup);
      this._productResults = theContainer.querySelectorAll('li');
      this._productResults.forEach(el => {
        return el.addEventListener('click', e => {
          this._product.setCustomValidity('');
          this._product.value = e.currentTarget.innerHTML;
          this._productEdit.value = e.currentTarget.innerHTML;
          const event = new Event('input', {
            bubbles: true,
            cancelable: true,
          });
          switch (type) {
            case 'add':
              this._product.dispatchEvent(event);
              break;
            case 'edit':
              this._productEdit.dispatchEvent(event);
              break;
          }
          theContainer.innerHTML = '';
        });
      });
    }
  }

  addTypeSelectHandler(selectHandler) {
    this._type.addEventListener('change', e => selectHandler(e.target.value));
  }

  addHandlerAddingProduct(handler, state, handleProducts) {
    this._addingProductForm.addEventListener('submit', e => {
      e.preventDefault();
      const articleDesignations = state.articles.all.map(el => el.designation);
      const fourDesignations = state.fournisseurs.all.map(
        el => el.raison_sociale
      );
      // const typeDesignations = types.all.map(el => el.designation);
      const formElement = this._addingProductForm;
      const formData = new FormData(formElement);
      // Convert FormData object to object with key-value pairs
      const formDataObj = {};
      formData.forEach(function (value, key) {
        formDataObj[key] = value;
      });
      console.log(formDataObj);
      console.log(fourDesignations, articleDesignations);
      /*
      
      {
      "fournisseur": "MACIF FOURNITURE",
      "article": "Frais de réception",
      "type": "fourniture"
      }*/

      if (!fourDesignations.includes(formDataObj.fournisseur)) {
        this._four.changeInputValidity("Ce fournisseur là n'existe pas");
        return;
      }
      if (!articleDesignations.includes(formDataObj.article)) {
        this._article.changeInputValidity("Cet article là n'existe pas");
        return;
      }
      handler(formDataObj.article);
      this.clearAddProductForm();
      this._product.changeInputValidity('');
      this.toggleAddProductWindow.bind(this)(); //remove the addShowAddWindowHandler
    });

    //also on input of any, if any products have been added, show a confirm message to resetting the added products.
    this._addingProductForm.querySelectorAll('input').forEach(input =>
      input.addEventListener('input', e => {
        //on input of any: reclose the addProductWindow (hide+resetting inputs+ resetting validity)

        this._windowAddProduct.classList.add('hidden');
        this._resultsContainerProduct.classList.add('hidden');
        this._resultsContainerProductEdit.classList.add('hidden');
        this.clearAddProductForm();
        this._product.changeInputValidity('');
        console.log(state.bdc_products.added);
        if (e.isTrusted) {
          handleProducts();
        } else {
          this._resultsContainerArticle.classList.add('hidden');
          this._resultsContainer.classList.add('hidden');
        }
      })
    );
  }
  resetAddingProductInputs(state) {
    console.log(state);
    console.log(state.articles);
    console.log(state.fournisseurs);
    this._article.value = state.articles.selected;
    // const event = new Event('input', {
    //   bubbles: true,
    //   cancelable: true,
    // });
    // this._four.dispatchEvent(event);
    // this._article.dispatchEvent(event);
    this._four.changeInputValidity('Fournisseur Valide !', true);
    this._article.changeInputValidity('Article Valide !', true);
    this._four.value = state.fournisseurs.selected;
  }
  /*
      <div class="container-supp-bdr">
        <form class="supp-bdr-cart">
          <p class="supp-bdr-text">
            Vous êtes sur le point de changer le fournisseur et/ou l'article
            et/ou le type, cela entraînera la perte des produits que vous avez
            ajoutés. Êtes-vous sûr ?
          </p>
          <div class="supp-bdr-btns">
            <button class="btn-supp supp-bdr-annuler">Annuler</button>
            <button class="btn-supp supp-bdr-confirmer">Confirmer</button>
          </div>
        </form>
      </div> 
  */

  addHandlerAddProduct(handler, productsObj) {
    this._addProductForm.addEventListener('submit', e => {
      e.preventDefault();
      const productDesignations = productsObj.all.map(el => el.designation);
      const formElement = this._addProductForm;
      const formData = new FormData(formElement);
      // Convert FormData object to object with key-value pairs
      const formDataObj = {};
      formData.forEach(function (value, key) {
        formDataObj[key] = value;
      });
      formDataObj.quantite = parseInt(formDataObj.quantite);
      // console.log(formDataObj);
      if (!productDesignations.includes(formDataObj.designation)) {
        this._product.changeInputValidity("Ce produit là n'existe pas");
        return;
      }
      handler(formDataObj);
      this.clearAddProductForm();
      this._product.changeInputValidity('');
      this._product.parentElement.classList.remove('input-product--valid');
      this.toggleAddProductWindow.bind(this)();
    });
  }

  AddHandlerAddedProductsCheckboxes() {
    this._checkboxesAddProduct = this._parentElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    const handleCheckboxChange = () => {
      const checkedCheckboxes = this._parentElement.querySelectorAll(
        'input[type="checkbox"]:checked'
      );
      if (checkedCheckboxes.length === 0) {
        // this._btnModifyProducts.disabled = true;
        this._btnDeleteProducts.disabled = true;
        // this._btnModifyProducts.classList.add('disabled-button'); // Apply disabled appearance
        this._btnDeleteProducts.classList.add('disabled-delete-button'); // Apply disabled appearance
      } else if (checkedCheckboxes.length === 1) {
        // this._btnModifyProducts.disabled = false;
        this._btnDeleteProducts.disabled = false;
        // this._btnModifyProducts.classList.remove('disabled-button'); // Remove disabled appearance
        this._btnDeleteProducts.classList.remove('disabled-delete-button'); // Remove disabled appearance
      } else {
        // this._btnModifyProducts.disabled = true;
        this._btnDeleteProducts.disabled = false;
        // this._btnModifyProducts.classList.add('disabled-button'); // Apply disabled appearance
        this._btnDeleteProducts.classList.remove('disabled-delete-button'); // Remove disabled appearance
      }
    };
    handleCheckboxChange();
    this._checkboxesAddProduct.forEach(cbx =>
      cbx.addEventListener('change', handleCheckboxChange)
    );
  }
  _generateMarkup() {
    console.log(this._data);
    if (this._data.length == 0) {
      return `<td colspan="6" class="empty-table--products">
      Les produits que vous ajouterez apparaîtront ici !
    </td>`;
    } else {
      return this._data
        .map(result => this._generateMarkupPreview(result, this._perms))
        .join('');
    }
  }
  addHandlerDeleteAddedProducts(handler) {
    // console.log(this);
    this._btnDeleteProducts.addEventListener('click', e => {
      e.preventDefault();
      handler(this);
    });
  }
  _generateMarkupPreview(result, perms = []) {
    return `
    <tr>
    <td>
      <div class="checkbox-colomn-bdc-add">
        <input
          class=""
          type="checkbox"
          id="checkbox-table-bdc-add"
        />
        <p class="colomn-tags-name-bdc">${this._data.indexOf(result) + 1}</p>
      </div>
    </td>
    <td>${result.designation}</td>

    <td class="input-changeble quantity-produit">
      <input type="text" placeholder="${result.quantite}" />
    </td>

    <td class="input-changeble price-produit">
      <input type="text" placeholder="${result.prixUnitaire} DA" />
    </td>

    <td class="price-produit-montant">${
      result.prixUnitaire * result.quantite
    } DA</td>
    <td>
      <button class="details-btn-bdc-add">
        <span class="material-icons-sharp info-icon">
          edit
        </span>
      </button>
    </td>
  </tr>
    `;
  }
  // addHandlerEditProductsBtns() {}

  addHandlerHideEditProductWindow(
    CloserClassName,
    windowClassName,
    needsvalidity = true
  ) {
    this._windowEditProduct = document.querySelector(windowClassName);
    this._btnCloseEditProduct =
      this._windowEditProduct.querySelector(CloserClassName);
    this._productEdit.parentElement.classList.remove('input-product--valid');
    this._btnCloseEditProduct.addEventListener('click', e =>
      this._boundToggleEditProductWindow(e)
    );
  }
  addHandlerShowEditProductWindow(
    OpClassName,
    windowClassName,
    validity = true
  ) {
    this._windowEditProduct = document.querySelector(windowClassName);
    this._btnsOpenEditProduct = this._window.querySelectorAll(OpClassName);
    this._btnsOpenEditProduct.forEach(btn => {
      btn.addEventListener('click', e => {
        this._boundToggleEditProductWindow(e);
        if (validity)
          this._productEdit.changeInputValidity(
            'Nom de produit Valide !',
            true
          );
      });
    });
  }
  toggleEditProductWindow() {
    this._windowEditProduct.classList.toggle('hidden');
  }
  clearEditProductForm() {
    const inputs = this._editProductForm.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  _boundToggleEditProductWindow = e => {
    e.preventDefault();
    this.clearEditProductForm();
    this.toggleEditProductWindow.bind(this)();
  };
  addHandlerEditProductBtns(controller) {
    const btnOpenArray = Array.from(this._btnsOpenEditProduct);
    btnOpenArray.forEach(async btn => {
      btn.addEventListener('click', async e => {
        await controller(this, e);
      });
    });
  }

  changeInputs(NewInputValuesObj) {
    // Get the form element
    const formElement = this._editProductForm;

    // Update form fields with new values
    for (const key in NewInputValuesObj) {
      if (NewInputValuesObj.hasOwnProperty(key)) {
        const input = formElement.elements[key];
        if (input) {
          input.value = NewInputValuesObj[key];
        }
      }
    }
  }

  addHandlerChangeProduct(handler, productsArrayParentObj) {
    // const closeBtn = this._btnCloseEditProduct;
    this._editProductForm.addEventListener('submit', async e => {
      e.preventDefault();
      let productDesignations;
      productDesignations = productsArrayParentObj.all.map(
        el => el.designation
      );
      const form = this._editProductForm;
      let inputs = Array.from(form.getElementsByTagName('input'));
      const allFilled = inputs.every(input => {
        const isRequired = input.required;
        if (isRequired) {
          return input.value.trim() !== '';
        }
        return true;
      });
      if (allFilled) {
        const dataArr = [...new FormData(form)];
        dataArr.find(([key, value]) => key === 'quantite')[1] = parseInt(
          dataArr.find(([key, value]) => key === 'quantite')[1]
        );
        const data = Object.fromEntries(dataArr);
        if (!productDesignations.includes(data.designation)) {
          this._productEdit.changeInputValidity("Ce produit là n'existe pas !");
          return;
        }
        handler(data, this);
        this._btnCloseEditProduct.click();
      } else {
        alert('Veuillez remplir tous les champs avant de soumettre.');
      }
    });
  }

  setInputValidity(inputBoxClass, boolean) {
    // this._product.editSurroundingHTML('msg');
    if (boolean) {
      document
        .querySelector(inputBoxClass)
        .classList.add('input-product--valid');
      this._product.setCustomValidity('');
    } else {
      document
        .querySelector(inputBoxClass)
        .classList.remove('input-product--valid');
      this._product.setCustomValidity(
        'Produit Invalide, Veuillez choisir un produit valide depuis le menu déroulant.'
      );
    }
  }
  _restricted = [['.add-bdc-btn', 'bon commande'], 'none'];
}

export default new AddCmdsView();
