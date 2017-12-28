var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var memjs = require('memjs')
var mc = memjs.Client.create()


var app = express();
var router = express.Router();
// view engine setup
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.post('/unique', (req, res) => {
  console.log('heard post');
  console.log(request.body);
  const prefix = req.body.prefix;
  const domain = req.body.domain;
  mc.increment(`${prefix}/${domain}`, 1, {}, function (err, value) {
    if (err) {
      res.status(400).send(err);
      console.log("Error setting key: " + err);
    } else {
      res.json({message: `${prefix}${value}@${domain}`});
    }
  });

});

module.exports = app;
