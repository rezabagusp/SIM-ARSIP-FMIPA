var sequelize = require('../connection');
var Jabatan = sequelize.import(__dirname + "/../models/jabatan.model");

module.exports = function(sequelize, DataType){
	return sequelize.define('penerima',{
		nama_penerima: DataType.STRING,
        jabatan_penerima: { type: DataType.INTEGER, references: { model: Jabatan, key: 'id' }, defaultValue: null },
        email_penerima: DataType.STRING
    });
}