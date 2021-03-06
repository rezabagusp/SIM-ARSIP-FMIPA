var sequelize = require('../connection');
var Sub_jenis_surat = sequelize.import(__dirname + "/../models/sub_jenis_surat.model");

module.exports = function(sequelize, DataType){
	return sequelize.define('sub_sub_jenis_surat',{
		nomor_sub_sub_jenis_surat: DataType.STRING,
        nama_sub_sub_jenis_surat: DataType.STRING,
        retensi_aktif_sub_sub_jenis_surat: DataType.INTEGER,
        retensi_inaktif_sub_sub_jenis_surat: DataType.INTEGER,
        perlakuan_sub_sub_jenis_surat: DataType.ENUM('Musnah', 'Permanen', 'Dinilai Kembali', 'Setelah 10 tahun diaudit'),
        nilai_sub_sub_jenis_surat: DataType.STRING,
        sub_jenis_surat_id: { type: DataType.INTEGER, references: { model: Sub_jenis_surat, key: 'id' } }
	});
}