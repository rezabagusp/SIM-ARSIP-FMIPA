var express = require('express'),
	multer = require('multer'),
	path = require('path'),
	fs = require('fs'),
	mailer = require('../mailer'),
	jwt = require('../token');

var sequelize = require('../connection');

var Surat = sequelize.import(__dirname + '/../models/surat.model');
var Lampiran = sequelize.import(__dirname + '/../models/lampiran.model');
var Staff = sequelize.import(__dirname + '/../models/staff.model');
var Perihal = sequelize.import(__dirname + '/../models/perihal.model');

var Surat_masuk_penerima = sequelize.import(__dirname + '/../models/surat_masuk_penerima.model');
var Surat_masuk_pengirim = sequelize.import(__dirname + '/../models/surat_masuk_pengirim.model');
var Surat_keluar_pengirim = sequelize.import(__dirname + '/../models/surat_keluar_pengirim.model');
var Surat_keluar_penerima = sequelize.import(__dirname + '/../models/surat_keluar_penerima.model');
// var Kode_surat = sequelize.import(__dirname + '/../models/kode_surat.model');
// var Jenis_surat = sequelize.import(__dirname + '/../models/jenis_surat.model');
// var Sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_jenis_surat.model');
// var Sub_sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_sub_jenis_surat.model');

// Jenis_surat.belongsTo(Kode_surat, {foreignKey: 'kode_surat_id'});
// Sub_jenis_surat.belongsTo(Jenis_surat, {foreignKey: 'jenis_surat_id'});
// Sub_sub_jenis_surat.belongsTo(Sub_jenis_surat, {foreignKey: 'sub_jenis_surat_id'});

Surat.hasMany(Lampiran, {foreignKey: 'surat_id'});
Surat.belongsTo(Perihal, {foreignKey: 'perihal_id'});
Surat.hasMany(Surat_masuk_penerima, {foreignKey: 'surat_id'});
Surat.hasOne(Surat_masuk_pengirim, {foreignKey: 'surat_id'});
Surat.hasMany(Surat_keluar_penerima, {foreignKey: 'surat_id'});
Surat.hasOne(Surat_keluar_pengirim, {foreignKey: 'surat_id'});
Surat_masuk_penerima.belongsTo(Staff, {foreignKey: 'staff_id'});
Surat_keluar_pengirim.belongsTo(Staff, {foreignKey: 'staff_id'});

var validateNomorSurat = function(nomor) {
	var regex = /^[0-9]+\/IT3(\.[0-9]+)*\/[A-Z]{2,2}(\.[0-9]{2,2}){0,4}\/[0-9]{4,4}$/;
	return nomor.match(regex);
}

var splitNomorSurat = function(nomor, result) {
	return nomor.split('/');
}

