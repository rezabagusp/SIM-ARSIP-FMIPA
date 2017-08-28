var sequelize = require('./../connection');
// call all models to sync with database
var User = sequelize.import(__dirname + '/../models/user.model'),
    Surat = sequelize.import(__dirname + '/../models/surat.model'),
    Lampiran = sequelize.import(__dirname + '/../models/lampiran.model'),
    Jabatan = sequelize.import(__dirname + '/../models/jabatan.model'),
    Staff = sequelize.import(__dirname + '/../models/staff.model'),
    Perihal = sequelize.import(__dirname + '/../models/perihal.model'),
    Posisi = sequelize.import(__dirname + '/../models/posisi.model'),
    /*Sementara pakai hal surat*/
    Hal_surat = sequelize.import(__dirname + '/../models/hal_surat.model'),
    /*Seharusnya pakai yang dibawah ini*/
    // Kode_surat = sequelize.import(__dirname + '/../models/kode_surat.model'),
    // Jenis_surat = sequelize.import(__dirname + '/../models/jenis_surat.model'),
    // Sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_jenis_surat.model'),
    // Sub_sub_sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_sub_sub_jenis_surat.model'),
    // Sub_sub_jenis_surat = sequelize.import(__dirname + '/../models/sub_sub_jenis_surat.model'),
    Surat_masuk_penerima = sequelize.import(__dirname + '/../models/surat_masuk_penerima.model'),
    Surat_masuk_pengirim = sequelize.import(__dirname + '/../models/surat_masuk_pengirim.model'),
    Surat_keluar_penerima = sequelize.import(__dirname + '/../models/surat_keluar_penerima.model'),
    Surat_keluar_pengirim = sequelize.import(__dirname + '/../models/surat_keluar_pengirim.model'),
    Unit_kerja = sequelize.import(__dirname + '/../models/unit_kerja.model');

User.sync();
/*Sementara pakai hal surat*/
Hal_surat.sync();
/*Seharusnya pakai yang dibawah ini*/
// Kode_surat.sync().then(() => {
//     Jenis_surat.sync().then(() => {
//         Sub_jenis_surat.sync().then(() => {
//             Sub_sub_jenis_surat.sync().then(() => {
//                 Sub_sub_sub_jenis_surat.sync();
//             })
//         });
//     });
// });

Unit_kerja.sync();

Perihal.sync().then(() => {
    Surat.sync({force: true}).then(() => {
        Lampiran.sync();
        Jabatan.sync().then(() => {
            Staff.sync().then(() => {
                Surat_masuk_penerima.sync().then(() => {
                    Surat_masuk_pengirim.sync().then(() => {
                        Surat_keluar_penerima.sync().then(() => {
                            Surat_keluar_pengirim.sync();
                        });
                    });
                });
            });
        });
    });
});