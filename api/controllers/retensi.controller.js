var express = require('express'),
	path = require('path');

var sequelize = require('../connection');

var Kode_surat = sequelize.import(__dirname + '/../models/kode_surat.model');
var Jenis_surat = sequelize.import(__dirname + '/../models/jenis_surat.model');
var Sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_jenis_surat.model');
var Sub_sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_sub_jenis_surat.model');

var splitHalSurat = function(hal, result) {
	return nomor.split('.');
}

function SuratControllers() {
	this.cekHalSurat = function(req, res) {
		console.log('cek');
		var hal = req.body.hal_surat;

		temp = splitHalSurat(hal);
		console.log(temp[0], temp[1], temp[2], temp[3], temp[4]);
	}

	this.getKodeSurat = function(req, res) {
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

	this.getJenisSurat = function(req, res) {
		Kode_surat
			.findAll({
				include: [{
					model: Jenis_surat
				}]
			})
			.then(function(result) {
				if (result == 0 || result == null) {
					res.json({status: false, message: 'Jenis surat tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil semua jenis surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil semua jenis surat gagal!', err_code: 400, err: err});
			});
	}

	this.getSubJenisSurat = function(req, res) {
		Kode_surat
			.findAll({
				include: [{
					model: Jenis_surat,
					include: [{
						model: Sub_jenis_surat
					}]
				}]
			})
			.then(function(result) {
				if (result == 0 || result == null) {
					res.json({status: false, message: 'Sub jenis surat tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil semua sub jenis surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil semua sub jenis surat gagal!', err_code: 400, err: err});
			});
	}

	this.getSubSubJenisSurat = function(req, res) {
		Kode_surat
			.findAll({
				include: [{
					model: Jenis_surat,
					include: [{
						model: Sub_jenis_surat,
						include: [{
							model: Sub_sub_jenis_surat
						}]
					}]
				}]
			})
			.then(function(result) {
				if (result == 0 || result == null) {
					res.json({status: false, message: 'Sub sub jenis surat tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil semua sub sub jenis surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil semua sub sub jenis surat gagal!', err_code: 400, err: err});
			});
	}

	this.getSubSubSubJenisSurat = function(req, res) {
		Kode_surat
			.findAll({
				include: [{
					model: Jenis_surat,
					include: [{
						model: Sub_jenis_surat,
						include: [{
							model: Sub_sub_jenis_surat,
							include: Sub_sub_sub_jenis_surat
						}]
					}]
				}]
			})
			.then(function(result) {
				if (result == 0 || result == null) {
					res.json({status: false, message: 'Sub sub sub jenis surat tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil semua sub sub sub jenis surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil semua sub sub sub jenis surat gagal!', err_code: 400, err: err});
			});
	}
}