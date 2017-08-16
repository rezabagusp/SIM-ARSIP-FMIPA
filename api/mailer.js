'use strict'
const nodemailer = require('nodemailer')
var sequelize = require(__dirname + '/connection')
const Lampiran = sequelize.import(__dirname + '/models/lampiran.model')
const Surat = sequelize.import(__dirname + '/models/surat.model')
const Staff = sequelize.import(__dirname + '/models/staff.model')

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
        this.html = '<p>Hallo ganteng</p>'
    }
    SendSuratWithLampiran(data, res) {
        /*Get surat and lampiran first*/
        console.log(misal)
        Surat
            .findOne({
                where: {
                    id: 98 /*data.params.id*/
                },
                attributes: ['id', 'file_surat']
            })
            .then((surat) => {
                this.attachments.push({filename: surat.dataValues.file_surat, path: __dirname + '/public/uploads/surat/' + surat.dataValues.file_surat})
                Lampiran
                    .findAll({
                        where: {
                            surat_id: 98 /*data.params.id*/
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
                                where: {
                                    $or: misal /*data.params.recipientArray*/
                                },
                                attributes: ['email_staff']
                            })
                            .then((staff) => {
                                for(let i=0; i<staff.length; i++) {
                                    this.recievers.push(staff[i].dataValues.email_staff)
                                }
                                this.send(data, res)
                            })
                    })
            })
    }
    send(data, res) {
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