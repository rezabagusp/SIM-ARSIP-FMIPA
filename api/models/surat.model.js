var sequelize = require('../connection');
var Perihal = sequelize.import(__dirname + '/../models/perihal.model');

module.exports = function(sequelize, DataType) {
    return sequelize.define('surat', {
	nomor_surat: DataType.INTEGER,
        unit_kerja_surat: DataType.STRING,
        hal_surat: DataType.STRING,
        tahun_surat: DataType.INTEGER,
        tanggal_surat: DataType.DATE,
        tanggal_terima_surat: DataType.DATE,
        tanggal_entri_surat: DataType.DATE,
        sifat_surat: DataType.ENUM('rahasia', 'biasa'),
        tipe_surat: DataType.ENUM('masuk', 'keluar'),
        file_surat: DataType.STRING,
        status_surat: { type: DataType.ENUM('aktif', 'inaktif'), defaultValue: 'aktif' },
        perihal_id: { type: DataType.INTEGER, references: { model: Perihal, key: 'id' } }                                         
    });
}