
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetensiSuratComponent } from './retensi-surat.component';

const routes: Routes = [
  {
    path: '',
    component: RetensiSuratComponent,
    data: {
        title: 'Retensi Surat title'
    },
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RetensiSuratRoutingModule{}