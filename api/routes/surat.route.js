var express = require('express');
var router = express.Router();

var surat = require('../controllers/surat.controller');

router.get('/', function(req, res) {
  res.json({status: false, message: 'None API Implemented'});
});

router.post('/add', function(req, res) {
	surat.add(req, res);
});

router.post('/get', function(req, res) {
	surat.getAll(req, res);
});

router.post('/get/kode', function(req, res) {
	surat.getByKode(req, res);
});

router.post('/get/jenis', function(req, res) {
	surat.getByJenis(req, res);
});

router.post('/get/subjenis', function(req, res) {
	surat.getBySubJenis(req, res);
});

router.post('/get/subsubjenis', function(req, res) {
	surat.getBySubSubJenis(req, res);
});

router.post('/delete', function(req, res) {
	surat.delete(req, res);
});

router.post('/edit', function(req, res) {
	surat.update(req, res);
});

router.post('/upload', function(req, res) {
	surat.upload(req, res);
});

module.exports = router;
