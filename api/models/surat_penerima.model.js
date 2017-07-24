module.exports = function(sequelize, DataType){
	return sequelize.define('surat_penerima',{
		surat_id: DataType.INTEGER,
		penerima_id: DataType.INTEGER
    });
}