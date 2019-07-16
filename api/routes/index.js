// routes/index.js
// Seperation of route pathways to suitable controller

const router = require('express').Router();
const userRoutes = require('./user.route');

router.use('/api/users', userRoutes);

module.exports = router;
