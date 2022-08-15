import Visit from './visit.js'
import { therapistCollection, fetchJSON } from "./script.min.js"

export default class VisitTherapist extends Visit {
    constructor(id, purpose, description, urgency, fullName, visitStatus, age) {
        super(id, purpose, description, urgency, fullName, visitStatus);
        this.age = age;
        this.collection = therapistCollection;
        this.doctor = "therapist";
    }

    renderSpecifics() {

        this.showMoreList = document.createElement('ul');
        this.moreList.appendChild(this.showMoreList);
        this.showMoreList.innerHTML = ` 
            <li class="showMore-list">Purpose: <span>${this.purpose}</span></li>
            <li class="showMore-list">Description: <span>${this.description}</span></li>
            <li class="showMore-list">Urgency: <span class="js-urgency">${this.urgency}</span></li>
            <li class="showMore-list">Age: <span>${this.age}</span></li>
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

        const fullName = this.visitCard.querySelector('.js-edit-fullName').value;
        const purpose = this.visitCard.querySelector('.js-edit-purpose').value;
        const description = this.visitCard.querySelector('.js-edit-description').value;
        const urgency = this.visitCard.querySelector('.js-edit-urgency').value;
        const age = this.visitCard.querySelector('.js-edit-age').value;

        const response = await fetchJSON(`https://frozen-mountain-86271.herokuapp.com/therapist/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                fullName: fullName,
                purpose: purpose,
                description: description,
                urgency: urgency,
                age: age
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        this.fullName = response.fullName;
        this.purpose = response.purpose;
        this.description = response.description;
        this.urgency = response.urgency;
        this.age = response.age;

        this.setContent();
    }

    async checkStatus() {
        if (this.visitCard.querySelector(".checkbox").checked) {
            const response = await fetchJSON(`https://frozen-mountain-86271.herokuapp.com/therapist/${this.id}`, {
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
            const response = await fetchJSON(`https://frozen-mountain-86271.herokuapp.com/therapist/${this.id}`, {
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