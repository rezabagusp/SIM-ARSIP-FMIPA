import { Http, Headers, Response, URLSearchParams} from '@angular/http';//add http module
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class AdminService {

  constructor(private http: Http){
  }

  //Lampiran
  entryLampiran(url, token, creds){
    let header= new Headers();

    header.append('Content-type', 'application/json' );
    header.append('token', token );//put token to request API

    return this.http.post(url, creds, {headers:header})
        .map((response: Response) => 
            response.json()
        );        
  }
  getAllLampiran(url, token){
    let header= new Headers();

    header.append('Content-type', 'application/json' );
    header.append('token', token );//put token to request API

    return this.http.post(url, null, {headers:header})
        .map((response: Response) => 
            response.json()
        );            
  }
  editLampiran(url, token, creds){
    let header= new Headers();

    header.append('Content-type', 'application/json' );
    header.append('token', token );//put token to request API

    return this.http.post(url, creds, {headers:header})
        .map((response: Response) => 
            response.json()
        );       
  }
  deleteLampiran(url, token, creds){
    let header= new Headers();

    header.append('Content-type', 'application/json' );
    header.append('token', token );//put token to request API

    return this.http.post(url, creds, {headers:header})
        .map((response: Response) => 
            response.json()
        );           
  }
  // Surat
  getAllSurat(url, token, creds){
    let header= new Headers();

    header.append('Content-type', 'application/json' );
    header.append('token', token );//put token to request API

    return this.http.post(url, null, {headers:header})
        .map((response: Response) => 
            response.json()
        );            
  }
  entrySurat(url, token, creds){
    let header= new Headers();

    header.append('Content-type', 'application/json' );
    header.append('token', token );//put token to request API

    return this.http.post(url, creds, {headers:header})
        .map((response: Response) => 
            response.json()
        );        
  }
  deleteSurat(url, token, creds){
    let header= new Headers();

    header.append('Content-type', 'application/json' );
    header.append('token', token );//put token to request API

    return this.http.post(url, creds, {headers:header})
        .map((response: Response) => 
            response.json()
        );           
  }
  editSurat(url, token, creds){
    let header= new Headers();

    header.append('Content-type', 'application/json' );
    header.append('token', token );//put token to request API

    return this.http.post(url, creds, {headers:header})
        .map((response: Response) => 
            response.json()
        );        
  }
  
}