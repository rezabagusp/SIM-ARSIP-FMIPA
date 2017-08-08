module.exports = function(sequelize, DataType){
	return sequelize.define('perihal',{
        nama_perihal: DataType.STRING
    });
}