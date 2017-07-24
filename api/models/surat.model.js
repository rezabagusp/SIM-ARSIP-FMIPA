module.exports = function(sequelize, DataType){
	return sequelize.define('surat',{
		nomor_surat: DataType.STRING,
        perihal_surat: DataType.INTEGER,
        pengirim_surat: DataType.STRING,
        tanggal_surat: DataType.DATE,
        tanggal_terima_surat: DataType.DATE,
        tanggal_entri_surat: DataType.DATE,
        jenis_surat: DataType.INTEGER,
        isi_surat: DataType.TEXT,  
        file_surat: DataType.STRING,
        status_surat: DataType.ENUM('aktif', 'inaktif')                                              
	 },{
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
            getJenis: function() {
	 			return this.getDataValue('jenis_surat');
            },
            getIsi: function() {
                return this.getDataValue('isi_surat');
            },
            getFile: function() {
                return this.getDataValue('file_surat');
            },
            getStatus: function() {
                return this.getDataValue('status_surat');
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