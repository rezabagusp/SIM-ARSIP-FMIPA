module.exports = function(sequelize, DataType){
	return sequelize.define('penerima',{
		nama_penerima: DataType.STRING,
        jabatan_penerima: DataType.STRING,
        email_penerima: DataType.STRING
    });
}