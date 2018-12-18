const express = require('express');
const Activity = require('../models/Activity');
const APIError = require('../utils/APIError.js');

const router = express.Router();

router.get('/', (req, res) => {
    const activity = new Activity(req.query);
    activity.read()
    .then(data => {res.json({activities: data});})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

router.post('/', (req, res) => {
    const activity = new Activity(req.body);
    activity.create()
    .then(([data]) => {res.status(201).json(data);})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

router.get('/:id', (req, res) => {
    const activity = new Activity({id: req.params.id});
    activity.read()
    .then(([data]) => {
        if (data === undefined) {
            throw new APIError('Not found', 404);
        }
        res.json(data);
    })
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

router.delete('/:id', (req, res) => {
    const activity = new Activity({id: req.params.id});
    activity.delete()
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

router.put('/:id', (req, res) => {
    const {id, ...newData} = req.body;
    const activity = new Activity({id: req.params.id, ...newData});
    activity.update()
    .then(() => {res.json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

module.exports = router;