const express   = require('express');
const error     = require('../middleware/error');

// Authentication And Login Routes
const authRoute  = require('../routes/authRoute');
const userRoute  = require('../routes/userRoute');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/auth', authRoute);
    app.use('/api/user', userRoute);
    app.use(error);
}