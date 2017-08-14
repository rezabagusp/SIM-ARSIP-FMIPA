var express = require('express');
var router = express.Router();

var dataform = require('../controllers/dataform.controller');

// get
router.get('/*', function(req, res) {
  res.json({status: false, message: 'None API Implemented'});
});

router.post('/get/perihal', function(req, res) {
	dataform.getPerihal(req, res);
});

router.post('/get/pengirim', function(req, res) {
	dataform.getPengirim(req, res);
});

router.post('/get/penerima', function(req, res) {
	dataform.getPenerima(req, res);
});

router.post('/get/penerima/jabatan', function(req, res) {
	dataform.getPenerimaByJabatan(req, res);
});

router.post('/get/jabatan', function(req, res) {
	dataform.getJabatan(req, res);
});

router.post('/get/kode-surat', function(req, res) {
	dataform.getKodeSurat(req, res);
});

router.post('/get/jenis-surat', function(req, res) {
	dataform.getJenisSurat(req, res);
});

router.post('/get/subjenis-surat', function(req, res) {
	dataform.getSubJenisSurat(req, res);
});

router.post('/get/subsubjenis-surat', function(req, res) {
	dataform.getSubSubJenisSurat(req, res);
});

// add
router.post('/add/perihal', function(req, res) {
	dataform.addPerihal(req, res);
});

router.post('/add/pengirim', function(req, res) {
	dataform.addPengirim(req, res);
});

router.post('/add/penerima', function(req, res) {
	dataform.addPenerima(req, res);
});

router.post('/add/jabatan', function(req, res) {
	dataform.addJabatan(req, res);
});

router.post('/add/kode-surat', function(req, res) {
	dataform.addKodeSurat(req, res);
});

router.post('/add/jenis-surat', function(req, res) {
	dataform.addJenisSurat(req, res);
});

router.post('/add/subjenis-surat', function(req, res) {
	dataform.addSubJenisSurat(req, res);
});

router.post('/add/subsubjenis-surat', function(req, res) {
	dataform.addSubSubJenisSurat(req, res);
});

//edit
router.post('/edit/perihal', function(req, res) {
	dataform.updatePerihal(req, res);
});

router.post('/edit/pengirim', function(req, res) {
	dataform.updatePengirim(req, res);
});

router.post('/edit/penerima', function(req, res) {
	dataform.updatePenerima(req, res);
});

router.post('/edit/jabatan', function(req, res) {
	dataform.updateJabatan(req, res);
});

router.post('/edit/kode-surat', function(req, res) {
	dataform.updateKodeSurat(req, res);
});

router.post('/edit/jenis-surat', function(req, res) {
	dataform.updateJenisSurat(req, res);
});

router.post('/edit/subjenis-surat', function(req, res) {
	dataform.updateSubJenisSurat(req, res);
});

router.post('/edit/subsubjenis-surat', function(req, res) {
	dataform.updateSubSubJenisSurat(req, res);
});

//delete
router.post('/delete/perihal', function(req, res) {
	dataform.deletePerihal(req, res);
});

router.post('/delete/pengirim', function(req, res) {
	dataform.deletePengirim(req, res);
});

router.post('/delete/penerima', function(req, res) {
	dataform.deletePenerima(req, res);
});

router.post('/delete/jabatan', function(req, res) {
	dataform.deleteJabatan(req, res);
});

router.post('/delete/kode-surat', function(req, res) {
	dataform.deleteKodeSurat(req, res);
});

router.post('/delete/jenis-surat', function(req, res) {
	dataform.deleteJenisSurat(req, res);
});

router.post('/delete/subjenis-surat', function(req, res) {
	dataform.deleteSubJenisSurat(req, res);
});

router.post('/delete/subsubjenis-surat', function(req, res) {
	dataform.deleteSubSubJenisSurat(req, res);
});

module.exports = router;
