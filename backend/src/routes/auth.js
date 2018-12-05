const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('../middleware/passport');
const User = require('../models/User');

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = new User(req.user);
    const token = user.refreshToken();
    return res.json({token});
});

router.post('/login', (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({message: info.message});
        }

        req.login(user, {session: false}, (error) => {
           if (error) {
               return res.json(error);
           }
           delete user.data.password;
           const token = user.refreshToken();
           return res.json({email: user.email, ...user.data, token});
        });
        return res;
    })(req, res);
});

router.post('/register', (req, res) => {
    const {password, ...rest} = req.body;
    // temporary, replace with propper validation
    if (!password) {
        return res.status(400).json({message: 'password not set'});
    };
    let user;
    bcrypt.hash(password, 10)
    .then(hash => {
        user = new User({...rest, password: hash});
        return user.create();
    })
    .then(() => user.read())
    .then(([data]) => {
        const token = user.refreshToken();
        delete data.password;
        return res.json({...data, token});
    })
    .catch(err => res.status(400).json({message: err.message}));
    return res;
});

module.exports = router;