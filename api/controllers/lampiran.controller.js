var express = require('express');
var crypto = require('crypto');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

var sequelize = require('../connection');

var Lampiran = sequelize.import(__dirname + '/../models/lampiran.model');

function LampiranControllers() {
	this.countAll = function(req, res) {
		Lampiran
			.count()
			.then(function(result) {
				res.json({status:true, message:'Hitung lampiran berhasil!', data: result});
			})
			.catch(function(err) {
				res.json({status: false, message: 'Hitung lampiran gagal!', err_code: 400, err: err});
			})
	}
	
	this.getAll = function(req, res) {	
		Lampiran
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Lampiran tidak ditemukan!', err_code: 404});
				}
				res.json({status: true, message: 'Ambil semua lampiran berhasil!', data: result});
			})
			.catch(function(err) {
				res.json({staus: false, message: 'Ambil semua lampiran gagal!', err_code: 400, err: err});
			})
	}

	this.getOne = function(req, res) {
		var id = req.body.id_lampiran;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Lampiran
				.findAll({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Lampiran tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Ambil satu lampiran berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil satu lampiran gagal!', err_code: 400, err: err});
				})
		}
	}

	this.getBySurat = function(req, res) {
		var id = req.body.id_surat;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Lampiran
				.findAll({
					where: {
						surat_id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: true, message: 'Lampiran tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Ambil lampiran dari surat berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil lampiran dari surat gagal!', err_code: 400, err: err});
				})
		}
	}

	this.add = function(req, res) {
		var judul = req.body.judul_lampiran,
        	tanggal = req.body.tanggal_lampiran,
        	tanggal_entri = req.body.tanggal_entri_lampiran,
        	file = req.body.file_lampiran;

        if (judul == undefined || tanggal == undefined || tanggal_entri == undefined || file == undefined) {
        	res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
        } else {
        	Lampiran
        		.create({
        			judul_lampiran: judul,
        			tanggal_lampiran: tanggal,
        			tanggal_entri_lampiran: tanggal_entri,
        			file_lampiran: file
        		})
        		.then(function(result) {
        			res.json({status: true, message: 'Tambah lampiran berhasil!'});
        		})
        		.catch(function(err) {
        			res.json({status: false, message: 'Tambah lampiran gagal!', err_code: 400, err: err});
        		})
        }
	}

	this.upload = function(req, res) {
		var destination = 'public/uploads/lampiran',
			dir = '/../',
			filename = 'lampiran';

		checkFileSignature = function(signature) {
			if (signature !== '25504446') {
				return false;
			} else {
				return true;
			}
		}

		var upload = multer({
			storage: multer.diskStorage({
				destination: function (req, file, cb) {
			    	cb(null, __dirname + dir + destination);
			  	},
				filename: function (req, file, cb) {
			      	filename = filename + '-' + Date.now() + '.pdf';
			      	cb(null, filename);
			  	}
			}),
			limits: {
				fileSize: 1 * 1024 * 1024
			}
		}).any();

		upload(req, res, function(err) {
			console.log(filename);
			var bitmap = fs.readFileSync(__dirname + dir + destination + '/' + filename).toString('hex', 0, 4);
			if (!checkFileSignature(bitmap)) {
				fs.unlinkSync(__dirname + dir + destination + '/' + filename);
				res.json({status: false, message: 'File bukan pdf!', err_code: 400});
			} else if (err) {
				res.json({status: false, message: 'Upload lampiran gagal!', err_code: 400, err: err});
			} else {
				res.json({status: true, message: 'Upload lampiran berhasil!', data: filename});
			}
		});
	}

	this.update = function(req, res) {
		var id = req.body.id_lampiran,
			judul = req.body.judul_lampiran,
        	tanggal = req.body.tanggal_lampiran,
        	tanggal_entri = req.body.tanggal_entri_lampiran,
        	file = req.body.file_lampiran;

      	if (id == undefined || judul == undefined || tanggal == undefined || tanggal_entri == undefined || file == undefined) {
      		res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
      	} else {
      		Lampiran
      			.findOne({
      				where: {
      					id: id
      				}
      			})
      			.then(function(result) {
      				if (result == null) {
      					res.json({status: false, message: 'Lampiran tidak ditemukan!', err_code: 404});
      				} else {
      					Lampiran
			      			.update({
			      				judul_lampiran: judul,
			      				tanggal_lampiran: tanggal,
			      				tanggal_entri_lampiran: tanggal_entri,
			      				file_lampiran: file
			      			}, {
			      				where: {
			      					id: id
			      				}
			      			})
			      			.then(function(result) {
			      				res.json({status: true, message: 'Update lampiran berhasil!'});
			      			})
			      			.catch(function(err) {
			      				res.json({status: false, message: 'Update lampiran gagal!', err_code: 400, err: err});
			      			})
      				}
      			})
      	}
	}

}

module.exports = new LampiranControllers();