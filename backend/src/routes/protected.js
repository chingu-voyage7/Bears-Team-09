const express = require('express'),
      router = express.Router();

// this one will be protected
router.get('/', function login(req, res, next) {
  res.json({message: 'Some protected data'})
});

module.exports = router;