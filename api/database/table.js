/*inisialisasi variable calon table*/
var sequelize = require('./../dbsequelize');
var jabatan = sequelize.import(__dirname + '/../models/jabatan.model.js');
var jenis_surat = sequelize.import(__dirname + '/../models/jenis_surat.model.js');
var kode_surat = sequelize.import(__dirname + '/../models/kode_surat.model.js');
var lampiran = sequelize.import(__dirname + '/../models/lampiran.model.js');
var penerima = sequelize.import(__dirname + '/../models/penerima.model.js');
var perihal = sequelize.import(__dirname + '/../models/perihal.model.js');
var staff = sequelize.import(__dirname + '/../models/staff.model.js');
var sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_jenis_surat.model.js');
var sub_sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_sub_jenis_surat.model.js');
var surat_penerima = sequelize.import(__dirname + '/../models/surat_penerima.model.js');
var surat = sequelize.import(__dirname + '/../models/surat.model.js');

/* check connection*/
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/*create table*/
jabatan.sync();
jenis_surat.sync();
kode_surat.sync();
lampiran.sync();
penerima.sync();
perihal.sync();
staff.sync();
sub_jenis_surat.sync();
sub_sub_jenis_surat.sync();
surat_penerima.sync();
surat.sync();