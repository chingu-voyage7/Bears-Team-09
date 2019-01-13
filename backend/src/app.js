const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const activitiesRouter = require("./routes/activities");
const placesRouter = require("./routes/places");
const eventsRouter = require("./routes/events");
const authenticate = require("./middleware/passport");

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/users", authenticate("jwt"), usersRouter);
app.use("/activities", authenticate("jwt"), activitiesRouter);
app.use("/places", authenticate("jwt"), placesRouter);
app.use("/events", authenticate("jwt"), eventsRouter);
app.use((err, req, res) => res.status(400).json({message: err.message}));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
