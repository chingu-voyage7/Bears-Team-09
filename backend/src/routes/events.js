const express = require('express');
const Event = require('../models/Event');
const Attendee = require('../models/EventAttendee');
const APIError = require('../utils/APIError.js');

const eventRouter = express.Router();

// list all events, with parameters
eventRouter.get('/', (req, res) => {
    const newEvent = new Event(req.query);
    newEvent.read()
    .then(data => {res.json({events: data});})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// create an event
eventRouter.post('/', (req, res) => {
    const newEvent = new Event(req.body);
    newEvent.create()
    .then(([{id}]) => {
        newEvent.data.id = id;
        const attendee = new Attendee({
            userid: req.user[req.user.pk],
            eventid: id
        });
        return attendee.create();
    })
    .then(() => {
        res.status(201).json(newEvent.data);
    })
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// get event info
eventRouter.get('/:id', (req, res) => {
    const newEvent = new Event({id: req.params.id});
    newEvent.read()
    .then(([data]) => {
        if (data === undefined) {
            throw new APIError('Not found', 404);
        }
        res.json(data);
    })
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// delete an event
eventRouter.delete('/:id', (req, res) => {
    const newEvent = new Event({id: req.params.id});
    newEvent.delete()
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// update an event
eventRouter.put('/:id', (req, res) => {
    const {id, ...newData} = req.body;
    const newEvent = new Event({id: req.params.id, ...newData});
    newEvent.update()
    .then(() => {res.json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// subscribe to attend an event
eventRouter.post('/:id/attend', (req, res) => {
    const attendee = new Attendee({
        userid: req.user[req.user.pk],
        eventid: req.params.id
    });
    attendee.create()
    .then(() => {res.status(201).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// unsubscribe from attending an event
eventRouter.delete('/:id/attend', (req, res) => {
    const attendee = new Attendee({
        userid: req.user[req.user.pk],
        eventid: req.params.id
    });
    attendee.delete()
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});


module.exports = eventRouter;