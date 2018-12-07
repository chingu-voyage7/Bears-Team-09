const express = require('express');
const Activity = require('../models/Activity');

const router = express.Router();

// this one will be protected
router.get('/', (req, res) => {
    const activity = new Activity();
    activity.read()
    .then(data => {res.json(data);})
    .catch(err => {res.status(400).json({message: err.message});});
});

router.post('/', (req, res) => {
    const activity = new Activity(req.body);
    activity.create()
    .then(() => activity.read())
    .then(([data]) => {res.json(data);})
    .catch(err => {res.status(400).json({message: err.message});});
});

router.get('/:id', (req, res) => {
    const activity = new Activity({id: req.params.id});
    activity.read()
    .then(([data]) => {
        if (data === undefined) {
            res.status(404).json({message: 'Not found'});
            return;
        }
        res.json(data);
    })
    .catch(err => {res.status(400).json({message: err.message});});
});

router.delete('/:id', (req, res) => {
    const activity = new Activity({id: req.params.id});
    activity.delete()
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(400).json({message: err.message});});
});

router.put('/:id', (req, res) => {
    const activity = new Activity({id: req.params.id});
    activity.data = req.body;
    activity.update()
    .then(() => activity.read())
    .then(([data]) => {res.json(data);})
    .catch(err => {res.status(400).json({message: err.message});});
});

module.exports = router;