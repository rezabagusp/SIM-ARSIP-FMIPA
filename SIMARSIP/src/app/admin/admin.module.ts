
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
// admin
import { SuratMasukModule } from './surat-masuk/surat-masuk.module';
import { SuratKeluarModule } from './surat-keluar/surat-keluar.module';
import { LampiranModule } from './lampiran/lampiran.module';
import { RetensiSuratModule } from './retensi-surat/retensi-surat.module';
import { SasaranMutuModule } from './sasaran-mutu/sasaran-mutu.module'

import { AdminRoutingModule } from './admin.routing';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SuratMasukModule, SuratKeluarModule, LampiranModule, RetensiSuratModule, SasaranMutuModule],
  declarations: []
})
export class AdminModule {

}