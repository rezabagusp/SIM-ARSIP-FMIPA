import { Http, Headers, Response, URLSearchParams} from '@angular/http';//add http module
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class UploadService {
  
  //atribut for loading bar upload
  progressObserver = new Subject<number>();
  progress$ = this.progressObserver.asObservable();
	progress: number = 0;	
  
  constructor(private http: Http){
  }

	uploadFile(url, token, files: File){
		return new Promise((resolve, reject) => {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			formData.append("file_lampiran" ,files,files.name);			

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject(xhr.response);
					}
				}
			}
			setInterval(() => {}, 500);

			xhr.upload.onprogress = (event) => {
    			this.progress = Math.round(event.loaded / event.total * 100);
    			this.progressObserver.next(this.progress);
			};

			xhr.open("POST", url, true);
			xhr.setRequestHeader('token', token);//put token to header
			xhr.send(formData);
		});
	}
 
}