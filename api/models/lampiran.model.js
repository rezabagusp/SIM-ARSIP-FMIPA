var sequelize = require('./../connection');
var Surat = sequelize.import(__dirname + '/../models/surat.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('lampiran', {
		judul_lampiran: DataType.STRING,
        tanggal_lampiran: DataType.DATE,
        tanggal_entri_lampiran: DataType.DATE,
        file_lampiran: DataType.STRING,
        isi_lampiran: DataType.TEXT,
        surat_id: { type: DataType.INTEGER, defaultValue: null, references: { model: Surat, key: 'id' } }
	});
}