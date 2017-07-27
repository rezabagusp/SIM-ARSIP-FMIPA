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

var generateToken = function() {
	var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
		time = toString(getTime());
		token = "";

		for (var i = 0; i < 9; i++) {
			token += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return crypto.createHash('sha256').update(token).digest('hex');
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
		var id = req.body.id_user;
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
			password = req.body.password_user,
			remember_me = req.body.remember_me;

		if (!email || !password ) {
			res.json({status: false, message: 'Email atau password masih kosong!', err_code: 400});
		} else if (!validateEmail(email)) {
			res.json({status: false, message: "Format email salah!", err_code: 400});
		} else {
			User
				.findAll({
					where: {
						email_user: email,
						password_user: crypto.createHash('sha256').update(password).digest('hex')
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

	this.addOne = function(req, res) {
		var nama = req.body.nama_user,
			email = req.body.email_user,
			password = req.body.password_user,
			password_konfirmasi = req.body.password_konfirmasi_user,
			role = req.body.role_user;

		if (!nama || !email || !password || !role) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else if (password !== password_konfirmasi) {
			res.json({status: false, message: "Password berbeda dengan password konfirmasi!", err_code: 400});
		} else if (!validateEmail(email)) {
			res.json({status: false, message: "Format email salah!", err_code: 400});
		} else {
			User
				.create({
					nama_user: nama,
					email_user: email,
					password_user: crypto.createHash('sha256').update(password).digest('hex'),
					role_user: role
				})
				.then(function(result) {
					res.json({status: true, message: 'Tambah user berhasil!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Tambah user gagal!', err_code: 400, err: err});
				})
		}
	}

	this.resetPassword = function(req, res) {
		var email = req.body.email_user,
			token = generateToken();

		if (!email) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else if (!validateEmail(email)) {
			res.json({status: false, message: "Format email salah!", err_code: 400});
		} else {
			User
				.update({
					lupa_pass_user: false,
					token_lupa_pass_user: token,

				}, {
					where: {
						email_user: email
					}
				})
				.then(function(result) {
					res.json({status: true, message: "Ubah password berhasil!"});
				})
				.catch(function(err) {
					res.json({status: false, message: "Ubah password gagal!", err_code: 400, err: err});
				})
		}
		
	}

	this.confirmResetPassword = function(req, res) {
		var nama = nama_user,
			token = req.body.token_lupa_pass,
			password = req.body.password_baru,
			password_konfirmasi = req.body.password_konfirmasi_user;

		if (!nama || !token || !password) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else if (password !== password_konfirmasi) {
			res.json({status: false, message: "Password tidak sama dengan password konfirmasi!", err_code: 400});
		} else if(password.length < 6) {
			res.json({status: false, message: "Password kurang panjang (minimal 6 karakter)!", err_code: 400});
		} else {
			User
				.update({
					password_user: crypto.createHash('sha256').update(password).digest('hex')
				}, {
					where: {
						nama_user: nama,
						lupa_pass_user: true,
						token_lupa_pass_user: token
					}
				})
				.then(function(result) {
					res.json({status: true, message: "Ubah password berhasil!"});
				})
				.catch(function(err){
					res.json({status: false, message: "Ubah password gagal!", err_code: 400, err: err});
				})
		}
		
	}

	this.update = function(req, res) {
		var id = req.body.id_user,
			email =  req.body.id_user,
			password = req.body.password_user,
			password_konfirmasi = req.body.password_konfirmasi_user,
			role: req.body.role_user;

		if (!id || !email || !password || !role) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else if (password !== password_konfirmasi) {
			res.json({status: false, message: "Password berbeda dengan password konfirmasi!", err_code: 400});
		} else if(!validateEmail(email)) {
			res.json({status: false, message: "Format email salah!", err_code: 400});
		} else {
			User
				.update({
					email_user: email,
					password_user: password,
					role_user: role
				}, {
					where: {
						id: id
					}
				})
				.then(function(result) {
					res.json({status: true, message: "Update user berhasil!"});
				})
				.catch(function(err) {
					res.json({status: false, message: "Update user gagal!", err_code: 404, err: err});
				})
		}
	}

	this.changeStatus = function(req, res) {
		var id = req.body.id_user,
			status = req.body.status;

		if (!id) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			User
				.update({
					status_user: status
				}, {
					where: {
						id: id
					}
				})
				.then(function(result) {
					res.json({status: true, message: "Ubah status user berhasil!"});
				})
				.catch(function(err) {
					res.json({status: false, message: "Ubah status user gagal!", err_code: 400, err: err});
				})
		}
	}
}

module.exports = new UserControllers();