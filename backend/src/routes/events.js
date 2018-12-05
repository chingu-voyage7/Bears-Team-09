const express = require('express');

const router = express.Router();

// this one will be protected
router.get('/', (req, res) => {
  res.json({message: 'list events placeholder'});
});

router.post('/', (req, res) => {
    res.json({message: 'create event placeholder'});
});

router.get('/:id', (req, res) => {
    res.json({message: 'get event placeholder'});
});

router.delete('/:id', (req, res) => {
    res.json({message: 'delete event placeholder'});
});

router.put('/:id', (req, res) => {
    res.json({message: 'update event placeholder'});
});

module.exports = router;