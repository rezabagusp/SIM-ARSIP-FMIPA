var sequelize = require('./../connection');
var Surat = sequelize.import(__dirname + '/../models/surat.model');

module.exports = function(sequelize, DataType){
	return sequelize.define('surat_masuk_pengirim',{
		surat_id: { type: DataType.INTEGER, references: { model: Surat, key: 'id' } },
		nama_pengirim: DataType.STRING
    });
}