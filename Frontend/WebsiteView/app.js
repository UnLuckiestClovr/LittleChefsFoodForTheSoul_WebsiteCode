var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var searchRouter = require("./routes/search");
var recipePageRouter = require("./routes/recipepage");
var loginRegRouter = require("./routes/loginorregister");
var basketPageRouter = require("./routes/basketpage");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'G0D1L0V3F00D',
  resave: false,
  saveUninitialized: false, // Save session only when modified
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours for example
  }
}));

// Debug session middleware
app.use((req, res, next) => {
  console.log('Session data:', req.session);
  next();
});

// Set routes
app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/search', searchRouter);
app.use('/recipe', recipePageRouter);
app.use("/loginorregister", loginRegRouter);
app.use("/basket", basketPageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
