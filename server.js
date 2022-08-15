const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3000, function () {
    console.log('Listening on 3000');
});

function controlLogin() {
    const registeredUsers = [];
    class User {
        constructor(email, password) {
            this.email = email;
            this.password = password
        }
    }

    const user1 = new User("punch@gmail.com", "punch");
    registeredUsers.push(user1);
    const user2 = new User("shoulder_roll@mail.ru", "roll");
    registeredUsers.push(user2);
    const user3 = new User("bodyshot@gmail.com", "shot");
    registeredUsers.push(user3);

    app.get('/user', function (req, res) {
        res.send(registeredUsers);
    });
}


function manageVisit() {
    const dentistVisitList = [];
    const therapistVisitList = [];
    const cardiologistVisitList = [];
    let dentistId = 0;
    let therapistId = 0;
    let cardiologistId = 0;


    app.get('/dentist', function (req, res) {
        res.send(dentistVisitList);
    })

    app.get('/therapist', function (req, res) {
        res.send(therapistVisitList);
    })
    app.get('/cardiologist', function (req, res) {
        res.send(cardiologistVisitList);
    })

    function registerVisit(newVisit, visitList, visitId) {
        const visitWithId = {
            id: visitId,
            ...newVisit
        };
        visitList.push(visitWithId);
        return visitWithId;
    }

    app.post('/dentist', function (req, res) {
        const newVisit = req.body;
        dentistId++;
        res.send(registerVisit(newVisit, dentistVisitList, dentistId));
    });

    app.post('/therapist', function (req, res) {
        const newVisit = req.body;
        therapistId++;
        res.send(registerVisit(newVisit, therapistVisitList, therapistId))
    });

    app.post('/cardiologist', function (req, res) {
        const newVisit = req.body;
        cardiologistId++
        res.send(registerVisit(newVisit, cardiologistVisitList, cardiologistId))
    });

    function editVisit(list, id, visit) {
        const oldVisitIndex = list.findIndex((visit) => visit.id === Number(id));
        const oldVisit = list[oldVisitIndex];
        const updatedVisit = {
            ...oldVisit,
            ...visit
        };
        list[oldVisitIndex] = updatedVisit;
        return updatedVisit;
    }

    app.patch('/dentist/:id', function (req, res) {
        const visit = req.body;
        const id = req.params.id;
        res.send(editVisit(dentistVisitList, id, visit));
    });

    app.patch('/therapist/:id', function (req, res) {
        const visit = req.body;
        const id = req.params.id;
        res.send(editVisit(therapistVisitList, id, visit));
    });

    app.patch('/cardiologist/:id', function (req, res) {
        const visit = req.body;
        const id = req.params.id;
        res.send(editVisit(cardiologistVisitList, id, visit));
    });

    function deleteVisit(id, list) {
        const index = list.findIndex((visit) => {
            return visit.id === Number(id);
        });
        const visitToRemove = list[index];
        list.splice(index, 1);
        return visitToRemove;
    }

    app.delete('/dentist/:id', function (req, res) {
        const id = req.params.id;
        res.send(deleteVisit(id, dentistVisitList));
    })

    app.delete('/therapist/:id', function (req, res) {
        const id = req.params.id;
        res.send(deleteVisit(id, therapistVisitList));
    })

    app.delete('/cardiologist/:id', function (req, res) {
        const id = req.params.id;
        res.send(deleteVisit(id, cardiologistVisitList));
    })

}

controlLogin();
manageVisit();