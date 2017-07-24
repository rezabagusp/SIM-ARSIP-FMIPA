var sequelize = require('./../dbsequelize');
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model');
mahasiswa.sync().then(()=> {
	mahasiswa.bulkCreate([{
		nama_mahasiswa: 'Reza Bagus Permana',
		NIM_mahasiswa: 'G64140023'
	}

	]);
});