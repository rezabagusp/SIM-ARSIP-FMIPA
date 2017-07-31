var express = require('express');
var crypto = require('crypto');
var multer = require('multer');
var path = require('path');

var sequelize = require('./connection');
var fs = require('fs');

var Surat = sequelize.import(__dirname + "/../models/surat.model");
var kode_surat = sequelize.import(__dirname + "/../models/kode_surat.model");
var jenis_surat = sequelize.import(__dirname + "/../models/jenis_surat.model");
var sub_jenis_surat = sequelize.import(__dirname + "/../models/sub_jenis_surat.model");
var sub_sub_jenis_surat = sequelize.import(__dirname + "/../models/sub_sub_jenis_surat.model");
var Penerima
var Pengirim

Surat.hasOne(Pengirim, { foreignKey:  });

function SuratControllers() {
	this.countAll = function(req, res) {
		Surat
			.count()
			.then(function(result) {
				res.json({status: true, message: "Hitung surat berhasil!", data: result});
			})
			.catch(function(err) {
				res.json({status: false, message: "Hitung surat gagal!", err_code: 400, err: err});
			})
	}

	this.countByKode = function(req, res) {
		var kode = req.body.kode_surat;

		if (!kode) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.count({
					include: [{
						model: Sub_sub_jenis_surat,
						include: [{
							model: Sub_jenis_surat,
							include: [{
								model: Jenis_surat,
								include: [{
									model: Kode_surat,
									where: {
										id: kode
									}
								}]
							}]
						}]
					}]
				})
				.then(function(result) {
					res.json({status: true, message: "Hitung surat dengan kode berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan kode gagal!", err_code: 400, err: err});
				})
		}
	}

	this.countByJenis = function(req, res) {
		var jenis = req.body.jenis_surat;

		if (!jenis) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.count({
					include: [{
						model: Sub_sub_jenis_surat,
						include: [{
							model: Sub_jenis_surat,
							include: [{
								model: Jenis_surat,
								where: {
									id: jenis
								}
							}]
						}]
					}]
				})
				.then(function(result) {
					res.json({status: true, message: "Hitung surat dengan jenis berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan jenis gagal!", err_code: 400, err: err});
				})
		}
	}

	thsi.countBySubJenis = function(req, res) {
		var sub_jenis = req.body.sub_jenis_surat_id;

		if (!sub_sub_jenis) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.count({
					include: [{
						model: Sub_sub_jenis_surat,
						include: [{
							model: Sub_jenis_surat,
							where: {
								id: sub_jenis
							}
						}]
					}]
				})
				.then(function(result) {
					res.json({status: true, message: "Hitung surat dengan subjenis berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan subjenis gagal!", err_code: 400, err: err});
				})
		}
	}

	this.countBySubSubJenis = function(req, res) {
		var sub_sub_jenis = req.body.sub_sub_jenis_surat;

		if (!sub_sub_jenis) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.count({
					include: [{
						model: Sub_sub_jenis_surat,
						where: {
							id: sub_sub_jenis
						}
					}]
				})
				.then(function(result) {
					res.json({status: true, message: "Hitung surat dengan subsubjenis berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan subsubjenis gagal!", err_code: 400, err: err});
				})
		}
	}
	
	this.getAll = function(req, res) {	
		Surat
			.findAll()
			.then(function(result) {
				res.json({status: true, message: 'Ambil semua surat berhasil!', data: result});
			})
			.catch(function(err)) {
				res.json({status: false, message: 'Ambil semua surat gagal!', err_code: 400, err: err});
			}
	}

	this.getOne = function(req, res) {
		var id = req.body.id_surat;

		if (!id) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						id: id
					}
				})
				.then(function(result) {
					res.json({status: true, message: 'Ambil satu surat berhasil!', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message 'Ambil satu surat gagal!', err_code: 400, err: err});
				})
		}
	}

	this.getByTipe = function(req, res) {
		var tipe = req.body.tipe_surat;

		if (!tipe) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						tipe_surat: tipe
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
					} else {
						res.json({status: true, message: "Ambil surat dengan tipe berhasil!", data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "Ambil surat dengan tipe gagal!", err_code: 400, err: err});
				})
		}
	}

	this.getByNomor = function(req, res) {
		var nomor = req.body.nomor_surat;

		if (!nomor) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						nomor_surat: nomor
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
					} else {
						res.json({status: true, message: "Ambil surat dengan nomor berhasil!", data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "Ambil surat dengan nomor gagal!", err_code: 400, err: err});
				})
		}
	}

	this.getByPengirim = function(req, res) {
		var pengirim = req.body.id_pengirim;

		if (!pengirim) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						pegirim_surat: pengirim
					}
				})
				.then(function(result) {
					res.json({status: true, message: 'Ambil satu surat dari penerima berhasil!', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil satu surat dari penerima gagal!', err_code: 400, err: err});
				})
		}
	}

	this.getByKode = function(req, res) {
		var kode = req.body.kode_surat;

		if (!kode) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					include: [{
						model: Sub_sub_jenis_surat,
						include: [{
							model: Sub_jenis_surat,
							include: [{
								model: Jenis_surat,
								include: [{
									model: Kode_surat,
									where: {
										id: kode
									}
								}]
							}]
						}]
					}]
				})
				.then(function(result) {
					res.json({status: true, message: "Hitung surat dengan kode berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan kode gagal!", err_code: 400, err: err});
				})
		}
	}

	this.getByJenis = function(req, res) {
		var jenis = req.body.jenis_surat;

		if (!jenis) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					include: [{
						model: Sub_sub_jenis_surat,
						include: [{
							model: Sub_jenis_surat,
							include: [{
								model: Jenis_surat,
								where: {
									id: jenis
								}
							}]
						}]
					}]
				})
				.then(function(result) {
					res.json({status: true, message: "Hitung surat dengan jenis berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan jenis gagal!", err_code: 400, err: err});
				})
		}
	}

	thsi.getBySubJenis = function(req, res) {
		var sub_jenis = req.body.sub_jenis_surat;

		if (!sub_sub_jenis) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					include: [{
						model: Sub_sub_jenis_surat,
						include: [{
							model: Sub_jenis_surat,
							where: {
								id: sub_jenis
							}
						}]
					}]
				})
				.then(function(result) {
					res.json({status: true, message: "Hitung surat dengan subjenis berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan subjenis gagal!", err_code: 400, err: err});
				})
		}
	}

	this.getBySubSubJenis = function(req, res) {
		var sub_sub_jenis = req.body.sub_sub_jenis_surat;

		if (!sub_sub_jenis) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					include: [{
						model: Sub_sub_jenis_surat,
						where: {
							id: sub_sub_jenis
						}
					}]
				})
				.then(function(result) {
					res.json({status: true, message: "Hitung surat dengan subsubjenis berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan subsubjenis gagal!", err_code: 400, err: err});
				})
		}
	}

	this.upload = function(req, res) {
		
	}

	this.addOne = function(req, res) {
		var nomor = req.body.nomor_surat,
			perihal = req.body.perihal_surat,
			pengirim = req.body.pengirim_surat,
			tanggal = req.body.tanggal_surat,
			tanggal_terima = req.body.tanggal_terima_surat,
			tanggal_entri = req.body.tanggal_entri_surat,
			jenis = req.body. = req.body.jenis_surat,
			file = req.body.file_surat;

		if (!nomor || !perihal || !pengirim || !tanggal || !tanggal_terima || !tanggal_entri_surat || !jenis || !file) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.create({
					nomor_surat: nomor,
			        perihal_surat: perihal,
			        pengirim_surat: pengirim,
			        tanggal_surat: tanggal,
			        tanggal_terima_surat: tanggal_terima,
			        tanggal_entri_surat: tanggal_entri,
			        jenis_surat: jenis, 
			        file_surat: file
				})
				.then(function(result){
					res.json({status: true, message: "Surat berhasil ditambahkan!"});
				})
				.catch(function(err) {
					res.json({status: false, message: "Surat gagal ditambahkan!", err_code: 404, err: err});
				})
		}
		
	}
}

module.exports = new SuratControllers();