const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// Server app init
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware init
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());

// Dev server
app.listen(PORT, () => {
  console.log('Currently listening on port ' + PORT);
});
