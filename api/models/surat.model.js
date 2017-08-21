var sequelize = require('../connection');
var Perihal = sequelize.import(__dirname + '/../models/perihal.model');
var Posisi = sequelize.import(__dirname + '/../models/posisi.model');

module.exports = function(sequelize, DataType) {
    return sequelize.define('surat', {
	    nomor_surat: { type: DataType.INTEGER, allowNull: false },
        unit_kerja_surat: { type: DataType.STRING, allowNull: false },
        hal_surat: { type: DataType.STRING, allowNull: false },
        tahun_surat: { type: DataType.INTEGER, allowNull: false },
        tanggal_surat: { type: DataType.DATE, allowNull: false },
        tanggal_terima_surat: { type: DataType.DATE, allowNull: false },
        tanggal_entri_surat: { type: DataType.DATE, allowNull: false },
        sifat_surat: { type: DataType.ENUM('rahasia', 'umum'), defaultValue: 'umum' },
        kepentingan_surat: { type: DataType.ENUM('segera', 'biasa'), defaultValue: 'biasa' },
        tipe_surat: { type: DataType.ENUM('masuk', 'keluar'), allowNull: false },
        keterangan_surat: DataType.TEXT,
        file_surat: { type: DataType.STRING, allowNull: false },
        status_surat: { type: DataType.ENUM('aktif', 'inaktif'), defaultValue: 'aktif' },
        perihal_id: { type: DataType.INTEGER, references: { model: Perihal, key: 'id' } },
        posisi_id: { type: DataType.INTEGER, references: { model: Posisi, key: 'id' } }                                         
    });
}