const loginForm = document.querySelector(".login-cart");
const errorMessage = document.querySelector(".error-message");
const password = document.getElementById("password");
const email = document.getElementById("email");
const spinner = document.querySelector(".spinner-container");
const btns = document.querySelector(".btns-container");
const passwordIcon = document.querySelector(".password-icon");

passwordIcon.addEventListener("click", function (e) {
  e.preventDefault();
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
  passwordIcon.querySelectorAll(".input-icon").forEach((child) => {
    child.classList.toggle("hidden");
  });
});

function login() {
  console.log(email.value, password.value);

  // Validation if needed

  //TODO: Send the email and password to the server for authentication

  //FAKE LOGIN
  if (email.value === "a@a.a" && password.value === "pw") {
    // Authentication successful
    console.log("successful login ");
    // GO to another page
  } else {
    // show error message
    errorMessage.style.display = "flex";
    email.value = "";
    password.value = "";
  }
}
// When we restart wrinting in email or password the error message get erased
function eraseError() {
  errorMessage.style.display = "none";
}
email.addEventListener("input", eraseError);
password.addEventListener("input", eraseError);

function handelSpinner() {
  spinner.classList.toggle("hidden");
  btns.classList.toggle("hidden");
}

// Main Event
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handelSpinner();
  setTimeout(handelSpinner, 4000);
  login();
});
