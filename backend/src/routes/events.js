const express = require('express');
const Event = require('../models/Event');
const Attendee = require('../models/EventAttendees');

const eventRouter = express.Router();

// list all events, with parameters
eventRouter.get('/', (req, res) => {
    const newEvent = new Event();
    newEvent.read()
    .then(data => {res.json({events: data});})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// create an event
eventRouter.post('/', (req, res) => {
    const newEvent = new Event(req.body);
    newEvent.create()
    .then(() => newEvent.read())
    .then(([data]) => {
        const attendee = new Attendee({
            user_id: req.user[req.user.pk],
            event_id: data.id
        });
        return attendee.create();
    })
    .then(() => {
        res.status(201).json();
    })
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// get event info
eventRouter.get('/:id', (req, res) => {
    const newEvent = new Event({id: req.params.id});
    newEvent.read()
    .then(([data]) => {
        if (data === undefined) {
            throw new {message: 'Not found', statusCode: 404};
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

// update and event
eventRouter.put('/:id', (req, res) => {
    const newEvent = new Event({id: req.params.id});
    newEvent.data = req.body;
    newEvent.update()
    .then(() => {res.json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// subscribe to attend an event
eventRouter.post('/:id/attend', (req, res) => {
    const attendee = new Attendee({
        user_id: req.user[req.user.pk],
        event_id: req.params.id
    });
    attendee.create()
    .then(() => {res.status(201).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// unsubscribe from attending an event
eventRouter.delete('/:id/attend', (req, res) => {
    const attendee = new Attendee({
        user_id: req.user[req.user.pk],
        event_id: req.params.id
    });
    attendee.read()
    .then(([data]) => {
        attendee[attendee.pk] = data[attendee.pk];
        return attendee.delete();
    })
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});


module.exports = eventRouter;