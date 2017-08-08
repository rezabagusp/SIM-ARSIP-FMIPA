import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from '../layouts/full-layout.component';

import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  //ADMIN
  {
    path: 'admin',
    component: FullLayoutComponent,
    canActivate: [],
    children: [
      { path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'suratmasuk',
        loadChildren: './surat-masuk/surat-masuk.module#SuratMasukModule'
      },
      {
        path: 'suratkeluar',
        loadChildren: './surat-keluar/surat-keluar.module#SuratKeluarModule'
      },
      {
        path: 'lampiran',
        loadChildren: './lampiran/lampiran.module#LampiranModule'
      },
      {
        path: 'retensisurat',
        loadChildren: './retensi-surat/retensi-surat.module#RetensiSuratModule'
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