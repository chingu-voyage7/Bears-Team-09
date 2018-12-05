const express = require('express');

const router = express.Router();

// this one will be protected
router.get('/', (req, res) => {
  res.json({message: 'list activities placeholder'});
});

router.post('/', (req, res) => {
    res.json({message: 'create activity placeholder'});
});

router.get('/:id', (req, res) => {
    res.json({message: 'get activity placeholder'});
});

router.delete('/:id', (req, res) => {
    res.json({message: 'delete activity placeholder'});
});

router.put('/:id', (req, res) => {
    res.json({message: 'update activity placeholder'});
});

module.exports = router;