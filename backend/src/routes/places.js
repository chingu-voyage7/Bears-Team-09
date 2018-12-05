const express = require('express');

const router = express.Router();

// this one will be protected
router.get('/', (req, res) => {
  res.json({message: 'list places placeholder'});
});

router.post('/', (req, res) => {
    res.json({message: 'create place placeholder'});
});

router.get('/:id', (req, res) => {
    res.json({message: 'get place placeholder'});
});

router.delete('/:id', (req, res) => {
    res.json({message: 'delete place placeholder'});
});

router.put('/:id', (req, res) => {
    res.json({message: 'update place placeholder'});
});

module.exports = router;