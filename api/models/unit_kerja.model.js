module.exports = function(sequelize, DataType){
	return sequelize.define('unit_kerja',{
		nama_unit_kerja: DataType.STRING,
        akronim_unit_kerja: DataType.STRING,
        kode_unit_kerja: DataType.STRING               
	});
}