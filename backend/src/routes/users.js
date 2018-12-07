const express = require('express');
const Attendee = require('../models/EventAttendees');

const router = express.Router();

// this one will be protected
router.get('/', (req, res) => {
  res.json(req.user.data);
});

router.delete('/', (req, res) => {
    req.user.delete()
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

router.put('/', (req, res) => {
  const { user } = req;
  user.data = req.body;
  user.update()
  .then(() => {res.json();})
  .catch(err => {res.status(err.statusCode || 400).json({message: err.message}); });
});

router.get('/events', (req, res) => {
  const attendee = new Attendee();
  attendee.getAllEvents(req.user[req.user.pk])
  .then(data => {res.json({events: data});})
  .catch(err => {res.status(err.statusCode || 400).json({message: err.message}); });
});

router.get('/:id/events', (req, res) => {
  const attendee = new Attendee();
  attendee.getAllEvents(req.params.id)
  .then(data => {res.json({events: data});})
  .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});
module.exports = router;