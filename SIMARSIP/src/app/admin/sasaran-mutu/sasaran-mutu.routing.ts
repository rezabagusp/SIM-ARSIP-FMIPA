
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SasaranMutuComponent } from './sasaran-mutu.component';

const routes: Routes = [
  {
    path: '',
    component: SasaranMutuComponent,
    data: {
        title: 'Sasaran Mutu title'
    },
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SasaranMutuRoutingModule{}