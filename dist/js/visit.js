export default class Visit {
    constructor(id, purpose, description, urgency, fullName, visitStatus) {
        this.id = id;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.fullName = fullName;
        this.status = visitStatus;
    }

    render() {

        this.visitCard = document.createElement('div');
        this.visitCard.classList.add('Visit-Card');
        this.visitCard.classList.add('js-filter-byName');
        this.visitCard.classList.add('js-filter-byDoctor');
        this.visitCard.classList.add('js-filter-byUrgency');
        this.visitCard.classList.add('js-filter-byStatus');
        const testCreateArea = document.querySelector('.VisitCards');
        testCreateArea.appendChild(this.visitCard);

        this.setContent();

    }

    setContent() {
        let checkElement = "";

        if (this.status === "done") {
            checkElement = `<span class="check done"><input class="checkbox" type="checkbox" id="checkmark" checked> <button class="done">Mark "Open"</button></span>`;
        } else {
            checkElement = `<span class="check open"><input class="checkbox" type="checkbox" id="checkmark"> <button class="done">Mark "Done"</button></span>`;
        }

        this.visitCard.innerHTML = `
            <span class="delete-modal">
            <img width="35px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXlY9LX-DeiAsGRMtm3qORPvue0530zBDYrQ&usqp=CAU"
            alt="img">
            </span>
            <ul class="visit-list">
                <li class="js-fullName">Name & Surname: <p>${this.fullName}</p></li>
                <li>Doctor: <span class="js-doctor">${this.doctor}</span> </li>
                <button class="show-more-btn"> Show more </button>
                ${checkElement}
            </ul>`;

        this.visitCard.querySelector(".done").addEventListener("click", this.checkStatus.bind(this))

        this.moreList = this.visitCard.querySelector('.visit-list');

        this.renderSpecifics();

        this.removeBtn = this.visitCard.querySelector('.delete-modal');

        this.editBtn = document.createElement("div");

        this.editBtn.innerHTML = `<a class="create-visit"><span class="logo-name">Edit</span></a>`;
        this.editBtn.classList.add('visit-buttons');
        this.visitCard.appendChild(this.editBtn);

        this.editBtn.addEventListener("click", this.startEdit.bind(this));

        this.removeBtn.addEventListener("click", this.delete.bind(this));
    }

    specificContent() {

        this.showMoreItem = this.showMoreList.querySelectorAll('li');

        this.showMoreBtn.textContent = 'Show Less';

        this.showMoreItem.forEach(el => el.classList.add('showMore-list-active'));

        this.showMoreBtn.addEventListener('click', this.showLess.bind(this));


    }

    showMore() {

        this.showMoreBtn = this.visitCard.querySelector('.show-more-btn');
        this.showMoreBtn.classList.add('showMore');
        this.showMoreBtn.addEventListener("click", this.specificContent.bind(this));
    }

    showLess() {

        this.showMoreItem.forEach(el => el.classList.remove('showMore-list-active'));
        this.showMoreBtn.textContent = 'Show More';

        this.showMore();

    }

    urgencySelecting() {
        switch (this.urgencySelected.selectedIndex) {
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


    delete() {
        this.collection.removeById(this.id);
    }

}