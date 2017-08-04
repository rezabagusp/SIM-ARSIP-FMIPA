var sequelize = require('../connection');
var Sub_sub_jenis_surat = sequelize.import(__dirname + "/../models/sub_sub_jenis_surat.model");
var Unit_kerja = sequelize.import(__dirname + "/../models/unit_kerja.model");

module.exports = function(sequelize, DataType) {
	return sequelize.define('surat', {
		nomor_surat: DataType.INTEGER,
        unit_kerja_surat: { type: DataType.STRING, references: { model: Unit_kerja, key: 'id' } },
        hal_surat: DataType.STRING,
        tahun_surat: DataType.INTEGER,
        perihal_surat: DataType.INTEGER,
        pengirim_surat: DataType.STRING,
        tanggal_surat: DataType.DATE,
        tanggal_terima_surat: DataType.DATE,
        tanggal_entri_surat: DataType.DATE,
        tipe_surat: DataType.ENUM('masuk', 'keluar'),
        file_surat: DataType.STRING,
        isi_surat: DataType.TEXT,
        status_surat: { type: DataType.ENUM('aktif', 'inaktif'), defaultValue: 'aktif' },
        sub_sub_jenis_surat_id: { type: DataType.INTEGER, references: { model: Sub_sub_jenis_surat, key: 'id' } },                                              
	 }, {
	 	getterMethode: {
	 		getNomor: function() {
	 		    return this.getDataValue('nomor_surat');
            }, 
            getPerihal: function() {
	 			return this.getDataValue('perihal_surat');
            },
            getPengirim: function() {
	 		    return this.getDataValue('pengirim_surat');
            },
            getTanggal: function() {
	 			return this.getDataValue('tanggal_surat');
            },
            getTanggalTerima: function() {
	 			return this.getDataValue('tanggal_terima_surat');
            },
            getTanggalEntri: function() {
	 			return this.getDataValue('tanggal_entri_surat');
            },
            getIsi: function() {
                return this.getDataValue('isi_surat');
            },
            getFile: function() {
                return this.getDataValue('file_surat');
            },
            getStatus: function() {
                return this.getDataValue('status_surat');
            },
            getSubSubJenis: function() {
                return this.getDataValue('sub_sub_jenis_surat_id');
            }
         }, 
         setterMethode: {
			setNomor: function(nomor) {
                return this.setDataValue('nomor_surat', nomor);
            }, 
            setPerihal: function(perihal) {
                return this.setDataValue('perihal_surat', perihal);
            },
            setPengirim: function(pengirim) {
                return this.setDataValue('pengirim_surat', pengirim);
            },
            setTanggal: function(tanggal) {
                return this.setDataValue('tanggal_surat', tanggal);
            },
            setTanggalTerima: function(tanggal_terima) {
                return this.setDataValue('tanggal_terima_surat', tanggal_terima);
            },
            setTanggalEntri: function(tanggal_entri) {
                return this.setDataValue('tanggal_entri_surat', tanggal_entri);
            },
            setJenis: function(jenis) {
                return this.setDataValue('jenis_surat', jenis);
            },
            setIsi: function(isi) {
                return this.setDataValue('isi_surat', isi);
            },
            setFile: function(file) {
                return this.setDataValue('file_surat', file);
            },
            setStatus: function(status) {
                return this.setDataValue('status_surat', status);
            }
	 	}
	});
}