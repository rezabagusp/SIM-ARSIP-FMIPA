'use strict';
const nodemailer = require('nodemailer');

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

function Mailer() {

    this.send = function(options, res) {
        var mailto = options.mailto,
            mailtype = options.mailtype
            varpass = options.varpass;

        // setup email data with unicode symbols
        var mailOptions = {
            from: '"SIMARSIP FMIPA" <miqdadfawwaz95@gmail.com>', // sender address
            to: 'aslamabdurrohim@gmail.com', // list of receivers
            subject: 'Lupa Password | SIMARSIP FMIPA', // Subject line
            html: '<p>Halo! Kami menerima permintaan <b>penggantian password</b> akun SIMARSIP Anda. Silahkan klik <a href="">disini</a> atau kunjungi link berikut () untuk mengganti password Anda. Catatan: Mohon abaikan e-mail ini jika Anda tidak meminta melakukan reset password</p>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
}

module.exports = new Mailer();