var express = require('express'),
	multer = require('multer'),
	path = require('path'),
	fs = require('fs'),
	mailer = require('../mailer');

var sequelize = require('../connection');

var Surat = sequelize.import(__dirname + '/../models/surat.model');
var Lampiran = sequelize.import(__dirname + '/../models/lampiran.model');
var Staff = sequelize.import(__dirname + '/../models/staff.model');
var Perihal = sequelize.import(__dirname + '/../models/perihal.model');

var Surat_masuk_penerima = sequelize.import(__dirname + '/../models/surat_masuk_penerima.model');
var Surat_masuk_pengirim = sequelize.import(__dirname + '/../models/surat_masuk_pengirim.model');
var Surat_keluar_pengirim = sequelize.import(__dirname + '/../models/surat_keluar_pengirim.model');
var Surat_keluar_penerima = sequelize.import(__dirname + '/../models/surat_keluar_penerima.model');
var Kode_surat = sequelize.import(__dirname + '/../models/kode_surat.model');
var Jenis_surat = sequelize.import(__dirname + '/../models/jenis_surat.model');
var Sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_jenis_surat.model');
var Sub_sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_sub_jenis_surat.model');

Jenis_surat.belongsTo(Kode_surat, {foreignKey: 'kode_surat_id'});
Sub_jenis_surat.belongsTo(Jenis_surat, {foreignKey: 'jenis_surat_id'});
Sub_sub_jenis_surat.belongsTo(Sub_jenis_surat, {foreignKey: 'sub_jenis_surat_id'});

Surat.hasMany(Lampiran, {foreignKey: 'surat_id'});
Surat.belongsTo(Perihal, {foreignKey: 'perihal_id'});
Surat.hasMany(Surat_masuk_penerima, {foreignKey: 'surat_id'});
Surat.hasOne(Surat_masuk_pengirim, {foreignKey: 'surat_id'});
Surat.hasMany(Surat_keluar_penerima, {foreignKey: 'surat_id'});
Surat.hasOne(Surat_keluar_pengirim, {foreignKey: 'surat_id'});
Surat_masuk_penerima.belongsTo(Staff, {foreignKey: 'staff_id'});
Surat_keluar_pengirim.belongsTo(Staff, {foreignKey: 'staff_id'});

/*Surat_masuk_penerima.belongsTo(Surat, {foreignKey: 'surat_id'});
Surat_masuk_pengirim.belongsTo(Surat, {foreignKey: 'surat_id'});
Surat_masuk_penerima.belongsTo(Staff, {foreignKey: 'staff_id'});
Surat_keluar_pengirim.belongsTo(Surat, {foreignKey: 'surat_id'});
Surat_keluar_penerima.belongsTo(Surat, {foreignKey: 'surat_id'});
Surat_keluar_pengirim.belongsTo(Staff, {foreignKey: 'staff_id'});*/

var validateNomorSurat = function(nomor) {
	var regex = /^[0-9]+\/IT3(\.[0-9]+)*\/[A-Z]{2,2}(\.[0-9]{2,2}){0,4}\/[0-9]{4,4}$/;
	return nomor.match(regex);
}

var splitNomorSurat = function(nomor, result) {
	return nomor.split('/');
}

var splitHalSurat = function(hal, result) {
	return nomor.split('.');
}

