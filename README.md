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

### Q.7: What is mongoose? What is option of mongoose.connect()?
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

```javascript
await mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
```

Defining a Model
```javascript
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
  name: { type: String, default: 'hahaha' },
  age: { type: Number, min: 18, index: true },
  bio: { type: String, match: /[a-z]/ },
  date: { type: Date, default: Date.now },
  buff: Buffer
});
```

Accessing a Model
```javascript
const MyModel = mongoose.model('ModelName');
```

### Q.8: What is JOI?
Hapi Joi is an object schema description language and validator for JavaScript objects.

With Hapi Joi, we create blueprints or schemas for JavaScript objects (an object that stores information) to ensure validation of key information.

Hapi is a simple to use configuration-centric framework with built-in support for input validation, caching, authentication, and other essential facilities for building web and services applications.

```javascript
const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }
```

### Q.9: What is jsonwebtoken? What jsonwebtoken generate a token and how it verify?

SON Web Token is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key.

```javascript
const jwt = require('jsonwebtoken');

const generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}
```

```javascript
const jwt = require('jsonwebtoken');

const token = req.header('x-auth-token');
if (!token) return res.status(401).send(errorResonse('Access denied. No token provided.'));

try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; 
    next();
}
catch (ex) {
    res.status(400).send(errorResonse('Invalid token'));
}
```

### Q.10: What is bcryptjs?

We will learn to use NPM bcryptjs library to hash and compare the passwords in Node. ... In this method, you do not store users' passwords in the database in its original form. Instead, a password is stored in a complex combination of text and unique characters; this is known as a password hash method.

Generate Password
```javascript
const bcrypt = require('bcryptjs');

const salt = await bcrypt.genSalt(10);
const password = await bcrypt.hash(req.body.password, salt);
```

Compare Password
```javascript
const validPassword = await bcrypt.compare(req.body.password.toString(), user.password);
if (!validPassword) return res.status(400).send(errorRes('Invalid email or password.'));
```

### Q.11: What is crypto?
Using for generating random string.

### Q.12: What is lodash?
A modern JavaScript utility library delivering modularity, performance & extras.

Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
Lodash’s modular methods are great for:

* Iterating arrays, objects, & strings
* Manipulating & testing values
* Creating composite functions

```javascript
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
```

### Q.13: What is nodemailer?
Nodemailer is a module for Node.js applications to allow easy as cake email sending. The project got started back in 2010 when there was no sane option to send email messages, today it is the solution most Node.js users turn to by default.

```javascript
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
```

### Q.14: What is node-cron?
The node-cron module is tiny task scheduler in pure JavaScript for node.js based on GNU crontab. This module allows you to schedule task in node.js using full crontab syntax.

```javascript
var cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
```

### Q.15: What is ejs?
EJS is a simple templating language which is used to generate HTML markup with plain JavaScript. It also helps to embed JavaScript to HTML pages.


### Q.16: What is shelljs?
ShellJS is a portable (Windows/Linux/macOS) implementation of Unix shell commands on top of the Node.js API. You can use it to eliminate your shell script's dependency on Unix while still keeping its familiar and powerful commands. You can also install it globally so you can run it from outside Node projects - say goodbye to those gnarly Bash scripts!

```javascript
var shell = require('shelljs');
 
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}
 
// Copy files to release dir
shell.rm('-rf', 'out/Release');
shell.cp('-R', 'stuff/', 'out/Release');
 
// Replace macros in each .js file
shell.cd('lib');
shell.ls('*.js').forEach(function (file) {
  shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file);
  shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file);
  shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file);
});
shell.cd('..');
 
// Run external tool synchronously
if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
  shell.echo('Error: Git commit failed');
  shell.exit(1);
}
```

