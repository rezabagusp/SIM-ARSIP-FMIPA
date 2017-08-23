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
        user: 'miqdadfawwaz95@gmail.com', // put your email here
        pass: 'bismill4h' // put your email password here
    }
});

class Mailer{
    constructor() {
        this.sender = '"SIMARSIP FMIPA" <miqdadfawwaz95@gmail.com>'
        this.receivers = []
        this.subject = 'Surat Masuk di SIMARSIP'
        this.attachments = []
        this.html = ''
    }

    redefined() {
        this.sender = '"SIMARSIP FMIPA" <miqdadfawwaz95@gmail.com>'
        this.receivers = []
        this.subject = 'Surat Masuk di SIMARSIP'
        this.attachments = []
        this.html = ''
    }

    setHtml(surat, status) {
        if (status > 0) {
                this.html += `
                <p>Surat berikut adalah surat yang didisposisikan kepada Anda.</p>
                <br>
                `
            }
        this.html += `
            <p>Nomor: ` + surat.dataValues.nomor_surat + `/` + surat.dataValues.unit_kerja_surat + `/` + surat.dataValues.hal_surat + `/` + surat.dataValues.tahun_surat + `</p>
            <p>Perihal: ` + surat.dataValues.perihal.dataValues.nama_perihal + `</p>
            <p>Pengirim: ` + surat.dataValues.surat_masuk_pengirim.dataValues.nama_pengirim + `</p>
            <p>Tanggal surat: ` + surat.dataValues.tanggal_surat + `</p>
            <p>Tingkat kepentingan: ` + surat.dataValues.kepentingan_surat + `</p>
            <p>Sifat: ` + surat.dataValues.sifat_surat + `</p><br>
            <p>Catatan: ` + surat.dataValues.keterangan_surat + `</p><br>
        `
    }

    sendSurat(id, status, res) {
        this.redefined();
        /*Get surat and lampiran first*/
        Surat
            .findOne({
                where: {
                    id: id,
                    tipe_surat: 'masuk'
                },
                include: [{
                    model: Perihal
                },{
                    model: Surat_masuk_pengirim
                }]
            })
            .then((surat) => {
                if (surat == 0) {
                    res.json({status: false, message: 'Surat masuk tidak ditemukan!', err_code: 400});
                } else {
                    this.setHtml(surat, status)
                    this.attachments.push({filename: surat.dataValues.file_surat, path: __dirname + '/public/uploads/surat/' + surat.dataValues.file_surat});
                    Lampiran
                        .findAll({
                            where: {
                                surat_id: id
                            },
                            attributes: ['file_lampiran']
                        })
                        .then((lampiran) => {
                            if (lampiran !== 0) {
                                for(let i = 0; i < lampiran.length; i++) {
                                    this.attachments.push({filename: lampiran[i].dataValues.file_lampiran, path: __dirname + '/public/uploads/lampiran/' + lampiran[i].dataValues.file_lampiran})
                                }
                            }
                        })
                        .then(() => {
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
                                .then((staff) => {
                                    let staffs = JSON.parse(JSON.stringify(staff))
                                    if (staff == 0) {
                                        res.json({status: false, message: 'Staff penerima email tidak ditemukan!', err_code: 404});
                                    } else {
                                        for(let i = 0; i < staff.length; i++) {
                                            this.receivers.push(staffs[i].email_staff)
                                        }
                                    }
                                    this.send(res);
                                })
                                .catch(function(err) {
                                    res.json({status: false, message: 'Staff penerima email gagal ditemukan!', err:err})
                                })
                        })   
                }
            })
    }
    send(res) {
        // setup email data with unicode symbols
        var mailOptions = {
            from: this.sender, // sender address
            to: this.receivers, // list of receivers
            subject: this.subject, // Subject line
            html: this.html, // html body
            attachments: this.attachments
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