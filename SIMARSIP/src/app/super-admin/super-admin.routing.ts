import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullLayoutComponent } from '../layouts/full-layout.component';
import { PerihalComponent } from './add/perihal/perihal.component';
import { StaffComponent } from './add/staff/staff.component';
import { JabatanComponent } from './add/jabatan/jabatan.component';

import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
    {
        path: 'super-admin',
        component: FullLayoutComponent,
        canActivate: [],
        children: 
        [
            {
                path: '',
                redirectTo: 'add-staff',
                pathMatch: 'full'
            },
            {
                path: 'add-staff',
                component: StaffComponent,
                data: {
                    title: 'Tambah Staff'
                }
            },
            {
                path: 'add-jabatan',
                component: JabatanComponent,
                data: {
                    title: 'Tambah Jabatan'
                }
            },
            {
                path: 'add-perihal',
                component: PerihalComponent,
                data: {
                    title: 'Tambah Perihal'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SuperAdminRoutingModule {}