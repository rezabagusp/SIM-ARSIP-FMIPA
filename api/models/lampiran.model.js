module.exports = function(sequelize, DataType) {
	return sequelize.define('lampiran', {
		judul_lampiran: DataType.STRING,
        tanggal_lampiran: DataType.DATE,
        tanggal_entri_lampiran: DataType.DATE,
        file_lampiran: DataType.STRING,
        isi_lampiran: DataType.TEXT,
        surat_id:DataType.INTEGER
	});
}