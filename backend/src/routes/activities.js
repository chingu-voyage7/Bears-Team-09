const express = require('express'),
      router = express.Router();

// this one will be protected
router.get('/', function login(req, res) {
  res.json({message: 'list activities placeholder'})
});

router.post('/', function login(req, res) {
    res.json({message: 'create activity placeholder'})
});

router.get('/:id', function login(req, res) {
    res.json({message: 'get activity placeholder'})
});

router.delete('/:id', function login(req, res) {
    res.json({message: 'delete activity placeholder'})
});

router.put('/:id', function login(req, res) {
    res.json({message: 'update activity placeholder'})
});

module.exports = router;