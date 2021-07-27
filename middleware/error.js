const winston = require('winston');
const { errorRes } = require('../startup/errorHandling');

module.exports = function(err, req, res, next) {
  const dirName = "log";
  const logfile = dirName + "/" + "logfile.log";
  const uncaughtExceptionsFileName = dirName + "/" + "uncaughtExceptions.log";

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

  logger.info(err.stack);

  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

  res.status(500).send(errorRes(err.message));
}