require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const activitiesRouter = require("./routes/activities");
const authenticate = require("./middleware/localAuth");
const authRouter = require("./routes/auth");
const eventsRouter = require("./routes/events");
const placesRouter = require("./routes/places");
const usersRouter = require("./routes/users");

const port = process.env.PORT || 8000;
const app = express();

app.use(helmet());
app.use(cors({ credentials: true }));
app.use(logger("combined"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/users", authenticate("jwt"), usersRouter);
app.use("/activities", activitiesRouter);
app.use("/places", placesRouter);
app.use("/events", eventsRouter);
app.use((err, req, res, next) =>
  res.headersSent ? next(err) : res.status(500).json({ message: err.message })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
