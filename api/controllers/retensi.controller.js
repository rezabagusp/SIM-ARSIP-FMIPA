var express = require('express'),
	path = require('path');

var sequelize = require('../connection');

var Surat = sequelize.import(__dirname + '/../models/surat.model');
var Hal_surat = sequelize.import(__dirname + '/../models/hal_surat.model');
// var Kode_surat = sequelize.import(__dirname + '/../models/kode_surat.model');
// var Jenis_surat = sequelize.import(__dirname + '/../models/jenis_surat.model');
// var Sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_jenis_surat.model');
// var Sub_sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_sub_jenis_surat.model');

var splitHalSurat = function(hal, result) {
	return nomor.split('.');
}

var splitNomorSurat = function(nomor, result) {
	return nomor.split('/');
}

function RetensiControllers() {
	this.cekHalSurat = function(req, res) {
		console.log('cek');
		var hal = req.body.hal_surat;

		temp = splitHalSurat(hal);
		console.log(temp[0], temp[1], temp[2], temp[3], temp[4]);
	}

	this.getRetensiSurat = function(req, res) {
		var result_surat = [];
		var result_retensi = [];
		Surat
			.findAll({
				where: {
					tipe_surat: 'Masuk',
					asal_surat: 'Internal'
				},
				attributes: [
					'id'
				]
			})
			.then(function(id_surat) {
				if (id_surat == null) {
					res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
				} else if (id_surat == 0) {
					res.json({status: true, message: 'Surat tidak ditemukan!', data: result});
				} else {
					for (let i = 0; i < id_surat.length; i++) {
						var id = id_surat[i].dataValues.id;

						Surat
							.findById(id)
							.then(function(surat) {
								if (surat == 0 || surat == null) {
									res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
								} else {
									var nomor = surat.dataValues.nomor_surat;
									var temp = splitNomorSurat(nomor);
									var hal = temp[2];

									Hal_surat
										.findOne({
											where: {
												kode_hal_surat: hal
											}
										})
										.then(function(hal_surat) {
											if (hal_surat == 0 || hal_surat == null) {
												hal_surat = [];
												result_retensi.push(hal_surat);
												result_surat.push(surat);
												if (i == (id_surat.length - 1)) {
													res.json({status: true, message: 'Ambil retensi surat berhasil!', surat: result_surat, retensi: result_retensi});
												}
											} else {
												result_retensi.push(hal_surat);
												result_surat.push(surat);
												if (i == (id_surat.length - 1)) {
													res.json({status: true, message: 'Ambil retensi surat berhasil!', surat: result_surat, retensi: result_retensi});
												}
											}
										})
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Ambil surat gagal!', err_code: 400, err: err});
							});
					}
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil semua id surat gagal!', err_code: 400, err: err});
			});
	}

	this.getRetensiSuratById = function(req, res) {
		var id = req.body.id_surat;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400, err: err});
		} else {
			Surat
				.findById(id)
				.then(function(result) {
					if (result == null || result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404, err: err});
					} else {
						var nomor = result.dataValues.nomor_surat;
						var temp_nomor = splitNomorSurat(nomor);
						var hal = temp[2];

						
						Hal_surat
							.findOne({
								where: {
									kode_hal_surat: hal
								}
							})
					}
				})
		}
	}
}

module.exports = new RetensiControllers();