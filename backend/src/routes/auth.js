const express = require('express'),
      passport = require('../middleware/passport'),
      jwt = require('jsonwebtoken'),
      router = express.Router(),
      secret = process.env.JWT_SECRET || 'Default_JWT-Secret',
      JWT_EXP_THRESHOLD = process.env.JWT_EXP_THRESHOLD || '1 hour';

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({message: info});
        }

       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           const token = jwt.sign({id: user.email}, secret, {expiresIn: JWT_EXP_THRESHOLD});
           return res.json({...user, token});
        });
    })(req, res);
});

module.exports = router;