'use strict'
const nodemailer = require('nodemailer')
var sequelize = require(__dirname + '/connection')
var Surat = sequelize.import(__dirname + '/models/surat.model');
var Lampiran = sequelize.import(__dirname + '/models/lampiran.model');
var Staff = sequelize.import(__dirname + '/models/staff.model');
var Perihal = sequelize.import(__dirname + '/models/perihal.model');
var Surat_masuk_penerima = sequelize.import(__dirname + '/models/surat_masuk_penerima.model');
var Surat_masuk_pengirim = sequelize.import(__dirname + '/models/surat_masuk_pengirim.model');

Surat.belongsTo(Perihal, {foreignKey: 'perihal_id'});
Surat.hasMany(Surat_masuk_penerima, {foreignKey: 'surat_id'});
Lampiran.belongsTo(Surat, {foreignKey: 'surat_id'})
Surat.hasOne(Surat_masuk_pengirim, {foreignKey: 'surat_id'});
Surat_masuk_penerima.belongsTo(Staff, {foreignKey: 'staff_id'});
Staff.hasMany(Surat_masuk_penerima, {foreignKey: 'staff_id'});

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'miqdadfawwaz95@gmail.com',   // put your email here
        pass: 'akangaep10'    // put your email password here
    }
});

var sender = '"SIMARSIP FMIPA" <miqdadfawwaz95@gmail.com>';
var receivers = [];
var subject = "";
var attachments = [];
var html = "";

var send = function(res) {
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
            res.json({status: false, message: 'Tambah surat gagal!', err_code: 400, err: err});
        } else {
            res.json({status: true, message: 'Tambah surat berhasil!', data: info});
        }
    })
}

function Mailer() {
    this.sendSurat = function(id, status, res) {
        subject += "Surat Masuk | SIMARSIP";
        html += "<p>Ada surat masuk untuk Anda di SIMARSIP. Silahkan cek seluruh lampiran email ini untuk melihat isi suratnya. Surat fisik dapat diambil di TU. Terima kasih.</p><br>";
        Surat
            .findOne({
                where: {
                    id: id
                },
                include: [{
                    model: Surat_masuk_pengirim
                }, {
                    model: Perihal
                }]
            })
            .then(function(surat) {
                if (status > 0) {
                    html += "<p>Surat berikut adalah surat yang didisposisikan kepada Anda.</p><br>";
                }
                html += "<p>Nomor: " + surat.dataValues.nomor_surat + "/" + surat.dataValues.unit_kerja_surat + "/" + surat.dataValues.hal_surat + "/" + surat.dataValues.tahun_surat + "</p><br>";
                html += "<p>Perihal: " + surat.dataValues.perihal.dataValues.nama_perihal + "</p><br>"
                html += "<p>Pengirim: " + surat.dataValues.surat_masuk_pengirim.dataValues.nama_pengirim + "</p><br>";
                html += "<p>Tanggal surat: " + surat.dataValues.tanggal_surat + "</p><br>";
                html += "<p>Tingkat kepentingan: " + surat.dataValues.kepentingan_surat + "</p><br>";
                html += "<p>Sifat: " + surat.dataValues.sifat_surat + "</p><br>";
                html += "<p>Catatan: " + surat.dataValues.keterangan_surat + "</p><br>";
                attachments.push({filename: surat.dataValues.file_surat, path: __dirname + '/public/uploads/surat/' + surat.dataValues.file_surat});
                Lampiran
                    .findAll({
                        where: {
                            surat_id: id
                        },
                        attributes: ['file_lampiran']
                    })
                    .then(function(lampiran) {
                        if (lampiran !== 0) {
                            for(var i = 0; i < lampiran.length; i++) {
                                attachments.push({filename: lampiran[i].dataValues.file_lampiran, path: __dirname + '/public/uploads/lampiran/' + lampiran[i].dataValues.file_lampiran})
                            }
                        }
                        Staff
                            .findAll({
                                include: [{
                                    model: Surat_masuk_penerima,
                                    where: {
                                        surat_id: id,
                                        status_disposisi_penerima: status
                                    }
                                }]
                            })
                            .then(function(staff) {
                                for(var i = 0; i < staff.length; i++) {
                                    receivers.push(staff[i].dataValues.email_staff)
                                }
                               send(res)
                            })
                    })
            })
    }
}

module.exports = new Mailer;