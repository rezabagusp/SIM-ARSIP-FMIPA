import { AuthGuard } from './_guards/auth.guard';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path:'admin',
    redirectTo:'admin/dashboard'
  },

  // //ADMIN
  // {
  //   path: 'admin',
  //   component: FullLayoutComponent,
  //   data: {
  //     title: 'admin'
  //   },
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadChildren: './dashboard/dashboard.module#DashboardModule'
  //     },
  //     {
  //       path: 'suratmasuk',
  //       loadChildren: './surat-masuk/surat-masuk.module#SuratMasukModule'
  //     },
  //     {
  //       path: 'suratkeluar',
  //       loadChildren: './surat-keluar/surat-keluar.module#SuratKeluarModule'
  //     },
  //     {
  //       path: 'lampiran',
  //       loadChildren: './lampiran/lampiran.module#LampiranModule'
  //     },
  //     {
  //       path: 'retensisurat',
  //       loadChildren: './retensi-surat/retensi-surat.module#RetensiSuratModule'
  //     },
  //     {
  //       path: 'sasaranmutu',
  //       loadChildren: './sasaran-mutu/sasaran-mutu.module#SasaranMutuModule'
  //     },
                 
  //   ]
  // },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
