var express = require('express');
var router = express.Router();

var user = require('../controllers/user.controller');

router.get('/', function(req, res) {
  res.json({status: false, message: 'None API Implemented'});
});

router.post('/get', function(req, res) {
	user.getOne(req, res);
});

router.post('/get/all', function(req, res) {
	user.getAll(req, res);
});

router.post('/login', function(req, res) {
	user.login(req, res);
});

router.post('/add', function(req, res) {
	user.add(req, res);
});

router.post('/delete', function(req, res) {
	user.delete(req, res);
});

router.post('/edit', function(req, res) {
	user.updateProfil(req, res);
});

router.post('/edit/password', function(req, res) {
	user.updatePassword(req, res);
});

router.post('/edit/status', function(req, res) {
	user.updateStatus(req, res);
});

router.post('/reset', function(req, res) {
	user.resetPassword(req, res);
});

router.post('/reset/confirm', function(req, res) {
	user.confirmResetPassword(req, res);
});

module.exports = router;
