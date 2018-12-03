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
        .then(([data]) => {
          if (data) {
            const isAuthenticated = bcrypt.compare(password, data.password);
            delete data.password;
            user.data = data;
            return isAuthenticated;
          }
          return false;
        })
        .then(isAuthenticated => isAuthenticated ? done(null, user) : done(null, false, 'Incorrect username or password'))
        .catch(err => done(null, false, err));
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
        .then(([data]) => {
          delete data.password;
          return done(null, data);
        })
        .catch(err => done(err));
      }
));

module.exports = passport;