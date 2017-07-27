module.exports = function(sequelize, DataType){
	return sequelize.define('sub_sub_jenis_surat',{
		nomor_sub_sub_jenis_surat: DataType.STRING,
        nama_sub_sub_jenis_surat: DataType.STRING,
        retensi_aktif_sub_sub_jenis_surat: DataType.INTEGER,
        retensi_inaktif_sub_sub_jenis_surat: DataType.INTEGER,
        perlakuan_sub_sub_jenis_surat: DataType.ENUM('Musnah', 'Permanen', 'Ditinjau Kembali'),
        nilai_sub_sub_jenis_surat: DataType.STRING,
        sub_jenis_surat_id: DataType.INTEGER
	});
}