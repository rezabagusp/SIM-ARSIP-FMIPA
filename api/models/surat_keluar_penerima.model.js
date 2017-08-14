var sequelize = require('./../connection');
var Surat = sequelize.import(__dirname + '/../models/surat.model');

module.exports = function(sequelize, DataType){
	return sequelize.define('surat_keluar_penerima',{
		surat_id: { type: DataType.INTEGER, references: { model: Surat, key: 'id' } },
		nama_penerima: DataType.STRING
    });
}