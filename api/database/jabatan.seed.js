var express = require('express'),
    sequelize = require('../connection');

var Jabatan = sequelize.import(__dirname + '/../models/jabatan.model');

Jabatan
    .bulkCreate([
        {
            nama_jabatan: "Lainnya"
        }, {
            nama_jabatan: "Dekan FMIPA IPB"
        }, {
            nama_jabatan: "Wakil Dekan Bidang Akademik FMIPA IPB"
        }, {
            nama_jabatan: "Wakil Dekan Bidang SKP FMIPA IPB"
        }, {
            nama_jabatan: "Manajer FABLAB FMIPA IPB"
        }
    ]);
    