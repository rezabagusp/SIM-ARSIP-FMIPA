import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'; // add http module
import { Observable } from 'rxjs/Observable';
// jwt helper
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  public jwtHelper: JwtHelper = new JwtHelper();

  public url_login = 'http://localhost:3000/api/user/login';
  private token: string;

  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }
  login(nama_user: string, password_user: string, remember_me: boolean) {
    let send = JSON.stringify({email_user: nama_user, password_user:password_user, remember_me: remember_me });
    let header= new Headers();
    header.append('Content-type', 'application/json' );
    return this.http.post(this.url_login, send, {headers:header})
      .map((response: Response) => {
        //login succesful if there is token response
        let token = response.json() && response.json().token;
        console.log('ini token balikan', response.json().token);
        if(token){
          //set token
          this.token = token;
          //set other to localstorage
          localStorage.setItem('token', token);
          localStorage.setItem('nama_user', nama_user);
          //return true to indicate successful login
          return true
        }
        else{
          // return false to indicate failed to login
          return false;
        }
      });
  }

  logout() {
      // remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('nama_user');
  }

}
