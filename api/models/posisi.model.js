module.exports = function(sequelize, DataType){
	return sequelize.define('posisi',{
		nama_posisi: DataType.STRING,
		keterangan_posisi: { type: DataType.STRING, defaultValue: null }
    });
}