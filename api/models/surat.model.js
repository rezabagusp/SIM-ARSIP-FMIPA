var sequelize = require('../connection');
var Perihal = sequelize.import(__dirname + '/../models/perihal.model');
var Posisi = sequelize.import(__dirname + '/../models/posisi.model');

module.exports = function(sequelize, DataType) {
    return sequelize.define('surat', {
	    nomor_surat: { type: DataType.STRING, allowNull: false },
        judul_surat: DataType.STRING,
        tanggal_surat: { type: DataType.DATE, allowNull: false },
        tanggal_terima_surat: { type: DataType.DATE, allowNull: false },
        tanggal_entri_surat: { type: DataType.DATE, allowNull: false },
        sifat_surat: { type: DataType.ENUM('rahasia', 'umum'), defaultValue: 'umum' },
        kepentingan_surat: { type: DataType.ENUM('segera', 'biasa'), defaultValue: 'biasa' },
        asal_surat: { type: DataType.ENUM('internal', 'eksternal'), defaultValue: 'internal' },
        tipe_surat: { type: DataType.ENUM('masuk', 'keluar'), allowNull: false },
        keterangan_surat: DataType.TEXT,
        file_surat: { type: DataType.STRING, allowNull: false },
        status_surat: { type: DataType.ENUM('aktif', 'inaktif'), defaultValue: 'aktif' },
        perihal_id: { type: DataType.INTEGER, references: { model: Perihal, key: 'id' } },
        posisi_surat: DataType.TEXT                                        
    });
}