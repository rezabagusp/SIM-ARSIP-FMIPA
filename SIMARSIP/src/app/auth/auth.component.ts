import { ToastrService } from 'toastr-ng2';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

// inject Service
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthenticationService]
  })

export class Auth implements OnInit {
  returnUrl: string;
  
  // atribut2 auth
  private nama_user: string;
  private password_user: string;
  private remember_me: boolean = false;
  private token: string;
  private decode:any;

    // define jwt objcet
  jwthelper:JwtHelper = new JwtHelper();



  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: Http,
              private authenticationService: AuthenticationService
              ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
    console.log(this.route)
  }

  changeRememberMe(){
    if(this.remember_me == true)
      this.remember_me = false
    else
      this.remember_me = true;
    console.log(this.remember_me)
  }

  login() {
    const header = new Headers();
    header.append('Content-type', 'application/json' );

    this.authenticationService.login(this.nama_user, this.password_user, this.remember_me)
    .subscribe(
      result => {
        if (result) {
          swal(
            'Login berhasil!',
            'Click ok!',
            'success'
          )
          this.checkstatus();
        }else {
          swal(
            'Failed',
            'Invalid Username or Password',
            'info'
          )
        }
     }
    );
  }

  checkstatus(){
    this.token = localStorage.getItem('token');
    this.decode = this.jwthelper.decodeToken(this.token);
    console.log('rolenya', this.decode.role)
    if(this.decode.role == 'superadmin')
      this.router.navigate(['superadmin']);
    else if(this.decode.role == 'admin')
      this.router.navigate(['admin'])
  }
  
}
