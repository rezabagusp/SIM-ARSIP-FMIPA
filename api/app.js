var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser')
    sequelize = require('./connection')

// call all models to sync with database
var User = sequelize.import(__dirname + "/models/user.model"),
    Surat = sequelize.import(__dirname + "/models/surat.model"),
    Lampiran = sequelize.import(__dirname + "/models/lampiran.model")

User.sync();
Surat.sync();
Lampiran.sync();

// routing
var index = require('./routes/index'),
    user = require('./routes/user.route'),
    surat = require('./routes/surat.route'),
    lampiran = require('./routes/lampiran.route'),
    penerima = require('./routes/penerima.route')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes handler
app.use('/api', index);
app.use('/api/user', user);
app.use('/api/user/*', user);
app.use('/api/surat', surat);
app.use('/api/surat/*', surat);
app.use('/api/lampiran', lampiran);
app.use('/api/lampiran/*', lampiran);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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