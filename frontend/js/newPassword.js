const form = document.querySelector('.newpossword-cart');
const code = document.getElementById('code');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const passwordIcons = document.querySelectorAll('.password-icon');
const spinner = document.querySelector('.spinner-container');
const btn = document.querySelector('.forgotpassword-btn');

//Read email from url khechine ana wah
const urlParams = new URLSearchParams(window.location.search);
const emailValue = urlParams.get('email');
console.log(emailValue);

function handelSpinner() {
  spinner.classList.toggle('hidden');
  btn.classList.toggle('hidden');
}

passwordIcons.forEach(icon => {
  icon.addEventListener('click', e => {
    e.preventDefault();
    if (password.type === 'password' && confirmPassword.type === 'password') {
      password.type = 'text';
      confirmPassword.type = 'text';
    } else {
      password.type = 'password';
      confirmPassword.type = 'password';
    }
    passwordIcons.forEach(icon =>
      icon.querySelectorAll('.input-icon').forEach(child => {
        child.classList.toggle('hidden');
      })
    );
  });
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  // Validation if needed
  if (password.value !== confirmPassword.value)
    throw new Error('Les mots de passe ne correspondent pas');

  try {
    handelSpinner();
    const res = await fetch('http://localhost:3000/Users/changePasswordMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailValue,
        code: code.value,
        newPassword: password.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 400) throw new Error('Code invalide');
    if (res.status === 500) throw new Error('Le serveur est indisponible!!');
    if (res.status === 200) window.location.href = '../html/login.html';
  } catch (error) {
    console.error(error.message);
  } finally {
    handelSpinner();
  }
});
