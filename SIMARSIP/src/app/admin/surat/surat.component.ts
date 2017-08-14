import { ToastrService } from 'toastr-ng2';
import { Component, OnInit, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject, Subscription } from 'rxjs/Rx'; // dipake buat datatables
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Router, ActivatedRoute, Params } from '@angular/router';

// service 
import { UploadService } from './../../_services/upload.service';
import { DataService } from './../../_services/data.service';
import { AdminService } from './../../_services/admin.service';


@Component({
  selector: 'app-surat',
  templateUrl: './surat.component.html',
  styleUrls: ['./surat.component.scss'],
})
export class SuratComponent implements OnInit {

  public form: FormGroup;

  //upload file
  public max_size = Math.pow(10,6);
  public filesToUpload: Array<File>;
  public fileValid: boolean = false;
  public file_surat:string;

  // datatables
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();

  // css loader icon
  private loadComplete:boolean=true;
 
  // hidden field disposisi
  private hidden:boolean;

  private tipe_surat:string;
  private list_surat;

  //data form 
  private list_jenis_surat;
  private list_tujuan_jabatan;
  private list_tujuan_disposisi;
  private list_lampiran;

  public items:Array<string> = ['Amsterdam@gmail.com', 'Antwerp@gmail.com', 'Athens@gmail.com', 'Barcelona@gmail.com',
    'Berlin@gmail.com', 'Birmingham@gmail.com', 'Bradford@gmail.com', 'Bremen@gmail.com', 'Brussels@gmail.com', 'Bucharest@gmail.com',
    'Budapest@gmail.com', 'Cologne@gmail.com', 'Copenhagen@gmail.com', 'Dortmund@gmail.com', 'Dresden@gmail.com', 'Dublin@gmail.com', 'Düsseldorf@gmail.com',
    'Essen@gmail.com', 'Frankfurt@gmail.com', 'Genoa@gmail.com', 'Glasgow@gmail.com', 'Gothenburg@gmail.com', 'Hamburg', 'Hannover',
    'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
    'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
    'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
    'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
    'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza'];

  private coba = [ {text:"blabla1", id:1}, {text:"blabla2", id:2}, {text:"blabla3", id:3} ]

