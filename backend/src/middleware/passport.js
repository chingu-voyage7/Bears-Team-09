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
        .then(([data]) => bcrypt.compare(password, data.password))
        .then(isAuthenticated => isAuthenticated ? done(null, user) : done(null, false, {message: 'Incorrect username or password', statusCode: 401}))
        .catch(err => done(null, false, err));
    }
));

passport.use(
  new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey : secret
    },
    (jwtPayload, done) => {
      const user = new User({id: jwtPayload.id});
      return user.read()
        .then(() => done(null, user))
        .catch(err => done(null, false, err));
      }
));

module.exports = (strategy) => (req, res, next) =>
    passport.authenticate(strategy, {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({message: info.message});
        }
        req.login(user, {session: false}, (error) => {
            if (error) {
                return res.status(400).json({message: error.message});
            }
            return res;
        });
        return next();
    })(req, res, next);