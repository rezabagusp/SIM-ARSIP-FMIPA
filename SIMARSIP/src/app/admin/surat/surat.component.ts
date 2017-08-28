import { ToastrService } from 'toastr-ng2';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject, Subscription } from 'rxjs/Rx'; // dipake buat datatables
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';
// service 
import { UploadService } from './../../_services/upload.service';
import { DataService } from './../../_services/data.service';
import { AdminService } from './../../_services/admin.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-surat',
  templateUrl: './surat.component.html',
  styleUrls: ['./surat.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: "id" }], //replace "en-US" with your locale]
})
export class SuratComponent implements OnInit {
  @ViewChild('entrySuratModal') entrySuratModal: ModalDirective;
  @ViewChild('editSuratModal') editSuratModal: ModalDirective;  
  @ViewChild('disposisiModal') disposisiModal: ModalDirective;  

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
      text:'umum'
    }, 
    { id: 2,
      text: 'rahasia'
    }
  ];
  private list_status_surat =  [
    {
      id: 1,
      text: 'aktif'
    },
    {
      id:2,
      text: 'inaktif'
    }
  ]
  private list_asal_surat = [
    {
      id:1,
      text: 'internal'
    },
    {
      id:2,
      text:'eksternal'
    }
  ]
  private list_kepentingan_surat = [
    {
      id:1,
      text:'segera'
    },
    {
      id:2,
      text:'biasa'
    }
  ]

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
    })    

    //get data form
    this.getPerihal();
    this.getTujuanJabatan();
    this.getTujuanOrang();
    this.getLampiran();    
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
      id_surat : [''],
      nomor_surat: ['', Validators.required],           
      perihal: ['', Validators.required],      
      tanggal_surat: ['', Validators.required],
      tanggal_terima_surat: ['', Validators.required], 
      tanggal_entri: [''],
      kepentingan_surat: ['', Validators.required],
      sifat_surat: ['', Validators.required], //biasa atau rahasia
      status_surat: ['', Validators.required],
      file_surat: ['', Validators.required],
      keterangan_surat: ['' ],
      posisi_surat: ['', Validators.required],
      asal_surat:['', Validators.required], // internal aatau eksternal
      lampiran: [[],],    
      pengirim: ['', Validators.required],        
      //penerima
      penerima: [[] ],      
      tujuan_jabatan: [[]],
      tujuan_orang: [[]],
      //end of penerima      

    });
  }    

  changeFormType(value){
    if (this.form_type!=value)
      this.form_type=value;
  }

  getSurat(){
    let creds = JSON.stringify({tipe_surat: this.tipe_surat});
    this.adminService.getAllSurat(this.data.url_surat_get, creds)
    .subscribe(data =>{
      console.log(data)
        if(data.status){
          this.list_surat = data.data;
          this.dtTrigger.next();
        }
        else{
          this.data.showError(data.message);
        }
        console.log(this.list_surat); 
      });
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
    this.form.controls.nomor_surat.setValue(data.nomor_surat, { onlySelf: true });
    this.form.controls.tanggal_surat.setValue(new Date(data.tanggal_surat).toISOString().substring(0, 10));
    // this.form.controls.perihal_surat.setValue([data.perihal.nama_perihal]);
    if (this.tipe_surat === 'masuk' ) {
      this.form.controls['pengirim'].setValue(data.surat_masuk_pengirim.nama_pengirim);
    }
  }  

  // CRUD
  entrySurat(){
    this.setPenerima();
    if (this.tipe_surat === 'masuk') {
      var creds = JSON.stringify({
        nomor_surat: this.form.value.nomor_surat,
        perihal_surat: this.form.value.perihal[0].id,
        tanggal_surat: this.form.value.tanggal_surat,
        tanggal_terima_surat: this.form.value.tanggal_terima_surat,
        tanggal_entri_surat: new Date(),
        kepentingan_surat: this.form.value.kepentingan_surat[0].text,
        tipe_surat: this.tipe_surat,
        sifat_surat: this.form.value.sifat_surat[0].text,
        status_surat: 'aktif',
        file_surat: this.form.value.file_surat,
        keterangan_surat: this.form.value.keterangan_surat,
        posisi_surat: this.form.value.posisi_surat,
        asal_surat: this.form.value.asal_surat.text,
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
        penerima_surat: this.form.value.penerima

      });
    }

    if (this.tipe_surat === 'keluar') {
      var creds = JSON.stringify({
        nomor_surat: this.form.value.nomor_surat,
        perihal_surat: this.form.value.perihal[0].id,
        tanggal_surat: this.form.value.tanggal_surat,
        tanggal_terima_surat: new Date(),
        tanggal_entri_surat: new Date().toISOString(),
        tipe_surat: this.tipe_surat,
        sifat_surat: this.form.value.sifat_surat[0].text,
        status_surat: 'aktif',
        file_surat: this.form.value.file_surat,
        lampiran_surat: this.form.value.lampiran.map((el) => {
          return {
            id: el.id
          }
        }),
        penerima_surat: [
          {
          }
        ],
        pengirim_surat: this.form.value.tujuan_orang.map((el) => {
          return {
            id: el.id
          }
        })
      });
    }
    this.adminService.entrySurat(this.data.url_surat_add, creds)
      .subscribe(data => {
        if (data.status) {
          this.data.showSuccess(data.message);
          this.ngOnInit();
          this.entrySuratModal.hide();
        } else {
          this.form.controls.penerima.setValue([], { onlySelf: true });// set penerima back to null
          this.data.showError(data.message);
        }
      });
  }
  editSurat(){
      let creds = JSON.stringify({
        id_surat: this.form.value.id_surat,
        nomor_surat: this.form.value.nomor_surat,
        perihal_surat: this.form.value.perihal[0].id,
        tanggal_surat: this.form.value.tanggal_surat,
        tanggal_terima_surat: this.form.value.tanggal_terima_surat,
        tanggal_entri_surat: this.form.value.tanggal_entri,
        kepentingan_surat: this.form.value.kepentingan_surat[0].text,
        tipe_surat: this.tipe_surat,
        sifat_surat: this.form.value.sifat_surat[0].text,
        status_surat: 'aktif',
        file_surat: this.form.value.file_surat,
        keterangan_surat: this.form.value.keterangan_surat,
        posisi_surat: this.form.value.posisi_surat,
        asal_surat: this.form.value.asal_surat.text,
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
        penerima_surat: this.form.value.penerima

      });

      console.log('edit',creds)
      this.adminService.postAdmin(this.data.url_surat_edit, this.data.token, creds)
      .subscribe(
        data =>{
          if(data.status){
            this.data.showSuccess(data.message)
            this.ngOnInit();
            this.editSuratModal.hide();
          }
          else
            this.data.showError(data.message)
        }
      )
  }
  deleteSurat(id: number){
    this.deleteConfirm()
    .then(()=>{
      let creds = JSON.stringify({ id_surat: id });
      this.adminService.deleteSurat(this.data.url_surat_delete, creds)
      .subscribe(
        data =>{
          console.log(data)
          if(data.status){
            this.data.showSuccess(data.message);
          }
          else
            this.data.showError(data.message);
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
    this.form_type = 1;
    this.adminService.getDataDetail(url, creds)
      .subscribe(data => {
        this.list_surat_update = data;
      });
  }
  
  // Data form 
  getTujuanJabatan(){
    this.adminService.getTujuanJabatan(this.data.url_jabatan_get, this.data.token)
    .subscribe(
      data =>{
        console.log('tujuan_jabatan',data)
        if(data.status){
          this.list_tujuan_jabatan = data.data;
          for(let x in this.list_tujuan_jabatan)
            this.list_tujuan_jabatan[x].text = this.list_tujuan_jabatan[x].nama_jabatan;
        }
        else 
          this.data.showError(data.message);
      }
    ) 
  }

  getTujuanOrang(){
    this.adminService.getTujuanOrang(this.data.url_penerima_get)
    .subscribe(
      data=>{
        console.log('tujuan orang',data)
        if(data.status){
          this.list_tujuan_orang = data.data;
          for(let i in this.list_tujuan_orang){
            this.list_tujuan_orang[i].text = this.list_tujuan_orang[i].nama_staff;
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
        }
        else 
          this.data.showError(data.message);        
      }
    )
  }
  // *end of Data form 

  getPreviewData(id: number) {
    this.dataForPreview.shift();
    let dataPreview = this.list_surat.map(element => {
      if (element.id === id) {
        this.dataForPreview.push(element);
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
      this.adminService.postDisposisi(url, data)
        .subscribe(data => {
          console.log('Berhasil disposisi, ini datanaya: ', data);
        });
  }
  getDisposisiId(id: number) {
    this.id_disposisi = id;
  }   
  


  cek(){
    console.log(this.form)
    var coba = []
    coba.push.apply(coba, this.form.value.tujuan_jabatan)
    coba.push.apply(coba, this.form.value.tujuan_orang)    
    console.log('ceka', this.list_surat[0].surat_masuk_pengirim.nama_pengirim)
    console.log('gabungan', coba)
    var cek = this.dataForPreview.map(el=>{
      return el['surat_masuk_penerimas'].filter(el =>{
        return el.status_disposisi_penerima != 0
      })
    })
    console.log('hasil mapping', cek)

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
      this.upload.uploadFile(this.data.url_surat_upload, this.data.token, this.filesToUpload[0])
      .then(data =>{
        console.log(data)
        if(JSON.parse(JSON.stringify(data)).status){
          this.fileValid = true;
          let nama_surat = JSON.parse(JSON.stringify(data)).data
          this.form.controls.file_surat.setValue(nama_surat)
          console.log('nama suratnya', this.form.value.file_surat)
        }
        else   
          this.data.showError(JSON.parse(JSON.stringify(data)).message);
      }).catch((err)=>{
          this.data.showError('error upload')
      })
    }
  }    
  // method for append tujuan_orang & tujuan_jabatan as penerima
  setPenerima(){
    this.form.value.penerima.push.apply(this.form.value.penerima, this.form.value.tujuan_jabatan)
    this.form.value.penerima.push.apply(this.form.value.penerima, this.form.value.tujuan_orang)
    console.log('penerima',this.form.value.penerima)
  }
}
