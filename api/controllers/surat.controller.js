var express = require('express'),
	multer = require('multer'),
	path = require('path'),
	fs = require('fs');

var sequelize = require('../connection');

var Surat = sequelize.import(__dirname + "/../models/surat.model");
var Penerima = sequelize.import(__dirname + "/../models/penerima.model");
var Pengirim = sequelize.import(__dirname + "/../models/pengirim.model");
var Surat_penerima = sequelize.import(__dirname + "/../models/surat_penerima.model");
var Kode_surat = sequelize.import(__dirname + "/../models/kode_surat.model");
var Jenis_surat = sequelize.import(__dirname + "/../models/jenis_surat.model");
var Sub_jenis_surat = sequelize.import(__dirname + "/../models/sub_jenis_surat.model");
var Sub_sub_jenis_surat = sequelize.import(__dirname + "/../models/sub_sub_jenis_surat.model");

Jenis_surat.belongsTo(Kode_surat, {foreignKey: "kode_surat_id"});
Sub_jenis_surat.belongsTo(Jenis_surat, {foreignKey: "jenis_surat_id"});
Sub_sub_jenis_surat.belongsTo(Sub_jenis_surat, {foreignKey: "sub_jenis_surat_id"});
Surat.belongsTo(Sub_sub_jenis_surat, {foreignKey: "sub_sub_jenis_surat_id"});

Surat_penerima.belongsTo(Surat, {foreignKey: "surat_id"});
Surat_penerima.belongsTo(Penerima, {foreignKey: "penerima_id"});
Surat.belongsTo(Pengirim, {foreignKey: "pengirim_surat"});

