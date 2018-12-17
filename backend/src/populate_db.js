const axios = require('axios');

const users = [{'email':'ken2nyww1sws@mail.com', 'password': '123456'},
               {'email':'eri2ca2sww@mail.com', 'password': '123456'}];
const places = [{"country" :"Canada", "city": "Toronto"}, {"country" :"Cyprus", "city": "Nicosia"}];
const activities = [{"name": "Swimming"}, {"name": "Dancing"}];
const events = [
    {
        "name" : "Event 1",
        "description" : "Event description 1",
        "activity_id" : activities[0]['id'],
        "place_id": places[1]['id'],
        "date_from" : "2018-12-20 22:00:00.0",
        "date_to" : "2018-12-20 23:00:00.0",
        "min_people" : 2,
        "max_people" : 4
    },
    {
        "name" : "Event 2",
        "description" : "Event description 2",
        "activity_id" : activities[1]['id'],
        "place_id": places[0]['id'],
        "date_from" : "2018-12-17 22:00:00.0",
        "date_to" : "2018-12-17 23:00:00.0",
        "min_people" : 3,
        "max_people" : 6
    }
];

const URL = 'http://docker.vm:8000';

Promise.all([
    ...users.map((user, pos) => axios.post(`${URL}/auth/register`, user)
        .then(() => axios.post(`${URL}/auth/login`, user))
        .then((res) => {users[pos]['token'] = res.data.token; console.log(res);})
        .catch(console.log))])
    .then(() => Promise.all([
        ...places.map((place, pos) => axios.post(`${URL}/places`, place, {headers: {Authorization: `Bearer ${users[1]['token']}`}})
            .then(() => axios.get(`${URL}/places`, {headers: {Authorization: `Bearer ${users[1]['token']}`}}))
            .then((res) => {places[pos]['id'] = res.data.id; console.log("PLACES: ", res);})
            .catch(console.log)),

        ...activities.map((activity, pos) => axios.post(`${URL}/activities`, activity, {headers: {Authorization: `Bearer ${users[1]['token']}`}})
            .then(() => axios.get(`${URL}/activities`, {headers: {Authorization: `Bearer ${users[1]['token']}`}}))
            .then((res) => {activities[pos]['id'] = res.data.id; console.log("ACTIVITIES: ", res);})
            .catch(console.log))
        ]))
    .then(() => {
        events.forEach((eve, pos) => {
            // axios.post(`${URL}/events`, eve, {headers: {Authorization: `Bearer ${users[1]['token']}`}})
            // .then(() => axios.get(`${URL}/events`, {headers: {Authorization: `Bearer ${users[1]['token']}`}}))
            // .then((res) => {events[pos]['id'] = res.data.id; console.log("EVENTS: ", events);})
            // .catch(console.log);
        });
    })
    .catch(console.log);
