var express = require('express');
var logger = require('morgan');

var apidocsRouter = require('./routes/apidocsRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', apidocsRouter);

module.exports = app;
