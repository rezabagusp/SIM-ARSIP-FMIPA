import { ToastrModule, ToastrService } from 'toastr-ng2';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class DataService {
  //URL API SERVICE ADMIN
  public url_upload_file = 'http://localhost:3000/api/lampiran/upload'
  public url_add_lampiran = 'http://localhost:3000/api/lampiran/add'
  public url_get_all_lampiran = 'http://localhost:3000/api/lampiran/get'
  public url_edit_lampiran = 'http://localhost:3000/api/lampiran/edit'
  public url_delete_lampiran = 'http://localhost:3000/api/lampiran/delete'

  public url_surat_add = 'http://localhost:3000/api/surat/add'
  public url_surat_delete = 'http://localhost:3000/api/surat/delete'
  public url_surat_edit = 'http://localhost:3000/api/surat/edit'   
  public url_surat_get = 'http://localhost:3000/api/surat/get'   
   

  

  public token;
  public nama_user;
  public status;

  //jwt
  public decode;
  public role;


  //define object jwt
  jwthelper:JwtHelper = new JwtHelper();

  constructor(private toastr: ToastrService){
      this.getLocalStorage();
  }

  getLocalStorage(){
      this.token = localStorage.getItem('token');
      this.decode = this.jwthelper.decodeToken(this.token);
      this.nama_user = this.decode.nama_user;
      this.role = this.decode.role;
  }
  showSuccess(message:string){
      this.toastr.success(message, "Success !")    
  }
  
  showWarning(message:string){
      this.toastr.warning(message, "Warning !")       
  }

  showError(message:string){
      this.toastr.error(message, "Warning !")     
  
  }
}