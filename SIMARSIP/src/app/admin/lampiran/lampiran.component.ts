import { Component, OnInit, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx'; // use for datatables\
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AdminService } from './../../_services/admin.service';
import { DataService } from './../../_services/data.service';
import { UploadService } from './../../_services/upload.service';


@Component({
  selector: 'app-lampiran',
  templateUrl: './lampiran.component.html',
  styleUrls: ['./../surat/surat.component.scss']
})
export class LampiranComponent implements OnInit {
  
  // define angular dateikcer for work 0 add, 1 edit
  form_type = 0;

  public form: FormGroup;
  public today;
  public uploadProgress: number = 0;  

  //upload file
  public max_size = Math.pow(10,6);
  public filesToUpload: FileList;
  public fileValid: boolean = false;
  public lampiran: string;

  // client
  public list_lampiran;
  private idLampiran: number;

  // data tables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();  

  constructor(private http: Http, 
              private zone: NgZone, 
              private fb: FormBuilder,
              private adminService:AdminService,
              private data: DataService,
              private upload: UploadService
            ) {
    
    this.upload.progress$.subscribe(status => {
      this.uploadProgress = status;
    });              
    
    this.today = new Date().toISOString()
  }

  ngOnInit() {
    //config and init datatables
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true
    };    
    this.initForm();
    this.getAllLampiran();
  }

  initForm(){
    this.form = this.fb.group({
      judul_lampiran: ['', Validators.required],
      tanggal_lampiran: ['', Validators.required],   
    });
  }
  
  resetForm(){
    this.fileValid=false; // for add lampiran only
    this.form.controls.judul_lampiran.setValue('' ,  { onlySelf: true });    
    this.form.controls.tanggal_lampiran.setValue( new Date().toISOString().substring(0, 10) ,  { onlySelf: true });

  }

  changeFormType(value){
    if (this.form_type!=value)
      this.form_type=value;
    console.log('status, ', this.form_type);

  }

  submit(){
    let creds = JSON.stringify({
                                judul_lampiran:this.form.value.judul_lampiran,
                                tanggal_lampiran: this.form.value.tanggal_lampiran,
                                tanggal_entri_lampiran: new Date().toISOString(),
                                file_lampiran: this.lampiran
                                })
    this.adminService.entryLampiran(this.data.url_add_lampiran, this.data.token, creds)
    .subscribe(
      data =>{
        console.log(data)
        if(data.status){
          this.dtTrigger.next();
          this.ngOnInit();
          this.data.showSuccess(data.message)
        }
        else{
          this.data.showError(data.message)
        }
      }
    )

  }

  edit(){
    let creds = JSON.stringify({
                                id_lampiran: this.idLampiran,
                                judul_lampiran:this.form.value.judul_lampiran,
                                tanggal_lampiran: this.form.value.tanggal_lampiran,
                                tanggal_entri_lampiran: this.today,
                                file_lampiran: this.lampiran                                
                              });
    console.log(creds);
    this.adminService.editLampiran(this.data.url_edit_lampiran, this.data.token, creds)
    .subscribe(
      data =>{
        console.log(data);
        if(data.status){
          this.dtTrigger.next();
          this.data.showSuccess(data.message);
          this.ngOnInit();
        }
        else
          this.data.showError(data.message)
      }
    )   
  }

  clickRow(data){
    console.log('data click', data);
    this.idLampiran = data.id;
    this.form.controls.judul_lampiran.setValue(data.judul_lampiran,  { onlySelf: true });
    this.form.controls.tanggal_lampiran.setValue( new Date(data.tanggal_lampiran).toISOString().substring(0, 10) ,  { onlySelf: true });
    this.lampiran = data.file_lampiran;    
  }

  delete(id){
    this.deleteConfirm()
    .then(()=>{
      let creds = JSON.stringify({id_lampiran:id})
      this.adminService.deleteLampiran(this.data.url_delete_lampiran, this.data.token, creds )
      .subscribe(
        data =>{
          if(data.status){
            this.data.showSuccess(data.message);
            this.ngOnInit();
          }
          else
            this.data.showError(data.message);
        }
      )
    })
  }

  deleteConfirm(){
    return swal({
        title: 'Apakah anda yakin ?',
        text: "Data tidak dapat dikembalikan",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!'
      })  
  }  

  getAllLampiran(){
    this.adminService.getAllLampiran(this.data.url_get_all_lampiran, this.data.token)
    .subscribe(
      data=>{
        console.log(data)
        if(data.status){
          this.list_lampiran=data.data;
          this.dtTrigger.next(); 
        }
        else
          this.data.showError(data.message)
      }
    )
  }
  onChangeFile(fileinput:any){
    var sementara = fileinput.target.files
    console.log(sementara[0].name)
    var ext = sementara[0].type;
    var size = Number(sementara[0].size);
    if(ext !=='application/pdf' ){
        swal(
          'Perhatian',
          'file harus *.pdf',
          'warning'
        )
    }  
    else{
      console.log('masuk')
      this.filesToUpload = fileinput.target.files;
      this.upload.uploadFile(this.data.url_upload_file, this.data.token, this.filesToUpload[0])
      .then(data =>{
        console.log(data)
        if(JSON.parse(JSON.stringify(data)).status){
          this.fileValid = true;
          this.lampiran = JSON.parse(JSON.stringify(data)).data;
          console.log(this.lampiran)
        }
        else   
          this.data.showError(JSON.parse(JSON.stringify(data)).message);
      }).catch((err)=>{
        this.data.showError('error upload')
      })
    }
  }  
}

