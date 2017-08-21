'use strict'
const nodemailer = require('nodemailer')
var sequelize = require(__dirname + '/connection')
const Lampiran = sequelize.import(__dirname + '/models/lampiran.model')
const Surat = sequelize.import(__dirname + '/models/surat.model')
const Staff = sequelize.import(__dirname + '/models/staff.model')
var Perihal = sequelize.import(__dirname + '/models/perihal.model')
var Surat_masuk_penerima = sequelize.import(__dirname + '/models/surat_masuk_penerima.model')
var Surat_masuk_pengirim = sequelize.import(__dirname + '/models/surat_masuk_pengirim.model')

Surat.belongsTo(Perihal, {foreignKey: 'perihal_id'})
Surat.hasMany(Surat_masuk_penerima, {foreignKey: 'surat_id'})
Lampiran.belongsTo(Surat, {foreignKey: 'surat_id'})
Surat.hasOne(Surat_masuk_pengirim, {foreignKey: 'surat_id'})
Surat_masuk_penerima.belongsTo(Staff, {foreignKey: 'staff_id'})
Staff.hasMany(Surat_masuk_penerima, {foreignKey: 'staff_id'})

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
var misal = [{id:1}, {id:2}, {id:3}]
class Mailer{
    constructor() {
        this.sender = '"SIMARSIP FMIPA" <miqdadfawwaz95@gmail.com>'
        this.recievers = []
        this.subject = 'Surat Masuk di SIMARSIP'
        this.attachments = []
        this.html = ''
    }
    SetHtml(surat, status) {
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
    SendSuratWithLampiran(id, status, res) {
        /*Get surat and lampiran first*/
        console.log(misal)
        Surat
            .findOne({
                where: {
                    id: id
                },
                include: [{
                    model: Perihal
                },{
                    model: Surat_masuk_pengirim
                }]
            })
            .then((surat) => {
                this.attachments.push({filename: surat.dataValues.file_surat, path: __dirname + '/public/uploads/surat/' + surat.dataValues.file_surat})
                this.SetHtml(surat, status)
                Lampiran
                    .findAll({
                        where: {
                            surat_id: id
                        },
                        attributes: ['file_lampiran']
                    })
                    .then((lampiran) => {
                        for(let i=0; i<lampiran.length; i++) {
                            this.attachments.push({filename: lampiran[i].dataValues.file_lampiran, path: __dirname + '/public/uploads/lampiran/' + lampiran[i].dataValues.file_lampiran})
                        }
                        // this.send(data, res)
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
                                for(let i=0; i<staff.length; i++) {
                                    this.recievers.push(staff[i].dataValues.email_staff)
                                }
                                this.send(res)
                            })
                    })
            })
    }
    send(res) {
        // setup email data with unicode symbols
        var mailOptions = {
            from: this.sender, // sender address
            to: this.recievers, // list of receivers
            subject: this.subject, // Subject line
            html: this.html, // html body
            attachments: this.attachments
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                return console.log(err);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        })
    }
}

module.exports = new Mailer;