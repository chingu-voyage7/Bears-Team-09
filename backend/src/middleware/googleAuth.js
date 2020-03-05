const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');

passport.serializeUser((user, done) => { done(null, user.id); });
passport.deserializeUser((id, done) => { done(null, { id }); });

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/googleAuthSuccess',
  // callbackURL: 'http://localhost:3100',

}, async (accessToken, refreshToken, profile, next) => {
  console.log("profile = ", profile);
  const user = new User({ email: profile._json.email });
  return user.read()
    // user found, return it
    .then(userData => console.log({ userData }) || next(null, userData[0]))

    // if user not found
    .catch(async err => {
      // unexpected error
      if (err.statusCode !== 404) throw err;
      // user doesn't exist, so let's create it
      const userData = await new User({
        email: profile._json.email,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        image: profile._json.picture
      }).create();
      console.log({ userData });
      next(null, userData);
    });
}));