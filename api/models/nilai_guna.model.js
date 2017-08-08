module.exports = function(sequelize, DataType) {
	return sequelize.define('nilai_guna', {
		nama_nilai_guna: DataType.STRING
	});
}