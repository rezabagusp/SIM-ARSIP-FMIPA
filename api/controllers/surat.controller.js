var express = require('express'),
	multer = require('multer'),
	path = require('path'),
	fs = require('fs');

var sequelize = require('../connection');

var Surat = sequelize.import(__dirname + '/../models/surat.model');
var Lampiran = sequelize.import(__dirname + '/../models/lampiran.model');
var Staff = sequelize.import(__dirname + '/../models/staff.model');

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

Surat.hasMany(Surat_masuk_penerima, {foreignKey: 'surat_id'});
Surat.hasOne(Surat_masuk_pengirim, {foreignKey: 'surat_id'});
Surat.hasMany(Surat_keluar_penerima, {foreignKey: 'surat_id'});
Surat.hasOne(Surat_keluar_pengirim, {foreignKey: 'surat_id'});

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

	this.countByKode = function(req, res) {
		var kode = req.body.kode_surat;

		if (kode == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.count({
					include: [{
						model: Sub_sub_jenis_surat,
						include: [{
							model: Sub_jenis_surat,
							include: [{
								model: Jenis_surat,
								include: [{
									model: Kode_surat,
									where: {
										id: kode
									}
								}]
							}]
						}]
					}]
				})
				.then(function(result) {
					res.json({status: true, message: 'Hitung surat dengan kode berhasil!', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Hitung surat dengan kode gagal!', err_code: 400, err: err});
				})
		}
	}

	// fungsi ambil semua surat sudah di test
	this.getAll = function(req, res) {	
		Surat
			.findAll()
			.then(function(result) {
				if (result == 0) {
					res.json({status: false, message: 'Semua surat gagal ditemukan!', err_code: 400});
				} else {
					res.json({status: true, message: 'Ambil semua surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil semua surat gagal!', err_code: 400, err: err});
			})
	}

	// fungsi ambil surat sudah ditest
	this.getOne = function(req, res) {
		var id = req.body.id_surat;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat gagal ditemukan!', err_code: 400});
					} else {
						res.json({status: true, message: 'Ambil satu surat berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil satu surat gagal!', err_code: 400, err: err});
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
							model: Surat_masuk_pengirim,
							required: true
						}, {
							model: Surat_masuk_penerima,
							required: true
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
					})
			} else if (tipe == 'keluar') {
				// let gabungan = []
				// Surat_keluar_penerima
				// 	.findAll({
				// 		include: [{
				// 			model: Surat,
				// 			where: {
				// 				tipe_surat: 'keluar'
				// 			}
				// 		}]
				// 	})
				// 	.then((keluar_penerima) => {
				// 		keluar_penerima = JSON.parse(JSON.stringify(keluar_penerima))
				// 		for(let i=0; i<keluar_penerima.length; i++) {
				// 			gabungan.push(keluar_penerima[i])
				// 		}
				// 		// gabungan.push()
				// 		Surat_keluar_pengirim
				// 			.findAll({
				// 				include: [{
				// 					model: Surat,
				// 					where: {
				// 						tipe_surat: 'keluar'
				// 					}
				// 				}]
				// 			})
				// 			.then((keluar_pengirim) => {
				// 				keluar_pengirim = JSON.parse(JSON.stringify(keluar_pengirim))
				// 				for(let i=0; i< keluar_pengirim.length; i++) {
				// 					gabungan.push(keluar_pengirim[i])
				// 				}
				// 				if (gabungan.length == 0) {
				// 						res.json({status: false, message: 'Surat keluar tidak ditemukan!', err_code: 400});
				// 					} else {
				// 						res.json({status: true, message: 'Ambil semua surat keluar berhasil!', data: gabungan});
				// 					}
				// 			})
				// 			.catch((err) => {
				// 				res.json({status: false, message: 'Ambil semua surat keluar gagal!', err_code: 400, err: err})
				// 			})
				// 	})
				// 	.catch((err) => {
				// 		res.json({status: false, message: 'Ambil semua surat keluar gagal!', err_code: 400, err: err})
				// 	})
				Surat
					.findAll({
						where: {
							tipe_surat: 'keluar'
						},
						include: [{
							model: Surat_keluar_pengirim
						}, {
							model: Surat_keluar_penerima
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
					})
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
						res.json({status: true, message: 'Ambil surat dengan nomor berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil surat dengan nomor gagal!', err_code: 400, err: err});
				})
		}
	}

	this.getByPengirim = function(req, res) {
		var pengirim = req.body.id_pengirim;

		if (pengirim == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						pegirim_surat: pengirim
					}
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 400});
					} else {
						res.json({status: true, message: 'Ambil satu surat dari penerima berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil satu surat dari penerima gagal!', err_code: 400, err: err});
				})
		}
	}

	this.getByKode = function(req, res) {
		var kode = req.body.kode_surat;

		if (kode == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findAll({
					include: [{
						model: Sub_sub_jenis_surat,
						include: [{
							model: Sub_jenis_surat,
							include: [{
								model: Jenis_surat,
								include: [{
									model: Kode_surat,
									where: {
										id: kode
									}
								}]
							}]
						}]
					}]
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 400});
					} else {
						res.json({status: true, message: 'Ambil surat dengan kode berhasil!', data: result});
					}	
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil surat dengan kode gagal!', err_code: 400, err: err});
				})
		}
	}

	this.getByJenis = function(req, res) {
		var jenis = req.body.jenis_surat;

		if (jenis == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findAll({
					include: [{
						model: Sub_sub_jenis_surat,
						include: [{
							model: Sub_jenis_surat,
							include: [{
								model: Jenis_surat,
								where: {
									id: jenis
								}
							}]
						}]
					}]
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 400});
					} else {
						res.json({status: true, message: 'Ambil surat dengan jenis berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil surat dengan jenis gagal!', err_code: 400, err: err});
				})
		}
	}

	this.getBySubJenis = function(req, res) {
		var sub_jenis = req.body.sub_jenis_surat;

		if (sub_jenis == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findAll({
					include: [{
						model: Sub_sub_jenis_surat,
						include: [{
							model: Sub_jenis_surat,
							where: {
								id: sub_jenis
							}
						}]
					}]
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 400});
					} else {
						res.json({status: true, message: 'Ambil surat dengan subjenis berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil surat dengan subjenis gagal!', err_code: 400, err: err});
				})
		}
	}

	this.getBySubSubJenis = function(req, res) {
		var sub_sub_jenis = req.body.sub_sub_jenis_surat;

		if (sub_sub_jenis == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.findAll({
					include: [{
						model: Sub_sub_jenis_surat,
						where: {
							id: sub_sub_jenis
						}
					}]
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 400});
					} else {
						res.json({status: true, message: 'Ambil surat dengan subsubjenis berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil surat dengan subsubjenis gagal!', err_code: 400, err: err});
				});
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
			status = req.body.status_surat,
			file = req.body.file_surat,
			lampiran = req.body.lampiran_surat,
			pengirim = req.body.pengirim_surat,
			penerima = req.body.penerima_surat;

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
			        status_surat: status,
			        tipe_surat: tipe, 
			        file_surat: file,
			        perihal_id: perihal
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
								for (var i = 0; i < penerima.length; i++) {
									Surat_masuk_penerima
										.create({
											surat_id: id,
											staff_id: penerima[i].id,
											status_disposisi_penerima: 0
										})
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pemasangan surat masuk dengan pengirim gagal!', err_code: 400, err: err});
							})
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
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pemasangan surat keluar dengan pengirim dan penerima gagal!', err_code: 400, err: err});
							});
					}
					res.json({status: true, message: 'Tambah surat berhasil!'});
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
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
					} else {
						console.log("masuk")
						Lampiran
							.findAll({
								where: {
									surat_id: id
								}
							})
							.then(function(result) {
								if (result !== null) {
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
								if (result !== null) {
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
		console.log(req);
		var id = req.body.id_surat,
			nomor = req.body.nomor_surat,
			perihal = req.body.perihal_surat,
			tanggal = req.body.tanggal_surat,
			tanggal_terima = req.body.tanggal_terima_surat,
			tanggal_entri = req.body.tanggal_entri_surat,
			tipe = req.body.tipe_surat,
			sifat = req.body.sifat_surat,
			status = req.body.status_surat,
			file = req.body.file_surat,
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
						        perihal_surat: perihal,
						        tanggal_surat: tanggal,
						        tanggal_terima_surat: tanggal_terima,
						        tanggal_entri_surat: tanggal_entri,
						        status_surat: status,
						        tipe_surat: tipe, 
						        sifat_surat: sifat,
						        file_surat: file
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
											console.log(result.dataValues);
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
						id: id
					}
				})
				.then(function(result) {
					if (result == 0) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
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
								}
								res.json({status: true, message: 'Penerima disposisi berhasil ditambahkan!'});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Ambil status disposisi gagal!', err_code: 400, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Surat gagal ditemukan!', err_code})
				})
			
		}
	}
}

module.exports = new SuratControllers();