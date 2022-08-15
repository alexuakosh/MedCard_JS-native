import { blackBack, cardModal } from "./script.min.js"

export default class Filter {
    constructor() {
        this.filterElement = document.querySelector(".filter");

        this.urgencyFilter = document.querySelector(".js-urgency-filter");
        this.urgency = "All";
        this.urgencyFilter.addEventListener("change", this.filterByUrgency.bind(this));

        this.doctorFilter = document.querySelector(".js-doctor-filter");
        this.doctor = "All"
        this.doctorFilter.addEventListener("change", this.filterByDoctor.bind(this))

        this.name = document.querySelector(".js-name-filter");
        this.name.addEventListener("input", this.filterByName.bind(this))

        this.statusFilter = document.querySelector(".js-status-filter");
        this.status = "All";
        this.statusFilter.addEventListener("change", this.filterByStatus.bind(this));
    }

    loadFilter() {
        const noItems = document.querySelector(".no-items");
        const cardsFromUI = document.getElementsByClassName("Visit-Card");
        this.cards = [...cardsFromUI];

        if (this.cards.length !== 0) {
            noItems.classList.add('disActivated');
            this.filterElement.classList.add('active');
            cardModal.classList.remove("active");
            blackBack.classList.remove("active");
        } else {
            noItems.classList.remove('disActivated');
            this.filterElement.classList.remove('active');
        }
    }
    filterByUrgency() {
        const filteredByNameFromIU = document.getElementsByClassName("js-filter-byName");
        const filteredByName = [...filteredByNameFromIU];
        const filteredByDoctorFromIU = document.getElementsByClassName("js-filter-byDoctor");
        const filteredByDoctor = [...filteredByDoctorFromIU];
        const filteredByStatusFromIU = document.getElementsByClassName("js-filter-byStatus");
        const filteredByStatus = [...filteredByStatusFromIU];

        let filtered = [];

        filteredByName.forEach(filteredName => {
            filteredByDoctor.forEach(filteredDoctor => {
                filteredByStatus.forEach(filteredStatus => {
                    if (filteredStatus === filteredName && filteredStatus === filteredDoctor) {
                        filtered.push(filteredStatus);
                    }
                })
            })
        })

        switch (this.urgencyFilter.selectedIndex) {
            case 0:
                this.urgency = "All";
                break;
            case 1:
                this.urgency = "regular";
                break;
            case 2:
                this.urgency = "priority";
                break;
            case 3:
                this.urgency = "urgent";
                break;
            default:
                this.urgency = "All";
        }

        this.cards.forEach(card => {
            const urgency = card.querySelector(".js-urgency");
            card.classList.add("js-filter-byUrgency");

            if (urgency.innerHTML !== this.urgency) {
                card.classList.remove("js-filter-byUrgency");
            }
            if (this.urgency === "All") {
                card.classList.add("js-filter-byUrgency");
            }
        })

        filtered.forEach(card => {
            const urgency = card.querySelector(".js-urgency");
            card.classList.remove("disActivated");
            if (urgency.innerHTML !== this.urgency) {
                card.classList.add("disActivated");
            }
            if (this.urgency === "All") {
                card.classList.remove("disActivated");
            }
        })
    }

    filterByDoctor() {
        const filteredByNameFromIU = document.getElementsByClassName("js-filter-byName");
        const filteredByName = [...filteredByNameFromIU];
        const filteredByUrgencyFromIU = document.getElementsByClassName("js-filter-byUrgency");
        const filteredByUrgency = [...filteredByUrgencyFromIU];
        const filteredByStatusFromIU = document.getElementsByClassName("js-filter-byStatus");
        const filteredByStatus = [...filteredByStatusFromIU];

        let filtered = [];

        filteredByName.forEach(filteredName => {
            filteredByUrgency.forEach(filteredUrgency => {
                filteredByStatus.forEach(filteredStatus => {
                    if (filteredStatus === filteredName && filteredStatus === filteredUrgency) {
                        filtered.push(filteredStatus);
                    }
                })
            })
        })

        switch (this.doctorFilter.selectedIndex) {
            case 0:
                this.doctor = "All";
                break;
            case 1:
                this.doctor = "cardiologist";
                break;
            case 2:
                this.doctor = "dentist";
                break;
            case 3:
                this.doctor = "therapist";
                break;
            default:
                this.doctor = "All";
        }

        this.cards.forEach(card => {
            const doctor = card.querySelector(".js-doctor");
            card.classList.add("js-filter-byDoctor");

            if (doctor.innerHTML !== this.doctor) {
                card.classList.remove("js-filter-byDoctor");
            }
            if (this.doctor === "All") {
                card.classList.add("js-filter-byDoctor");
            }
        })

        filtered.forEach(card => {
            const doctor = card.querySelector(".js-doctor");
            card.classList.remove("disActivated");

            if (doctor.innerHTML !== this.doctor) {
                card.classList.add("disActivated");
            }
            if (this.doctor === "All") {
                card.classList.remove("disActivated");
            }
        })
    }