function SuratControllers() {
	this.countAll = function(req, res) {
		Surat
			.count()
			.then(function(result) {
				res.json({status: true, message: "Hitung surat berhasil!", data: result});
			})
			.catch(function(err) {
				res.json({status: false, message: "Hitung surat gagal!", err_code: 400, err: err});
			})
	}

	this.countByKode = function(req, res) {
		var kode = req.body.kode_surat;

		if (kode == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
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
					res.json({status: true, message: "Hitung surat dengan kode berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan kode gagal!", err_code: 400, err: err});
				})
		}
	}

	this.countByJenis = function(req, res) {
		var jenis = req.body.jenis_surat;

		if (jenis == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
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
					res.json({status: true, message: "Hitung surat dengan jenis berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan jenis gagal!", err_code: 400, err: err});
				})
		}
	}

	this.countBySubJenis = function(req, res) {
		var sub_jenis = req.body.sub_jenis_surat_id;

		if (sub_sub_jenis == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
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
					res.json({status: true, message: "Hitung surat dengan subjenis berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan subjenis gagal!", err_code: 400, err: err});
				})
		}
	}

	this.countBySubSubJenis = function(req, res) {
		var sub_sub_jenis = req.body.sub_sub_jenis_surat;

		if (sub_sub_jenis == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
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
					res.json({status: true, message: "Hitung surat dengan subsubjenis berhasil!", data: result});
				})
				.catch(function(err) {
					res.json({status: false, message: "Hitung surat dengan subsubjenis gagal!", err_code: 400, err: err});
				})
		}
	}
	
	this.getAll = function(req, res) {	
		Surat
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: "Semua surat gagal ditemukan!", err_code: 400});
				} else {
					res.json({status: true, message: "Ambil semua surat berhasil!", data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: "Ambil semua surat gagal!", err_code: 400, err: err});
			})
	}

	this.getOne = function(req, res) {
		var id = req.body.id_surat;

		if (id == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "Surat gagal ditemukan!", err_code: 400});
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
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						tipe_surat: tipe
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
					} else {
						res.json({status: true, message: "Ambil surat dengan tipe berhasil!", data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "Ambil surat dengan tipe gagal!", err_code: 400, err: err});
				})
		}
	}

	this.getByNomor = function(req, res) {
		var nomor = req.body.nomor_surat;

		if (nomor == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						nomor_surat: nomor
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
					} else {
						res.json({status: true, message: "Ambil surat dengan nomor berhasil!", data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "Ambil surat dengan nomor gagal!", err_code: 400, err: err});
				})
		}
	}

	this.getByPengirim = function(req, res) {
		var pengirim = req.body.id_pengirim;

		if (pengirim == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findAll({
					where: {
						pegirim_surat: pengirim
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
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
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
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
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
					} else {
						res.json({status: true, message: "Ambil surat dengan kode berhasil!", data: result});
					}	
				})
				.catch(function(err) {
					res.json({status: false, message: "Ambil surat dengan kode gagal!", err_code: 400, err: err});
				})
		}
	}

	this.getByJenis = function(req, res) {
		var jenis = req.body.jenis_surat;

		if (jenis == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
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
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
					} else {
						res.json({status: true, message: "Ambil surat dengan jenis berhasil!", data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "Ambil surat dengan jenis gagal!", err_code: 400, err: err});
				})
		}
	}

	this.getBySubJenis = function(req, res) {
		var sub_jenis = req.body.sub_jenis_surat;

		if (sub_jenis == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
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
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
					} else {
						res.json({status: true, message: "Ambil surat dengan subjenis berhasil!", data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "Ambil surat dengan subjenis gagal!", err_code: 400, err: err});
				})
		}
	}

	this.getBySubSubJenis = function(req, res) {
		var sub_sub_jenis = req.body.sub_sub_jenis_surat;

		if (sub_sub_jenis == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
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
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
					} else {
						res.json({status: true, message: "Ambil surat dengan subsubjenis berhasil!", data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "Ambil surat dengan subsubjenis gagal!", err_code: 400, err: err});
				})
		}
	}

	this.upload = function(req, res) {
		var destination = "assets/uploads/surat",
			dir = "/../",
			filename = "";

		checkFileSignature = function(signature) {
			if (signature !== "25504446") {
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
			      	filename = file.fieldname + '-' + Date.now() + ".pdf";
			      	cb(null, filename);
			  	}
			}),
			limits: {
				fileSize: 1 * 1024 * 1024
			}
		}).single('surat');

		upload(req, res, function(err) {
			var bitmap = fs.readFileSync(__dirname + dir + destination + "/" + filename).toString('hex', 0, 4);
			if (!checkFileSignature(bitmap)) {
				fs.unlinkSync(__dirname + dir + destination + "/" + filename);
				res.json({status: false, message: "File bukan pdf!", err_code: 400});
			} else if (err) {
				res.json({status: false, message: "Upload surat gagal!", err_code: 400, err: err});
			} else {
				res.json({status: true, message: "Upload surat berhasil!", data: filename});
			}
		});
	}

	this.add = function(req, res) {
		var nomor = req.body.nomor_surat,
			unit_kerja = req.body.unit_kerja_surat,
			hal = req.body.hal_surat,
			tahun = req.body.tahun_surat,
			perihal = req.body.perihal_surat,
			pengirim = req.body.pengirim_surat,
			tanggal = req.body.tanggal_surat,
			tanggal_terima = req.body.tanggal_terima_surat,
			tanggal_entri = req.body.tanggal_entri_surat,
			sub_sub_jenis = req.body.sub_sub_jenis_surat,
			tipe = req.body.tipe_surat,
			status = req.body.status_surat,
			file = req.body.file_surat;

		if (nomor == undefined || unit_kerja  == undefined || hal  == undefined || tahun  == undefined || perihal  == undefined || pengirim  == undefined || tanggal  == undefined || tanggal_terima  == undefined || !tanggal_entri  == undefined || sub_sub_jenis  == undefined || tipe  == undefined || file  == undefined || status  == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			console.log(req.body)
			Surat
				.create({
					nomor_surat: nomor,
					unit_kerja_surat: unit_kerja,
					hal_surat: hal,
					tahun_surat: tahun,
			        perihal_surat: perihal,
			        pengirim_surat: pengirim,
			        tanggal_surat: tanggal,
			        tanggal_terima_surat: tanggal_terima,
			        tanggal_entri_surat: tanggal_entri,
			        sub_sub_jenis_surat_id: sub_sub_jenis,
			        status_surat: status,
			        tipe_surat: tipe, 
			        file_surat: file
				})
				.then(function(result) {
					res.json({status: true, message: "Surat berhasil ditambahkan!"});
				})
				.catch(function(err) {
					res.json({status: false, message: "Surat gagal ditambahkan!", err_code: 404, err: err});
				})
		}
		
	}

	this.delete = function(req, res) {
		var id = req.body.id_surat;

		if (id == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
					} else {
						Surat
							.destroy({
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: "Surat berhasil dihapus!"});
							})
							.catch(function(err) {
								res.json({status: false, message: "Surat gagal dihapus!", err_code: 400, err: err});
							})
					}
				})
				.then(function(err) {
					res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400, err: err});
				})
			
		}
	}

	this.update = function(req, res) {
		var id = req.body.id_surat,
			nomor = req.body.nomor_surat,
			unit_kerja = req.body.unit_kerja_surat,
			hal = req.body.hal_surat,
			tahun = req.body.tahun_surat,
			perihal = req.body.perihal_surat,
			pengirim = req.body.pengirim_surat,
			tanggal = req.body.tanggal_surat,
			tanggal_terima = req.body.tanggal_terima_surat,
			tanggal_entri = req.body.tanggal_entri_surat,
			sub_sub_jenis = req.body.sub_sub_jenis_surat,
			tipe = req.body.tipe_surat,
			status = req.body.status_surat,
			file = req.body.file_surat;

		if (nomor == undefined || unit_kerja  == undefined || hal  == undefined || tahun  == undefined || perihal  == undefined || pengirim  == undefined || tanggal  == undefined || tanggal_terima  == undefined || !tanggal_entri  == undefined || sub_sub_jenis  == undefined || tipe  == undefined || file  == undefined || status  == undefined) {
			res.json({status: false, message: "Request tidak lengkap!", err_code: 400});
		} else {
			Surat
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400});
					} else {
						Surat
							.update({
								nomor_surat: nomor,
								unit_kerja_surat: unit_kerja,
								hal_surat: hal,
								tahun_surat: tahun,
						        perihal_surat: perihal,
						        pengirim_surat: pengirim,
						        tanggal_surat: tanggal,
						        tanggal_terima_surat: tanggal_terima,
						        tanggal_entri_surat: tanggal_entri,
						        sub_sub_jenis_surat_id: sub_sub_jenis,
						        status_surat: status,
						        tipe_surat: tipe, 
						        file_surat: file
							}, {
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: "Surat berhasil diupdate!"});
							})
							.catch(function(err) {
								res.json({status: false, message: "Surat gagal diupdate!", err_code: 400, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: "Surat tidak ditemukan!", err_code: 400, err: err});
				})
		}
	}
}

module.exports = new SuratControllers();