var express = require('express');
var path = require('path');

var sequelize = require('../connection');

var Perihal = sequelize.import(__dirname + '/../models/perihal.model');
var Pengirim = sequelize.import(__dirname + '/../models/pengirim.model');
var Penerima = sequelize.import(__dirname + '/../models/penerima.model');
var Jabatan = sequelize.import(__dirname + '/../models/jabatan.model');

var Kode_surat = sequelize.import(__dirname + '/../models/kode_surat.model');
var Jenis_surat = sequelize.import(__dirname + '/../models/jenis_surat.model');
var Sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_jenis_surat.model');
var Sub_sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_sub_jenis_surat.model');
var Unit_kerja = sequelize.import(__dirname + '/../models/unit_kerja.model');

Jenis_surat.belongsTo(Kode_surat, {foreignKey: 'kode_surat_id'});
Sub_jenis_surat.belongsTo(Jenis_surat, {foreignKey: 'jenis_surat_id'});
Sub_sub_jenis_surat.belongsTo(Sub_jenis_surat, {foreignKey: 'sub_jenis_surat_id'});
Surat.belongsTo(Sub_sub_jenis_surat, {foreignKey: 'sub_sub_jenis_surat_id'});

function DataformControllers() {
	this.getPerihal = function(req, res) {
		Perihal
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Perihal tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil perihal berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil perihal gagal!', err_code: 400, err: err});
			})
	}

	this.getPerihalById = function(req, res) {
		var id = req.body.id_perihal;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Perihal
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Perihal tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Ambil perihal berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil perihal gagal!', err_code: 400, err: err});
				})
		}
	}

	this.addPerihal = function(req, res) {
		var nama = req.body.nama_perihal;

		if (nama == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Perihal
				.create({
					nama_perihal: nama
				})
				.then(function(result) {
					res.json({status: true, message: 'Tambah perihal berhasil!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Tambah perihal gagal!', err_code: 400, err: err});
				})
		}
	}

	this.updatePerihal = function(req, res) {
		var id = req.body.id_perihal;
			nama = req.body.nama_perihal;

		if (id == undefined || nama == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Perihal
				.update({
					nama_perihal: nama
				}, {
					where: {
						id: id
					}
				})
				.then(function(result) {
					res.json({status: true, message: 'Ubah perihal berhasil!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ubah perihal gagal!', err_code: 400, err: err});
				})
		}
	}

	this.deletePerihal = function(req, res) {
		var id = req.body.id_perihal;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Perihal
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Perihal tidak ditemukan!', err_code: 404});
					} else {
						Surat
							.findAll({
								where: {
									perihal_surat: id
								}
							})
							.then(function(result) {
								if (result !== null) {
									Surat
										.update({
											perihal_surat: null
										}, {
											where: {
												perihal_surat: id
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Update perihal surat gagal!', err_code: 400, err: err});
										});
								}
								Perihal
									.destroy({
										where: {
											id: id
										}
									})
									.then(function(result) {
										res.json({status: true, message: 'Hapus perihal berhasil!'});
									})
									.catch(function(err) {
										res.json({status: false, message: 'Hapus perihal gagal!', err_code: 400, err: err});
									});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Surat gagal ditemukan!', err_code: 400, err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Perihal gagal ditemukan!', err_code: 400, err: err});
				});
		}
	}

	this.getPengirim = function(req, res) {
		Pengirim
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Pengirim tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil pengirim berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil pengirim gagal!', err_code: 400, err: err});
			})
	}

	this.getPengirimById = function(req, res) {
		var id = req.body.id_pengirim;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Pengirim
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Pengirim tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Ambil pengirim berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil pengirim gagal!', err_code: 400, err: err});
				});
		}
	}

	this.addPengirim = function(req, res) {
		var nama = req.body.nama_pengirim,
			jabatan = req.body.jabatan_pengirim,
			email = req.body.email_pengirim;

		if (nama == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Pengirim
				.create({
					nama_pengirim: nama,
					jabatan_pengirim: jabatan,
					email_pengirim: email
				})
				.then(function(result) {
					res.json({status: true, message: 'Tambah pengirim berhasil!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Tambah pengirim gagal!', err_code: 400, err: err});
				});
		}
	}

	this.updatePengirim = function(req, res) {
		var id = req.body.id_pengirim,
			nama = req.body. nama_pengirim,
			jabatan = req.body.jabatan_pengirim,
			email = req.body.email_pengirim;

		if (id == undefined || nama == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Pengirim
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Pengirim tidak ditemukan!', err_code: 404});
					} else {
						Pengirim
							.update({
								nama_pengirim: nama,
								jabatan_pengirim: jabatan,
								email_pengirim: email
							}, {
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: 'Update pengirim berhasil!'});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Update pengirim gagal!', err_code: 400, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Pengirim gagal ditemukan!', err_code: 400, err: err});
				})
		}
	}

	this.deletePengirim = function(req, res) {
		var id = req.body.id_pengirim,

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Pengirim
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Pengirim tidak ditemukan!', err_code: 404});
					} else {
						Surat
							.findAll({
								where: {
									pengirim_surat: id
								}
							})
							.then(function(result) {
								if (result !== null) {
									Surat
										.update({
											pengirim_surat: null
										}, {
											where: {
												pengirim_surat: id
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Update pengirim surat gagal!', err_code: 400, err: err});
										});
								}
								Pengirim
									.destroy({
										where: {
											id: id
										}
									})
									.then(function(result) {
										res.json({status: true, message: 'Hapus pengirim berhasil!'});
									})
									.catch(function(err) {
										res.json({status: false, message: 'Hapus pengirim gagal!', err_code: 400, err: err});
									});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Surat gagal ditemukan!', err_code: 400, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Pengirim gagal ditemukan!', err_code: 400, err: err});
				})
		}		
	}

	this.getPenerima = function(req, res) {
		Penerima
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Penerima tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil penerima berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil penerima gagal!', err_code: 400, err: err});
			})
	}

	this.getPenerimaById = function(req, res) {
		var id = req.body.id_penerima;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Penerima
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Penerima tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Ambil penerima berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil penerima gagal!', err_code: 400, err: err});
				})
		}
	}

	this.addPenerima = function(req, res) {
		var nama = req.body.nama_penerima,
			jabatan = req.body.jabatan_penerima,
			email =  req.body.email_penerima;

		if (nama == undefined || email == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Penerima
				.create({
					nama_penerima: nama,
					jabatan_penerima: jabatan,
					email_penerima: email
				})
				.then(function(result) {
					res.json({status: true, message: 'Tambah penerima berhasil!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Tambah penerima gagal!', err_code: 400, err: err});
				})
		}
	}

	this.updatePenerima = function(req, res) {
		var id = req.body.id_penerima,
			nama = req.body.nama_penerima,
			jabatan = req.body.jabatan_id,
			email = req.body.email_penerima;

		if (id == undefined || nama == undefined || email == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Penerima
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Penerima tidak ditemukan!', err_code: 404});
					} else {
						Penerima
							.update({
								nama_penerima: nama,
								jabatan_penerima: jabatan,
								email_penerima: email
							}, {
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: 'Update penerima berhasil!'});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Update penerima gagal!', err_code: 400, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Penerima gagal ditemukan!', err_code: 400, err: err});
				})
		}
	}

	this.deletePenerima = function(req, res) {
		var id = req.body.id_penerima;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Penerima
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Penerima tidak ditemukan!', err_code: 404});
					} else {
						Surat_penerima
							.findAll({
								where: {
									penerima_id: id
								}
							})
							.then(function(result) {
								if (result !== null) {
									Surat_penerima
										.destroy({
											where: {
												penerima_id: id
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Pasangan surat dengan penerima gagal dihapus!', err_code: 400, err: err});
										});
								}
								Penerima
									.destroy({
										where: {
											id: id
										}
									})
									.then(function(result) {
										res.json({status: true, message: 'Penerima berhasil dihapus!'});
									})
									.catch(function(err) {
										res.json({status: false, message: 'Penerima gagal dihapus!', err_code: 400, err: err});
									});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pasangan surat dengan penerima gagal ditemukan!', err_code: 400, err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Penerima gagal ditemukan!', err_code: 400, err: err});
				});
		}
	}

	this.getJabatan = function(req, res) {
		Jabatan
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Jabatan tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil jabatan berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil jabatan gagal!', err_code: 400, err: err});
			})
	}

	this.getJabatanById = function(req, res) {
		var id = req.body.id_jabatan;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Jabatan
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Jabatan tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Ambil jabatan berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil jabatan gagal!', err_code: 400, err: err});
				})
		}
	}

	this.addJabatan = function(req, res) {

	}

	this.updateJabatan = function(req, res) {

	}

	this.deleteJabatan = function(req, res) {
		
	}

	this.getKodeSurat = function(req, res) {
		Kode_surat
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Kode surat tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil kode surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil kode surat gagal!', err_code: 400, err: err});
			})
	}

	this.getKodeSuratById = function(req, res) {
		var id = req.body.id_kode_surat;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Kode_surat
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == null) {
						res.json({status: false, message: 'Jabatan tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Ambil jabatan berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil jabatan gagal!', err_code: 400, err: err});
				})
		}
	}

	this.addKodeSurat = function(req, res) {

	}

	this.updateKodeSurat = function(req, res) {

	}

	this.deleteKodeSurat = function(req, res) {
		
	}

	this.getJenisSurat = function(req, res) {
		Jenis_surat
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Jenis surat tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil jenis surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil jenis surat gagal!', err_code: 400, err: err});
			})
	}

	this.getJenisSuratById = function(req, res) {

	}

	this.addJenisSurat = function(req, res) {

	}

	this.updateJenisSurat = function(req, res) {

	}

	this.deleteJenisSurat = function(req, res) {
		
	}

	this.getSubJenisSurat = function(req, res) {
		Sub_jenis_surat
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Sub jenis surat tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil sub jenis surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil sub jenis surat gagal!', err_code: 400, err: err});
			})
	}

	this.getSubJenisSuratById = function(req, res) {

	}

	this.addSubJenisSurat = function(req, res) {

	}

	this.updateSubJenisSurat = function(req, res) {

	}

	this.deleteSubJenisSurat = function(req, res) {
		
	}

	this.getSubSubJenisSurat = function(req, res) {
		Sub_sub_jenis_surat
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Sub sub jenis surat tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil sub sub jenis surat berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil sub sub jenis surat gagal!', err_code: 400, err: err});
			})
	}

	this.getSubSubJenisSuratById = function(req, res) {

	}

	this.addSubSubJenisSurat = function(req, res) {

	}

	this.updateSubSubJenisSurat = function(req, res) {

	}

	this.deleteSubSubJenisSurat = function(req, res) {
		
	}

	this.getUnitKerja = function(req, res) {
		Unit_kerja
			.findAll()
			.then(function(result) {
				if (result == null) {
					res.json({status: false, message: 'Unit kerja tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil unit kerja berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil unit kerja gagal!', err_code: 400, err: err});
			})
	}

	this.getUnitKerjaById = function(req, res) {

	}

	this.addUnitKerja = function(req, res) {

	}

	this.updateUnitKerja = function(req, res) {

	}

	this.deleteUnitKerja = function(req, res) {
		
	}
}

module.exports = new DataformControllers();