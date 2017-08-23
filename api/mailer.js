'use strict'
var nodemailer = require('nodemailer');
var sequelize = require('./connection');

var Lampiran = sequelize.import(__dirname + '/models/lampiran.model');
var Surat = sequelize.import(__dirname + '/models/surat.model');
var Staff = sequelize.import(__dirname + '/models/staff.model');
var Perihal = sequelize.import(__dirname + '/models/perihal.model');
var Surat_masuk_penerima = sequelize.import(__dirname + '/models/surat_masuk_penerima.model');
var Surat_masuk_pengirim = sequelize.import(__dirname + '/models/surat_masuk_pengirim.model');

Surat.belongsTo(Perihal, {foreignKey: 'perihal_id'});
Surat.hasMany(Surat_masuk_penerima, {foreignKey: 'surat_id'});
Surat.hasMany(Lampiran, {foreignKey: 'surat_id'});
Surat.hasOne(Surat_masuk_pengirim, {foreignKey: 'surat_id'});
Surat_masuk_penerima.belongsTo(Staff, {foreignKey: 'staff_id'});
Staff.hasMany(Surat_masuk_penerima, {foreignKey: 'staff_id'});

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'expresscoba@gmail.com',   // put your email here
        pass: 'cobacoba'    // put your email password here
    }
});

function Mailer() {
    var sender = '"SIMARSIP FMIPA" <expresscoba@gmail.com>',
        receivers = 'm.aslam.abdurrohim@gmail.com',
        subject = 'Surat masuk | SIMARSIP',
        attachments = [],
        html = 'Hai';

    this.send = function(res) {
        // setup email data with unicode symbols
        var mailOptions = {
            from: sender, // sender address
            to: receivers, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
            attachments: attachments
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                res.json({status: false, message: 'Tambah surat gagal! Email gagal dikirimkan!', err_code: 400, err: err});
            } else {
                res.json({status: true, message: 'Tambah surat berhasil! Email berhasil dikirimkan!', data: info});
            }
        });
    }
}

module.exports = new Mailer();