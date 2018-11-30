const passport = require('passport'),
      passportJWT = require('passport-jwt'),
      LocalStrategy = require('passport-local').Strategy,
      JWTStrategy = passportJWT.Strategy,
      ExtractJWT = passportJWT.ExtractJwt,
      User = require('../models/User'),
      bcrypt = require('bcrypt'),
      secret = process.env.JWT_SECRET || 'Default_JWT-Secret';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      const user = new User({email});
      return user.read()
        .then(data => data.length ? bcrypt.compare(password, data[0].password) : false)
        .then(isAuthenticated => isAuthenticated ? done(null, user) : done(null, false, 'Incorrect password'))
        .catch(err => done(err, false));
    }
));

passport.use(
  new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey : secret
    },
    function (jwtPayload, done) {
      const user = new User({email: jwtPayload.pk});
      return user.read()
        .then(data =>  done(null, data[0]))
        .catch(err => done(err, false, err));
      }
));

module.exports = passport;