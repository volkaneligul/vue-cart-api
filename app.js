// Imports
var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Require routes
// They are yet to be created
//var index = require('./routes/index');
const api = require('./routes/api/index');

// Setup an express app
var app = express();
// **************************

//mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tipster').then(() => { console.log('Database is connected') },
err => { console.log('Can not connect to the database'+ err) }
);

// ********************

// **************************

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// ********************

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configure middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use('/', index);
//app.use('/users', users);
app.use('/api/v1', api)

module.exports = app;