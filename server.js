    'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config');

var app = express();

var source = config.source,
    build = config.build;

app.use(express.static(path.join(__dirname, build)));

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, build, 'index.html'));
});

app.listen(process.env.PORT || config.port);

console.log('Express started on port ' + config.port + '...');
