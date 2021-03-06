var sequelize = require('./../connection');
var Surat = sequelize.import(__dirname + '/../models/surat.model');
var Staff = sequelize.import(__dirname + '/../models/staff.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('surat_keluar_pengirim', {
		surat_id: { type: DataType.INTEGER, references: { model: Surat, key: 'id' } },
		staff_id: { type: DataType.INTEGER, references: { model: Staff, key: 'id' } }
    });
}