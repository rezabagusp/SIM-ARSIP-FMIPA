import { ToastrModule, ToastrService } from 'toastr-ng2';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Headers, Response, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class DataService {
    
  //URL API SERVICE ADMIN
  public url_upload_file = 'http://localhost:3000/api/lampiran/upload';
  public url_add_lampiran = 'http://localhost:3000/api/lampiran/add';
  public url_get_all_lampiran = 'http://localhost:3000/api/lampiran/get/all';
  public url_edit_lampiran = 'http://localhost:3000/api/lampiran/edit';
  public url_delete_lampiran = 'http://localhost:3000/api/lampiran/delete';
  
  // surat
  public url_surat_add = 'http://localhost:3000/api/surat/add';
  public url_surat_upload = 'http://localhost:3000/api/surat/upload'
  public url_surat_delete = 'http://localhost:3000/api/surat/delete';
  public url_surat_edit = 'http://localhost:3000/api/surat/edit';
  public url_surat_disposisi = 'http://localhost:3000/api/surat/edit/disposisi';
  public url_surat_get = 'http://localhost:3000/api/surat/get/tipe';
  public url_surat_get_detail = 'http://localhost:3000/api/surat/get';

  //data form
  public url_perihal_get = 'http://localhost:3000/api/dataform/get/perihal/all'
  public url_pengirim_get = 'http://localhost:3000/api/dataform/get/pengirim'
  public url_penerima_get = 'http://localhost:3000/api/dataform/get/staff/all'
  public url_penerima_jabatan_get = 'http://localhost:3000/api/dataform/get/jabatan/all'
  public url_jabatan_get = 'http://localhost:3000/api/dataform/get/jabatan/staff/all'
  public url_kode_surat_get = 'http://localhost:3000/api/dataform/get/kode-surat'  
  public url_subjenis_surat_get = 'http://localhost:3000/api/dataform/get/subjenis_surat'
  public url_subsubjenis_surat_get = 'http://localhost:3000/api/dataform/get/subsubjenis-surat'
  // Super admin
  public url_unitkerja_all_get = 'http://localhost:3000/api/dataform/get/unitkerja/all';
  public url_unitkerja_add = 'http://localhost:3000/api/dataform/add/unitkerja';
  public url_unitkerja_edit = 'http://localhost:3000/api/dataform/edit/unitkerja';
  public url_staff_add = 'http://localhost:3000/api/dataform/add/staff';
  public url_staff_edit = 'http://localhost:3000/api/dataform/edit/staff';
  public url_staff_delete = 'http://localhost:3000/api/dataform/delete/staff';
  public url_staff_jabatan_all_get = 'http://localhost:3000/api/dataform/get/jabatan/staff/all';
  public url_jabatan_add = 'http://localhost:3000/api/dataform/add/jabatan';
  public url_jabatan_edit = 'http://localhost:3000/api/dataform/edit/jabatan';
  public url_jabatan_delete = 'http://localhost:3000/api/dataform/delete/jabatan';
  public url_perihal_add = 'http://localhost:3000/api/dataform/add/perihal';
  public url_perihal_edit = 'http://localhost:3000/api/dataform/edit/perihal';
  public url_perihal_delete = 'http://localhost:3000/api/dataform/delete/perihal';



  public token;
  public nama_user;
  public status;

  //jwt
  public decode;
  public role;


  //define object jwt
  jwthelper:JwtHelper = new JwtHelper();

  constructor(
        private toastr: ToastrService,
        private http: Http
    ){
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