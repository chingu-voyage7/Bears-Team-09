const express = require('express');
const passport = require('../middleware/passport');
const User = require('../models/User');

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = req.user.refreshToken();
    return res.json({token});
});

router.post('/login', (req, res) => {
    passport.authenticate('local', {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(err.statusCode || 400).json({message: err.message});
        }

        req.login(user, {session: false}, (error) => {
           if (error) {
               return res.status(400).json({message: error.message});
           }
           const token = user.refreshToken();
           return res.json({token});
        });
        return res;
    })(req, res);
});

router.post('/register', (req, res) => {
    const {password} = req.body;
    // temporary, replace with propper validation
    if (!password) {
        return res.status(400).json({message: 'password not set'});
    };
    const user = new User(req.body);
    user.create()
    .then(() => {res.status(201).json();})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
    return res;
});

module.exports = router;