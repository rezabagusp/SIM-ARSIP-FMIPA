var express = require('express');
var crypto = require('crypto');
var multer = require('multer');
var path = require('path');

var sequelize = require('./connection');
var fs = require('fs');

var Surat = sequelize.import(__dirname + "/../models/surat.model");

function SuratControllers(){
	this.countAll = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);
		Surat.count().then(function(result) {
			var semua = result;
			Surat.count({where: {status_surat: aktif}}).then(function(result) {
				var aktif = result;
			})
		})
	}
	
	this.getAll = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);	
		Surat
			.findAll()
			.then(function(result) {
				res.json({status: true, message: 'Cari semua surat berhasil!', data: result});
			})
			.catch(function(err)) {
				res.json({status: false, message: 'Ambil semua surat gagal!', err_code: 400, err: err});
			}
	}

	this.getOne = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);
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

	this.findByPenerima = function(req, res) {
		Surat
			.findAll({
				where: {
					penerima_surat: penerima
				}
			})
			.then(function(result) {
				res.json({status: true, message: 'Ambil satu surat dari penerima berhasil!', data: result});
			})
			.catch(function(err) {
				res.json({status: false, message 'Ambil satu surat dari penerima gagal!', err_code: 400, err: err});
			})
	}

	this.findByPengirim = function(req, res) {
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

	this.UploadFile = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);	
	}

	this.addOne = function(req, res) {
		Surat
			.create({
				nomor_surat: nomor,
		        perihal_surat: perihal,
		        pengirim_surat: pengirim,
		        tanggal_surat: tanggal,
		        tanggal_terima_surat: tanggal_terima,
		        tanggal_entri_surat: tanggal_entri,
		        jenis_surat: jenis,
		        isi_surat: isi,  
		        file_surat: file,
		        status_surat: status
			})
	}
}

module.exports = new SuratControllers();