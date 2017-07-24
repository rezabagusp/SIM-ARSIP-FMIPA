var express = require('express');
var crypto = require('crypto');
var path = require('path');
var jwt = require('../token')

var sequelize = require('../connection');

var User = sequelize.import(__dirname + "/../models/user.models");

var validateEmail = function(mail) {
	var regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return mail.match(regexMail);
}

function UserControllers() {
	this.getAll = function(req, res) {
		User
			.findAll()
			.then(function(result) {
				res.json({status: true, message: 'Cari semua user berhasil!', data: result});
			})
			.catch(function(err) {
				res.json({status: false, message: 'Cari semua user gagal!', err_code: 400, err: err});
			})
	}

	this.getOne = function(req, res) {
		var id = req.body.id;
		User
			.findAll({
				where: {
					id: id
				}
			})
			.then(function(result) {
				res.json({status: true, message: 'Cari user berhasil!', data: result});
			})
			.catch(function(err)) {
				res.json({status: false, message: 'Cari user gagal!', err_code: 401, err: err})
			}
	}

	this.login = function(req, res){
		var email = req.body.email_user,
			password = crypto.createHash('sha256').update(req.body.password_user).digest('hex'),
			remember_me = req.body.remember_me;
		
		User
			.findAll({
				where: {
					email_user: email,
					password_user: password
				}
			})
			.then(function(user) {
		      	if (!user.length) {
			        res.json({status: false, message:'User tidak ditemukan! Email atau password salah!', err_code: 406});
		      	} else {
		        	var signInTime = Math.floor(Date.now()/1000);
		        	var expired;
		        	if (remember_me == true) {
		          		expireTime = 99999999999;
		        	} else {
		          		expireTime = signInTime + (2 * 60 * 60);
		        	}
		        	var data = { id: user[0].id_user, role: user[0].role_user, email_user: user[0].email_user, iat: signInTime, expired: expireTime };
		        	var token = jwt.createToken(data);
		        	res.json({status: true, message: "Login berhasil!", token: token});
		      	}
	    	})
	    	.catch(function(err) {
	    		res.json({status: false, message: 'Login gagal! User tidak ditemukan!', err_code: 404, err: err});
	    	})
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

	this.resetpass = function(req, res) {
		var email = req.body.email_user;

		if (!validateEmail(email)) {
			res.json({status: false, message: 'Format email salah!', err_code: 406})
		} else {
			var token = 
		}
	}

	this.confirmresetpass = function(req, res){
		
	}

	this.inactivateUser = function(req, res){
		
	}
}

module.exports = new UserControllers();