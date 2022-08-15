import Visit from './visit.js'
import { cardiologistCollection, fetchJSON } from "./script.min.js"


export default class VisitCardiologist extends Visit {
    constructor(id, purpose, description, urgency, fullName, visitStatus, pressure, bodyWeightIndex, illnessHistory, age) {
        super(id, purpose, description, urgency, fullName, visitStatus);
        this.age = age;
        this.pressure = pressure;
        this.bodyWeightIndex = bodyWeightIndex;
        this.illnessHistory = illnessHistory;
        this.collection = cardiologistCollection;
        this.doctor = "cardiologist";
    }

    renderSpecifics() {

        this.showMoreList = document.createElement('ul');
        this.moreList.appendChild(this.showMoreList);
        this.showMoreList.innerHTML = ` 
            <li class="showMore-list">Purpose:<span> ${this.purpose}</span> </li>
            <li class="showMore-list">Description: <span>${this.description}</span></li>
            <li class="showMore-list">Urgency: <span class="js-urgency">${this.urgency}</span></li>
            <li class="showMore-list">Age: <span>${this.age}</span></li>
            <li class="showMore-list">Pressure: <span>${this.pressure}</span></li>
            <li class="showMore-list">Body Mass Index: <span>${this.bodyWeightIndex}</span></li>
            <li class="showMore-list">History of Illness: <span>${this.illnessHistory}</span></li>
        `;

        this.showMore();

    }

    startEdit() {

        this.visitCard.innerHTML = `
        <span class="delete-modal"><img width="35px"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXlY9LX-DeiAsGRMtm3qORPvue0530zBDYrQ&usqp=CAU"
        alt="img"></span>
        <ul class="visit-list">
            <li>Name & Surname: <input class="js-edit-fullName" value="${this.fullName}"/></li>
            <li>Purpose: <input class="js-edit-purpose" value="${this.purpose}"/></li>
            <li>Description: <input class="js-edit-description" value="${this.description}"/></li>
            <li>Urgency: 
                <select name="select" class="js-edit-urgency">
                    <option value="regular">Regular</option>
                    <option value="priority">Priority</option>
                    <option value="urgent">Urgent</option>
                </select>
            </li>
            <li>Age: <input class="js-edit-age" value="${this.age}"/></li>
            <li>Pressure: <input class="js-edit-pressure" value="${this.pressure}"/></li>
            <li>Body Weight: <input class="js-edit-body-weight-index" value="${this.bodyWeightIndex}"/></li>
            <li>Illnesses: <input class="js-edit-illness-history" value="${this.illnessHistory}"/></li>
            <div class="visit-buttons js-save-edit-btn">
            <a class="create-visit"><span class="logo-name">Save</span></a></div>
        </ul>`;

        this.urgencySelected = this.visitCard.querySelector('.js-edit-urgency');
        this.urgencySelected.addEventListener("change", this.urgencySelecting.bind(this));

        this.saveBtn = this.visitCard.querySelector('.js-save-edit-btn');
        this.saveBtn.addEventListener('click', this.saveChanges.bind(this));

        this.removeBtn = this.visitCard.querySelector('.delete-modal');
        this.removeBtn.addEventListener("click", this.delete.bind(this));


    }

    async saveChanges() {

        const purpose = this.visitCard.querySelector('.js-edit-purpose').value;
        const description = this.visitCard.querySelector('.js-edit-description').value;
        const urgency = this.visitCard.querySelector('.js-edit-urgency').value;
        const fullName = this.visitCard.querySelector('.js-edit-fullName').value;
        const age = this.visitCard.querySelector('.js-edit-age').value;
        const pressure = this.visitCard.querySelector('.js-edit-pressure').value;
        const bodyWeightIndex = this.visitCard.querySelector('.js-edit-body-weight-index').value;
        const illnessHistory = this.visitCard.querySelector('.js-edit-illness-history').value;

        const response = await fetchJSON(`https://frozen-mountain-86271.herokuapp.com/cardiologist/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                purpose: purpose,
                description: description,
                urgency: urgency,
                fullName: fullName,
                age: age,
                pressure: pressure,
                bodyWeightIndex: bodyWeightIndex,
                illnessHistory: illnessHistory
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        this.purpose = response.purpose;
        this.description = response.description;
        this.urgency = response.urgency;
        this.fullName = response.fullName;
        this.age = response.age;
        this.pressure = response.pressure;
        this.bodyWeightIndex = response.bodyWeightIndex;
        this.illnessHistory = response.illnessHistory;

        this.setContent();
    }

    async checkStatus() {
        if (this.visitCard.querySelector(".checkbox").checked) {
            const response = await fetchJSON(`https://frozen-mountain-86271.herokuapp.com/cardiologist/${this.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: "done"
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            this.status = response.status;
        } else {
            const response = await fetchJSON(`https://frozen-mountain-86271.herokuapp.com/cardiologist/${this.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: "open"
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            this.status = response.status;
        }
    }
}