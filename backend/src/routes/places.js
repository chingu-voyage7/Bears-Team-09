const express = require('express');
const Place = require('../models/Place');

const router = express.Router();

// this one will be protected
router.get('/', (req, res) => {
    const place = new Place();
    place.read()
    .then(data => {res.json(data);})
    .catch(err => {res.status(400).json({message: err.message});});
});

router.post('/', (req, res) => {
    const place = new Place(req.body);
    place.create()
    .then(() => place.read())
    .then(([data]) => {res.json(data);})
    .catch(err => {res.status(400).json({message: err.message});});
});

router.get('/:id', (req, res) => {
    const place = new Place({id: req.params.id});
    place.read()
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
    const place = new Place({id: req.params.id});
    place.delete()
    .then(() => {res.status(204).json();})
    .catch(err => {res.status(400).json({message: err.message});});
});

router.put('/:id', (req, res) => {
    const place = new Place({id: req.params.id});
    place.data = req.body;
    place.update()
    .then(() => place.read())
    .then(([data]) => {res.json(data);})
    .catch(err => {res.status(400).json({message: err.message});});
});

module.exports = router;