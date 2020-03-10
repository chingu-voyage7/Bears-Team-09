const passport = require('passport');
const express = require('express');
const User = require('../models/User');
require('../middleware/googleAuth');

const router = express.Router();

// router.get('/', authenticate('jwt'), (req, res) => {
//     const token = req.user.refreshToken();
//     return res.json({ token });
// });

// router.post('/login', authenticate('local'), (req, res) => {
//     const token = req.user.refreshToken();
//     return res.json({ ...req.user.data, token });
// });

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: "offline",
    session: true
}));

router.get('/googleAuthSuccess', passport.authenticate('google'), (req, res) => {
    const token = (new User({ id: req.user.id })).refreshToken();

    res.send({ data: req.user, token });
    // res.redirect('http://localhost:3100');
});

router.get('/view', (req, res) => {
    console.log('cookies = ', req.cookies);
    console.log('user = ', req.user);
    res.header({ 'test-header': 'test-value' });
    res.send({ cookies: req.cookies, user: req.user });
});


router.post('/register', (req, res) => {
    const { password } = req.body;
    // temporary, replace with proper validation
    if (!password) {
        return res.status(400).json({ message: 'password not set' });
    };
    const user = new User(req.body);
    user.create()
        .then(() => { res.status(201).json({ ...user.data, token: user.refreshToken() }); })
        .catch(err => { res.status(err.statusCode || 400).json({ message: err.message }); });
    return res;
});

module.exports = router;