var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv').config();
var app = express();
var mongoose =  require('mongoose');
var produtosRouter = require('./routes/produtosRouter');


const mongoUser = process.env.MONGODB_USER;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongoHost = process.env.MONGODB_HOST;
const mongoDatabase = process.env.MONGODB_DATABASE;

const mongoURI = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}/${mongoDatabase}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/produtos', produtosRouter);

module.exports = app;
