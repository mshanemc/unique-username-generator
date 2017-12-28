var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var memjs = require('memjs')
var mc = memjs.Client.create()


var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// catch 404 and forward to error handler
router.post('/unique', (req, res) => {
  console.log('heard post');
  const prefix = req.body.prefix;
  const domain = req.body.domain;
  mc.incr(`${prefix}/${domain}`, 1, function (err, value) {
    if (err) {
      res.status(400).send(err);
      console.log("Error setting key: " + err);
    } else {
      res.json({message: `${prefix}${value}@${domain}`});
    }
  });

});

module.exports = app;
