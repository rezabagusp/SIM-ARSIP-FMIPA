var express = require('express');
var router = express.Router();

var retensi = require('../controllers/retensi.controller');

router.get('/*', function(req, res) {
	res.json({status: false, message: 'None API Implemented'});
});

router.post('/', function(req, res) {
 	res.json({status: false, message: 'None API Implemented'});
});

router.post('/get/all', function(req, res) {
	retensi.getRetensiSurat(req, res);
});

router.post('/get/surat', function(req, res) {
	retensi.getRetensiSuratById(req, res);
});

module.exports = router;
