import {login, blackBack, cardModal, createVisit, logInPopup, welcome, emailInput, passwordInput,  cardiologistCollection, dentistCollection, therapistCollection, auth, modalWindow, filter, fetchJSON} from "./script.min.js"

export let userName = window.localStorage.getItem("userName") || "";

export default class Auth {
  constructor() {
    this.login = login;
    this.deleteModalButton = document.querySelector(".js-modal-head")
    this.logInButton = document.querySelector(".js-login-btn");
  }

  startLogin() {
    login.addEventListener("click", function (event) {
      blackBack.classList.add("active");
      logInPopup.classList.add("active");
      event.preventDefault()
    })

    this.logInButton.addEventListener("click", this.logIn.bind(this))
    this.deleteModalButton.addEventListener("click", this.closeLogin.bind(this))

    blackBack.addEventListener("click", function (event) {
      if (event.target == blackBack) {
        logInPopup.classList.remove("active")
        blackBack.classList.remove("active");
      }
    })

    if (userName !== "") {
      this.renderUserName();
    }
  }

  logIn() {
    userName = "";
    fetchJSON(`https://frozen-mountain-86271.herokuapp.com/user`).then(registeredUsers => {
      registeredUsers.forEach(user => {
        if (user.email === emailInput.value && user.password === passwordInput.value) {
          userName = emailInput.value;
          window.addEventListener('beforeunload', function () {
            window.localStorage.setItem("userName", `${userName}`);
          });
        }
      });
      return userName;
    }).then(userName => {
      if (userName !== "") {
        this.renderUserName();
        cardiologistCollection.getCollection()
        dentistCollection.getCollection();
        therapistCollection.getCollection();
      }
    })
  }

  closeLogin(event) {
    logInPopup.classList.remove("active");
    blackBack.classList.remove("active");
    event.preventDefault()
  }

  renderUserName() {
    blackBack.classList.remove("active");
    login.classList.add("disActivated");
    welcome.classList.remove("disActivated");
    welcome.innerHTML = `<p>Welcome, ${userName}</p>`
  }
}

