import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//datepicker
import { DatePickerModule } from 'angular-io-datepicker';
import { OverlayModule } from 'a4-overlay';

//library
import { DataTablesModule } from 'angular-datatables';
import { SelectModule } from 'ng2-select-compat';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TagInputModule } from 'ngx-chips';
// admin
import { SasaranMutuModule } from './sasaran-mutu/sasaran-mutu.module'

import { AdminRoutingModule } from './admin.routing';

//component
import { LampiranComponent } from './lampiran/lampiran.component';
import { SuratComponent } from './surat/surat.component';
import { RetensiSuratComponent } from './retensi-surat/retensi-surat.component';
import { CekComponent } from './cek/cek.component';

@NgModule({
  imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            DatePickerModule,
            OverlayModule,
            TagInputModule,

            AdminRoutingModule, 
            SasaranMutuModule, 
            DataTablesModule, 
            SelectModule, 
            Ng2AutoCompleteModule, 
            ModalModule],
  
  declarations: [ LampiranComponent, 
                  SuratComponent, 
                  RetensiSuratComponent, CekComponent]
})

export class AdminModule {

}