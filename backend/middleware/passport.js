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
      const user = new User(email);
      user.getUserInfo()
        .then(user => bcrypt.compare(password, user.password))
        .then(isAuthenticated => isAuthenticated ? done(null, user) : done(null, false, 'Incorrect password'))
        .catch(err => done(null, false, err));
  }
));

passport.use(
  new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey : secret
    },
    function (jwtPayload, done) {
      const user = new User(jwtPayload.id);
      return user.getUserInfo()
        .then(user => done(null, user))
        .catch(err => done(err, false, err));
      }
));

module.exports = passport;