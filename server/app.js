const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./routes/index');
const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');
const stripeRouter = require('./routes/stripe');

var app = express();
app.use(cors());
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// Ref: https://github.com/MrBenC88/All-About-APIs-Workshop/blob/starter-workshop-solution/Backend/server.js
const uri = process.env.ATLAS_URI;
// Connect to your MongoDB Database
mongoose.connect(uri);
const connection = mongoose.connection;
// Confirm the connection and output a success message if connected successfully.
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/stripe', stripeRouter);

module.exports = app;
