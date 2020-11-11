const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const router = require('./routes/index');

const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/', router);

module.exports = app;
