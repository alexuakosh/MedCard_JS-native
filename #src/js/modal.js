import { blackBack, cardModal, createVisit, logInPopup, cardiologistCollection, dentistCollection, therapistCollection } from "./script.min.js"
import { userName } from "./auth.js";

export default class Modal {
  constructor() {
    this.lastDoctorIndex = 0;
    this.urgency = "regular";
    this.block = document.querySelectorAll('.js-selected-doctor');
    this.chosenDoctor = document.querySelector(".selectDoctor")
    this.chosenDoctor.addEventListener("change", this.doctorsSelect.bind(this));
    this.chosenUrgency = document.querySelector(".js-doctor-urgency-input");
    this.chosenUrgency.addEventListener("change", this.urgencySelect.bind(this));
    this.submit = document.querySelector(".js-submit");
    this.submit.addEventListener("click", this.addVisit.bind(this))
  }

  checkLogin() {
    if (userName !== "") {
      cardiologistCollection.getCollection()
      dentistCollection.getCollection();
      therapistCollection.getCollection();
    }
    createVisit.addEventListener("click", function (event) {
      blackBack.classList.add("active");
      if (userName === "") {
        logInPopup.classList.add("active");
      } else {
        cardModal.classList.add("active");
        event.preventDefault()
      }
    })
  }

  cardDelete() {
    const deleteCardButton = document.querySelector(".delete-modal")
    deleteCardButton.addEventListener("click", function (event) {
      cardModal.classList.remove("active");
      blackBack.classList.remove("active");
      event.preventDefault()
    })
    blackBack.addEventListener("click", function (event) {
      if (event.target == blackBack) {
        cardModal.classList.remove("active");
      }
    })
  }

  doctorsSelect() {
    this.block[this.lastDoctorIndex].style.display = "none";
    let index = this.chosenDoctor.selectedIndex;
    this.block[index].style.display = "block";
    this.lastDoctorIndex = index;
  }

  urgencySelect() {
    switch (this.chosenUrgency.selectedIndex) {
      case 0:
        this.urgency = "regular";
        break;
      case 1:
        this.urgency = "priority";
        break;
      case 2:
        this.urgency = "urgent";
        break;
    }
  }

  addVisit() {
    this.doctorFullName = document.querySelector(".js-doctor-full-name-input").value;
    this.purposeOfVisit = document.querySelector(".js-doctor-purpose-input").value;
    this.descriptionOfVisit = document.querySelector(".js-doctor-description-input").value;
    this.normalPressure = document.querySelector(".js-pressure-input").value;
    this.bodyMassIndex = document.querySelector(".js-bmi-input").value;
    this.pastDiseases = document.querySelector(".js-diseases-input").value;
    this.ageForCardiologist = document.querySelector(".js-age-for-cardiologist-input").value;
    this.ageForTherapist = document.querySelector(".js-age-for-therapist-input").value;
    this.lastVisitDate = document.querySelector(".js-last-visit-input").value;

    switch (this.lastDoctorIndex) {
      case 1:
        if (this.doctorFullName !== "" && this.purposeOfVisit !== "" && this.normalPressure !== "" && this.bodyMassIndex !== "" && this.pastDiseases !== "" && this.ageForCardiologist !== "") {
          cardiologistCollection.addVisit(this.doctorFullName, this.urgency, this.purposeOfVisit, this.descriptionOfVisit, this.normalPressure, this.bodyMassIndex, this.pastDiseases, this.ageForCardiologist);
        }
        break;
      case 2:
        if (this.doctorFullName !== "" && this.purposeOfVisit !== "" && this.lastVisitDate !== "") {
          dentistCollection.addVisit(this.doctorFullName, this.urgency, this.purposeOfVisit, this.descriptionOfVisit, this.lastVisitDate);
        }
        break;
      case 3:
        if (this.doctorFullName !== "" && this.purposeOfVisit !== "" && this.ageForTherapist !== "") {
          therapistCollection.addVisit(this.doctorFullName, this.urgency, this.purposeOfVisit, this.descriptionOfVisit, this.ageForTherapist);
        }
        break;
    }
  }

}

