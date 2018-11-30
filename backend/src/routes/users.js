const express = require('express'),
      router = express.Router();

// this one will be protected
router.get('/', function login(req, res) {
  res.json({message: 'get active user placeholder'})
});

// router.delete('/', function login(req, res) {
//     res.json({message: 'delete user placeholder'})
// });

router.put('/', function login(req, res) {
    res.json({message: 'update active user placeholder'})
});

module.exports = router;