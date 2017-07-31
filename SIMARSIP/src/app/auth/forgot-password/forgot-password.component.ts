import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  private nama_user;

  constructor() { }

  ngOnInit() {
  }

  submit(){
    console.log('nama user yang dikirim : ', this.nama_user)
  }

}
