// DB Population script, use settings from ../models/db.js

const User = require('../models/User');
const Place = require('../models/Place');
const Activity = require('../models/Activity');
const Event = require('../models/Event');
const Attendee = require('../models/EventAttendee');

const data = {
    users: [
        {email: "kenny2000@gmail.com", first_name: "Kenneth", last_name: "McCormick", password: "123456"},
        {email: "stan.marsh@gmail.com", first_name: "Stanley", last_name: "Marsh", password: "123456"},
        {email: "broflovsky.k@gmail.com", first_name: "Kyle", last_name: "Broflovsky", password: "123456"}
    ],
    places: [
        {country: "Canada", city: "Toronto"},
        {country: "United States of America", city: "Washington"}
    ],
    activities: [
        {name: "Social events"},
        {name: "Sport events"},
        {name: "Music events"},
    ],
    events: [
        {name: "Local ComicCon", author_id: 0, activity_id: 0, place_id: 0, date_from: "2019-03-09 09:00:00.0", date_to: "2018-03-10 20:00:00.0", min_people: 4, descriptio: "Join me for the first South Park Comic-Con"},
        {name: "Basketball match", author_id: 2, activity_id: 1, place_id: 1, date_from: "2019-02-17 20:00:00.0", date_to: "2018-12-17 22:00:00.0", max_people: 2, descriptio: "Lorem ipsum Lorem ipsum Lorem ipsum"},
        {name: "Music concert", author_id: 1, activity_id: 2, place_id: 1, date_from: "2019-02-24 19:00:00.0", date_to: "2018-02-24 21:00:00.0", max_people: 4, descriptio: "Lorem ipsum Lorem ipsum Lorem ipsum"},
    ],
    event_attendees: [
        {event_id: 0, user_id: 0},
        {event_id: 0, user_id: 1},
        {event_id: 0, user_id: 2},
        {event_id: 1, user_id: 2},
        {event_id: 1, user_id: 1},
        {event_id: 2, user_id: 1},
    ]
};

Promise.all(
    // create users, activities and places first and append their id's to base object
    data.users.map((userData, pos) => (new User(userData)).create().then((res) => {data.users[pos].id = res.id;}).catch(console.log)),
    data.places.map((placeData, pos) => (new Place(placeData)).create().then(([res]) => {data.places[pos].id = res.id;}).catch(console.log)),
    data.activities.map((activityData, pos) => (new Activity(activityData)).create().then(([res]) => {data.activities[pos].id = res.id;}).catch(console.log))
)
// Create events
.then(() => Promise.all(
    data.events
           .map(eventData => {
                const fullEventData = {...eventData, author_id: data.users[eventData.author_id].id, activity_id: data.activities[eventData.activity_id].id};
                if ('place_id' in eventData) {
                    fullEventData.place_id = data.places[eventData.place_id].id;
                }
                return fullEventData;
           })
           .map((eventData, pos) => (new Event(eventData)).create().then(([res]) => {data.events[pos].id = res.id;}).catch(console.log))
))
// create event attendees
.then(() => {
    data.event_attendees.map((eaData) => {
        const fullEAData = {event_id: data.events[eaData.event_id].id, user_id: data.users[eaData.user_id].id};
        return (new Attendee(fullEAData)).create().catch(console.log);
    });
})
.catch(console.log);

