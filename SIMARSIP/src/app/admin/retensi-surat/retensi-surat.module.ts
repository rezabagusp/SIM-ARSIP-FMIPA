import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RetensiSuratRoutingModule } from './retensi-surat.routing';

import { DataTablesModule } from 'angular-datatables';
import { SelectModule } from 'ng2-select-compat';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { DatePickerModule } from 'ng2-datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RetensiSuratComponent } from './retensi-surat.component';


@NgModule({
    imports: [CommonModule, FormsModule, RetensiSuratRoutingModule, DataTablesModule,SelectModule,Ng2AutoCompleteModule, DatePickerModule, ModalModule ],
    declarations: [RetensiSuratComponent]
})

export class RetensiSuratModule {}