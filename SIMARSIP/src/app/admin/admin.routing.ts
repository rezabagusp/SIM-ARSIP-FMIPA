import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from '../layouts/full-layout.component';

import { LampiranComponent } from './lampiran/lampiran.component';
import { SuratComponent } from './surat/surat.component';
import { RetensiSuratComponent } from './retensi-surat/retensi-surat.component';

import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  //ADMIN
  {
    path: 'admin',
    component: FullLayoutComponent,
    canActivate: [],
    children: [
      { path:   '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'suratmasuk/:tipe_surat',
        data: {
          title: 'Surat Masuk'
        },
        component: SuratComponent
      },
      {
        path: 'suratkeluar/:tipe_surat',
        data: {
          title: 'Surat Keluar'
        },        
        component: SuratComponent
      },
      {
        path: 'lampiran',
        data: {
          title: 'Lampiran'
        },
        component: LampiranComponent
      },
      {
        path: 'retensisurat',
        component: RetensiSuratComponent
      },
      {
        path: 'sasaranmutu',
        loadChildren: './sasaran-mutu/sasaran-mutu.module#SasaranMutuModule'
      },
                 
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule{}