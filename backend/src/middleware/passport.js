const bcrypt = require('bcrypt');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const axios = require('axios');
const User = require('../models/User');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const secret = process.env.JWT_SECRET || 'Default_JWT-Secret';

BearerStrategy.prototype._challenge = (err, desc) => `${err}: ${desc}`;

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
        .then(isAuthenticated => isAuthenticated ? done(null, user) : done(null, false, 'Incorrect username or password'))
        .catch(err => done(null, false, err.message));
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
        .catch(err => done(null, false, err.message));
      }
));

passport.use(
    new BearerStrategy({passReqToCallback: true},
        (req, token, done) => {
            console.log(req);
            let user;
            let newUser;
            // Get info from google
            axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {"Authorization": `Bearer ${token}`}
                }
            )
            // catch any errors returned by google
            .catch(err => {throw new Error(err.response.data.error_description);})
            // try to find user in the db
            .then(({data}) => {
                user = new User({email: data.email});
                newUser = new User({
                    email: data.email,
                    first_name: data.given_name,
                    last_name: data.family_name,
                    image: data.picture,
                    password: 'qweqweqwe'});
                return user.read();
            })
            // if not - create one
            .catch(err => {
                if (err.statusCode === 404) {
                    user = newUser;
                    return user.create();
                }
                throw err;
            })
            // and then return
            .then(() => {
                req.user = user;
                done(null, user);
            })
            .catch((err) => done(null, false, err.message));
        }
    )
);

module.exports = (strategy) => (req, res, next) =>
    passport.authenticate(strategy, {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({message: info});
        }
        req.login(user, {session: false}, (error) => {
            if (error) {
                return res.status(400).json({message: error.message});
            }
            return res;
        });
        return next();
    })(req, res, next);


// https://accounts.google.com/o/oauth2/v2/auth?scope=profile email&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:8080&response_type=token&client_id=684648441225-amk5cicaad9umrfjrc5pbv1qo1it1iun.apps.googleusercontent.com