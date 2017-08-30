var express = require('express'),
    sequelize = require('../connection');

var Surat = sequelize.import(__dirname + '/../models/surat.model');

Surat
    .create({
        nomor_surat: 1
        unit_kerja_surat: 'IT3',
        hal_surat: 'PP.00.00.00',
        tahun_surat: 2017,
        tanggal_surat: '2017-08-13 10:00:00',
        tanggal_terima_surat: '2017-08-13 10:00:00',
        tanggal_entri_surat: '2017-08-13 10:00:00',
        sifat_surat: 'biasa',
        tipe_surat: 'masuk',
        file_surat: 'surat-1234567891.pdf',
        status_surat: 'aktif',
        perihal_id: 1,
        pengirim_id: 1
    })
    .create({
	nomor_surat: 2
        unit_kerja_surat: 'IT3.7',
        hal_surat: 'PP.00.00',
        tahun_surat: 2017,
        tanggal_surat: '2017-08-13 10:00:00',
        tanggal_terima_surat: '2017-08-13 10:00:00',
        tanggal_entri_surat: '2017-08-13 10:00:00',
        sifat_surat: 'biasa',
        tipe_surat: 'keluar',
        file_surat: 'surat-1234567892.pdf',
        status_surat: 'aktif',
        perihal_id: 1,
        pengirim_id: 1
    })
    .create({
        nomor_surat: 3
        unit_kerja_surat: 'IT3.7.1',
        hal_surat: 'PP.00',
        tahun_surat: 2017,
        tanggal_surat: '2017-08-13 10:00:00',
        tanggal_terima_surat: '2017-08-13 10:00:00',
        tanggal_entri_surat: '2017-08-13 10:00:00',
        sifat_surat: 'biasa',
        tipe_surat: 'masuk',
        file_surat: 'surat-1234567893.pdf',
        status_surat: 'aktif',
        perihal_id: 1,
        pengirim_id: 1
    })