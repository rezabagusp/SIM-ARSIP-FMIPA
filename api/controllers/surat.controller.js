var express = require('express'),
	multer = require('multer'),
	path = require('path'),
	fs = require('fs');

var sequelize = require('../connection');

var Surat = sequelize.import(__dirname + '/../models/surat.model');
var Lampiran = sequelize.import(__dirname + '/../models/lampiran.model');
var Staff = sequelize.import(__dirname + '/../models/staff.model');

var Surat_masuk_penerima = sequelize.import(__dirname + '/../models/surat_masuk_penerima.model');
var Surat_keluar_pengirim = sequelize.import(__dirname + '/../models/surat_keluar_pengirim.model');
var Kode_surat = sequelize.import(__dirname + '/../models/kode_surat.model');
var Jenis_surat = sequelize.import(__dirname + '/../models/jenis_surat.model');
var Sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_jenis_surat.model');
var Sub_sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_sub_jenis_surat.model');

Jenis_surat.belongsTo(Kode_surat, {foreignKey: 'kode_surat_id'});
Sub_jenis_surat.belongsTo(Jenis_surat, {foreignKey: 'jenis_surat_id'});
Sub_sub_jenis_surat.belongsTo(Sub_jenis_surat, {foreignKey: 'sub_jenis_surat_id'});
Surat.belongsTo(Sub_sub_jenis_surat, {foreignKey: 'sub_sub_jenis_surat_id'});

Surat_masuk_penerima.belongsTo(Surat, {foreignKey: 'surat_id'});
Surat_masuk_penerima.belongsTo(Staff, {foreignKey: 'staff_id'});
Surat_keluar_pengirim.belongsTo(Surat, {foreignKey: 'surat_id'});
Surat_keluar_pengirim.belongsTo(Staff, {foreignKey: 'staff_id'});

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

	this.countByJenis = function(req, res) {
		var jenis = req.body.jenis_surat;

		if (jenis == undefined) {
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
								where: {
									id: jenis
								}
							}]
						}]
					}]
				})
				.then(function(result) {
					res.json({status: true, message: 'Hitung surat dengan jenis berhasil!', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Hitung surat dengan jenis gagal!', err_code: 400, err: err});
				})
		}
	}

	this.countBySubJenis = function(req, res) {
		var sub_jenis = req.body.sub_jenis_surat_id;

		if (sub_sub_jenis == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.count({
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
					res.json({status: true, message: 'Hitung surat dengan subjenis berhasil!', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Hitung surat dengan subjenis gagal!', err_code: 400, err: err});
				})
		}
	}

	this.countBySubSubJenis = function(req, res) {
		var sub_sub_jenis = req.body.sub_sub_jenis_surat;

		if (sub_sub_jenis == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Surat
				.count({
					include: [{
						model: Sub_sub_jenis_surat,
						where: {
							id: sub_sub_jenis
						}
					}]
				})
				.then(function(result) {
					res.json({status: true, message: 'Hitung surat dengan subsubjenis berhasil!', data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Hitung surat dengan subsubjenis gagal!', err_code: 400, err: err});
				})
		}
	}
		
	this.getAll = function(req, res) {	
		Surat
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Semua surat gagal ditemukan!', err_code: 400});
				} else {
					res.json({status: true, message: 'Ambil semua surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil semua surat gagal!', err_code: 400, err: err});
			})
	}

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
					if (result == null) {
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
			Surat
				.findAll({
					where: {
						tipe_surat: tipe
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 400});
					} else {
						res.json({status: true, message: 'Ambil surat dengan tipe berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil surat dengan tipe gagal!', err_code: 400, err: err});
				})
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
					if (result == null) {
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
					if (result == null) {
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
					if (result == null) {
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
					if (result == null) {
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
					if (result == null) {
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
					if (result == null) {
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
				hal_surat = temp[2],
				tahun = Number(temp[3]);

			Surat
				.create({
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
			        file_surat: file
				})
				.then(function(result) {
					// Jika surat ada lampirannya, maka lampiran yang bersangkutan akan diupdate surat_id nya
					if (lampiran !== null && lampiran.length > 0) {
						for (var i = 0; i < lampiran.length; i++) {
							Lampiran
								.update({
									surat_id: result.dataValues.id
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
					if (tipe == 'masuk' && penerima.length > 0) {
						Surat_masuk_pengirim
							.create({
								surat_id: result.dataValues.id,
								nama_pengirim: pengirim[0].nama_pengirim
							})
							.then(function(result) {
								for (var i = 0; i < penerima.length; i++) {
									Surat_masuk_penerima
										.create({
											surat_id: result.dataValues.id,
											staff_id: penerima[i].id
										})
										.catch(function(err) {
											res.json({status: false, message: 'Pemasangan surat masuk dengan penerima gagal!', err_code: 400, err: err});
										})
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pemasangan surat masuk dengan pengirim gagal!', err_code: 400, err: err});
							})
					} else if (tipe == 'keluar' && penerima.length > 0) {
						Surat_keluar_pengirim
							.create({
								surat_id: result.dataValues.id,
								staff_id: pengirim
							})
							.then(function(result) {
								for (var i = 0; i < penerima.length; i++) {
									Surat_keluar_penerima
										.create({
											surat_id: result.dataValues.id,
											nama_penerima: penerima[i].nama_penerima
										})
										.catch(function(err) {
											res.json({status: false, message: 'Pemasangan surat masuk dengan penerima gagal!', err_code: 400, err: err});
										})
								}
							})
					}
					res.json({status: true, message: 'Tambah surat berhasil!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Tambah surat gagal!', err_code: 400, err: err});
				});
		}
	}

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
					if (result == null) {
						res.json({status: false, message: 'Surat tidak ditemukan!', err_code: 404});
					} else {
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

	this.update = function(req, res) {
		var id = req.body.id_surat,
			nomor = req.body.nomor_surat,
			perihal = req.body.perihal_surat,
			tanggal = req.body.tanggal_surat,
			tanggal_terima = req.body.tanggal_terima_surat,
			tanggal_entri = req.body.tanggal_entri_surat,
			tipe = req.body.tipe_surat,
			status = req.body.status_surat,
			file = req.body.file_surat;

		if (nomor == undefined || perihal  == undefined || tanggal  == undefined || tanggal_terima  == undefined || tanggal_entri  == undefined || tipe  == undefined || file  == undefined || status  == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else if (!validateNomorSurat(nomor)) {
			res.json({status: false, message: 'Format nomor surat tidak sesuai!', err_code: 400});
		} else {
			var temp = splitNomorSurat(nomor),
				nomor = Number(temp[0]),
				unit_kerja = tempat[1],
				hal = tempat[2],
				tahun = Number(temp[3]);

			Surat
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
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
											res.json({status: true, message: 'Surat beserta lampiran jika ada berhasil ditambahkan!'});
										} else {
											res.json({status: true, message: 'Surat berhasil ditambahkan!'});
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
				})
		}
	}
}

module.exports = new SuratControllers();