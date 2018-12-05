const express = require('express');
const User = require('../models/User');

const router = express.Router();

// this one will be protected
router.get('/', (req, res) => {
  res.json(req.user);
});

// router.delete('/', function login(req, res) {
//     res.json({message: 'delete user placeholder'})
// });

router.put('/', (req, res) => {
  const user = new User(req.user);
  user.data = req.body;
  user.update()
  .then(() => user.read())
  .then(([data]) => {
    delete data.password;
    return res.json(data);
  })
  .catch(res.json);
});

module.exports = router;