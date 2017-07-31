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
    Lampiran = sequelize.import(__dirname + "/models/lampiran.model"),
    Jabatan = sequelize.import(__dirname + "/models/jabatan.model"),
    Penerima = sequelize.import(__dirname + "/models/penerima.model"),
    Perihal = sequelize.import(__dirname + "/models/perihal.model"),
    Staff = sequelize.import(__dirname + "/models/staff.model"),

    Kode_surat = sequelize.import(__dirname + "/models/kode_surat.model"),
    Jenis_surat = sequelize.import(__dirname + "/models/jenis_surat.model"),
    Sub_jenis_surat = sequelize.import(__dirname + "/models/sub_jenis_surat.model"),
    Sub_sub_jenis_surat = sequelize.import(__dirname + "/models/sub_sub_jenis_surat.model"),
    Surat_penerima = sequelize.import(__dirname + "/models/surat_penerima.model");

User.sync();
Surat.sync();
Lampiran.sync();
Jabatan.sync();
Penerima.sync();
Perihal.sync();
Staff.sync();
Kode_surat.sync();
Jenis_surat.sync();
Sub_jenis_surat.sync();
Sub_sub_jenis_surat.sync();
Surat_penerima.sync();

// routing
var index = require('./routes/index')
    user = require('./routes/user.route');
/*    surat = require('./routes/surat.route'),
    lampiran = require('./routes/lampiran.route'),
    penerima = require('./routes/penerima.route')*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routes handler
app.use('/api', index);
app.use('/api/user', user);
app.use('/api/user/*', user);
/* app.use('/api/surat', surat);
app.use('/api/surat/*', surat);
app.use('/api/lampiran', lampiran);
app.use('/api/lampiran/*', lampiran);*/

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