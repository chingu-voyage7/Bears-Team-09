const express = require('express'),
      router = express.Router();

// this one will be protected
router.get('/', function login(req, res) {
  res.json({message: 'list events placeholder'})
});

router.post('/', function login(req, res) {
    res.json({message: 'create event placeholder'})
});

router.get('/:id', function login(req, res) {
    res.json({message: 'get event placeholder'})
});

router.delete('/:id', function login(req, res) {
    res.json({message: 'delete event placeholder'})
});

router.put('/:id', function login(req, res) {
    res.json({message: 'update event placeholder'})
});

module.exports = router;