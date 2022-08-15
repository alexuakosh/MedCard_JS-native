import { filter, fetchJSON } from "./script.min.js"
import VisitTherapist from "./therapist.js";

export default class TherapistCollection {
  constructor() {
    this.list = [];
  }

  addVisit(doctorFullName, visitUrgency, purposeOfVisit, descriptionOfVisit, ageOfPatient) {
    const objectToAdd = {
      fullName: doctorFullName,
      status: "open",
      urgency: visitUrgency,
      purpose: purposeOfVisit,
      description: descriptionOfVisit,
      age: ageOfPatient
    }
    const body = JSON.stringify(objectToAdd);

    fetchJSON('https://frozen-mountain-86271.herokuapp.com/therapist', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body,
    }).then((response) => {
      const newVisit = response;
      const therapistVisit = new VisitTherapist(newVisit.id, objectToAdd.purpose, objectToAdd.description, visitUrgency, objectToAdd.fullName, objectToAdd.status, objectToAdd.age);
      this.list.push(therapistVisit);
      therapistVisit.render();
      filter.loadFilter();
    });
  }

  getCollection() {
    fetchJSON('https://frozen-mountain-86271.herokuapp.com/therapist')
      .then((data) => {
        const collectionFromServer = data;
        collectionFromServer.forEach(element => {
          const visit = new VisitTherapist(element.id, element.purpose, element.description, element.urgency, element.fullName, element.status, element.age);
          this.list.push(visit);
          visit.render();
          filter.loadFilter();
        });
      });
  }

  removeById(id) {
    fetch('https://frozen-mountain-86271.herokuapp.com/therapist/${id}', {
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

