const loginForm = document.querySelector(".login-cart");
const errorMessage = document.querySelector(".error-message");
const password = document.getElementById("password");
const email = document.getElementById("email");



function login() {
  console.log(email.value, password.value);

  // Validation if needed

  //TODO: Send the email and password to the server for authentication

  //FAKE LOGIN
  if (email.value === "a@a.a" && password.value === "pw") {
    // Authentication successful
    console.log("Login ");
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

// Main Event
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});
