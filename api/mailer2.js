'use strict'
var nodemailer = require('nodemailer');
var sequelize = require(__dirname + '/connection');
var Lampiran = sequelize.import(__dirname + '/models/lampiran.model');
var Surat = sequelize.import(__dirname + '/models/surat.model');
var Staff = sequelize.import(__dirname + '/models/staff.model');
var Perihal = sequelize.import(__dirname + '/models/perihal.model');
var Surat_masuk_penerima = sequelize.import(__dirname + '/models/surat_masuk_penerima.model');
var Surat_masuk_pengirim = sequelize.import(__dirname + '/models/surat_masuk_pengirim.model');

Surat.belongsTo(Perihal, {foreignKey: 'perihal_id'});
Surat.hasMany(Surat_masuk_penerima, {foreignKey: 'surat_id'});
Lampiran.belongsTo(Surat, {foreignKey: 'surat_id'});
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

class Mailer {
    constructor() {
        this.sender = '"SIMARSIP FMIPA" <miqdadfawwaz95@gmail.com>'
        this.receivers = []
        this.subject = ''
        this.attachments = []
        this.html = ''
    }

    redefined() {
        this.sender = '"SIMARSIP FMIPA" <miqdadfawwaz95@gmail.com>'
        this.receivers = []
        this.subject = ''
        this.attachments = []
        this.html = ''
    }

    setHtml(surat, staff, status) {
        if (status > 0) {
                this.html += `
                <p>Surat berikut adalah surat yang didisposisikan kepada Anda.</p>
                <br>
                `
            }
        this.html += `
            <p>Kepada, ` + staff.dataValues.nama_staff + `(` + staff.dataValues.email_staff + `) di tempat, ada surat masuk untuk Anda di SIMARSIP FMIPA. Silahkan cek lampiran email ini untuk dapat melihat isi surat. Surat fisik dapat diambil di Tata Usaha FMIPA. Terima kasih.</p>
            <p>Nomor: ` + surat.dataValues.nomor_surat + `/` + surat.dataValues.unit_kerja_surat + `/` + surat.dataValues.hal_surat + `/` + surat.dataValues.tahun_surat + `</p>
            <p>Perihal: ` + surat.dataValues.perihal.dataValues.nama_perihal + `</p>
            <p>Pengirim: ` + surat.dataValues.surat_masuk_pengirim.dataValues.nama_pengirim + `</p>
            <p>Tanggal surat: ` + surat.dataValues.tanggal_surat + `</p>
            <p>Tingkat kepentingan: ` + surat.dataValues.kepentingan_surat + `</p>
            <p>Sifat: ` + surat.dataValues.sifat_surat + `</p><br>
            <p>Catatan: ` + surat.dataValues.keterangan_surat + `</p><br>
            <p>SIMARSIP FMIPA<p>
        `
    }

    sendSurat(id, res) {
        this.redefined();
        this.subject = 'Surat Masuk | SIMARSIP FMIPA'
        Surat
            .findOne({
                where: {
                    id: id
                },
                include: [{
                    model: Surat_masuk_pengirim
                }]
            })
            .then(function(surat) {
                if (surat == 0) {
                    res.json({status: false, message: 'Surat yang ingin dikirimkan tidak ditemukan!', err_code: 404});
                } else {
                    console.log(surat.dataValues.file_surat);
                    /*this.attachments.push({filename: surat.dataValues.file_surat, path: __dirname + '/public/uploads/surat/' + surat.dataValues.file_surat});
                    Lampiran
                        .findAll({
                            where: {
                                surat_id: id
                            }
                        })
                        .then(function(lampiran) {
                            if (lampiran !== 0) {
                                for (let i = 0; i < lampiran.length; i++) {
                                    this.attachments.push({filename: lampiran.dataValues.file_surat, path: __dirname + '/public/uploads/lampiran/' + surat.dataValues.lampiran_surat})
                                }
                            }
                        })
                        .catch(function(err) {
                            res.json({status: false, message: 'Lampiran yang akan dikirimkan gagal ditemukan!', err_code: 400, err: err});
                        });

                    Staff
                        .findAll({
                            include: [{
                                model: Surat_masuk_penerima,
                                where: {
                                    surat_id: id,
                                    status_disposisi_penerima: 0
                                }
                            }]
                        })
                        .then(function(staff) {
                            if (staff == 0) {
                                res.json({status: false, message: 'Staff yang akan dikirimi tidak ditemukan!', err_code: 404});
                            } else {
                                for (let i = 0; i < staff.length; i++) {
                                    this.receivers.push(staff[i].dataValues.email_staff);
                                }
                            }
                        })
                        .catch(function(err) {
                            res.json({status: false, message: 'Staff yang akan dikirimi gagal ditemukan!', err_code: 400, err: err});
                        });*/
                }
            })
            .then(function() {
                this.send(res);
            })
    }

    // sendSurat(id, res) {
    //     this.redefined();
    //     /*Get surat and lampiran first*/
    //     Staff
    //         .findOne({
    //             where: {
    //                 id: id_staff
    //             }
    //         })
    //         .then((staff) => {
    //             if (staff == 0) {
    //                 res.json({status: false, message: 'Staff penerima email tidak ditemukan!', err_code: 404});
    //             } else {
    //                 console.log(staff)
    //                 this.receivers.push(staff.dataValues.email_staff);
    //                 Surat
    //                     .findOne({
    //                         where: {
    //                             id: id_surat,
    //                             tipe_surat: 'masuk'
    //                         },
    //                         include: [{
    //                             model: Perihal
    //                         },{
    //                             model: Surat_masuk_pengirim
    //                         }]
    //                     })
    //                     .then((surat) => {
    //                         if (surat == 0) {
    //                             res.json({status: false, message: 'Surat masuk tidak ditemukan!', err_code: 404});
    //                         } else {
    //                             this.setHtml(surat, staff, status)
    //                             this.attachments.push({filename: surat.dataValues.file_surat, path: __dirname + '/public/uploads/surat/' + surat.dataValues.file_surat});
    //                             Lampiran
    //                                 .findAll({
    //                                     where: {
    //                                         surat_id: id
    //                                     },
    //                                     attributes: ['file_lampiran']
    //                                 })
    //                                 .then((lampiran) => {
    //                                     if (lampiran !== 0) {
    //                                         for(let i = 0; i < lampiran.length; i++) {
    //                                             this.attachments.push({filename: lampiran[i].dataValues.file_lampiran, path: __dirname + '/public/uploads/lampiran/' + lampiran[i].dataValues.file_lampiran})
    //                                         }
    //                                     }
    //                                 })
    //                                 .then(function(result) {
    //                                     this.send(res);
    //                                 })   
    //                         }
    //                     })
    //             }
                
    //         })
       
    // }

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

module.exports = new Mailer;