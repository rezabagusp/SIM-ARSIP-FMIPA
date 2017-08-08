var sequelize = require('./../connection');
var Kode_surat = sequelize.import(__dirname + "/../models/kode_surat.model");
module.exports = function(sequelize, DataType){
	return sequelize.define('jenis_surat',{
		nomor_jenis_surat: DataType.STRING,
        nama_jenis_surat: DataType.STRING,
        kode_surat_id: { type: DataType.INTEGER, references: { model: Kode_surat, key: 'id' } }
    });
}