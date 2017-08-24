var express = require('express');
var path = require('path');

var sequelize = require('../connection');

var Perihal = sequelize.import(__dirname + '/../models/perihal.model');
var Staff = sequelize.import(__dirname + '/../models/staff.model');
var Jabatan = sequelize.import(__dirname + '/../models/jabatan.model');
var Posisi = sequelize.import(__dirname + '/../models/posisi.model');

var Kode_surat = sequelize.import(__dirname + '/../models/kode_surat.model');
var Jenis_surat = sequelize.import(__dirname + '/../models/jenis_surat.model');
var Sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_jenis_surat.model');
var Sub_sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_sub_jenis_surat.model');
var Unit_kerja = sequelize.import(__dirname + '/../models/unit_kerja.model');

var Surat_keluar_pengirim = sequelize.import(__dirname + '/../models/surat_keluar_pengirim.model');
var Surat_masuk_penerima = sequelize.import(__dirname + '/../models/surat_masuk_penerima.model');

Jenis_surat.belongsTo(Kode_surat, {foreignKey: 'kode_surat_id'});
Sub_jenis_surat.belongsTo(Jenis_surat, {foreignKey: 'jenis_surat_id'});
Sub_sub_jenis_surat.belongsTo(Sub_jenis_surat, {foreignKey: 'sub_jenis_surat_id'});

Staff.belongsTo(Jabatan, {foreignKey: 'jabatan_id'});
Jabatan.hasOne(Staff, {foreignKey: 'jabatan_id'});

