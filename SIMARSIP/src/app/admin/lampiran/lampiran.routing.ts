
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LampiranComponent } from './lampiran.component';

const routes: Routes = [
  {
    path: '',
    component: LampiranComponent,
    data: {
        title: 'Lampiran title'
    },
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LampiranRoutingModule{}