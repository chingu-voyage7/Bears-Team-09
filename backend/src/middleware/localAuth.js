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
        .then(([userData]) => {
          // refuse to authenticate if user db record has no password
          if (!userData.password) {
            throw new ApiError("This account can be authenticated with google only", 403);
          }
          return bcrypt.compare(password, userData.password) ? userData : null;
        })
        .then(userData => (userData ? done(null, userData) : done("Incorrect username or password", null)))
        .catch(err => done(err, null));
    }
  )
);

const cookieExtractor = req => req && req.cookies && req.cookies.jwt;

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
