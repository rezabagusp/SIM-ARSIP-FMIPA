import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuratKeluarRoutingModule } from './surat-keluar.routing';

import { DataTablesModule } from 'angular-datatables';
import { SelectModule } from 'ng2-select-compat';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { DatePickerModule } from 'ng2-datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SuratKeluarComponent } from './surat-keluar.component';


@NgModule({
    imports: [CommonModule, FormsModule, SuratKeluarRoutingModule, DataTablesModule,SelectModule,Ng2AutoCompleteModule, DatePickerModule, ModalModule ],
    declarations: [SuratKeluarComponent]
})

export class SuratKeluarModule {}