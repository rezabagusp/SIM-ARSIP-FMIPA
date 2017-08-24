var express = require('express');
var router = express.Router();

var lampiran = require('../controllers/lampiran.controller');

router.get('/*', function(req, res) {
  res.json({status: false, message: 'None API Implemented'});
});

router.post('/add', function(req, res) {
	lampiran.add(req, res);
});

router.post('/get', function(req, res) {
	lampiran.getOne(req, res);
});

router.post('/get/all', function(req, res) {
	lampiran.getAll(req, res);
});

router.post('/get/surat', function(req, res) {
	lampiran.getBySurat(req, res);
});

router.post('/delete', function(req, res) {
	lampiran.delete(req, res);
});

router.post('/edit', function(req, res) {
	lampiran.update(req, res);
});

router.post('/upload', function(req, res) {
	lampiran.upload(req, res);
});

module.exports = router;
