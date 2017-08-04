var express = require('express');
var router = express.Router();

var surat = require('../controllers/surat.controller');

router.get('/', function(req, res) {
  res.json({status: false, message: 'None API Implemented'});
});

router.post('/get', function(req, res) {
	surat.getOne(req, res);
});

router.post('/get/sub-sub-jenis', function(req, res) {
	surat.getOne(req, res);
});

router.post('/get/all', function(req, res) {
	surat.getAll(req, res);
});

router.post('/add', function(req, res) {
	surat.add(req, res);
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
