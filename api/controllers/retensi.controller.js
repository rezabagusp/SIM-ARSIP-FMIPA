var express = require('express'),
	path = require('path');

var sequelize = require('../connection');

var Surat = sequelize.import(__dirname + '/../models/surat.model');
var Lampiran = sequelize.import(__dirname + '/../models/lampiran.model');
var Staff = sequelize.import(__dirname + '/../models/staff.model');
var Perihal = sequelize.import(__dirname + '/../models/perihal.model');
var Hal_surat = sequelize.import(__dirname + '/../models/hal_surat.model');

var Surat_masuk_penerima = sequelize.import(__dirname + '/../models/surat_masuk_penerima.model');
var Surat_masuk_pengirim = sequelize.import(__dirname + '/../models/surat_masuk_pengirim.model');
var Surat_keluar_pengirim = sequelize.import(__dirname + '/../models/surat_keluar_pengirim.model');
var Surat_keluar_penerima = sequelize.import(__dirname + '/../models/surat_keluar_penerima.model');

Surat.hasMany(Lampiran, {foreignKey: 'surat_id'});
Surat.belongsTo(Perihal, {foreignKey: 'perihal_id'});
Surat.hasMany(Surat_masuk_penerima, {foreignKey: 'surat_id'});
Surat.hasOne(Surat_masuk_pengirim, {foreignKey: 'surat_id'});
Surat.hasMany(Surat_keluar_penerima, {foreignKey: 'surat_id'});
Surat.hasOne(Surat_keluar_pengirim, {foreignKey: 'surat_id'});
Surat_masuk_penerima.belongsTo(Staff, {foreignKey: 'staff_id'});
Surat_keluar_pengirim.belongsTo(Staff, {foreignKey: 'staff_id'});

var splitHalSurat = function(hal, result) {
	return nomor.split('.');
}

var splitNomorSurat = function(nomor, result) {
	return nomor.split('/');
}

function RetensiControllers() {
	this.getRetensiSurat = function(req, res) {
		var result_surat = [];
		var result_hal_surat = [];
		Surat
			.findAll({
				where: {
					tipe_surat: 'Masuk',
					asal_surat: 'Internal'
				},
				attributes: ['id']
			})
			.then(function(id_surat) {
				if (id_surat == null) {
					res.json({status: false, message: 'Id surat tidak ditemukan!', err_code: 404});
				} else if (id_surat == 0) {
					res.json({status: true, message: 'Id surat tidak ditemukan!', data: id_surat});
				} else {
					for (let i = 0; i < id_surat.length; i++) {
						var id = id_surat[i].dataValues.id;
						Surat
							.findOne({
								where: {
									id: id,
									tipe_surat: 'Masuk',
									asal_surat: 'Internal'
								},
								include: [{
									model: Surat_masuk_pengirim
								}, {
									model: Surat_masuk_penerima,
									include: [{
										model: Staff
									}]
								}, {
									model: Lampiran
								}, {
									model: Perihal
								}]
							})
							.then(function(surat) {
								if (surat == 0 || surat == null) {
									res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
								} else {
									var nomor = surat.dataValues.nomor_surat;
									var temp = splitNomorSurat(nomor);
									var kode = temp[2];

									Hal_surat
										.findOne({
											where: {
												kode_hal_surat: kode
											}
										})
										.then(function(hal_surat) {
											if (hal_surat == 0 || hal_surat == null) {
												hal_surat = [];
											}
											result_surat.push(surat);
											result_hal_surat.push(hal_surat);
											if (i == (id_surat.length - 1)) {
												res.json({status: true, message: 'Ambil retensi surat berhasil!', surat: result_surat, hal_surat: result_hal_surat});
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Hal surat gagal diambil!', err_code: 400, err: err});
										});
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Ambil surat gagal!', err_code: 400, err: err});
							});
					}
				}
				
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil id surat gagal!', err_code: 400, err: err});
			});
	}

	this.getRetensiSuratById = function(req, res) {
		Kode_surat
			.findAll()
			.then(function(result) {
				if (result == 0 || result == null) {
					res.json({status: false, message: 'Kode surat tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil semua kode surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil semua kode surat gagal!', err_code: 400, err: err});
			});
	}
}

module.exports = new RetensiControllers();