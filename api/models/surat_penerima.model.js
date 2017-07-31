module.exports = function(sequelize, DataType){
	return sequelize.define('surat_penerima',{
		surat_id: { type: DataType.INTEGER, references: { model: Surat, key: 'id' } },
		penerima_id: { type: DataType.INTEGER, references: { model: Penerima, key: 'id' } }
    });
}