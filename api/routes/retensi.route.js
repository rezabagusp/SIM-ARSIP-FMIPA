var express = require('express');
var router = express.Router();

var retensi = require('../controllers/retensi.controller');

router.get('/', function(req, res) {
	res.json({status: false, message: 'None API Implemented'});
});

router.post('/', function(req, res) {
 	res.json({status: false, message: 'None API Implemented'});
});

router.post('/cek', function(req, res) {
	retensi.cekHalSurat(req, res);
});

module.exports = router;
