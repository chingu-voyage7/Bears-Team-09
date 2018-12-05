const express = require('express'),
      app = express(),
      authRouter = require('./routes/auth'),
      usersRouter = require('./routes/users'),
      activitiesRouter = require('./routes/activities'),
      placesRouter = require('./routes/places'),
      eventsRouter = require('./routes/events'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      passport = require('./middleware/passport'),
      port = process.env.PORT || 8000;;

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/users', passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/activities', passport.authenticate('jwt', {session: false}), activitiesRouter);
app.use('/places', passport.authenticate('jwt', {session: false}), placesRouter);
app.use('/events', passport.authenticate('jwt', {session: false}), eventsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))