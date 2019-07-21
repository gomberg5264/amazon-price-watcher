// config/index.js
// Handles mongoose connection

const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

mongoose.set('useCreateIndex', true);

mongoose.connect(URI, { useNewUrlParser: true, useFindAndModify: false });

// Success
mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB database');
});

mongoose.connection.on('error', err => {
  console.log('MongoDB Connection Error -> ' + err);
});
