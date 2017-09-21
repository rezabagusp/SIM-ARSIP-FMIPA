var Sequelize = require('sequelize');

module.exports = new Sequelize('simarsip', 'root', 'gr1mr34p3r', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 3600
	},
	timezone: '+07:00'
});