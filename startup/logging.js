const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    const dirName = "log";
    const logfile = dirName + "/" + "logfile.log";
    const uncaughtExceptionsFileName = dirName + "/" + "uncaughtExceptions.log";

    // winston.exceptions.handle(
    //     new winston.transports.Console({ colorize: true, prettyPrint: true, handleExceptions: true }),
    //     new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    // process.on('unhandledRejection', (ex) => {
    //     throw ex;
    // });

    // winston.add(new winston.transports.File, { filename: 'logfile.log' });
    // winston.add(winston.transports.MongoDB, { 
    //   db: 'mongodb://localhost/products',
    //   level: 'info'
    // });  

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.File({ filename: uncaughtExceptionsFileName, level: 'error' }),
            new winston.transports.File({ filename: logfile })
        ]
    });

}