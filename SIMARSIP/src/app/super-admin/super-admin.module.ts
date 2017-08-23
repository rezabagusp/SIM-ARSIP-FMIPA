import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRoutingModule } from './super-admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select-compat';
import { DataTablesModule } from 'angular-datatables';

import { SuperAdminComponent } from './super-admin.component';
import { PerihalComponent } from './add/perihal/perihal.component';
import { StaffComponent } from './add/staff/staff.component';
import { JabatanComponent } from './add/jabatan/jabatan.component';

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SelectModule,
    DataTablesModule
  ],
  declarations: [
    SuperAdminComponent,
    PerihalComponent,
    StaffComponent,
    JabatanComponent
  ]
})
export class SuperAdminModule { }