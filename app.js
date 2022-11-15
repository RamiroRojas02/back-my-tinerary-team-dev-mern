require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/database/database')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var cityRouter = require('./routes/city');
var itineraryRouter = require('./routes/itinerary');
var hotelRouter = require('./routes/hotel');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// app.use(errorHandler.notFound)
// app.use(errorHandler.internalServer)



app.use('/api', indexRouter);
app.use('/users', usersRouter);
app.use('/cities', cityRouter);
app.use('/itineraries',itineraryRouter);
app.use('/hotels',hotelRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
