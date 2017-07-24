module.exports = function(sequelize, DataType){
	return sequelize.define('sub_sub_jenis_surat',{
		nomor_sub_jenis_surat: DataType.STRING,
        nama_sub_jenis_surat: DataType.STRING,
        retensi_sub_jenis_surat: DataType.INTEGER,
        sub_jenis_surat_id: DataType.INTEGER
	});
}