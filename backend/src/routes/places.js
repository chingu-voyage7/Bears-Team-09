const express = require('express');
const Place = require('../models/Place');

const router = express.Router();

router.get('/', (req, res) => {
    const place = new Place();
    place.read()
    .then(data => {res.json({places: data});})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

router.post('/', (req, res) => {
    const place = new Place(req.body);
    place.create()
    .then(() => {res.status(201).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

router.get('/:id', (req, res) => {
    const place = new Place({id: req.params.id});
    place.read()
    .then(([data]) => {
        if (data === undefined) {
            throw {message: 'Not found', statusCode: 404};
        }
        res.json(data);
    })
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

router.delete('/:id', (req, res) => {
    const place = new Place({id: req.params.id});
    place.delete()
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

router.put('/:id', (req, res) => {
    const place = new Place({id: req.params.id});
    place.data = req.body;
    place.update()
    .then(() => {res.json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
});

module.exports = router;