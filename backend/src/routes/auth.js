const passport = require("passport");
const express = require("express");
const User = require("../models/User");
require("../middleware/googleAuth");

const router = express.Router();

function loginSuccessRedirect(req, res) {
  const token = new User({ id: req.user.id }).refreshToken();
  res.redirect(`http://localhost:3100?token=${token}`);
}

// Create an account using google oAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    session: true
  })
);

// Send JWT back to front end
router.get("/googleAuthSuccess", passport.authenticate("google"), loginSuccessRedirect);

// Test route to view current user info and token
router.get("/view", passport.authenticate("jwt"), (req, res) => {
  // res.header({ "test-header": "test-value" });
  res.send({ cookies: req.cookies, user: req.user });
});

// Register using login/password
router.post("/register", (req, res) => {
  const { password } = req.body;
  // ToDo: replace with proper validation
  if (!password) {
    return res.status(400).json({ message: "password not set" });
  }
  const user = new User(req.body);
  user
    .create()
    .then(() => {
      res.status(201).json({ ...user.data, token: user.refreshToken() });
    })
    .catch(err => {
      res.status(err.statusCode || 500).json({ message: err.message });
    });
});

// Log in using login/password
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("In login route");
  console.log(req.user);

  const token = new User({ id: req.user.id }).refreshToken();
  res.status(201).json({ ...req.user, token });
});

module.exports = router;
