module.exports = function(sequelize, DataType){
	return sequelize.define('hal_surat',{
		nama_hal_surat: DataType.STRING,
		kode_hal_surat: DataType.STRING,
		retensi_aktif_hal_surat: DataType.INTEGER,
		retensi_inaktif_hal_surat: DataType.INTEGER,
		nilai_guna_hal_surat: DataType.STRING,
		perlakuan_hal_surat: DataType.STRING
    });
}