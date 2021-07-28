const express = require('express');
const winston = require('winston'); // Winston is a simple and universal logging library 
const cors    = require('cors')
const config  = require('config');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
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

let server = '';
if (config.environment != 'test') {
    server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
} else {
    server = app.listen(port);
}

module.exports = server;