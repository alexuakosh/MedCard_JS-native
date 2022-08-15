import { filter, fetchJSON } from "./script.min.js"
import VisitDentist from "./dentist.js";

export default class DentistCollection {
  constructor() {
    this.list = [];
  }

  addVisit(doctorFullName, visitUrgency, purposeOfVisit, descriptionOfVisit, lastVisitDate) {
    const objectToAdd = {
      fullName: doctorFullName,
      status: "open",
      urgency: visitUrgency,
      purpose: purposeOfVisit,
      description: descriptionOfVisit,
      lastVisit: lastVisitDate
    }

    const body = JSON.stringify(objectToAdd);

    fetchJSON('https://frozen-mountain-86271.herokuapp.com/dentist', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body,
    }).then((response) => {
      const newVisit = response;
      const dentistVisit = new VisitDentist(newVisit.id, objectToAdd.purpose, objectToAdd.description, visitUrgency, objectToAdd.fullName, objectToAdd.status, objectToAdd.lastVisit);
      this.list.push(dentistVisit);
      console.log(dentistVisit);
      dentistVisit.render();
      filter.loadFilter();
    });
  }

  getCollection() {
    fetchJSON('https://frozen-mountain-86271.herokuapp.com/dentist')
      .then((data) => {
        const collectionFromServer = data;
        collectionFromServer.forEach(element => {
          const visit = new VisitDentist(element.id, element.purpose, element.description, element.urgency, element.fullName, element.status, element.lastVisit);
          this.list.push(visit);
          visit.render();
          filter.loadFilter();
        });
      });
  }

  removeById(id) {
    fetch('https://frozen-mountain-86271.herokuapp.com/dentist/${id}', {
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


