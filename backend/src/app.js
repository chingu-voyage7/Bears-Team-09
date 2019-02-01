const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const activitiesRouter = require("./routes/activities");
const authenticate = require("./middleware/passport");
const authRouter = require("./routes/auth");
const eventsRouter = require("./routes/events");
const placesRouter = require("./routes/places");
const usersRouter = require("./routes/users");

const port = process.env.PORT || 8000;
const app = express();

const fqdn = process.env.FQDN || "localhost";
const corsOptions = {
    "origin": `${fqdn}`,
    "methods": "GET,HEAD,PUT,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/users", authenticate("jwt"), usersRouter);
app.use("/api/activities", authenticate("jwt"), activitiesRouter);
app.use("/api/places", authenticate("jwt"), placesRouter);
app.use("/api/events", authenticate("jwt"), eventsRouter);
app.use((err, req, res, next) => res.headersSent ? next(err) : res.status(500).json({message: err.message}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