  constructor(private http: Http, 
              private zone: NgZone, 
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,              
              private adminService:AdminService,
              private data: DataService,
              private upload: UploadService) { 

    this.hidden = true;
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.tipe_surat = params['tipe_surat'];
      console.log(this.tipe_surat)
    })    
  }

  ngOnInit() {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 2,
        retrieve: true,
        scrollX:true
      };
      this.initForm();   
      this.getSurat();
  }

  initForm(){
    this.form = this.fb.group({
      nomor_surat: ['', Validators.required],           
      tanggal_surat: ['', Validators.required],
      tanggal_entri: ['', Validators.required],
      perihal: ['', Validators.required],
      pengirim: ['', Validators.required],
      jenis_surat: ['', Validators.required],
      tujuan_jabatan: ['', Validators.required],
      tujuan_orang: ['', Validators.required],
      tujuan_disposisi: ['', Validators.required],
      lampiran: ['', Validators.required]      

    });
  }    

  getSurat(){
    let creds = JSON.stringify({tipe_surat: this.tipe_surat});

    this.adminService.getAllSurat(this.data.url_surat_get, this.data.token, creds)
    .subscribe(
      data =>{
        console.log(data)
        if(data.status){
          this.list_surat = data.data;
          this.dtTrigger.next();
        }
        else 
          this.data.showError(data.message);
      }
    )
    
  }

  // state for chexbox for disposisi: for surat masuk only
  stateDisposisi(){
    if (this.hidden==true) this.hidden=false;
    else this.hidden= true;
    this.form.controls.tujuan_disposisi.setValue('',  { onlySelf: true })
  }
  
  deleteConfirm(){
    return swal({
        title: 'Apakah anda yakin?',
        text: "anda tidak dapat mengembalikan data!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!'
      }
    )  
  }

  clickRow(){
    console.log('click row')
    this.form.controls.jenis_surat.setValue([this.coba[1]],  { onlySelf: true });    
    this.form.controls.tujuan_jabatan.setValue(this.coba,  { onlySelf: true });    
  }  

  // CRUD
  
  entrySurat(){
    console.log(this.form);
    let creds = JSON.stringify({nomor_surat: this.form.value.nomor_surat,
                                perihal_surat: this.form.value.perihal,
                                pengirim_surat: this.form.value.pengirim,
                                tanggal_surat: this.form.value.tanggal_surat,
                                tanggal_terima_surat: this.form.value.tanggal_terima_surat,
                                tanggal_entri_surat: new Date().toISOString(),
                                sub_sub_jenis_surat: 'satu',
                                tipe_surat: 'masuk',
                                status_surat:'aktif',
                                file_surat: this.file_surat,
                                lampiran_surat: this.form.value.lampiran
                                })
    console.log(creds)
    // this.adminService.entrySurat(this.data.url_surat_add, this.data.token, creds)
    // .subscribe(
    //   data =>{
    //     if(data.status){
    //       this.data.showSuccess(data.message)
    //       this.form.reset();
    //     }
    //     else 
    //       this.data.showError(data.message)
    //   }
    // )
  }

  deleteSurat(id){
    this.deleteConfirm()
    .then(()=>{
      let creds = JSON.stringify({id_suat: id })

      this.adminService.deleteSurat(this.data.url_surat_delete, this.data.token, creds)
      .subscribe(
        data =>{
          if(data.status){
            this.data.showSuccess(data.message)
          }
          else
            this.data.showError(data.message)
        }
      )      
    })
  }

  updateSurat(){
    let creds = JSON.stringify({nomor_surat: this.form.value.nomor_surat,
                                perihal_surat: this.form.value.perihal,
                                pengirim_surat: this.form.value.pengirim,
                                tanggal_surat: this.form.value.tanggal_surat,
                                tanggal_terima_surat: this.form.value.tanggal_terima_surat,
                                tanggal_entri_surat: new Date().toISOString(),
                                sub_sub_jenis_surat: 'satu',
                                tipe_surat: 'masuk',
                                status_surat:'aktif',
                                file_surat: this.file_surat,
                                lampiran_surat: this.form.value.lampiran
                                })

    this.adminService.editSurat(this.data.url_surat_edit, this.data.token, creds)
    .subscribe(
      data =>{
        if(data.status){
          this.data.showSuccess(data.message);
          this.form.reset();
        }
        else
          this.data.showError(data.message);
      }
    )

  }

  onChangeFile(fileinput:any){
    var sementara = <Array<File>> fileinput.target.files
    var ext = sementara[0].type;
    this.filesToUpload = <Array<File>> fileinput.target.files;
    var size = Number(sementara[0].size);
    console.log(this.filesToUpload)
    if(ext !=='application/pdf' ){
        swal(
          'Perhatian',
          'file harus *.jpeg/ *.pdf/ *.pdf',
          'warning'
        )
    }
    else if(size > this.max_size)
        swal(
          'Perhatian',
          'ukuran file max 1 MB',
          'warning'
        )      
    // else{
    //   this.filesToUpload = <Array<File>> fileinput.target.files;
    //   this.upload.uploadFile(this.data.url_upload_file, this.data.token, this.filesToUpload).
    //   then(data =>{
    //     console.log(data)
    //     if(JSON.parse(JSON.stringify(data)).status){
    //       this.fileValid = true;
    //       this.lampiran = JSON.parse(JSON.stringify(data)).data;
    //       console.log(this.lampiran)
    //     }
    //     else   
    //       this.data.showError('error upload');
    //   }).catch((err)=>{
    //     this.data.showError('error upload')
    //   })
    // }
  }
                              
  

}
