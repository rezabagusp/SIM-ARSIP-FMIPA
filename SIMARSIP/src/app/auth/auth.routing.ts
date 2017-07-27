import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Auth } from './auth.component';

const routes: Routes = [
  {
    path: 'auth',
    component: Auth,
    children: [
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule{}