function DataformControllers() {
	this.getPosisi = function(req, res) {
		Posisi
			.findAll()
			.then(function(result) {
				if (result == 0 || result == null) {
					res.json({status: false, message: 'Posisi tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil semua posisi berhasil!', data: result});
				}
			})
			.catch(function(result) {
				res.json({status: false, message: 'Ambil semua posisi gagal!', err_code: 400, err: err});
			});
	}

	this.getPosisiById = function(req, res) {
		var id = req.body.id_posisi;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Posisi
				.findById(id)
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Posisi tidak ditemukan', err_code: 404});
					} else {
						
					}
				})
		}
	}

	this.getPerihal = function(req, res) {
		Perihal
			.findAll()
			.then(function(result) {
				if (result == 0 || result == null) {
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
				.findById(id)
				.then(function(result) {
					if (result == 0 || result == null) {
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
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Perihal tidak ditemukan!', err_code: 404});
					} else {
						Surat
							.findAll({
								where: {
									perihal_surat: id
								}
							})
							.then(function(result) {
								if (result !== 0 || result !== null) {
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
							})
							.catch(function(err) {
								res.json({status: false, message: 'Surat gagal ditemukan!', err_code: 400, err: err});
							});

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
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Perihal gagal ditemukan!', err_code: 400, err: err});
				});
		}
	}

	this.getStaff = function(req, res) {
		Staff
			.findAll()
			.then(function(result) {
				if (result == 0 || result == null) {
					res.json({status: false, message: 'Staff tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil staff berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil staff gagal!', err_code: 400, err: err});
			})
	}

	this.getStaffById = function(req, res) {
		var id = req.body.id_staff;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Staff
				.findById(id)
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Staff tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Ambil staff berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil staff gagal!', err_code: 400, err: err});
				})
		}
	}

	this.getStaffJabatan = function(req, res) {
		Staff
			.findAll({
				include: [{
					model: Jabatan
				}]
			})
			.then(function(result) {
				if (result == 0 || result == null) {
					res.json({status: false, message: 'Staff tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil semua staff dan jabatan berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil semua staff dan jabatan gagal!', err_code: 400, err: err});
			})
	}

	this.getStaffJabatanById = function(req, res) {
		var id = req.body.id_staff;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Staff
				.findOne({
					where: {
						id: id
					},
					include: [{
						model: Jabatan
					}]
				})
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Staff tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Ambil staff dan jabatan berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil staff dan staff gagal!', err_code: 400, err: err});
				})
		}	
	}

	this.addStaff = function(req, res) {
		var nama = req.body.nama_staff,
			jabatan = req.body.jabatan_id,
			email =  req.body.email_staff;

		if (nama == undefined || email == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Staff
				.create({
					nama_staff: nama,
					jabatan_id: jabatan,
					email_staff: email
				})
				.then(function(result) {
					res.json({status: true, message: 'Tambah staff berhasil!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Tambah staff gagal!', err_code: 400, err: err});
				})
		}
	}

	this.updateStaff = function(req, res) {
		var id = req.body.id_staff,
			nama = req.body.nama_staff,
			jabatan = req.body.jabatan_id,
			email = req.body.email_staff;

		if (id == undefined || nama == undefined || email == undefined || jabatan == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Staff
				.findById(id)
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Staff tidak ditemukan!', err_code: 404});
					} else {
						Staff
							.update({
								nama_staff: nama,
								jabatan_id: jabatan,
								email_staff: email
							}, {
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: 'Update staff berhasil!'});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Update staff gagal!', err_code: 400, err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Staff gagal ditemukan!', err_code: 400, err: err});
				});
		}
	}

	this.deleteStaff = function(req, res) {
		var id = req.body.id_staff;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Staff
				.findOne(id)
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Staff tidak ditemukan!', err_code: 404});
					} else {
						Surat_masuk_penerima
							.findAll({
								where: {
									staff_id: id
								}
							})
							.then(function(result) {
								if (result !== 0 || result !== null) {
									Surat_masuk_penerima
										.destroy({
											where: {
												staff_id: id
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Pasangan surat masuk dengan penerima staff gagal dihapus!', err_code: 400, err: err});
										});
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pasangan surat masuk dengan penerima staff gagal ditemukan!', err_code: 400, err: err});
							});

						Surat_keluar_pengirim
							.findAll({
								where: {
									staff_id: id
								}
							})
							.then(function(result) {
								if (result !== 0 || result !== null) {
									Surat_keluar_pengirim
										.destroy({
											where: {
												staff_id: id
											}
										})
										.catch(function(err) {
											res.json({status: false, message: 'Pasangan surat keluar dengan pengirim staff gagal dihapus!', err_code: 400, err: err});
										});
								}
							})
							.catch(function(err) {
								res.json({status: false, message: 'Pasangan surat keluar dengan pengirim staff gagal ditemukan!', err_code: 400, err: err});
							});

						Staff
							.destroy({
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: 'Staff berhasil dihapus!'});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Staff gagal dihapus!', err_code: 400, err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Staff gagal ditemukan!', err_code: 400, err: err});
				});
		}
	}

	this.getJabatan = function(req, res) {
		Jabatan
			.findAll()
			.then(function(result) {
				if (result == 0 || result == null) {
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
				.findById(id)
				.then(function(result) {
					if (result == 0 || result == null) {
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

	this.getJabatanStaff = function(req, res) {
		Jabatan
			.findAll({
				include: [{
					model: Staff
				}]
			})
			.then(function(result) {
				if (result == 0 || result == null) {
					res.json({status: false, message: 'Jabatan tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil jabatan dan staff berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil jabatab dan staff gagal!', err_code: 400, err: err});
			})
	}

	this.getJabatanStaffById = function(req, res) {
		var id = req.body.id_jabatan;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Jabatan
				.findOne({
					where: {
						id: id
					},
					include: [{
						model: Staff
					}]
				})
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Jabatan tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Ambil jabatan dan staff berhasil!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Ambil jabatab dan staff gagal!', err_code: 400, err: err});
				})
		}
		
	}

	this.addJabatan = function(req, res) {
		var nama = req.body.nama_jabatan;

		if (nama == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Jabatan
				.create({
					nama_jabatan: nama
				})
				.then(function(result) {
					res.json({status: true, message: 'Tambah jabatan berhasil!'});
				})
				.catch(function(err) {
					res.json({status: false, message: 'Tambah jabatan gagal!', err_code: 400, err: err});
				})
		}
	}

	this.updateJabatan = function(req, res) {
		var id = req.body.id_jabatan,
			nama = req.body.nama_jabatan;

		if (id == undefined || nama == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Jabatan
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Jabatan tidak ditemukan!', err_code: 404});
					} else {
						Jabatan
							.update({
								nama_jabatan: nama
							}, {
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: 'Update jabatan berhasil!'});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Update jabatan gagal!', err_code: 400, err: err});
							});
					}
				})
		}
	}

	this.deleteJabatan = function(req, res) {
		var id = req.body.id_jabatan;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400, err: err});
		} else {
			Jabatan
				.findOne({
					where: {
						id: id
					}
				})
				.then(function(result) {
					Staff
						.findAll({
							where: {
								jabatan_id: id
							}
						})
						.then(function(result) {
							if (result !== 0 || result !== null) {
								Staff
									.update({
										jabatan_id: null
									}, {
										where: {
											jabatan_id: id
										}
									})
									.catch(function(err) {
										res.json({status: false, message: 'Update staff gagal!'});
									});
							}
							Jabatan
								.destroy({
									where: {
										id: id
									}
								})
								.then(function(result) {
									res.json({status: true, message: 'Hapus jabatan berhasil!'});
								})
								.catch(function(err) {
									res.json({status: false, message: 'Hapus jabatan gagal!', err_code: 400, err: err});
								});
						})
						.catch(function(err) {
							res.json({status: false, message: 'Staff gagal ditemukan!', err_code: 400, err: err});
						});
					
				})
				.catch(function(err) {
					res.json({status: false, message: 'Jabatan gagal ditemukan!', err_code: 400, err: err});
				});
		}
	}

	this.getUnitKerja = function(req, res) {
		Unit_kerja
			.findAll()
			.then(function(result) {
				if (result == 0 || result == null) {
					res.json({status: false, message: 'Unit kerja tidak ditemukan!', err_code: 404});
				} else {
					res.json({status: true, message: 'Ambil unit kerja berhasil!', data: result});
				}
			})
			.catch(function(err) {
				res.json({status: false, message: 'Ambil unit kerja gagal!', err_code: 400, err: err});
			});
	}

	this.getUnitKerjaById = function(req, res) {
		var id = req.body.id_unit_kerja;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Unit_kerja
				.findById(id)
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Unit kerja tidak ditemukan!', err_code: 404});
					} else {
						res.json({status: true, message: 'Unit kerja berhasil ditemukan!', data: result});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Unit kerja gagal ditemukan!', err_code: 400, err: err});
				});
		}
	}

	this.addUnitKerja = function(req, res) {
		var nama = req.body.nama_unit_kerja,
        	akronim = req.body.akronim_unit_kerja,
        	kode = req.body.kode_unit_kerja;

        if (nama == undefined || akronim == undefined || kode == undefined) {
        	res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
        } else {
        	Unit_kerja
        		.create({
        			nama_unit_kerja: nama,
        			akronim_unit_kerja: akronim,
        			kode_unit_kerja: kode
        		})
        		.then(function(result) {
        			res.json({status: true, message: 'Tambah unit kerja berhasil!'});
        		})
        		.catch(function(err) {
        			res.json({status: false, message: 'Tambah unit kerja gagal!', err_code: 400, err: err});
        		});
        }
	}

	this.updateUnitKerja = function(req, res) {
		var id = req.body.id_unit_kerja,
			nama = req.body.nama_unit_kerja,
        	akronim = req.body.akronim_unit_kerja,
        	kode = req.body.kode_unit_kerja;

        if (id == undefined || nama == undefined || akronim == undefined || kode == undefined) {
        	res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
        } else {
        	Unit_kerja
        		.update({
        			nama_unit_kerja: nama,
        			akronim_unit_kerja: akronim,
        			kode_unit_kerja: kode
        		}, {
        			where: {
        				id: id
        			}
        		})
        		.then(function(result) {
        			res.json({status: true, message: 'Ubah unit kerja berhasil!'});
        		})
        		.catch(function(err) {
        			res.json({status: false, message: 'Ubah unit kerja gagal!', err_code: 400, err: err});
        		});
        }
	}

	this.deleteUnitKerja = function(req, res) {
		var id = req.body.id_unit_kerja;

		if (id == undefined) {
			res.json({status: false, message: 'Request tidak lengkap!', err_code: 400});
		} else {
			Unit_kerja
				.findById(id)
				.then(function(result) {
					if (result == 0 || result == null) {
						res.json({status: false, message: 'Unit kerja tidak ditemukan!', err_code: 404});
					} else {
						Unit_kerja
							.destroy({
								where: {
									id: id
								}
							})
							.then(function(result) {
								res.json({status: true, message: 'Hapus unit kerja berhasil!'});
							})
							.catch(function(err) {
								res.json({status: false, message: 'Hapus unit kerja gagal!', err_code: 400, err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: false, message: 'Unit kerja gagal ditemukan!', err_code: 400, err: err});
				});
		}
	}
}

module.exports = new DataformControllers();