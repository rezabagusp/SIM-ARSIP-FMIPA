var express = require('express'),
	path = require('path');

var sequelize = require('./connection');

var Surat = sequelize.import(__dirname + '/models/surat.model');

Surat
.findAll()
.then(function() {
	console.log("1");
})
.then(function() {
	console.log("2");
})
.then(function() {
	console.log("3");
})
.then(function() {
	console.log("4");
})
.then(function() {
	console.log("5");
})
.then(function() {
	console.log("6");
})
.then(function() {
	console.log("7");
})
.then(function() {
	console.log("8");
})
.then(function() {
	console.log("9");
})
.then(function() {
	console.log("10");
})
.then(function() {
	console.log("11");
});