import { Http, Headers, Response, URLSearchParams} from '@angular/http';//add http module
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class AdminService {
    constructor(private http: Http){}
    //Lampiran
    entryLampiran(url, token, creds){
        let header= new Headers();
        header.append('Content-type', 'application/json' );
        header.append('token', token );//put token to request API

        return this.http.post(url, creds, {headers:header})
            .map((response: Response) =>{
                let data = response.json();
                return data || {};
            });        
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
    getAllSurat(url, creds){
        let header= new Headers();
        header.append('Content-type', 'application/json' );
        return this.http.post(url, creds , {headers:header})
            .map((response: Response) => {
                let body = response.json();
                return body;
            }); 
    }

    entrySurat(urls, creds){
        let header= new Headers();
        header.append('Content-type', 'application/json' );
        return this.http.post(urls, creds, {headers:header})
            .map((response: Response) => 
                response.json()
            );        
    }
        
    deleteSurat(url, creds){
        let header= new Headers();  
        header.append('Content-type', 'application/json' );
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
    
    // dataform 
    getTujuanJabatan(url, token){
        let header= new Headers();

        header.append('Content-type', 'application/json' );
        header.append('token', token );//put token to request API

        return this.http.post(url, null, {headers:header})
            .map((response: Response) => 
                response.json()
            );
    }
    getTujuanOrang(url){
        let header= new Headers();

        header.append('Content-type', 'application/json' );
        return this.http.post(url, null, {headers:header})
            .map((response: Response) => 
                response.json()
            );
    }    
    getJenisSurat(url, token){
        let header= new Headers();

        header.append('Content-type', 'application/json' );
        header.append('token', token );//put token to request API

        return this.http.post(url, null, {headers:header})
            .map((response: Response) => 
                response.json()
            );
    }      
    getPerihal(url, token){
        let header= new Headers();

        header.append('Content-type', 'application/json' );
        header.append('token', token );//put token to request API

        return this.http.post(url, null, {headers:header})
            .map((response: Response) => 
                response.json()
            );      
    }
    getLampiran(url, token) {
        let header= new Headers();

        header.append('Content-type', 'application/json' );
        header.append('token', token );//put token to request API

        return this.http.post(url, null, {headers:header})
            .map((response: Response) => 
                response.json()
            );         
    }

    getDataDetail(url, data) {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        console.log(data);
        return this.http.post(url, data, { headers: header })
            .map((response: Response) => {
                let data = response.json();
                return data || {};
            });
    }

    postDisposisi(url, data) {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        return this.http.post(url, data, {headers: header})
            .map((response: Response) => {
                let data = response.json();
                return data || {};
            });
    }

    postAddSuperAdmin(url, data) {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        return this.http.post(url, data, {headers: header})
            .map((response: Response) => {
                let data = response.json();
                return data || {};
            });
    }
}