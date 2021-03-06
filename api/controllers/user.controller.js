var express = require('express'),
	crypto = require('crypto'),
	path = require('path'),
	jwt = require('jsonwebtoken'),
	mailer = require('../mailer');

var sequelize = require('../connection');

var User = sequelize.import(__dirname + "/../models/user.model");

var validateEmail = function(email) {
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return email.match(regex);
}

function UserControllers() {
	// fungsi ambil semua user berhasil
	this.getAll = function(req, res) {
		User
			.findAll({
				attributes: [
					'nama_user',
					'email_user',
					'role_user',
					'status_user'
				]
			})
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

	// fungsi ambil user sudah ditest
	this.getOne = function(req, res) {
		var id = req.body.id_user;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			User
				.findAll({
					where: {
						id: id
					},
					attributes: [
						'nama_user',
						'email_user',
						'role_user',
						'status_user'
					]
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'User tidak ditemukan!', err_code: 400});
					} else {
						res.json({status: true, message: 'Ambil user berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil user gagal!', err_code: 400, err: err});
				})
		}
	}

	//fungsi login sudah ditest
	this.login = function(req, res){
		var email = req.body.email_user,
			password = req.body.password_user,
			remember_me = req.body.remember_me;

		if (!email || !password ) {
			res.json({status: false, message: 'Nama atau password user masih kosong!', err_code: 400});
		} else {
			User
				.findAll({
					where: {
						email_user: email,
						password_user: crypto.createHash('sha256').update(password).digest('hex'),
						status_user: true
					},
					attributes: [
						'nama_user',
						'email_user',
						'role_user',
						'status_user'
					]
				})
				.then(function(result) {
			      	if (result == null) {
				        res.json({status: false, message:'User tidak ditemukan!', err_code: 400});
			      	} else {
			        	var signInTime = Math.floor(Date.now() / 1000);
			        	if (remember_me == true) {
			          		var expireTime = signInTime + 99999999999;
			        	} else {
			          		var expireTime = signInTime + (2 * 60 * 60);
			        	}
			        	var data = { id: result[0].id_user, role: result[0].role_user, email: result[0].email_user, iat: signInTime, exp: expireTime };
			        	var token = jwt.sign(data, "YOUR_KEY_HERE");
			        	res.json({status: true, message: 'Login berhasil!', token: token});
			      	}
		    	})
		    	.catch(function(err) {
		    		res.json({status: false, message: 'Login gagal!', err_code: 400, err: err});
		    	})
		}
	}

	// fungsi tambah user sudah ditest
	this.add = function(req, res) {
		var nama = req.body.nama_user,
			email = req.body.email_user,
			password = req.body.password_user,
			password_konfirmasi = req.body.password_konfirmasi_user,
			role = req.body.role_user;
			console.log(req.body)

		if (!nama || !email || !password || !password_konfirmasi || !role) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else if (password !== password_konfirmasi) {
			res.json({status: false, message: "Password berbeda dengan password konfirmasi!", err_code: 400});
		} else if(password.length < 6) {
			res.json({status: false, message: "Password kurang panjang (minimal 6 karakter)!", err_code: 400});
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

	this.delete = function(req, res) {
		var id = req.body.id;

		if (id == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			User
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "User tidak ditemukan!", err_code: 400});
					} else {
						User
							.destroy({
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: "User berhasil dihapus!"});
							})
							.catch(function(err) {
								res.json({status: false, message: "User gagal dihapus!", err_code: 400, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "User tidak ditemukan!", err_code: 400, err: err});
				})
		}
	}

	this.resetPassword = function(req, res) {
		var email = req.body.email_user,
			token = jwt.sign({
 				exp: Math.floor(Date.now() / 1000) + (60 * 60),
  				data: 'Permintaan reset password diterima!'
			}, 'YOUR_KEY_HERE');

		if (!email) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else if (!validateEmail(email)) {
			res.json({status: false, message: "Format email salah!", err_code: 400});
		} else {
			User
				.findOne({
					where: {
						email_user: email,
						status_user: true
					}
				})
				.then(function(result){
					if (result == null) {
						res.json({status: false, message: "Email tidak ditemukan!", err_code: 400});
					} else {
						User
							.update({
								lupa_pass_user: true,
								token_lupa_pass_user: token
							}, {
								where: {
									email_user: email,
									lupa_pass_user: false,
									status_user: true
								}
							})
							.then(function(result) {
								res.json({status: true, message: "Request ubah password berhasil!", token: token});
							})
							.catch(function(err) {
								res.json({status: false, message: "Request ubah password gagal!", err_code: 400, err: err});
							})
					}
					
				})
				.catch(function(err) {
					res.json({status: false, message: "Email tidak ditemukan!", err_code: 400, err: err});
				})
				
		}
		
	}

	this.confirmResetPassword = function(req, res) {
		var email = req.body.email_user,
			token = req.body.token_lupa_pass,
			password = req.body.password_user,
			password_konfirmasi = req.body.password_konfirmasi_user;

		if (!email || !token || !password || !password_konfirmasi) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else if (password !== password_konfirmasi) {
			res.json({status: false, message: "Password tidak sama dengan password konfirmasi!", err_code: 400});
		} else if(password.length < 6) {
			res.json({status: false, message: "Password kurang panjang (minimal 6 karakter)!", err_code: 400});
		} else if (!jwt.verify(token, 'YOUR_KEY_HERE')) {
			res.json({status: false, message: "Token salah atau kedaluarsa!", err_code: 400});
		} else {
			User
				.findOne({
					where: {
						email_user: email,
						status_user: true
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "User tidak ditemukan!", err_code: 400});
					} else {
						User
							.update({
								password_user: crypto.createHash('sha256').update(password).digest('hex'),
								lupa_pass_user: false
							}, {
								where: {
									email_user: email,
									lupa_pass_user: true,
									token_lupa_pass_user: token,
									status_user: true
								}
							})
							.then(function(result) {
								res.json({status: true, message: "Ubah password berhasil!"});
							})
							.catch(function(err){
								res.json({status: false, message: "Ubah password gagal!", err_code: 400, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "User tidak ditemukan!", err_code: 400, err: err});
				})	
		}
		
	}

	this.updateProfil = function(req, res) {
		var id = req.body.id_user,
			nama = req.body.nama_user,
			email =  req.body.email_user,
			role = req.body.role_user;

		if (!id || !nama || !email || !role) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else if (!validateEmail(email)) {
			res.json({status: false, message: "Format email salah!", err_code: 400});
		} else {
			User
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "User tidak ditemukan!", err_code: 400});
					} else {
						User
							.update({
								nama_user: nama,
								email_user: email,
								role_user: role
							}, {
								where: {
									id: id,
									status_user: true
								}
							})
							.then(function(result) {
								res.json({status: true, message: "Update user berhasil!"});
							})
							.catch(function(err) {
								res.json({status: false, message: "Update user gagal!", err_code: 404, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "User tidak ditemukan!", err_code: 400});
				})
			
		}
	}

	this.updatePassword = function(req, res) {
		var id = req.body.id_user,
			password = req.body.password_user,
			password_konfirmasi = req.body.password_konfirmasi_user;

		if (!id || !password || !password_konfirmasi) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else if (password !== password_konfirmasi) {
			res.json({status: false, message: "Password berbeda dengan password konfirmasi!", err_code: 400});
		} else {
			User
				.findOne({
					where: {
						id: id,
						status_user: true
					}
				})
				.then(function(result) {
					if(result == null) {
						res.json({status: false, message: "User tidak ditemukan!", err_code: 400});
					} else {
						User
							.update({
								password_user: crypto.createHash('sha256').update(password).digest('hex')
							}, {
								where: {
									id: id,
									status_user: true
								}
							})
							.then(function(result) {
								res.json({status: true, message: "Update password user berhasil!"});
							})
							.catch(function(err) {
								res.json({status: false, message: "Update password user gagal!", err_code: 404, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "User tidak ditemukan!", err_code: 400});
				})
			
		}
	}

	this.updateStatus = function(req, res) {
		var id = req.body.id_user,
			status = req.body.status_user;

		if (!id) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			User
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "User tidak ditemukan!", err_code: 400});
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
				})
				.catch(function(err) {
					res.json({status: false, message: "User tidak ditemukan!", err_code: 400, err: err});
				})
		}
	}
}

module.exports = new UserControllers();