    filterByName(e) {
        this.filteredByDoctorFromIU = document.getElementsByClassName("js-filter-byDoctor");
        this.filteredByDoctor = [...this.filteredByDoctorFromIU];
        this.filteredByUrgencyFromIU = document.getElementsByClassName("js-filter-byUrgency");
        this.filteredByUrgency = [...this.filteredByUrgencyFromIU];
        this.filteredByStatusFromIU = document.getElementsByClassName("js-filter-byStatus");
        this.filteredByStatus = [...this.filteredByStatusFromIU];

        let filtered = [];

        this.filteredByDoctor.forEach(filteredDoctor => {
            this.filteredByUrgency.forEach(filteredUrgency => {
                this.filteredByStatus.forEach(filteredStatus => {
                    if (filteredStatus === filteredDoctor && filteredStatus === filteredUrgency) {
                        filtered.push(filteredStatus);
                    }
                })
            })
        })

        this.cards.forEach(card => {
            const fullName = card.querySelector(".js-fullName");
            card.classList.add("js-filter-byName");
            if (!fullName.innerHTML.includes(e.target.value) && !fullName.innerHTML.toLowerCase().includes(e.target.value)) {
                card.classList.remove("js-filter-byName");
            }

        })

        filtered.forEach(card => {
            const fullName = card.querySelector(".js-fullName");
            card.classList.remove("disActivated");

            if (!fullName.innerHTML.includes(e.target.value) && !fullName.innerHTML.toLowerCase().includes(e.target.value)) {
                card.classList.add("disActivated");
            }
        })
    }

    filterByStatus() {
        const filteredByNameFromIU = document.getElementsByClassName("js-filter-byName");
        const filteredByName = [...filteredByNameFromIU];
        const filteredByDoctorFromIU = document.getElementsByClassName("js-filter-byDoctor");
        const filteredByDoctor = [...filteredByDoctorFromIU];
        const filteredByUrgencyFromIU = document.getElementsByClassName("js-filter-byUrgency");
        const filteredByUrgency = [...filteredByUrgencyFromIU];

        let filtered = [];

        filteredByName.forEach(filteredName => {
            filteredByDoctor.forEach(filteredDoctor => {
                filteredByUrgency.forEach(filteredUrgency => {
                    if (filteredUrgency === filteredName && filteredUrgency === filteredDoctor) {
                        filtered.push(filteredUrgency);
                    }
                })
            })
        })

        switch (this.statusFilter.selectedIndex) {
            case 0:
                this.status = "All";
                break;
            case 1:
                this.status = "open";
                break;
            case 2:
                this.status = "done";
                break;
            default:
                this.status = "All";
        }

        this.cards.forEach(card => {
            const status = card.querySelector(".check");
            card.classList.add("js-filter-byStatus");

            if (!status.classList.contains(this.status)) {
                card.classList.remove("js-filter-byStatus");
            }
            if (this.status === "All") {
                card.classList.add("js-filter-byStatus");
            }
        })

        filtered.forEach(card => {
            const status = card.querySelector(".check");
            card.classList.remove("disActivated");
            if (!status.classList.contains(this.status)) {
                card.classList.add("disActivated");
            }
            if (this.status === "All") {
                card.classList.remove("disActivated");
            }
        })
    }

}

