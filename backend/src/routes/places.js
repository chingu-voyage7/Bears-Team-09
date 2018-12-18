const express = require('express');
const Place = require('../models/Place');
const APIError = require('../utils/APIError.js');

const router = express.Router();

// List
router.get('/', (req, res) => {
    const place = new Place(req.query);
    place.read()
    .then(data => {res.json({places: data});})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// Create
router.post('/', (req, res) => {
    const place = new Place(req.body);
    place.create()
    .then(([data]) => {res.status(201).json(data);})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// Get one
router.get('/:id', (req, res) => {
    const place = new Place({id: req.params.id});
    place.read()
    .then(([data]) => {
        if (data === undefined) {
            throw new APIError('Not found', 404);
        }
        res.json(data);
    })
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// delete one
router.delete('/:id', (req, res) => {
    const place = new Place({id: req.params.id});
    place.delete()
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

// update one
router.put('/:id', (req, res) => {
    const {id, ...newData} = req.body;
    const place = new Place({id: req.params.id, ...newData});
    place.update()
    .then(() => {res.json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

module.exports = router;