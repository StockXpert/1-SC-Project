const loginForm = document.querySelector(".login-cart");
const errorMessage = document.querySelector(".error-message");
const password = document.getElementById("password");
const email = document.getElementById("email");
const spinner = document.querySelector(".spinner-container");
const btns = document.querySelector(".btns-container");
const passwordIcon = document.querySelector(".password-icon");
email.value = "Amrane@esi-sba.dz";
password.value = "Amrane2024";

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

async function login() {
  console.log(email.value, password.value);

  // Validation if needed

  //TODO: Send the email and password to the server for authentication
  try {
    const res = await fetch("http://localhost:3000/Users/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.response === "success of login") {
      console.log("Login successful");
      console.log("JWT token:", data.jwt);
      // Store the JWT
      //redirect the user
    } else {
      if (res.status === 404) {
        if (data.response === "not existing account") {
          console.error("Account does not exist");
        } else if (data.response === "Password error") {
          console.error("Incorrect password");
        } else {
          console.error("Unknown error:", data.response);
        }
      } else if (res.status === 500) {
        console.error("Internal server error");
      }
    }
  } catch (err) {
    console.error(`ERROR ${err}`);
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
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  handelSpinner();
  await login();
  handelSpinner();
});
