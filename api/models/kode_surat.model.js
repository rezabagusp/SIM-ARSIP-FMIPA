module.exports = function(sequelize, DataType){
	return sequelize.define('kode_surat',{
		kode_surat: DataType.STRING,
        nama_kode_surat: DataType.STRING,
        retensi_aktif_kode_surat: DataType.INTEGER,
        retensi_inaktif_kode_surat: DataType.INTEGER
	});
}