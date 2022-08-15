import { filter, fetchJSON } from "./script.min.js"
import VisitCardiologist from "./cardiologist.js";

export default class CardiologistCollection {
  constructor() {
    this.list = [];
  }

  addVisit(doctorFullName, visitUrgency, purposeOfVisit, descriptionOfVisit, normalPressure, bodyMassIndex, pastDiseases, ageOfPatient) {
    const objectToAdd = {
      fullName: doctorFullName,
      purpose: purposeOfVisit,
      urgency: visitUrgency,
      description: descriptionOfVisit,
      status: "open",
      pressure: normalPressure,
      bmi: bodyMassIndex,
      diseases: pastDiseases,
      age: ageOfPatient
    }
    const body = JSON.stringify(objectToAdd);

    fetchJSON('https://frozen-mountain-86271.herokuapp.com/cardiologist', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body,
    }).then((response) => {
      const newVisit = response;
      const cardiologistVisit = new VisitCardiologist(newVisit.id, objectToAdd.purpose, objectToAdd.description, visitUrgency, objectToAdd.fullName, objectToAdd.status, objectToAdd.pressure, objectToAdd.bmi, objectToAdd.diseases, objectToAdd.age);
      this.list.push(cardiologistVisit);
      cardiologistVisit.render();
      filter.loadFilter();
    });
  }

  getCollection() {
    fetchJSON('https://frozen-mountain-86271.herokuapp.com/cardiologist')
      .then((data) => {
        const collectionFromServer = data;
        collectionFromServer.forEach(element => {
          const visit = new VisitCardiologist(element.id, element.purpose, element.description, element.urgency, element.fullName, element.status, element.pressure, element.bmi, element.diseases, element.age);
          this.list.push(visit);
          visit.render();
          filter.loadFilter();
        });
      });
  }

  removeById(id) {
    fetch('https://frozen-mountain-86271.herokuapp.com/cardiologist/${id}', {
      method: 'DELETE',
    }).then(() => {
      const visitToRemove = this.list.find((visit) => {
        return visit.id === id;
      })
      visitToRemove.visitCard.remove();
      const visitIndex = this.list.findIndex((visit) => {
        return visit.id === id;
      });
      this.list.splice(visitIndex, 1);
      filter.loadFilter();
    });
  }
}



