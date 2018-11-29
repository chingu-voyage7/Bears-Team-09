const express = require('express'),
      app = express(),
      authRouter = require('./routes/auth'),
      usersRouter = require('./routes/protected'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      passport = require('./middleware/passport'),
      port = process.env.PORT || 8000;;

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/protected', passport.authenticate('jwt', {session: false}), usersRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))