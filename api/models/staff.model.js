var sequelize = require('../connection');
var Jabatan = sequelize.import(__dirname + "/../models/jabatan.model");

module.exports = function(sequelize, DataType){
	return sequelize.define('staff',{
		nama_staff: DataType.STRING,
        email_staff: DataType.STRING,
        jabatan_id: { type: DataType.INTEGER, references: { model: Jabatan, key: 'id' }, defaultValue: null }
    });
}