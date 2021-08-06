const express = require('express');
const winston = require('winston'); // Winston is a simple and universal logging library 
const cors    = require('cors') // CORS stands for Cross-Origin Resource Sharing. 
const config  = require('config');
const bodyParser = require('body-parser'); // Parsing the incoming request bodies in a middleware 
const fileUpload = require('express-fileupload'); // Simple express middleware for uploading files.
const publicDir  = require('path').join(__dirname,'/assets');

const app = express();
app.use(cors());

app.use(fileUpload());
app.use(express.static(publicDir));
app.use('/api/assets', express.static('assets'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 4000;
// process.env.TZ = "Asia/Calcutta";

let server = (config.environment == 'test') ? app.listen(port) : app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;