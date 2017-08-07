module.exports = function(sequelize, DataType){
	return sequelize.define('pengirim',{
		nama_pengirim: DataType.STRING,
		jabatan_pengirim: DataType.STRING,
        email_pengirim: DataType.STRING
    });
}