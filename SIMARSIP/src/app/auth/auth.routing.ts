import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Auth } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: 'auth',
    component: Auth,
  },
  {
    path:'forgotpassword',
    component: ForgotPasswordComponent,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule{}