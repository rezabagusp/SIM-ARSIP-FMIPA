import { ToastrService } from 'toastr-ng2';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// inject Service
import { AuthenticationService } from '../_services/authentication.service';
import 'rxjs/add/observable/of';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthenticationService]
  })

export class Auth implements OnInit {
  returnUrl: string;
  // atribut2 auth
  private username;
  private password;
  private datalist;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: Http,
              private authenticationService: AuthenticationService,
              private toastrService: ToastrService
              ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
    console.log(this.route)
  }


  auth() {
    const send = {username: this.username, password: this.password }; // bikin data inputan lu jadi string json
    console.log(send);

    const header = new Headers();
    header.append('Content-type', 'application/json' );

    // this.authenticationService.auth(this.username, this.password)
    // .subscribe(
    //   result => {
    //     if (result) {
    //       swal(
    //         'Success',
    //         'Click Ok',
    //         'success'
    //       )
    //       this.router.navigate(['dashboard']); // if succes masuk ke halaman lain
    //     }else {
    //       swal(
    //         'Failed',
    //         'Invalid Username or Password',
    //         'info'
    //       )
    //     }
    //  }
    // );
  }

  submit(){
    this.router.navigate(['/admin'])

  }

}
