if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

// Server app init
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 5000;

// Middleware init
app.set('trust proxy', true);

app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(helmet());
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());

// Passport config
require('./config/passport')(passport);

// MongoDB Connection
require('./config');

// Express session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Endpoints
app.use(routes);

// Server
if (process.env.NODE_ENV === 'production') module.exports = app;
else {
  app.listen(PORT, () => {
    console.log('Currently listening on port ' + PORT);
  });
}
// Dev server
// app.listen(PORT, () => {
//   console.log('Currently listening on port ' + PORT);
// });
