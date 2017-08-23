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

router.post('/add/unitkerja', function(req, res) {
	dataform.addUnitKerja(req, res);
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

router.post('/delete/unitkerja', function(req, res) {
	dataform.deleteUnitKerja(req, res);
});

module.exports = router;
