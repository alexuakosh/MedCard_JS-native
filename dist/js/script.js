import Auth from './auth.js'
import Modal from './modal.js'
import CardiologistCollection from './cardiologistCollection.js'
import DentistCollection from './dentistCollection.js'
import TherapistCollection from './therapistCollection.js'
import Filter from './filter.js'


export const blackBack = document.querySelector(".black_back")
export const cardModal = document.querySelector(".create-card-modal")
export const createVisit = document.querySelector(".create-visit");
export const logInPopup = document.querySelector('.login-popup');
export const login = document.querySelector('.log-in-btn');
export const welcome = document.querySelector(".welcome");
export const emailInput = document.querySelector(".js-email-input");
export const passwordInput = document.querySelector(".js-password-input");

export const fetchJSON = (url, initRequest) =>
  fetch(url, initRequest)
  .then(response => response.json());


export const cardiologistCollection = new CardiologistCollection();
export const dentistCollection = new DentistCollection();
export const therapistCollection = new TherapistCollection();

export const auth = new Auth();
auth.startLogin();

export let modalWindow = new Modal();
modalWindow.checkLogin();
modalWindow.cardDelete();

export const filter = new Filter();




