## Questions
### Q.1: What is express? Why you choose express for node js framework?
Express 3.x is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. You can use a variety of choices for your templating language (like EJS, Jade, and Dust.js).

You can then use a database like MongoDB with Mongoose (for modeling) to provide a backend for your Node.js application. Express.js basically helps you manage everything, from routes, to handling requests and views. 

### Q.2: What is error logging? What is winston logging?
An error log is a personalized document that lists your mistakes and how to correct them. When you receive feedback about a mistake in your writing, you create an entry in your error log that includes the error and how to correct it.

winston is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs. Each winston logger can have multiple transports (see: Transports) configured at different levels (see: Logging levels). For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file.

### Q.3: What is cors? What is cors in express?
Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources. CORS also relies on a mechanism by which browsers make a “preflight” request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request.

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Simple Usage
```javascript
var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())
 
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

Enable CORS for a Single Route
```javascript
var express = require('express')
var cors = require('cors')
var app = express()
 
app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
});
```

Configuring CORS w/ Dynamic Origin
```javascript
var express = require('express')
var cors = require('cors')
var app = express()
 
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
 
app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

### Q.4: What is config? How to manage different different environment?
Node-config organizes hierarchical configurations for your app deployments.

It lets you define a set of default parameters, and extend them for different deployment environments (development, qa, staging, production, etc.).

Configurations are stored in configuration files within your application, and can be overridden and extended by environment variables, command line parameters, or external sources.

```javascript
$ npm install config
$ mkdir config
$ vi config/default.json

$ export NODE_ENV=production
$ node my-app.js
```

### Q.5: What is body parser?
Node.js body parsing middleware.

Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

```

### Q.6: What is express-fileupload?
Simple express middleware for uploading files.

Usage

When you upload a file, the file will be accessible from req.files.
Example:

* You're uploading a file called car.jpg
* Your input's name field is foo: <input name="foo" type="file" />
* In your express server request, you can access your uploaded file from req.files.foo:

```javascript
app.post('/upload', function(req, res) {
  console.log(req.files.foo); // the uploaded file object
});
```

### Q.7: What is mongoose? What is option of mongoose.connect() ?
### Q.8: What is JOI?
### Q.9: What is jsonwebtoken? What jsonwebtoken generate a token and how it verify?
### Q.10: What is bcryptjs?
### Q.11: What is crypto?
### Q.12: What is lodash?
### Q.13: What is nodemailer?
### Q.14: What is node-cron?
### Q.15: What is ejs?
### Q.16: What is shelljs?
