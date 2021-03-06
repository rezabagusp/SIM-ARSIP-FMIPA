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

  private checkbox: boolean= true;

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
  private loadingSubmit:boolean=true;
 
  // hidden field disposisi
  private hidden:boolean;

  private tipe_surat:string;
  private list_surat=[];
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
      text:'Umum'
    }, 
    { id: 2,
      text: 'Rahasia'
    }
  ];
  private list_status_surat =  [
    {
      id: 1,
      text: 'Aktif'
    },
    {
      id:2,
      text: 'Inaktif'
    }
  ]
  private list_asal_surat = [
    {
      id:1,
      text: 'Internal'
    },
    {
      id:2,
      text:'Eksternal'
    }
  ]
  private list_kepentingan_surat = [
    {
      id:1,
      text:'Segera'
    },
    {
      id:2,
      text:'Biasa'
    }
  ]

  private today = new Date().toISOString().substring(0, 10)
  public dataForPreview: Array<object> = [];
  public dataForEdit: Array<object> = [];
  public list_surat_update;
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
      autoWidth: true
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
      judul_surat: [''],           
      perihal: ['', Validators.required],      
      tanggal_surat: ['', Validators.required],
      tanggal_terima_surat: [''], 
      tanggal_entri: [''],
      tanggal_selesai:[''],
      kepentingan_surat: [[this.list_kepentingan_surat[1]], Validators.required],
      sifat_surat: [[this.list_sifat_surat[0]]], //biasa atau rahasia
      status_surat: [[this.list_status_surat[0]], Validators.required],
      file_surat: ['', Validators.required],
      keterangan_surat: ['' ],
      posisi_surat: [''],
      asal_surat:[[this.list_asal_surat[0]], Validators.required], // internal aatau eksternal
      kirim_surat:[''],
      lampiran: [[],],
      pengirim: [''],
      
      //penerima
      penerima: [[] ],
      tujuan_jabatan: [[]],
      tujuan_orang: [[]],
      tujuan_surat_keluar: [[]]
      //end of penerima

    });
    this.checkbox = true;
  }
  resetForm(){
    this.form.controls.tanggal_surat.setValue(new Date().toISOString().substring(0, 10), { onlySelf: true });
    this.form.controls.tanggal_terima_surat.setValue(new Date().toISOString().substring(0, 10), { onlySelf: true });  
  }

  getSurat(){
    let creds = JSON.stringify({tipe_surat: this.tipe_surat});
    console.log('tipenya', creds)
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
          this.data.showError(data.message)
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
          console.log(this.list_perihal);              
        }
        else 
          this.data.showError(data.message);
      }
    )

  }

  getLampiran(){
    this.adminService.getAllLampiran(this.data.url_get_surat_null_lampiran, this.data.token)
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
  // *end of Data form   
  
  // Edit
  clickRow(data){
    console.log('clickrow', data);
    this.form.controls.id_surat.setValue(data.id, { onlySelf: true });    
    this.form.controls.nomor_surat.setValue(data.nomor_surat, { onlySelf: true });
    this.form.controls.judul_surat.setValue(data.judul_surat, { onlySelf: true });    
    this.form.controls.tanggal_surat.setValue(new Date(data.tanggal_surat).toISOString().substring(0, 10), { onlySelf: true });
    this.form.controls.tanggal_terima_surat.setValue(new Date(data.tanggal_terima_surat).toISOString().substring(0, 10), { onlySelf: true });    
    this.form.controls.tanggal_entri.setValue(data.tanggal_entri_surat, { onlySelf: true });   
    this.form.controls.perihal.setValue(this.getSelectedPerihal(data.perihal_id), { onlySelf: true });
    this.form.controls.sifat_surat.setValue(this.getSelectedValue(this.list_sifat_surat, data.sifat_surat), { onlySelf: true });
    this.form.controls.status_surat.setValue(this.getSelectedValue(this.list_status_surat, data.status_surat), { onlySelf: true });
    this.form.controls.posisi_surat.setValue(data.posisi_surat, { onlySelf: true });
    this.form.controls.asal_surat.setValue(this.getSelectedValue(this.list_asal_surat, data.asal_surat), { onlySelf: true });
    this.form.controls.kepentingan_surat.setValue(this.getSelectedValue(this.list_kepentingan_surat, data.kepentingan_surat), { onlySelf: true });
    this.form.controls.lampiran.setValue(this.getSelectedLampiran(data.lampirans));    
    this.form.controls.file_surat.setValue(data.file_surat, { onlySelf: true });
    this.form.controls.pengirim.setValue(" ");
    //this.form.controls.penerima.setValue(data.surat_masuk_penerimas.map(el=>{ return el['staff']}))
    console.log('lampiran', data.lampirans)
    console.log('selected', this.getSelectedLampiran(data.lampirans))
  }  
  getSelectedPerihal(id){
    let obj = this.list_perihal.filter(el=>{
      return el.id === id
    })
    obj[0].text = obj[0].nama_perihal;
    console.log('selected val', obj)
    
    return obj;
  }
  getSelectedLampiran(lampirans){
    lampirans.forEach(element => {
      element.text = element.judul_lampiran
    });

    return lampirans
  }
    // for field input sifat, status, asal, kepentingan 
  getSelectedValue(list, value){
    let obj = list.filter(el=>{
      return el.text === value
    })
    console.log('selected status surat val', obj)
    return obj;     
  }  
  // * end of Edit

  // CRUD
  entrySurat(){
    this.setPenerima();
    this.loadingSubmit = false;
    if (this.tipe_surat === 'Masuk') {
      var creds = JSON.stringify({
        nomor_surat: this.form.value.nomor_surat,
        judul_surat: this.form.value.judul_surat,        
        perihal_surat: this.form.value.perihal[0].id,
        tanggal_surat: this.form.value.tanggal_surat,
        tanggal_terima_surat: this.form.value.tanggal_terima_surat,
        tanggal_entri_surat: new Date(),
        kepentingan_surat: this.form.value.kepentingan_surat[0].text,
        tipe_surat: this.tipe_surat,
        sifat_surat: this.form.value.sifat_surat[0].text,
        status_surat: 'Aktif',
        file_surat: this.form.value.file_surat,
        keterangan_surat: this.form.value.keterangan_surat,
        asal_surat: this.form.value.asal_surat.text,
        kirim_surat: this.checkbox,
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

    if (this.tipe_surat === 'Keluar') {
      var creds = JSON.stringify({
        nomor_surat: this.form.value.nomor_surat,
        judul_surat: this.form.value.judul_surat,        
        perihal_surat: this.form.value.perihal[0].id,
        tanggal_surat: this.form.value.tanggal_surat,
        tanggal_terima_surat: this.form.value.tanggal_terima_surat,
        tanggal_entri_surat: new Date(),
        kepentingan_surat: this.form.value.kepentingan_surat[0].text,
        tipe_surat: this.tipe_surat,
        sifat_surat: this.form.value.sifat_surat[0].text,
        status_surat: 'Aktif',
        file_surat: this.form.value.file_surat,
        keterangan_surat: this.form.value.keterangan_surat,
        asal_surat: this.list_asal_surat[0].text,
        kirim_surat: this.checkbox,
        lampiran_surat: this.form.value.lampiran.map((el) => {
          return {
            id: el.id
          }
        }),
        pengirim_surat: this.form.value.penerima,
        penerima_surat: this.form.value.tujuan_surat_keluar
      });
    }
    console.log(creds);
    this.adminService.entrySurat(this.data.url_surat_add, creds)
      .subscribe(data => {
        console.log(data)
        if (data.status) {
          this.ngOnInit();
          this.entrySuratModal.hide();
          this.data.showSuccess(data.message);
          this.loadingSubmit=true;
        } else {
          this.form.controls.penerima.setValue([]);// set penerima back to []
          this.data.showError(data.message);
          this.loadingSubmit=true;
        }
      });
  }
  editSurat(){
      let creds = JSON.stringify({
        id_surat: this.form.value.id_surat,
        nomor_surat: this.form.value.nomor_surat,
        judul_surat: this.form.value.judul_surat,
        perihal_surat: this.form.value.perihal[0].id,
        tanggal_surat: this.form.value.tanggal_surat,
        tanggal_terima_surat: this.form.value.tanggal_terima_surat,
        tanggal_entri_surat: this.form.value.tanggal_entri,
        tanggal_selesai_surat: this.form.value.tanggal_selesai,
        kepentingan_surat: this.form.value.kepentingan_surat[0].text,
        asal_surat: this.form.value.asal_surat[0].text,        
        tipe_surat: this.tipe_surat,
        sifat_surat: this.form.value.sifat_surat[0].text,
        status_surat: this.form.value.status_surat[0].text,
        file_surat: this.form.value.file_surat,
        keterangan_surat: this.form.value.keterangan_surat,
        posisi_surat: this.form.value.posisi_surat,
        lampiran_surat: this.form.value.lampiran.map((el) => {
          return {
            id: el.id
          }
        })
      });

      console.log('edit', creds)
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
      let creds = JSON.stringify({ id_surat: id })
      console.log(creds);
      this.adminService.deleteSurat(this.data.url_surat_delete, creds)
      .subscribe(
        data =>{
          console.log(data)
          if(data.status){
            this.data.showSuccess(data.message);
            this.ngOnInit();
          }
          else
            this.data.showError(data.message)
        }
      )      
    })
  }
  // * end of CRUD

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
      this.setPenerima();
      let creds = JSON.stringify({
        id_surat: this.form.value.id_surat,
        penerima_surat: this.form.value.penerima,
        keterangan_surat: this.form.value.keterangan_surat,
        kirim_surat: this.checkbox
      });
      console.log('creds disposisi', creds)
      this.loadingSubmit = false;      
      this.adminService.postAdmin(this.data.url_surat_disposisi, this.data.token, creds)
        .subscribe(data => {
            console.log('response disposisi ', data);
          if(data.status){
            this.loadingSubmit = true;            
            this.data.showSuccess(data.message)
            this.disposisiModal.hide();
            this.ngOnInit();
          }
          else {
            this.loadingSubmit = true;
            this.form.controls.penerima.setValue([]);// set penerima back to []]
            this.data.showError('Disposisi surat berhasil')
          }
        });
  }

  getDisposisiId(id: number) {
    this.form.controls.id_surat.setValue(id);
    console.log('id_suratnya', this.form.value.id_surat)
  }    

  clickCheckbox(){
    if(this.checkbox){
      this.checkbox = false
    }
    else
      this.checkbox = true;

    this.form.controls.keterangan_surat.setValue('');
  }

  cek(){
    console.log(this.form)
    let coba = []
    console.log('hasil olahanh', this.form.value.tujuan_surat_keluar)


  }

  // File upload
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


  changeFormType(value){
    if (this.form_type!=value)
      this.form_type=value;
    console.log('status, ', this.form_type);
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
  // method for append tujuan_orang & tujuan_jabatan as penerima
  setPenerima(){
    if(this.tipe_surat=='Keluar'){
      this.form.value.tujuan_surat_keluar.forEach((obj) => { obj.nama = obj.display });
    }
    this.form.value.penerima.push.apply(this.form.value.penerima, this.form.value.tujuan_jabatan)
    this.form.value.penerima.push.apply(this.form.value.penerima, this.form.value.tujuan_orang)      
    
    console.log('penerima',this.form.value.penerima)
  }

}
