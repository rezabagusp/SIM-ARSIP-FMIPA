var express = require('express'),
    sequelize = require('../connection');

var Perihal = sequelize.import(__dirname + '/../models/perihal.model');

Perihal
    .bulkCreate([
        {
            nama_perihal: "Undangan"
        }, {
            nama_perihal: "Surat Edaran"
        }, {
            nama_perihal: "Permohonan"
        }
    ]);
    
    