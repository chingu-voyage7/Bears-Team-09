const express = require('express');
const Event = require('../models/Event');
const Attendee = require('../models/EventAttendee');
const APIError = require('../utils/APIError.js');
const upload  = require('../utils/upload');

const router = express.Router();

// list all events, with parameters
router.get('/', (req, res) => {
    const newEvent = new Event(req.query);
    newEvent.read()
    .then(data => {res.json({events: data});})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// create an event
router.post('/', (req, res) => {
    const newEvent = new Event(req.body);
    newEvent.create()
    .then(([data]) => {
        newEvent.data = data;
        const attendee = new Attendee({
            user_id: req.user.data.id,
            event_id: data.id
        });
        return attendee.create();
    })
    .then(() => {
        res.status(201).json(newEvent.data);
    })
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// get event info
router.get('/:id', (req, res) => {
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

router.get('/:id/attendees', (req, res) => {
    const attendees = new Attendee({event_id: req.params.id});
    attendees.getAllAttendees()
    .then((data) => {
        res.json(data);
    })
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// delete an event
router.delete('/:id', (req, res) => {
    const newEvent = new Event({id: req.params.id});
    newEvent.delete()
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// update an event
router.put('/:id', (req, res) => {
    const {id, ...newData} = req.body;
    const newEvent = new Event({id: req.params.id, ...newData});
    newEvent.update()
    .then(() => {res.json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// subscribe to attend an event
router.post('/:id/attend', (req, res) => {
    const e = new Event({id: req.params.id});
    const attendees = new Attendee({event_id: req.params.id});
    const attendee = new Attendee({
        user_id: req.user[req.user.pk],
        event_id: req.params.id
    });
    let maxPeople;
    e.read()
    .then(([data]) => {
        maxPeople = Number(data.max_people);
        return attendees.getAllAttendees();
    })
    .then(data => {
        if (maxPeople && data.length >= maxPeople) {
            throw new APIError('Event is completely booked', 403);
        }
        return attendee.create();
    })
    .then(() => {res.status(201).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

router.post('/images', (req, res) => {
    const imageHandler = upload('events', { width: 100, height: 150, crop: 'limit' }).single('file');
    imageHandler(req, res, (err) => {
      if (err) {
        res.status(400).json({message: err.message});
      } else if (!req.file) {
        res.status(400).json({message: 'File is not set'});
      } else {
        res.status(201).json({url: req.file.secure_url});
      }
    });
    return res;
  });

// unsubscribe from attending an event
router.delete('/:id/attend', (req, res) => {
    const attendee = new Attendee({
        user_id: req.user[req.user.pk],
        event_id: req.params.id
    });
    attendee.delete()
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});


module.exports = router;