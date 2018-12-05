const bcrypt = require('bcrypt');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const secret = process.env.JWT_SECRET || 'Default_JWT-Secret';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
   (email, password, done) => {
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
        .then(isAuthenticated => isAuthenticated ? done(null, user) : done(null, false, new Error('Incorrect username or password')))
        .catch(err => done(null, false, err));
    }
));

passport.use(
  new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey : secret
    },
   (jwtPayload, done) => {
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