const express = require('express'),
      passport = require('../middleware/passport'),
      User = require('../models/User'),
      router = express.Router(),
      bcrypt = require('bcrypt');

router.post('/login', function (req, res) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({message: info});
        }

       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           const token = user.refreshToken();
           return res.json({...user.data, token});
        });
    })(req, res);
});

router.post('/register', function (req, res) {
    const {password, ...rest} = req.body;
    // temporary, replace with propper validation
    if (!password) {
        res.status(400).json({message: 'password not set'});;
    };
    let user;
    bcrypt.hash(password, 10)
    .then(hash => {
        user = new User({...rest, password: hash});
        return user.create();
    })
    .then(() => res.json({...user.data, token: user.refreshToken()}))
    .catch(err => res.send(err));
});

module.exports = router;