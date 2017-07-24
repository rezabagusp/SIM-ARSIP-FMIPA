module.exports = function(sequelize, DataType){
	return sequelize.define('staff',{
		nama_staff: DataType.STRING,
        jabatan_staff: DataType.STRING,
        email_staff: DataType.STRING,
        jabatan_id: DataType.INTEGER                
	});
}