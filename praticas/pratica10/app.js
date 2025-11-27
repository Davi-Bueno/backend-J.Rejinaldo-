require('dotenv').config();
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`);

var apidocsRouter = require('./routes/apidocsRouter');
var usuariosRouter = require('./routes/usuariosRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', apidocsRouter);
app.use('/usuarios', usuariosRouter);

module.exports = app;
