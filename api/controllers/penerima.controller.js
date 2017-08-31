var express = require('express');
var crypto = require('crypto');
var multer = require('multer');
var path = require('path');

var sequelize = require('./connection');
var fs = require('fs');

var Penerima = sequelize.import(__dirname + "/../models/penerima.model");

function LampiranControllers() {
	this.countAll = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);
	Penerima
		.count()
		.then(function(result) {
			res.json({status:true, message:'Hitung penerima berhasil!', data: result});
		})
		.catch(function(err) {
			res.json({status: false, message: 'Hitung penerima gagal!', err_code: 400, err: err});
		})
	}
	
	this.getAll = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);	
	Penerima
		.findAll()
		.then(function(result) {
			res.json({status: true, message: 'Ambil semua penerima berhasil!', data: result});
		})
		.catch(function(err) {
			res.json({staus: false, message: 'Ambil semua penerima gagal!', err_code: 400, err: err});
		})
	}

	this.getOne = function(req, res) {
	//	var auth = jwt.validateToken(req.headers, res);
		Penerima
			.findAll({
				where: {
					id: id
				}
			})
			.then(function(result) {
				res.json({status: true, message: 'Ambil satu penerima berhasil!', data: result});
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil satu penerima gagal!', err_code: 400, err: err});
			})
	}

	this.addOne = function(req, res) {
		Penerima
			.create({
				nama_penerima: nama,
				jabatan_penerima: jabatan,
				email_penerima: email
			})
			.then(function(result) {
				res.json({status: true, message: 'Tambah penerima berhasil!'});
			})
			.catch(function(err)) {
				res.json({status: false, message: 'Tambah penerima gagal!', err_code: 400, err: err});
			}
	}

	this.deleteOne = function(req, res) {
		Penerima
			.delete({
				where: {
					id: id
				}
			})
			.then(function(result) {
				res.json({status: true, message: 'Hapus penerima berhasil!'});
			})
			.catch(function(err) {
				res.json({status: false, message: 'Hapus penerima gagal!', err_code: 400, err: err});
			})
	}
}

module.exports = new LampiranControllers();