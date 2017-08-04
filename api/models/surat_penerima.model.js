var sequelize = require('./../connection');
var Surat = sequelize.import(__dirname + "/../models/surat.model");
var Penerima = sequelize.import(__dirname + "/../models/penerima.model");
module.exports = function(sequelize, DataType){
	return sequelize.define('surat_penerima',{
		surat_id: { type: DataType.INTEGER, references: { model: Surat, key: 'id' } },
		penerima_id: { type: DataType.INTEGER, references: { model: Penerima, key: 'id' } }
    });
}