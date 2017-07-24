module.exports = function(sequelize, DataType){
	return sequelize.define('kode_surat',{
		kode_surat: DataType.STRING,
        nama_kode_surat: DataType.STRING
	});
}