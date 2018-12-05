const express = require('express'),
      router = express.Router();

// this one will be protected
router.get('/', function login(req, res) {
  res.json({message: 'list places placeholder'})
});

router.post('/', function login(req, res) {
    res.json({message: 'create place placeholder'})
});

router.get('/:id', function login(req, res) {
    res.json({message: 'get place placeholder'})
});

router.delete('/:id', function login(req, res) {
    res.json({message: 'delete place placeholder'})
});

router.put('/:id', function login(req, res) {
    res.json({message: 'update place placeholder'})
});

module.exports = router;