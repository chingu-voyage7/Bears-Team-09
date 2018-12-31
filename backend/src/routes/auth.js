const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/passport');

const router = express.Router();

router.get('/', authenticate('jwt'), (req, res) => {
    const token = req.user.refreshToken();
    return res.json({token});
});

router.post('/login', authenticate('local'), (req, res) => {
    const token = req.user.refreshToken();
    return res.json({...req.user.data, token});
});

router.post('/register', (req, res) => {
    const {password} = req.body;
    // temporary, replace with propper validation
    if (!password) {
        return res.status(400).json({message: 'password not set'});
    };
    const user = new User(req.body);
    user.create()
    .then(() => {res.status(201).json({...user.data, token: user.refreshToken()});})
    .catch(err => {res.status(err.statusCode || 400).json({message: err.message});});
    return res;
});

module.exports = router;