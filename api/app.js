var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    sequelize = require('./connection'),
    cors = require('cors');

// routing
var index = require('./routes/index'),
    user = require('./routes/user.route'),
    surat = require('./routes/surat.route'),
    lampiran = require('./routes/lampiran.route'),
    dataform = require('./routes/dataform.route');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routes handler
app.use('/api', index);
app.use('/api/user', user);
app.use('/api/user/*', user);
app.use('/api/surat', surat);
app.use('/api/surat/*', surat);
app.use('/api/lampiran', lampiran);
app.use('/api/lampiran/*', lampiran);
app.use('/api/dataform', dataform);
app.use('/api/dataform/*', dataform);

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