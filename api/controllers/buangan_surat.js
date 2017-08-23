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