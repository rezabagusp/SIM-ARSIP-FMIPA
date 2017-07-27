import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SuratMasukComponent } from './surat-masuk.component';

const routes: Routes = [
  {
    path: '',
    component: SuratMasukComponent,
    data: {
        title: 'Surat Masuk title'
    },
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SuratMasukRoutingModule{}