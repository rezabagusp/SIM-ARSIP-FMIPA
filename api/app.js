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
    Surat_penerima = sequelize.import(__dirname + "/models/surat_penerima.model"),
    Unit_kerja = sequelize.import(__dirname + "/models/unit_kerja.model");

User.sync();
Lampiran.sync();
Jabatan.sync();
Perihal.sync();
Staff.sync();
Unit_kerja.sync();

Kode_surat.sync().then(function(result) {
    Jenis_surat.sync().then(function(result) {
        Sub_jenis_surat.sync().then(function(result) {
            Sub_sub_jenis_surat.sync().then(function(result) {
                Surat.sync().then(function(result) {
                    Penerima.sync().then(function(result) {
                        Surat_penerima.sync();
                    });
                });
            });
        });
    });
});

// routing
var index = require('./routes/index')
    user = require('./routes/user.route'),
    surat = require('./routes/surat.route');

var app = express();

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