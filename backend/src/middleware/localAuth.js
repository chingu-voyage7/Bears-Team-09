const bcrypt = require("bcrypt");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const ApiError = require("../utils/APIError");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET env.var missing!");
const secret = process.env.JWT_SECRET;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      const user = new User({ email });
      return user
        .read()
        .then(([data]) => {
          // refuse to authenticate if user db record has no password
          if (data.password === null) {
            throw new ApiError("This account can be authenticated with google only", 403);
          }
          return bcrypt.compare(password, data.password);
        })
        .then(isAuthenticated =>
          isAuthenticated ? done(null, user) : done(null, null, "Incorrect username or password")
        )
        .catch(err => done(null, null, err));
    }
  )
);

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
      secretOrKey: secret
    },
    async (jwtPayload, done) => {
      const user = new User({ id: jwtPayload.id });
      user
        .read()
        .then(userData => {
          done(null, userData[0]);
        })
        .catch(err => done(err, false));
    }
  )
);

module.exports = strategy => (req, res, next) =>
  passport.authenticate(strategy, { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(info.statusCode || 401).json({ message: info.message });
    }
    req.login(user, { session: false }, error => {
      if (error) {
        return res.status(error.statusCode || 400).json({ message: error.message });
      }
      return res;
    });
    return next();
  })(req, res, next);

// https://accounts.google.com/o/oauth2/v2/auth?scope=profile email&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:8080&response_type=token&client_id=684648441225-amk5cicaad9umrfjrc5pbv1qo1it1iun.apps.googleusercontent.com
