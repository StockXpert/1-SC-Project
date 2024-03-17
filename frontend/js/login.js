const loginForm = document.querySelector('.login-cart');
const errorMessage = document.querySelector('.error-message');
const paragraphElement = document.createElement('p');
const password = document.getElementById('password');
const email = document.getElementById('email');
const spinner = document.querySelector('.spinner-container');
const btns = document.querySelector('.btns-container');
const passwordIcon = document.querySelector('.password-icon');
paragraphElement.className = 'text-err';

passwordIcon.addEventListener('click', function (e) {
  e.preventDefault();
  if (!password.value) return;

  if (password.type === 'password') {
    password.type = 'text';
  } else {
    password.type = 'password';
  }
  passwordIcon.querySelectorAll('.input-icon').forEach(child => {
    child.classList.toggle('hidden');
  });
});
/**
 *
 * @param {* 'show': to display error message or 'hide' (by default): to hide the error message} action
 * @param {* error message by dafault is Email ou mot de passe incorrect.} message
 */
function handelErrorMessage(
  action = 'hide',
  message = 'Email ou mot de passe incorrect.'
) {
  if (action === 'show') {
    paragraphElement.textContent = message;
    errorMessage.appendChild(paragraphElement);
    errorMessage.classList.remove('hidden');
  } else if ((action = 'hide')) errorMessage.classList.add('hidden');
}

async function login() {
  console.log(email.value, password.value);

  // Validation if needed

  // Send the email and password to the server for authentication
  try {
    const res = await fetch('http://localhost:3000/Users/login', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.response === 'succuss of login') {
      console.log('Login successful');
      // Store the JWT
      localStorage.setItem('JWT', data.jwt);
      //redirect the user
      window.location.href = '../html/foo.html';
    } else {
      if (res.status === 404) {
        if (data.response === 'not existing account') {
          console.error('Account does not exist');
          handelErrorMessage('show');
        } else if (data.response === 'Password error') {
          console.error('Incorrect password');
          handelErrorMessage('show');
        } else {
          console.error('Unknown error:', data.response);
          handelErrorMessage('show', `${res.status} ERROR: ${res.statusText}`);
        }
      } else if (res.status === 500) {
        console.error('Internal server error');
        handelErrorMessage('show', `${res.status} ERROR: ${res.statusText}`);
      }
    }
  } catch (err) {
    handelErrorMessage('show', `Le serveur est indisponible!!`);
  }
}

// When we restart wrinting in email or password the error message get erased
email.addEventListener('input', handelErrorMessage);
password.addEventListener('input', handelErrorMessage);

function handelSpinner() {
  spinner.classList.toggle('hidden');
  btns.classList.toggle('hidden');
}

// Main Event
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  handelSpinner();
  await login();
  handelSpinner();
});
