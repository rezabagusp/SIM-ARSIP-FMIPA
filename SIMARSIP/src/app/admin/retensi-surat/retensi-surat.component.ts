import { ToastrService } from 'toastr-ng2';
import { Component, OnInit, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx'; // dipake buat datatables
import { DatePickerOptions, DateModel } from 'ng2-datepicker'; // dipake buat datepicker 

import { AdminService } from './../../_services/admin.service';
import { DataService } from './../../_services/data.service';
import { UploadService } from './../../_services/upload.service';

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { LOCALE_ID } from '@angular/core';


@Component({
  selector: 'app-retensi-surat',
  templateUrl: './retensi-surat.component.html',
  styleUrls: ['./../surat/surat.component.scss']
})
export class RetensiSuratComponent implements OnInit {

  // hidden field disposisi
  private hidden:boolean;
  // datatables
  list_surat;
  list_hal_surat;

  dataForPreview;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  message=''; 
  // date picker
  dateSurat: DateModel;
  dateEntri: DateModel;
  options: DatePickerOptions;

  constructor(private data:DataService, private adminService:AdminService) { 
  }

  ngOnInit() {
    this.getAllRetensiSurat();
    this.dataTables();
  }  

  dataTables(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true,
    }  
  } 

  getAllRetensiSurat(){
    let creds = null;
    this.adminService.postAdmin(this.data.url_retensi_get_all, this.data.token, creds)
    .subscribe(
      data =>{
        console.log(data)
        if(data.status){
          this.list_surat = data.surat;
          this.list_hal_surat = data.hal_surat;
          //console.log(this.list_hal_surat)
          for (let x in this.list_surat){
            this.list_surat[x].hal_surat = this.list_hal_surat[x]
          }
          console.log(this.list_surat)

          this.dtTrigger.next();
        }
        else {
          this.data.showError(data.message)
        }
      })
  }

  cek(){
  
  }

  preview(data){
    this.dataForPreview = data;
    console.log('data preview', this.dataForPreview)
  }
  
  deleteConfirm(){
    return swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })  
    }  

}
