import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SuratKeluarComponent } from './surat-keluar.component';

const routes: Routes = [
  {
    path: '',
    component: SuratKeluarComponent,
    data: {
        title: 'Surat Keluar title'
    },
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SuratKeluarRoutingModule{}