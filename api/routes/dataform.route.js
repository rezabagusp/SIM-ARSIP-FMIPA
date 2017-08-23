var express = require('express');
var router = express.Router();

var dataform = require('../controllers/dataform.controller');

router.get('/*', function(req, res) {
  res.json({status: false, message: 'None API Implemented'});
});

// get
router.post('/get/perihal/all', function(req, res) {
	dataform.getPerihal(req, res);
});

router.post('/get/staff/all', function(req, res) {
	dataform.getStaff(req, res);
});

router.post('/get/staff/jabatan/all', function(req, res) {
	dataform.getStaffJabatan(req, res);
});

router.post('/get/jabatan/all', function(req, res) {
	dataform.getJabatan(req, res);
});

router.post('/get/jabatan/staff/all', function(req, res) {
	dataform.getJabatanStaff(req, res);
});

router.post('/get/unitkerja/all', function(req, res) {
	dataform.getUnitKerja(req, res);
});

router.post('/get/kode-surat/all', function(req, res) {
	dataform.getKodeSurat(req, res);
});

router.post('/get/jenis-surat/all', function(req, res) {
	dataform.getJenisSurat(req, res);
});

router.post('/get/subjenis-surat/all', function(req, res) {
	dataform.getSubJenisSurat(req, res);
});

router.post('/get/subsubjenis-surat/all', function(req, res) {
	dataform.getSubSubJenisSurat(req, res);
});

// get by id
router.post('/get/perihal', function(req, res) {
	dataform.getPerihalById(req, res);
});

router.post('/get/staff', function(req, res) {
	dataform.getStaffById(req, res);
});

router.post('/get/staff/jabatan', function(req, res) {
	dataform.getStaffJabatanById(req, res);
});

router.post('/get/jabatan', function(req, res) {
	dataform.getJabatanById(req, res);
});

router.post('/get/jabatan/staff/all', function(req, res) {
	dataform.getJabatanStaffById(req, res);
});

router.post('/get/unitkerja', function(req, res) {
	dataform.getUnitKerjaById(req, res);
});

router.post('/get/kode-surat', function(req, res) {
	dataform.getKodeSuratById(req, res);
});

router.post('/get/jenis-surat', function(req, res) {
	dataform.getJenisSuratById(req, res);
});

router.post('/get/subjenis-surat', function(req, res) {
	dataform.getSubJenisSuratById(req, res);
});

router.post('/get/subsubjenis-surat/all', function(req, res) {
	dataform.getSubSubJenisSuratById(req, res);
});

// add
router.post('/add/perihal', function(req, res) {
	dataform.addPerihal(req, res);
});

router.post('/add/staff', function(req, res) {
	dataform.addStaff(req, res);
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

router.post('/edit/staff', function(req, res) {
	dataform.updateStaff(req, res);
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

router.post('/delete/staff', function(req, res) {
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
