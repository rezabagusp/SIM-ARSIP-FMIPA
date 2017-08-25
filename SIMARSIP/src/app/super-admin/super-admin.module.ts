import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRoutingModule } from './super-admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select-compat';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SuperAdminComponent } from './super-admin.component';
import { PerihalComponent } from './add/perihal/perihal.component';
import { StaffComponent } from './add/staff/staff.component';
import { JabatanComponent } from './add/jabatan/jabatan.component';
import { UnitKerjaComponent } from './add/unit-kerja/unit-kerja.component';

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SelectModule,
    DataTablesModule,
    ModalModule.forRoot()
  ],
  declarations: [
    SuperAdminComponent,
    PerihalComponent,
    StaffComponent,
    JabatanComponent,
    UnitKerjaComponent
  ]
})
export class SuperAdminModule { }