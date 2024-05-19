import View from '../view.js';
import * as helpers from '../../helpers.js';

class ProfileView extends View {
  constructor() {
    super();
  }

  renderMini(render = true) {
    if (render) {
      this._mini.innerHTML = `  
    <div class="info">
      <p>${this._data.nom} <b>${
        this._data.prenom ? this._data.prenom : this._data.role
      }</b></p>
      <small class="text-muted">${
        this._data.nom ? this._data.role : this._data.email
      }</small>
    </div>
    <!-- <div class="profile-photo">
      <img src="../img/use-img.jpeg" alt="photo du user" />
    </div> -->`;
    } else this._mini.innerHTML = '';
  }
  _mini = document.querySelector('.nav .profile');
  _parentElement = document.querySelector('.inputs-profile');
  _trueParentElement = document.querySelector('#main-profile-table');
  _generateMarkup() {
    console.log(this._data);
    return `
            <div class="groupe-5-profile">
              <p>Vos Informations</p>
            </div>
            <div class="groupe-4-profile">
              <div class="main-input-groupe-profile type-consumer-profile hidden">
                <div class="input-text-profile">
                  <p>Type:</p>
                </div>
                <div class="input-groupe-profile input-profile-type">
                  <input name="type" type="text" class="input name input-profile-type" autocomplete="name" placeholder="Nom" value="Enseignant">
                  <ion-icon class="input-icon md hydrated" name="person-outline" role="img"></ion-icon>
                </div>
              </div>
            </div>
            <div class="groupe-1-profile">
            ${
              this._data.nom
                ? `
            <div class="main-input-groupe-profile">
              <div class="input-text-profile">
                <p>Nom:</p>
              </div>
              <div class="input-groupe-profile input-changeble2">
                <input name="nom" type="text" class="input name input-profile-name" autocomplete="name" placeholder="Nom" value="${this._data.nom}">
                <ion-icon class="input-icon md hydrated" name="person-outline" role="img"></ion-icon>
              </div>
            </div>`
                : ''
            }


              <div class="main-input-groupe-profile">
                <div class="input-text-profile">
                  <p>Statut:</p>
                </div>
                <div class="input-groupe-profile input-profile-statut">
                  <input name="status" type="text" class="input name input-profile-status" autocomplete="name" placeholder="Nom" value="${
                    this._data.active ? 'actif' : 'inactif'
                  }">
                  <span class="material-icons-sharp input-icon status-on ${
                    this._data.active ? '' : 'hidden'
                  }">
                    check_circle_outline
                  </span>
                  <span class="material-icons-sharp input-icon status-off ${
                    this._data.active ? 'hidden' : ''
                  }">
                    highlight_off
                  </span>
                </div>
              </div>
              <div class="main-input-groupe-profile">
                <div class="input-text">
                  <p>Rôle:</p>
                </div>
                <div class="input-groupe-profile input-profile-role">
                  <input name="role" type="text" class="input name input-profile-role" autocomplete="name" placeholder="Nom" value="Magasinier">
                  <span class="material-icons-sharp input-icon">
                    work_outline
                  </span>
                </div>
              </div>
            </div>
            <div class="groupe-2-profile">
            ${
              this._data.prenom
                ? `
              <div class="main-input-groupe-profile">
                <div class="input-text-profile">
                  <p>Prénom:</p>
                </div>
                <div class="input-groupe-profile input-changeble2">
                  <input name="prenom" type="text" class="input name input-profile-prenom input-changeble" placeholder="Prénom" value="${this._data.prenom}">
                  <ion-icon class="input-icon md hydrated" name="person-outline" role="img"></ion-icon>
                </div>
              </div>`
                : ''
            }

              <div class="main-input-groupe-profile">
                <div class="input-text-profile">
                  <p>Date de naissance:</p>
                </div>
                <div class="input-groupe-profile input-changeble2">
                  <input name="date_naissance" type="text" class="input input-profile-date" id="profile-date" placeholder="Entrez la date de naissance" value="${helpers.formatDateProfile(
                    this._data.date_naissance
                  )}">
                  <ion-icon class="input-icon md hydrated" name="calendar-number-outline" role="img"></ion-icon>
                </div>
              </div>
                  ${
                    // this._data.structure
                    // ?
                    `              <div class="main-input-groupe-profile input-changeble2">
                  <div class="input-text-profile">
                    <p>Structure:</p>
                  </div>
                  <div class="input-groupe-profile">
                    <input name="structure" type="text" class="input input-profile-structure" id="profile-structure" placeholder="Entrez la date de naissance" value="${
                      this._data.structure ? this._data.structure : 'Aucune'
                    }">
                    <ion-icon class="input-icon md hydrated" name="school-outline" role="img"></ion-icon>
                  </div>
                </div>`
                    // : ''
                  }
            </div>
            <div class="groupe-3-profile">
              <div class="main-input-groupe-profile main-input-groupe-3-profile input-changeble2">
                <div class="input-text-profile">
                  <p>Email:</p>
                </div>
                <div class="input-groupe-3-profile">
                  <input name="email" type="email" class="input email-profile" required="" autocomplete="email" value="${
                    this._data.email
                  }">
                  <ion-icon class="input-icon md hydrated" name="mail-outline" role="img"></ion-icon>
                </div>
              </div>
            </div>`;
  }
}
export default new ProfileView();
