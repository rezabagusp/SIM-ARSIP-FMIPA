import { AuthGuard } from './_guards/auth.guard';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './login/login.component';

import { PrestasiComponent } from './prestasi/prestasi.component';
import { SuratMasukComponent } from './surat-masuk/surat-masuk.component';
import { SuratKeluarComponent } from './surat-keluar/surat-keluar.component';
import { LampiranComponent } from './lampiran/lampiran.component';
import { SasaranMutuComponent } from './sasaran-mutu/sasaran-mutu.component';
import { RetensiSuratComponent } from './retensi-surat/retensi-surat.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'prestasi',
        component: PrestasiComponent
      },
      {
        path: 'suratmasuk',
        component: SuratMasukComponent,
        data:{
          title:"Surat Masuk"
        }
      },
      {
        path: 'lampiran',
        component: LampiranComponent,
        data:{
          title:"Lampiran"
        }
      },
      {
        path: 'suratkeluar',
        component: SuratKeluarComponent,
        data:{
          title:"Surat Keluar"
        }
      },
      {
        path: 'sasaranmutu',
        component: SasaranMutuComponent,
        data:{
          title:"Sasaran Mutu"
        }
      },
      {
        path: 'retensisurat',
        component: RetensiSuratComponent,
        data:{
          title:"Retensi Surat"
        }
      }                  
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
