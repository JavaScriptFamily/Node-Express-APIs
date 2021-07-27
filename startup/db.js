const winston   = require('winston');
const mongoose  = require('mongoose');
const config    = require('config');

module.exports = function() {
    const db = config.get('db');

    if (config.environment != 'test') {
        mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, retryWrites:false })
        .then(() => winston.info(`Connected to ${db}...`));
    } else {
        mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, retryWrites:false });
    }    
}