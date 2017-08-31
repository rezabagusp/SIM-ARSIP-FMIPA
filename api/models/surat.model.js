var sequelize = require('../connection');
var Perihal = sequelize.import(__dirname + '/../models/perihal.model');
var Posisi = sequelize.import(__dirname + '/../models/posisi.model');

module.exports = function(sequelize, DataType) {
    return sequelize.define('surat', {
	    nomor_surat: { type: DataType.STRING, allowNull: false },
        judul_surat: DataType.STRING,
        tanggal_surat: { type: DataType.DATE, allowNull: false },
        tanggal_terima_surat: DataType.DATE,
        tanggal_entri_surat: { type: DataType.DATE, allowNull: false },
        tanggal_selesai_surat: DataType.DATE,
        sifat_surat: { type: DataType.ENUM('Rahasia', 'Umum'), defaultValue: 'Umum' },
        kepentingan_surat: { type: DataType.ENUM('Segera', 'Biasa'), defaultValue: 'Biasa' },
        asal_surat: { type: DataType.ENUM('Internal', 'Eksternal'), defaultValue: 'Internal' },
        tipe_surat: { type: DataType.ENUM('Masuk', 'Keluar'), allowNull: false },
        file_surat: { type: DataType.STRING, allowNull: false },
        status_surat: { type: DataType.ENUM('Aktif', 'Inaktif'), defaultValue: 'Aktif' },
        perihal_id: { type: DataType.INTEGER, references: { model: Perihal, key: 'id' } },
        posisi_surat: DataType.TEXT                                        
    });
}