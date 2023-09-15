//modale
const singupModal = document.querySelector(".singup-form-wrapper");
const loginModal = document.querySelector(".login-form-wrapper");
//uchwyt do przycisków
const loginBtn = document.querySelector(".login-btn");
const singupBtn = document.querySelector(".singup-btn");
const singupX = document.querySelector(".singup-x");
const loginX = document.querySelector(".login-x");
//uchwyt do inputów
const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const popup = document.querySelector(".popup");
//obsługa przycisków do wyświetlania modali
singupBtn.addEventListener("click", () => {
  singupModal.classList.add("display");
  loginModal.classList.remove("display");
});
loginBtn.addEventListener("click", () => {
  loginModal.classList.add("display");
  singupModal.classList.remove("display");
});

//przykładowy user do logowania
const Users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "password",
  },
];

//Funkcje do obsługi sprawdzania poprawności wpisanych danych w formularzu

const showError = (input, msg) => {
  const formBox = input.parentElement;
  const errorMsg = formBox.querySelector(".error-text");

  formBox.classList.add("error");
  errorMsg.textContent = msg;
};

const clearError = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
};

const checkForm = (input) => {
  input.forEach((el) => {
    if (el.value === "") {
      showError(el, el.placeholder);
    } else {
      clearError(el);
    }
  });
};

const checkLength = (input, min) => {
  if (input.value.length < min) {
    showError(
      input,
      `To short! ${input.previousElementSibling.innerText.slice(
        0,
        -1
      )}Minimum number of characters ${min}.`
    );
  }
};

const checkUsername = (username) => {
  const logQuery = {
    username: username.value,
  };
  const filterUsername = Users.filter((item) =>
    Object.keys(logQuery).every((key) => item[key] === logQuery[key])
  );
  if (filterUsername.length > 0) {
    showError(username, "Account is already exist");
  }
};
const checkPassword = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, "The passwords don't match");
  }
};

const checkEmail = (email) => {
  const emailQuery = {
    email: email.value.toLowerCase(),
  };
  const filterEmail = Users.filter((item) =>
    Object.keys(emailQuery).every((key) => item[key] === emailQuery[key])
  );
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (filterEmail.length === 0) {
    if (re.test(email.value)) {
      clearError(email);
    } else {
      showError(email, "Email address is incorrect");
    }
  } else showError(email, "Email is already exists.");
};

const checkErrors = () => {
  const allInputs = document.querySelectorAll(".input-group");
  let errorCount = 0;

  allInputs.forEach((el) => {
    if (el.classList.contains("error")) {
      errorCount++;
    }
  });

  if (errorCount === 0) {
    console.log(Users);
    popup.classList.add("show-popup");
  }
};

//dodawanie nowego user

const addNewUser = () => {
  Users.push({
    username: username.value,
    email: email.value,
    password: pass.value,
  });
};

//wysyłanie formularza SingUp
const singupBtnForm = document.querySelector(".singup-form");
singupBtnForm.addEventListener("click", (e) => {
  e.preventDefault();
  //funkcje sprawdzające poprawność formularza
  checkForm([username, pass, pass2, email]);
  checkLength(username, 3);
  checkLength(pass, 8);
  checkUsername(username);
  checkPassword(pass, pass2);
  checkEmail(email);
  checkErrors();
});

//Zamykanie modali
//SingUp modal

singupX.addEventListener("click", (e) => {
  e.preventDefault();

  [username, pass, pass2, email].forEach((el) => {
    el.value = "";
    clearError(el);
  });
  singupModal.classList.remove("display");
});
//zamykanie popup
const closePopup = document.querySelector(".close-popup");
closePopup.addEventListener("click", (e) => {
  e.preventDefault();
  addNewUser();
  console.log(Users);
  singupModal.classList.remove("display");
});
//Log Modal
loginX.addEventListener("click", (e) => {
  e.preventDefault();

  [logUser, passUser].forEach((el) => {
    el.value = "";
    clearError(el);
  });
  loginModal.classList.remove("display");
});

//Przekierowanie do podstrony po poprawnym zalogowaniu
const openNextPage = () => {
  const clipPage = window.location.replace("forest.html");
};

//Logowanie
//pobranie inputów z logowania
const logUser = document.querySelector("#username-log");
const passUser = document.querySelector("#password-log");
//Sprawdzanie poprawności danych do logowania
const validationLog = () => {
  const filterQuery = {
    username: logUser.value,
    password: passUser.value,
  };
  const filterLogQuery = {
    username: logUser.value,
  };
  const filterLog = Users.filter((item) =>
    Object.keys(filterLogQuery).every(
      (key) => item[key] === filterLogQuery[key]
    )
  );
  if (filterLog.length === 1) {
    const filterData = Users.filter((item) =>
      Object.keys(filterQuery).every((key) => item[key] === filterQuery[key])
    );
    console.log(filterData.length);
    if (filterData.length === 1) {
      openNextPage();
    } else showError(passUser, "Password not match");
  } else {
    showError(logUser, "Account not exist");
  }
};
//obsługa przycisku logowania
const LogBtnForm = document.querySelector(".login-btn-form");
LogBtnForm.addEventListener("click", () => {
  validationLog();
});
