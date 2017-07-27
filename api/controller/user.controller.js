var express = require('express');
var crypto = require('crypto');
var path = require('path');
var jwt = require('../token')

var sequelize = require('../connection');

var User = sequelize.import(__dirname + "/../models/user.models");

var validateEmail = function(email) {
	var regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return email.match(regexMail);
}

var randomString = function(lenth) {
	
}

function UserControllers() {
	this.getAll = function(req, res) {
		User
			.findAll()
			.then(function(result) {
				if (!result.length) {
					res.json({status: false, message: 'Cari semua user gagal!', err_code: 400});
				} else {
					res.json({status: true, message: 'Cari semua user berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Cari semua user gagal!', err_code: 400, err: err});
			})
	}

	this.getOne = function(req, res) {
		var id = req.body.id;
		User
			.findOne({
				where: {
					id: id
				}
			})
			.then(function(result) {
				if (!result.length) {
					res.json({status: false, message: 'Cari user gagal!', err_code: 400});
				} else {
					res.json({status: true, message: 'Cari user berhasil!', data: result});
				}
			})
			.catch(function(err)) {
				res.json({status: false, message: 'Cari user gagal!', err_code: 400, err: err});
			}
	}

	this.login = function(req, res){
		var email = req.body.email_user,
			password = crypto.createHash('sha256').update(req.body.password_user).digest('hex'),
			remember_me = req.body.remember_me;
		if (!email || !password ) {
			res.json({status: false, message: 'Email atau password masih kosong!', err_code: 400, err: err});
		} else {
			User
				.findAll({
					where: {
						email_user: email,
						password_user: password
					}
				})
				.then(function(user) {
			      	if (!user.length) {
				        res.json({status: false, message:'User tidak ditemukan!', err_code: 400});
			      	} else {
			        	var signInTime = Math.floor(Date.now() / 1000);
			        	var expired;
			        	if (remember_me == true) {
			          		expireTime = 99999999999;
			        	} else {
			          		expireTime = signInTime + (2 * 60 * 60);
			        	}
			        	var data = { id: user[0].id_user, role: user[0].role_user, email: user[0].email_user, iat: signInTime, expired: expireTime };
			        	var token = jwt.createToken(data);
			        	res.json({status: true, message: 'Login berhasil!', token: token});
			      	}
		    	})
		    	.catch(function(err) {
		    		res.json({status: false, message: 'Login gagal!', err_code: 400, err: err});
		    	})
		}
	}

	this.checkSession = function(req, res) {
		jwt.checkToken(req, res);
	}

	this.addOne = function(req, res) {
		User
			.create({
				nama_user: nama,
				email_user: email,
				password_user: password,
				role_user: role
			})
			.then(function(result) {
				res.json({status: true, message: 'Tambah user berhasil!'});
			})
			.catch(function(err) {
				res.json({status: false, message: 'Tambah user gagal!', err_code: 400, err: err});
			})
	}

	this.session = function(req, res){
		var token = req.body.token;
		jwt.checkToken(token, res);
	}

	this.resetPassword = function(req, res) {
		var email = req.body.email_user;

	}

	this.confirmResetPassword = function(req, res) {
		var nama = nama_user,
			token = req.body.token_forgot_pass;
			password = crypto.createHash('sha256').update(data.password_baru).digest('hex');

		User
			.update({
				password_user: password
			},
			{
				where: {
					nama_user: nama,
					forgot_pass_user: true,
					token_forgot_pass_user: token
				}
			})
			.then(function(result) {
				res.json({status: true, message: "Ubah password berhasil!"});
			})
			.catch(function(err){
				res.json({status: false, message: "Ubah password gagal!", err_code: 400, err: err});
			})
	}

	this.inactivate = function(req, res) {
		
	}
}

module.exports = new UserControllers();