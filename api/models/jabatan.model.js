module.exports = function(sequelize, DataType){
	return sequelize.define('jabatan',{
		nama_jabatan: DataType.STRING                
	});
}