module.exports = function(sequelize, DataType){
	return sequelize.define('jenis_surat',{
		nomor_jenis_surat: DataType.STRING,
        nama_jenis_surat: DataType.STRING,
        kode_surat_id: DataType.INTEGER
    });
}