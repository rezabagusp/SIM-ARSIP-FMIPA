var express = require('express');
var crypto = require('crypto');
var multer = require('multer');
var path = require('path');

var sequelize = require('./connection');
var fs = require('fs');

var Lampiran = sequelize.import(__dirname + "/../models/lampiran.model");

function LampiranControllers(){
	this.countAll = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);
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
	//	var auth = jwt.validateToken(req.headers, res);	
	Lampiran
		.findAll()
		.then(function(result) {
			res.json({status: true, message: 'Cari semua lampiran berhasil!', data: result});
		})
		.catch(function(err) {
			res.json({staus: false, message: 'Cari semua lampiran gagal!', err_code: 400, err: err});
		})
	}

	this.getOne = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);
		Lampiran
			.findAll({
				where: {
					id: id
				}
			})
			.then(function(result) {
				res.json({status: true, message: 'Ambil satu lampiran berhasil!', data: result});
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil satu lampiran gagal!', err_code: 400, err: err});
			})
	}

	this.findBySurat = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);
		Lampiran
			.findAll({
				where: {
					surat_id: id
				}
			})
			.then(function(result) {
				res.json({status: true, message: 'Ambil lampiran dari surat berhasil!', data: result});
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil lampiran dari surat gagal!', err_code: 400, err: err});
			})
	}

	this.UploadFile = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);	
	}
}

module.exports = new LampiranControllers();