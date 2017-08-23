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
  public form_type=0;

  //upload file
  public max_size = Math.pow(10,6);
  public filesToUpload: Array<File>;
  public fileValid: boolean = false;
  public file_surat: object;

  // datatables
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();

  // css loader icon
  private loadComplete:boolean=true;
 
  // hidden field disposisi
  private hidden:boolean;

  private tipe_surat:string;
  private list_surat;
  private id_staff;
  //data form 
  private list_jenis_surat;
  private list_tujuan_jabatan;
  private list_tujuan_orang;  
  private list_tujuan_disposisi;
  private list_perihal;  
  private list_lampiran;
  private list_sifat_surat  = [ 
    {
      id: 1,
      text:'biasa'
    }, 
    { id: 2,
      text: 'rahasia'
    }
  ];

  public dataForPreview: Array<object> = [];
  public dataForEdit: Array<object> = [];
  public list_surat_update;
  public id_disposisi: number;
  private returnUrl: string;

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
      pageLength: 10,
      retrieve: true, 
      autoWidth: true,
      order: [2, 'desc']
    };
    this.initForm();   
    this.getSurat();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || 
    `/admin/surat${this.tipe_surat}/${this.tipe_surat}`;
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
      sifat_surat: ['', Validators.required],
      file_surat: ['', Validators.required],
      lampiran: [''],
    });
    this.getPerihal();
    this.getTujuanJabatan();
    this.getTujuanOrang();
    this.getLampiran();
  }    

  changeFormType(value){
    if (this.form_type!=value)
      this.form_type=value;
    console.log('status, ', this.form_type);
  }

  getSurat(){
    let creds = JSON.stringify({tipe_surat: this.tipe_surat});
    this.adminService.getAllSurat(this.data.url_surat_get, creds)
    .subscribe(data =>{
        if(data.status){
          console.log(data);
          this.list_surat = data.data;
          this.dtTrigger.next();
        }
        else{
          this.data.showError(data.message);
        } 
      });
  }

  // state for chexbox for disposisi: for surat masuk only
  stateDisposisi(){
    if (this.hidden==true) this.hidden=false;
    else this.hidden= true;
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

  clickRow(data){
    console.log('click row', data)
    //this.form.controls.lampiran.setValue(this.list_lampiran,  { onlySelf: true }); 
  }  

  // CRUD
  entrySurat(){
    if (this.tipe_surat === 'masuk') {
      var creds = JSON.stringify({
        nomor_surat: this.form.value.nomor_surat,
        perihal_surat: this.form.value.perihal.map((el) => {
          return el.id;
        }),
        tanggal_surat: this.form.value.tanggal_surat,
        tanggal_terima_surat: new Date(),
        tanggal_entri_surat: new Date().toISOString(),
        tipe_surat: this.tipe_surat,
        sifat_surat: this.form.value.sifat_surat.map((el) => {
          return el.text;
        }),
        status_surat: 'aktif',
        file_surat: this.form.value.file_surat,
        lampiran_surat: this.form.value.lampiran.map((el) => {
          return {
            id: el.id
          }
        }),
        pengirim_surat: [
          {
            nama: this.form.value.pengirim
          }
        ],
        penerima_surat: this.form.value.tujuan_orang.map((el) =>{
          return {
            id: el.id
          }
        })
      });
    }

    if (this.tipe_surat === 'keluar') {
      var creds = JSON.stringify({
        nomor_surat: this.form.value.nomor_surat,
        perihal_surat: this.form.value.perihal.map((el) => {
          return el.id;
        }),
        tanggal_surat: this.form.value.tanggal_surat,
        tanggal_terima_surat: new Date(),
        tanggal_entri_surat: new Date().toISOString(),
        tipe_surat: this.tipe_surat,
        sifat_surat: this.form.value.sifat_surat.map((el) => {
          return el.text;
        }),
        status_surat: 'aktif',
        file_surat: this.form.value.file_surat,
        lampiran_surat: this.form.value.lampiran.map((el) => {
          return {
            id: el.id
          }
        }),
        penerima_surat: [
          {
            nama: this.form.value.pengirim
          }
        ],
        pengirim_surat: this.form.value.tujuan_orang.map((el) => {
          return {
            id: el.id
          }
        })
      });
    }
    console.log(creds);
    this.adminService.entrySurat(this.data.url_surat_add, creds)
      .subscribe(data => {
        console.log(data);
      });
  }

  deleteSurat(id: number){
    this.deleteConfirm()
    .then(()=>{
      let creds = JSON.stringify({ id_surat: id })
      console.log(creds);
      this.adminService.deleteSurat(this.data.url_surat_delete, creds)
      .subscribe(
        data =>{
          if(data.status){
            this.data.showSuccess(data.message)
            console.log('kedelet coy');
          }
          else
            this.data.showError(data.message)
        }
      )      
    })
  }

  getUpdateSurat (id: number) {
    let url = this.data.url_surat_get_detail;
    let creds = JSON.stringify({
      id_surat : id
    });
    this.initForm();
    console.log(creds);
    this.adminService.getDataDetail(url, creds)
      .subscribe(data => {
        this.list_surat_update = data;
        // this.form.controls.nomor_surat.setValue(data.data.nomor_surat);
        // this.form.controls.tanggal_surat.setValue(data.data.tanggal_surat);
        // this.form.controls.perihal_surat.setValue([data.data.perihal]);
        // this.form.controls.pengirim_surat.setValue(data.pengirim_surat);
        // this.form.controls.lampiran_surat.setValue(data.lampiran_surat);
        console.log(this.list_surat_update);
      });
  }
  
  onChangeFile(fileinput:any){
    
    let fileList: FileList = fileinput.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      // this.file_surat = file;
      console.log(file);
      this.file_surat = file;
      this.form.controls.file_surat.setValue(file.name );
      if (file.type !== 'application/pdf') {
        swal(
          'Perhatian',
          'file harus *.jpeg/ *.pdf/ *.pdf',
          'warning'
        )
      }
      else if (Number(file.size) > this.max_size) {
        swal(
          'Perhatian',
          'ukuran file max 1 MB',
          'warning'
        ) 
      }
    }
  }
  // Data form 
  getTujuanJabatan(){
    this.adminService.getTujuanJabatan(this.data.url_jabatan_get, this.data.token)
    .subscribe(
      data =>{
        if(data.status){
          this.list_tujuan_jabatan = data.data;
          for(let x in this.list_tujuan_jabatan)
            this.list_tujuan_jabatan[x].text = this.list_tujuan_jabatan[x].nama_jabatan;
          console.log(this.list_tujuan_jabatan)
        }
        else 
          this.data.showError(data.message)
      }
    ) 
  }

  getTujuanOrang(){
    this.adminService.getTujuanOrang(this.data.url_penerima_get)
    .subscribe(
      data=>{
        if(data.status){
          this.id_staff = data.data.id;
          this.list_tujuan_orang = data.data;
          for(let i in this.list_tujuan_orang){
            this.list_tujuan_orang[i].text = this.list_tujuan_orang[i].nama_staff;
            this.list_tujuan_orang[i].id = this.list_tujuan_orang[i].id;
          }  
        }
        else 
          this.data.showError(data.mesage)
      }
    )
  }

  getPerihal(){
    this.adminService.getPerihal(this.data.url_perihal_get, this.data.token)
    .subscribe(
      data => {
        if(data.status){
          this.list_perihal = data.data;
          for(let x in this.list_perihal)
            this.list_perihal[x].text = this.list_perihal[x].nama_perihal;
          console.log(this.list_perihal);              
        }
        else 
          this.data.showError(data.message);
      }
    )

  }

  getLampiran(){
    this.adminService.getAllLampiran(this.data.url_get_all_lampiran, this.data.token)
    .subscribe(
      data =>{
        if(data.status){
          this.list_lampiran = data.data;
          for(let x in this.list_lampiran)
            this.list_lampiran[x].text = this.list_lampiran[x].judul_lampiran;
          console.log('lampiran', this.list_lampiran);              
        }
        else 
          this.data.showError(data.message);        
      }
    )
  }

  getPreviewData(id: number) {
    this.dataForPreview.shift();
    let dataPreview = this.list_surat.map(element => {
      if (element.id === id) {
        this.dataForPreview.push(element);
        console.log('Ini hasil data preview', this.dataForPreview);
        return this.dataForPreview;
      }
    });
    return null;
  }

  onDisposisi() {
      let url = this.data.url_surat_disposisi;
      let id_staff = this.form.value.tujuan_orang.map((el) => {
        return {
          id: el.id
        }
      });

      let creds = {
        id_surat: this.id_disposisi,
        penerima_surat: id_staff
      }
      let data = JSON.stringify(creds);
      console.log(data);
      this.adminService.postDisposisi(url, data)
        .subscribe(data => {
          console.log('Berhasil disposisi, ini datanaya: ', data);
        });
  }

  getDisposisiId(id: number) {
    this.id_disposisi = id;
  }






   
}
