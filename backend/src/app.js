const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const activitiesRouter = require('./routes/activities');
const placesRouter = require('./routes/places');
const eventsRouter = require('./routes/events');
const passport = require('./middleware/passport');

const port = process.env.PORT || 8000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/users', passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/activities', passport.authenticate('jwt', {session: false}), activitiesRouter);
app.use('/places', passport.authenticate('jwt', {session: false}), placesRouter);
app.use('/events', passport.authenticate('jwt', {session: false}), eventsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));