function SuratControllers() {
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
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 400});
					} else {
						if (result.dataValues.tipe_surat == 'masuk') {
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
				})
		}
	}

	this.getByTipe = function(req, res) {
		var tipe = req.body.tipe_surat;

		if (tipe == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			if (tipe == 'masuk') {
				Surat
					.findAll({
						where: {
							tipe_surat: 'masuk'
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
						if (result == 0) {
							res.json({status: false, message: 'Surat masuk tidak ditemukan!', err_code: 400});
						} else {
							res.json({status: true, message: 'Ambil semua surat masuk berhasil!', data: result});
						}
					})
					.catch(function(err) {
						res.json({status: false, message: 'Ambil semua surat masuk gagal!', err_code: 400, err: err});
					});
			} else if (tipe == 'keluar') {
				Surat
					.findAll({
						where: {
							tipe_surat: 'keluar'
						},
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
							res.json({status: false, message: 'Surat keluar tidak ditemukan!', err_code: 400});
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
		} else if (!validateNomorSurat(nomor)) {
			res.json({status: false, message: 'Format nomor surat tidak sesuai!', err_code: 400});
		} else {
			var temp = splitNomorSurat(nomor),
				nomor = Number(temp[0]),
				unit_kerja = temp[1],
				hal = temp[2],
				tahun = Number(temp[3]);

			Surat
				.findAll({
					where: {
						nomor_surat: nomor,
						unit_kerja_surat: unit_kerja,
						hal_surat: hal,
						tahun_surat: tahun
					}
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
					} else {
						if (result.dataValues.tipe_surat == 'masuk') {
							Surat
								.findAll({
									where: {
										nomor_surat: nomor,
										unit_kerja_surat: unit_kerja,
										hal_surat: hal,
										tahun_surat: tahun,
										tipe_surat: 'masuk'
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
								})
						} else {
							Surat
								.findAll({
									where: {
										nomor_surat: nomor,
										unit_kerja_surat: unit_kerja,
										hal_surat: hal,
										tahun_surat: tahun,
										tipe_surat: 'keluar'
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
								})
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
			}),
			limits: {
				fileSize: 1 * 1024 * 1024
			}
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
			posisi = req.body.posisi_surat;

		if (nomor == undefined || perihal  == undefined || tanggal  == undefined || tanggal_terima  == undefined || !tanggal_entri  == undefined || tipe  == undefined || status  == undefined || file  == undefined || pengirim == undefined || penerima == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else if (!validateNomorSurat(nomor)) {
			res.json({status: false, message: 'Format nomor surat tidak sesuai!', err_code: 400})
		} else {
			// memecah nomor surat menjadi 4 bagian sesuai format standar IPB
			var temp = splitNomorSurat(nomor);

			// memasukkan bagian-bagian nomor surat sesuai fungsinya
			var nomor = Number(temp[0]),
				unit_kerja = temp[1],
				hal = temp[2],
				tahun = Number(temp[3]);

			Surat
				.create({
					nomor_surat: nomor,
        			unit_kerja_surat: unit_kerja,
			        hal_surat: hal,
			        tahun_surat: tahun,
			        tanggal_surat: tanggal,
			        tanggal_terima_surat: tanggal_terima,
			        tanggal_entri_surat: tanggal_entri,
			        sifat_surat: sifat,
			        kepentingan_surat: kepentingan,
			        asal_surat: asal,
			        tipe_surat: tipe,
			        keterangan_surat: keterangan,
			        file_surat: file,
			        status_surat: status,
			        perihal_id: perihal,
			        posisi_surat: posisi  
				})
				.then(function(result) {
					// Ambil id surat
					var id = result.dataValues.id
					// Jika surat ada lampirannya, maka lampiran yang bersangkutan akan diupdate surat_id nya
					if (lampiran !== null && lampiran.length > 0) {
						for (var i = 0; i < lampiran.length; i++) {
							Lampiran
								.update({
									surat_id: id
								}, {
									where: {
										id: lampiran[i].id
									}
								})
								.catch(function(err) {
									res.json({status: false, message: 'Update lampiran gagal!', err_code: 400, err: err});
								});
						}
					}

					if (tipe == 'masuk' && penerima !== null && penerima.length > 0) {
						Surat_masuk_pengirim
							.create({
								surat_id: id,
								nama_pengirim: pengirim[0].nama
							})
							.then(function(result) {
								let j = 0
								for (var i = 0; i < penerima.length; i++) {
									Surat_masuk_penerima
										.create({
											surat_id: id,
											staff_id: penerima[i].id,
											status_disposisi_penerima: 0
										}).then((hasil) => {
											if(j == penerima.length-1) {
												mailer.sendSurat(id, 0, res);
											}
											j++
										})
										.catch(function(err) {
											res.json({status: false, message: 'Pemasangan surat masuk dengan penerima gagal!', err_code: 400, err: err});
										});
								}
<<<<<<< HEAD
=======
								res.json({status: true, message: 'Tambah surat masuk berhasil!'});
>>>>>>> 3bfcda8c57721df25b33dd6b2bba40867babde79
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pemasangan surat masuk dengan pengirim gagal!', err_code: 400, err: err});
							});
					} else if (tipe == 'keluar' && penerima !== null && penerima.length > 0) {
						Surat_keluar_pengirim
							.create({
								surat_id: id,
								staff_id: pengirim[0].id
							})
							.then(function(result) {
								for (var i = 0; i < penerima.length; i++) {
									Surat_keluar_penerima
										.create({
											surat_id: id,
											nama_penerima: penerima[i].nama
										})
								}
								res.json({status: true, message: 'Tambah surat keluar berhasil!'});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pemasangan surat keluar dengan pengirim dan penerima gagal!', err_code: 400, err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Tambah surat gagal!', err_code: 400, err: err});
				});
		}
	}

	this.send = function(req, res) {
		var id = req.body.id_surat,
			status = req.body.status_disposisi_penerima;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			mailer.send(res);
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
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
					} else {
						Lampiran
							.findAll({
								where: {
									surat_id: id
								}
							})
							.then(function(result) {
								if (result !== 0) {
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
										})
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Lampiran gagal ditemukan!', err_code: 400, err: err});
							});

						Surat_masuk_penerima
							.findAll({
								where: {
									surat_id: id
								}
							})
							.then(function(result) {
								if (result !== 0) {
									Surat_masuk_penerima
										.destroy({
											where: {
												surat_id: id
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Hapus pasangan surat masuk dengan penerima gagal!', err_code: 400, err: err})
										});
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pasangan surat masuk dan penerima gagal ditemukan!', err_code: 400, err: err});
							});

						Surat_masuk_pengirim
							.findAll({
								where: {
									surat_id: id
								}
							})
							.then(function(result) {
								if (result !== null) {
									Surat_masuk_pengirim
										.destroy({
											where: {
												surat_id: id
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Hapus pasangan surat masuk dengan pengirim gagal!', err_code: 400, err: err});
										});
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pasangan surat masuk dan pengirim gagal ditemukan!', err_code: 400, err: err});
							});

						
						Surat_keluar_penerima
							.findAll({
								where: {
									surat_id: id
								}
							})
							.then(function(result) {
								if (result !== null) {
									Surat_keluar_penerima
										.destroy({
											where: {
												surat_id: id
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Hapus pasangan surat keluar dengan penerima gagal!', err_code: 400, err: err})
										});
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pasangan surat keluar dan penerima gagal ditemukan!', err_code: 400, err: err});
							});

						Surat_keluar_pengirim
							.findAll({
								where: {
									surat_id: id
								}
							})
							.then(function(result) {
								if (result !== null) {
									Surat_keluar_pengirim
										.destroy({
											where: {
												surat_id: id
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Hapus pasangan surat keluar dengan pengirim gagal!', err_code: 400, err: err})
										});
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pasangan surat keluar dan pengirim gagal ditemukan!', err_code: 400, err: err});
							});

						var filename = result.dataValues.file_surat;
						fs.unlinkSync(__dirname + dir + destination + '/' + filename);
						Surat
							.destroy({
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: 'Surat berhasil dihapus!'});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Surat gagal dihapus!', err_code: 400, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Surat gagal ditemukan!', err_code: 400, err: err});
				})
			
		}
	}

	// fungsi update surat sudah di test
	this.update = function(req, res) {
		var id = req.body.id_surat,
			nomor = req.body.nomor_surat,
			perihal = req.body.perihal_surat,
			tanggal = req.body.tanggal_surat,
			tanggal_terima = req.body.tanggal_terima_surat,
			tanggal_entri = req.body.tanggal_entri_surat,
			kepentingan = req.body.kepentingan_surat,
			tipe = req.body.tipe_surat,
			sifat = req.body.sifat_surat,
			status = req.body.status_surat,
			file = req.body.file_surat,
			keterangan = req.body.keterangan_surat,
			posisi = req.body.posisi_surat,
			lampiran = req.body.lampiran_surat;

		if (id == undefined || nomor == undefined || perihal  == undefined || tanggal  == undefined || tanggal_terima  == undefined || tanggal_entri  == undefined || tipe  == undefined || file  == undefined || status  == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else if (!validateNomorSurat(nomor)) {
			res.json({status: false, message: 'Format nomor surat tidak sesuai!', err_code: 400});
		} else {
			var temp = splitNomorSurat(nomor),
				nomor = Number(temp[0]),
				unit_kerja = temp[1],
				hal = temp[2],
				tahun = Number(temp[3]);

			Surat
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 400});
					} else {
						Surat
							.update({
								nomor_surat: nomor,
								unit_kerja_surat: unit_kerja,
								hal_surat: hal,
								tahun_surat: tahun,
						        tanggal_surat: tanggal,
						        tanggal_terima_surat: tanggal_terima,
						        tanggal_entri_surat: tanggal_entri,
						        status_surat: status,
						        tipe_surat: tipe,
						        sifat_surat: sifat,
						        kepentingan_surat: kepentingan,
						        file_surat: file,
						        keterangan_surat: keterangan,
						        perihal_id: perihal,
						        posisi_surat: posisi
							}, {
								where: {
									id: id
								}
							})
							.then(function(result) {
								Lampiran
									.update({
										surat_id: null
									}, {
										where: {
											surat_id: null
										}
									})
									.then(function(result) {
										if (lampiran !== null && lampiran.length > 0) {
											for (var i = 0; i < lampiran.length; i++) {
												Lampiran
													.update({
														surat_id: id
													}, {
														where: {
															id: lampiran[i].id
														}
													})
													.catch(function(err) {
														res.json({status: false, message: 'Update lampiran gagal!', err_code: 400, err: err});
													});
											}
											res.json({status: true, message: 'Update surat beserta lampiran berhasil!'});
										} else {
											res.json({status: true, message: 'Update surat berhasil!'});
										}
									})
							})
							.catch(function(err) {
								res.json({status: false, message: 'Surat gagal diupdate!', err_code: 400, err: err});
							})
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
			penerima = req.body.penerima_surat;

		if (id == undefined || penerima == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findOne({
					where: {
						id: id,
						tipe_surat: 'masuk'
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
								var status = result + 1;
								if (penerima == null || penerima.length < 0) {
									res.json({status: false, message: 'Penerima tidak boleh kosong!', err_code: 400});
								} else {
									for (var i = 0; i < penerima.length; i++) {
										Surat_masuk_penerima
											.create({
												surat_id: id,
												staff_id: penerima[i].id,
												status_disposisi_penerima: status
											})
											.catch(function(err) {
												res.json({status: false, message: 'Penerima disposisi gagal ditambahkan!', err_code: 400, err: err});
											})
									}
									mailer.sendSurat(id, status, res);
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
}

module.exports = new SuratControllers();