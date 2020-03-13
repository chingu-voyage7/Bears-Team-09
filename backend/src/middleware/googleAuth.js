const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

passport.serializeUser((user, next) => next(null, user.id));
passport.deserializeUser((id, next) => next(null, { id }));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/googleAuthSuccess"
    },
    async (accessToken, refreshToken, profile, next) => {
      const user = new User({ email: profile._json.email });
      return (
        user
          .read()
          // user found, return it
          .then(async userData => {
            next(null, userData[0]);
            user.set({
              google_access_token: accessToken,
              google_refresh_token: refreshToken
            });
            const updatedUser = await user.update();
          })

          // if user not found
          .catch(async err => {
            // unexpected error
            if (err.statusCode !== 404) throw err;
            // user doesn't exist, so let's create it
            const newUser = new User({
              email: profile._json.email,
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              image: profile._json.picture,
              google_refresh_token: refreshToken,
              google_access_token: accessToken
            });
            const userData = await newUser.create().catch(console.error);

            next(null, userData);
          })
      );
    }
  )
);
