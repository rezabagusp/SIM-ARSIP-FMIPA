/* call all models to sync with database */
var User = sequelize.import(__dirname + "/models/user.model"),
    Surat = sequelize.import(__dirname + "/models/surat.model"),
    Lampiran = sequelize.import(__dirname + "/models/lampiran.model"),
    Jabatan = sequelize.import(__dirname + "/models/jabatan.model"),
    Penerima = sequelize.import(__dirname + "/models/penerima.model"),
    Pengirim = sequelize.import(__dirname + "/models/pengirim.model"),
    Perihal = sequelize.import(__dirname + "/models/perihal.model"),
    Staff = sequelize.import(__dirname + "/models/staff.model"),

    Kode_surat = sequelize.import(__dirname + "/models/kode_surat.model"),
    Jenis_surat = sequelize.import(__dirname + "/models/jenis_surat.model"),
    Sub_jenis_surat = sequelize.import(__dirname + "/models/sub_jenis_surat.model"),
    Sub_sub_jenis_surat = sequelize.import(__dirname + "/models/sub_sub_jenis_surat.model"),
    Surat_penerima = sequelize.import(__dirname + "/models/surat_penerima.model"),
    Unit_kerja = sequelize.import(__dirname + "/models/unit_kerja.model");

User.sync();
// Lampiran.sync();
Jabatan.sync();
Perihal.sync();
Staff.sync();
Pengirim.sync();
Unit_kerja.sync();

Kode_surat.sync().then(function(result) {
    Jenis_surat.sync().then(function(result) {
        Sub_jenis_surat.sync().then(function(result) {
            Sub_sub_jenis_surat.sync().then(function(result) {
                Surat.sync().then(function(result) {
                    Lampiran.sync();
                    Penerima.sync().then(function(result) {
                        Surat_penerima.sync();
                    });
                });
            });
        });
    });
});

/* end of sync databae */