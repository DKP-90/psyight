var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var user_module = require('./public/javascripts/login');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/user_login',function (req, res) {try {user_module.login(req.query.email, req.query.password, function (id) {res.send(id);});}catch(err) {res.send(err);}});

app.get('/user_register',function (req, res) {try {user_module.register(req.query.user_name, req.query.password, req.query.email, req.query.organization, function (id) {res.send(id);});}catch(err) {res.send(err);}});



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
