const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const helmet = require('helmet');
const logger = require("morgan");
const activitiesRouter = require("./routes/activities");
const authenticate = require("./middleware/passport");
const authRouter = require("./routes/auth");
const eventsRouter = require("./routes/events");
const placesRouter = require("./routes/places");
const usersRouter = require("./routes/users");

const port = process.env.PORT || 8000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/users", authenticate("jwt"), usersRouter);
app.use("/activities", activitiesRouter);
app.use("/places", placesRouter);
app.use("/events", eventsRouter);
app.use((err, req, res, next) => res.headersSent ? next(err) : res.status(400).json({message: err.message}));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