function SuratControllers() {
	this.countAll = function(req, res) {
		Surat
			.count()
			.then(function(result) {
				res.json({status: true, message: 'Hitung surat berhasil!', data: result});
			})
			.catch(function(err) {
				res.json({status: false, message: 'Hitung surat gagal!', err_code: 400, err: err});
			})
	}

	this.countByTipe = function(req, res) {
		var tipe = req.body.tipe_surat;

		if (tipe == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.count({
					where: {
						tipe_surat: tipe
					}
				})
				.then(function(result) {
					res.json({status: true, message: 'Hitung surat dengan tipe berhasil!!', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Hitung surat dengan tipe gagal!', err_code: 400, err: err});
				})
		}
	}
	
	// fungsi ambil surat sudah ditest
	this.getOne = function(req, res) {
		var id = req.body.id_surat;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findOne({
					where: {
						id: id
					},
					attributes: ['tipe_surat']
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: true, message: 'Surat tidak ditemukan!', data: result});
					} else if (result == null) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
					} else {
						if (result.dataValues.tipe_surat == 'Masuk') {
							Surat
								.findOne({
									where: {
										id: id
									},
									include: [{
										model: Surat_masuk_pengirim
									}, {
										model: Surat_masuk_penerima,
										include: [{
											model: Staff
										}]
									}, {
										model: Perihal
									}, {
										model: Lampiran
									}]
								})
								.then(function(result) {
									res.json({status: true, message: 'Ambil surat masuk berhasil!', data: result});
								})
								.catch(function(err) {
									res.json({status: false, message: 'Ambil surat masuk gagal!', err_code: 400, err: err});
								});
						} else {
							Surat
								.findOne({
									where: {
										id: id
									},
									include: [{
										model: Surat_keluar_pengirim,
									}, {
										model: Surat_keluar_penerima,
										include: [{
											model: Staff
										}]
									}, {
										model: Perihal
									}, {
										model: Lampiran
									}]
								})
								.then(function(result) {
									res.json({status: true, message: 'Ambil surat keluar berhasil!', data: result});
								})
								.catch(function(err) {
									res.json({status: false, message: 'Ambil surat keluar gagal!', err_code: 400, err: err});
								});
						}
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil surat gagal!', err_code: 400, err: err});
				});
		}
	}

	this.getByTipe = function(req, res) {
		var tipe = req.body.tipe_surat;

		if (tipe == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			if (tipe == 'Masuk') {
				Surat
					.findAll({
						where: {
							tipe_surat: 'Masuk'
						},
						order: [
							['createdAt', 'DESC']
						],
						include: [{
							model: Surat_masuk_pengirim
						}, {
							model: Surat_masuk_penerima,
							include: [{
								model: Staff
							}]
						}, {
							model: Perihal
						}, {
							model: Lampiran
						}]
					})
					.then(function(result) {
						if (result == 0) {
							res.json({status: true, message: 'Surat masuk tidak ditemukan!', data: result});
						} else if (result == null) {
							res.json({status: false, message: 'Surat masuk tidak ditemukan!', err_code: 404});
						} else {
							res.json({status: true, message: 'Ambil semua surat masuk berhasil!', data: result});
						}
					})
					.catch(function(err) {
						res.json({status: false, message: 'Ambil semua surat masuk gagal!', err_code: 400, err: err});
					});
			} else {
				Surat
					.findAll({
						where: {
							tipe_surat: 'Keluar'
						},
						order: [
							['createdAt', 'DESC']
						],
						include: [{
							model: Surat_keluar_pengirim,
							include: [{
								model: Staff
							}]
						}, {
							model: Surat_keluar_penerima
						}, {
							model: Perihal
						}, {
							model: Lampiran
						}]
					})
					.then(function(result) {
						if (result == 0) {
							res.json({status: true, message: 'Surat keluar tidak ditemukan!', data: result});
						} else if (result == null) {
							res.json({status: false, message: 'Surat keluar tidak ditemukan!', err_code: 404});
						} else {
							res.json({status: true, message: 'Ambil semua surat keluar berhasil!', data: result});
						}
					})
					.catch(function(err) {
						res.json({status: false, message: 'Ambil semua surat keluar gagal!', err_code: 400, err: err});
					});
			}
		}
	}

	this.getByNomor = function(req, res) {
		var nomor = req.body.nomor_surat;

		if (nomor == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						nomor_surat: nomor
					}
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: true, message: 'Surat tidak ditemukan!', data: result});
					} else if (result == null) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
					} else {
						if (result.dataValues.tipe_surat == 'Masuk') {
							Surat
								.findAll({
									where: {
										nomor_surat: nomor,
										tipe_surat: 'Masuk'
									},
									include: [{
										model: Surat_masuk_pengirim
									}, {
										model: Surat_masuk_penerima
									}, {
										model: Perihal
									}, {
										model: Lampiran
									}]
								})
								.then(function(result) {
									res.json({status: true, message: 'Ambil surat masuk dengan nomor berhasil!', data: result});
								})
								.catch(function(err) {
									res.json({status: false, message: 'Ambil surat masuk dengan nomor gagal!', err_code: 400, err: err});
								});
						} else {
							Surat
								.findAll({
									where: {
										nomor_surat: nomor,
										tipe_surat: 'Keluar'
									},
									include: [{
										model: Surat_keluar_pengirim
									}, {
										model: Surat_keluar_penerima
									}, {
										model: Perihal
									}, {
										model: Lampiran
									}]
								})
								.then(function(result) {
									res.json({status: true, message: 'Ambil surat keluar dengan nomor berhasil!', data: result});
								})
								.catch(function(err) {
									res.json({status: false, message: 'Ambil surat keluar dengan nomor gagal!', err_code: 400, err: err});
								});
						}
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil surat dengan nomor gagal!', err_code: 400, err: err});
				})
		}
	}

	// fungsi upload surat sudah di test
	this.upload = function(req, res) {
		var destination = 'public/uploads/surat',
			dir = '/../',
			filename = 'surat';

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
			})
		}).any();

		upload(req, res, function(err) {
			var bitmap = fs.readFileSync(__dirname + dir + destination + '/' + filename).toString('hex', 0, 4);
			if (!checkFileSignature(bitmap)) {
				fs.unlinkSync(__dirname + dir + destination + '/' + filename);
				res.json({status: false, message: 'File bukan pdf!', err_code: 400});
			} else if (err) {
				res.json({status: false, message: 'Upload surat gagal!', err_code: 400, err: err});
			} else {
				res.json({status: true, message: 'Upload surat berhasil!', data: filename});
			}
		});
	}

	// fungsi add surat sudah di test
	this.add = function(req, res) {
		var nomor = req.body.nomor_surat,
			judul = req.body.judul_surat,
			perihal = req.body.perihal_surat,
			tanggal = req.body.tanggal_surat,
			tanggal_terima = req.body.tanggal_terima_surat,
			tanggal_entri = req.body.tanggal_entri_surat,
			tipe = req.body.tipe_surat,
			sifat = req.body.sifat_surat,
			kepentingan = req.body.kepentingan_surat,
			status = req.body.status_surat,
			file = req.body.file_surat,
			asal = req.body.asal_surat,
			keterangan = req.body.keterangan_surat,
			lampiran = req.body.lampiran_surat,
			pengirim = req.body.pengirim_surat,
			penerima = req.body.penerima_surat,
			kirim = req.body.kirim_surat;

		if (nomor == undefined || perihal  == undefined || tanggal  == undefined || tanggal_entri  == undefined || tipe  == undefined || file  == undefined || pengirim == undefined || penerima == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.create({
					nomor_surat: nomor,
					judul_surat: judul,
				    tanggal_surat: tanggal,
					tanggal_terima_surat: tanggal_terima,
					tanggal_entri_surat: tanggal_entri,
				 	sifat_surat: sifat,
					kepentingan_surat: kepentingan,
					asal_surat: asal,
					tipe_surat: tipe,
					file_surat: file,
					status_surat: status,
					perihal_id: perihal,
				})
				.then(function(result) {
					var id = result.dataValues.id;
					if (lampiran !== 0 || lampiran !== null) {
						for (let i = 0; i < lampiran.length; i++) {
							Lampiran
								.findById(lampiran[i].id)
								.then(function(result) {
									if (result == 0 || result == null) {
										res.json({status: false, message: 'Lampiran tidak ditemukan!', err_code: 404, err: err});
									} else {
										Lampiran
											.update({
												surat_id: id
											}, {
												where: {
													id: lampiran[i].id
												}
											})
											.catch(function(err) {
												res.json({status: false, message: 'Update lampiran surat gagal!', err_code: 400, err: err})
											});
									}
								})
								.catch(function(err) {
									res.json({status: false, message: 'Ambil lampiran gagal!', err_code: 400, err: err});
								});
						}
					}

					if (tipe == 'Masuk') {
						if (pengirim !== 0 || pengirim !== null) {
							Surat_masuk_pengirim
								.create({
									surat_id: id,
									nama_pengirim: pengirim[0].nama
								})
								.catch(function(err) {
									res.json({status: false, message: 'Pemasangan surat masuk dengan pengirim gagal!', err_code: 400, err: err});
								});
						}

						if (penerima !== 0 || penerima !== null) {
							for (let i = 0; i < penerima.length; i++) {
								Surat_masuk_penerima
									.create({
										surat_id: id,
										staff_id: penerima[i].id,
										status_disposisi_penerima: 0
									})
									.then(function(result) {
										if (i == (penerima.length - 1)) {
											if (kirim == false) {
												res.json({status: true, message: 'Tambah surat berhasil!'});
											} else {
												mailer.sendSurat(id, 0, keterangan, res);
											}
										}
									})
									.catch(function(err) {
										res.json({status: false, message: 'Pemasangan surat masuk dengan penerima gagal!', err_code: 400, err: err});
									});
							}
						}
					} else {
						if (pengirim !== 0 || pengirim !== null) {
							Surat_keluar_pengirim
								.create({
									surat_id: id,
									staff_id: pengirim[0].id
								})
								.catch(function(err) {
									res.json({status: false, message: 'Pemasangan surat keluar dengan pengirim gagal!', err_code: 400, err: err});
								});
						}
						if (penerima !== 0 || penerima !== null) {
							for (let i = 0; i < penerima.length; i++) {
								Surat_keluar_penerima
									.create({
										surat_id: id,
										nama_penerima: penerima[i].nama
									})
									.then(function(result){
										if (i == (penerima.length - 1)) {
											res.json({status: true, message: 'Tambah surat keluar berhasil!'});
										}
									})
									.catch(function(err) {
										res.json({status: false, message: 'Pemasangan surat keluar dengan penerima gagal!', err_code: 400, err: err});
									});
							}
						}
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Tambah surat gagal!', err_code: 400, err: err});
				});
		}
	}

	// fungsi delete surat sudah di test
	this.delete = function(req, res) {
		var id = req.body.id_surat,
			destination = 'public/uploads/surat',
			dir = '/../';

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findById(id)
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
					} else {
						var filename = result.dataValues.file_surat;
						var tipe = result.dataValues.tipe_surat;
						Lampiran
			 				.findAll({
			 					where: {
			 						surat_id: id
			 					}
			 				})
							.then(function(result) {
								if (result !== 0 || result !== null) {
									Lampiran
										.update({
											surat_id: null
										}, {
											where: {
												surat_id: id
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Update lampiran gagal!', err_code: 400, err: err});
										});
								}

								if (tipe == 'Masuk') {
									Surat_masuk_pengirim
										.findAll({
											where: {
												surat_id: id
											}
										})
										.then(function(result) {
											if (result !== 0 || result !== null) {
												Surat_masuk_pengirim
													.destroy({
														where: {
															surat_id: id
														}
													})
													.catch(function(err) {
														res.json({status: false, message: 'Tambah pengirim surat masuk gagal!', err_code: 400, err: err})
													});
											}

											Surat_keluar_penerima
												.findAll({
													where: {
														surat_id: id
													}
												})
												.then(function(result) {
													if (result !== 0 || result !== null) {
														Surat_masuk_penerima
															.destroy({
																where: {
																	surat_id: id
																}
															})
															.catch(function(err) {
																res.json({status: false, message: 'Hapus penerima surat masuk gagal!', err_code: 400, err: err});
															});
													}

													Surat
														.destroy({
															where: {
																id: id
															}
														})
														.then(function(result) {
															var hapus = fs.unlinkSync(__dirname + dir + destination + '/' + filename);
															res.json({status: true, message: 'Hapus surat masuk berhasil! Hapus file surat berhasil!'});
														})
														.catch(function(err) {
															res.json({status: false, message: 'Hapus surat masuk gagal!', err_code: 400, err: err});
														})
												})
												.catch(function(err) {
													res.json({status: false, message: 'Ambil penerima surat masuk gagal!', err_code: 400, err: err});
												});
										})
										.catch(function(err) {
											res.json({status: false, message: 'Ambil surat pengirim surat masuk gagal!', err_code: 400, err: err});
										});
								} else {
									Surat_keluar_pengirim
										.findAll({
											where: {
												surat_id: id
											}
										})
										.then(function(result) {
											if (result !== 0 || result !== null) {
												Surat_keluar_pengirim
													.destroy({
														where: {
															surat_id: id
														}
													})
													.catch(function(err) {
														res.json({status: false, message: 'Tambah pengirim surat keluar gagal!', err_code: 400, err: err})
													});
											}

											Surat_keluar_penerima
												.findAll({
													where: {
														surat_id: id
													}
												})
												.then(function(result) {
													if (result !== 0 || result !== null) {
														Surat_keluar_penerima
															.destroy({
																where: {
																	surat_id: id
																}
															})
															.catch(function(err) {
																res.json({status: false, message: 'Hapus penerima surat keluar gagal!', err_code: 400, err: err});
															});
													}

													Surat
														.destroy({
															where: {
																id: id
															}
														})
														.then(function(result) {
															var hapus = fs.unlinkSync(__dirname + dir + destination + '/' + filename);
															res.json({status: true, message: 'Hapus surat keluar berhasil! Hapus file surat berhasil!'});
														})
														.catch(function(err) {
															res.json({status: false, message: 'Hapus surat keluar gagal!', err_code: 400, err: err});
														})
												})
												.catch(function(err) {
													res.json({status: false, message: 'Ambil penerima surat keluar gagal!', err_code: 400, err: err});
												});
										})
										.catch(function(err) {
											res.json({status: false, message: 'Ambil surat pengirim surat keluar gagal!', err_code: 400, err: err});
										});
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Ambil lampiran gagal!', err_code: 400, err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil surat gagal!', err_code: 400, err: err});
				});
		}
	}

	// fungsi update surat sudah di test
	this.update = function(req, res) {
		var id = req.body.id_surat,
			nomor = req.body.nomor_surat,
			judul = req.body.judul_surat,
			perihal = req.body.perihal_surat,
			tanggal = req.body.tanggal_surat,
			tanggal_terima = req.body.tanggal_terima_surat,
			tanggal_entri = req.body.tanggal_entri_surat,
			tanggal_selesai = req.body.tanggal_selesai_surat,
			sifat = req.body.sifat_surat,
			kepentingan = req.body.kepentingan_surat,
			status = req.body.status_surat,
			file = req.body.file_surat,
			asal = req.body.asal_surat,
			lampiran = req.body.lampiran_surat,
			posisi = req.body.posisi_surat;

		if (id == undefined || nomor == undefined || perihal  == undefined || tanggal  == undefined || tanggal_terima  == undefined || tanggal_entri  == undefined || file  == undefined || status  == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
					} else {
						Surat
							.update({
								nomor_surat: nomor,
								judul_surat: judul,
						        tanggal_surat: tanggal,
						        tanggal_terima_surat: tanggal_terima,
						        tanggal_entri_surat: tanggal_entri,
						        tanggal_selesai_surat: tanggal_selesai,
						        sifat_surat: sifat,
						        kepentingan_surat: kepentingan,
						        asal_surat: asal,
						        file_surat: file,
						        status_surat: status,
						        perihal_id: perihal,
						        posisi_surat: posisi  
							}, {
								where: {
									id: id
								}
							})
							.then(function(result) {
								Lampiran
									.findAll({
										where: {
											surat_id: id
										}
									})
									.then(function(result) {
										if (result !== 0 || result !== null) {
											Lampiran
												.update({
													surat_id: null
												}, {
													where: {
														surat_id: id
													}
												})
												.catch(function(err) {
													res.json({status: false, message: 'Update lampiran lama surat gagal!', err_code: 400, err: err});
												});
										}

										if (lampiran !== 0 || lampiran !== null) {
											for (let i = 0; i < lampiran.length; i++) {
												Lampiran
													.findById(lampiran[i].id)
													.then(function(result) {
														if (result !== 0 || result !== null) {
															Lampiran
																.update({
																	surat_id: id
																}, {
																	where: {
																		id: lampiran[i].id
																	}
																})
																.then(function(result) {
																	if (i == (lampiran.length - 1)) {
																		res.json({status: true, message: 'Update surat berhasil! Update lampiran berhasil!'});
																	}
																})
																.catch(function(err) {
																	res.json({status: false, message: 'Update lampiran baru gagal!', err_code: 400, err: err});
																})
														}
													})
													.catch(function(err) {
														res.json({status: false, message: 'Ambil lampiran baru surat gagal!', err_code: 400, err: err});
													});
											}
										} else {
											res.json({status: true, message: 'Update surat berhasil!'});
										}
									})
									.catch(function(err) {
										res.json({status: false, message: 'Ambil lampiran lama surat gagal!', err_code: 400, err: err});
									});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Surat gagal diupdate!', err_code: 400, err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 400, err: err});
				});
		}
	}

	// fungsi update disposisi sudah ditest
	this.updateDisposisi = function(req, res) {
		var id = req.body.id_surat,
			penerima = req.body.penerima_surat,
			kirim = req.body.kirim_surat,
			keterangan = req.body.keterangan_surat;

		if (id == undefined || penerima == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findOne({
					where: {
						id: id,
						tipe_surat: 'Masuk'
					}
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat masuk tidak ditemukan!', err_code: 404});
					} else {
						Surat_masuk_penerima
							.max('status_disposisi_penerima', {
								where: {
									surat_id: id
								}
							})
							.then(function(result) {
								var status_disposisi = result + 1;
								console.log(result)
								if (penerima == null || penerima.length < 0) {
									res.json({status: false, message: 'Penerima tidak boleh kosong!', err_code: 400});
								} else {
									for (let i = 0; i < penerima.length; i++) {
										Surat_masuk_penerima
											.create({
												surat_id: id,
												staff_id: penerima[i].id,
												status_disposisi_penerima: status_disposisi
											})
											.then(function(result) {
												if(i == (penerima.length - 1)) {
													if (kirim == true) {
														mailer.sendSurat(id, status_disposisi, keterangan, res);
													} else {
														res.json({status: true, message: 'Penerima disposisi berhasil ditambahkan!'});
													}
												}
											})
											// .catch(function(err) {
											// 	res.json({status: false, message: 'Penerima disposisi gagal ditambahkan!', err_code: 400, err: err});
											// });
									}
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Ambil status disposisi gagal!', err_code: 400, err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Surat gagal ditemukan!', err_code})
				});
		}
	}

	this.updateStatus = function(req, res) {
		var id = req.body.id_surat;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findById(id)
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 400});
					} else {
						if (result.dataValues.status_surat == 'aktif') {
							var status = 'inaktif';
						} else {
							var status = 'aktif';
						}
						Surat
							.update({
								status_surat: status
							}, {
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: 'Update status surat berhasil!'});
							});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Surat gagal ditemukan!', err_code: 400, err: err});
				})
		}
	}
}

module.exports = new SuratControllers();