module.exports = function(sequelize, DataType){
	return sequelize.define('sub_jenis_surat',{
		nomor_sub_jenis_surat: DataType.STRING,
        nama_sub_jenis_surat: DataType.STRING,
        jenis_surat_id: DataType.INTEGER
	});
}