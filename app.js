var express = require('express');
var bodyParser = require('body-parser');

var memjs = require('memjs')
var mc = memjs.Client.create()

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// catch 404 and forward to error handler
app.post('/unique', (req, res) => {
  const prefix = req.body.prefix;
  const domain = req.body.domain;
  mc.increment(`${prefix}/${domain}`, 1, {}, function (err,success, value) {
    if (err) {
      res.status(400).send(err);
      console.log("Error setting key: " + err);
    } else {
      res.json({message: `${prefix}${value}@${domain}`});
    }
  });

});

module.exports = app;
