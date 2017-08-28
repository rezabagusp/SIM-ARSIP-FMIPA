import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { DataService } from './../../../_services/data.service';
import { AdminService } from './../../../_services/admin.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  @ViewChild('staffModal') staffModal: ModalDirective;
  @ViewChild('staffModalEdit') staffModalEdit: ModalDirective;

  public staffForm: FormGroup;
  public listJabatanStaff;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public staffData;
  public idStaff;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.staffForm = this.fb.group({
      namaStaff: ['', Validators.required],
      jabatanStaff: ['', Validators.required],
      emailStaff: ['', Validators.required]
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true,
      lengthChange: false,
      autoWidth: true
    };
    this.getStaffData();
    this.getListJabatanStaff();
  }

  public getStaffData() {
    let url = 'http://localhost:3000/api/dataform/get/staff/jabatan/all';
    this.adminService.postAddSuperAdmin(url, null)
      .subscribe(data => {
        if (data.status) {
          this.staffData = data.data;
          this.dtTrigger.next();
        }
        if (!data.status) {
          this.dataService.showError(data.message);
        }
      });
  }

  public getListJabatanStaff() {
    let url = this.dataService.url_jabatan_get;
    let token = this.dataService.token;
    this.adminService.getTujuanJabatan(url, token)
      .subscribe(data => {
        if (data.status) {
          this.listJabatanStaff = data.data;
          for (let jabatan of this.listJabatanStaff) {
            jabatan.text = jabatan.nama_jabatan;
          }
        }
        if (!data.status) {
          this.dataService.showError(data.message);
        }
      });
  }

  public onSubmit() {
    let url = this.dataService.url_staff_add;
    let data = {
      nama_staff: this.staffForm.value.namaStaff,
      jabatan_id: this.staffForm.value.jabatanStaff[0].id,
      email_staff: this.staffForm.value.emailStaff
    }
    let body = JSON.stringify(data);
    this.adminService.postAddSuperAdmin(url, body)
      .subscribe(data => {
        if (data.status) {
          this.dataService.showSuccess(data.message);
          this.staffModal.hide();
          this.getStaffData();
        }
        if (!data.status) {
          this.dataService.showError(data.message);
        }
      });
  }

  public updateStaff(){
    let creds = JSON.stringify({
      id_staff:this.idStaff,
      nama_staff: this.staffForm.value.namaStaff,
      jabatan_id: this.staffForm.value.jabatanStaff[0].id,
      email_staff: this.staffForm.value.emailStaff
    });
    this.adminService.postSuperAdmin(this.dataService.url_staff_edit, this.dataService.token, creds)
    .subscribe(
      data =>{
        if(data.status){
          this.dataService.showSuccess(data.message)
          this.getStaffData();
          this.staffModalEdit.hide();
        }
        else
          this.dataService.showError(data.message)
      }
    )
  }

  public getSelectedJabatan(id){
    console.log('id get selected ', id)
    for(let jabatan of this.listJabatanStaff){
      if(jabatan.id === id) {
        console.log('match');
        return jabatan;
      }
    }
  }

  public deleteStaff(id){
    let creds = JSON.stringify({
      id_staff: id 
    });
    this.deleteConfirm()
    .then((hasil)=>{
      this.adminService.postSuperAdmin(this.dataService.url_staff_delete, this.dataService.token, creds)
        .subscribe(data => {
          if (data.status) {
            this.dataService.showSuccess(data.message);
            this.getStaffData();
          }
          else {
            this.dataService.showError(data.message);
          }
        })      
    })
  }

  public deleteConfirm() {
    return swal({
      title: 'Apakah anda yakin?',
      text: "Anda tidak dapat mengembalikkan data!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!'
    })
  }
  
  public clickRow(data) {
    this.staffForm.controls.namaStaff.setValue(data.nama_staff, { onlySelf: true });
    this.staffForm.controls.jabatanStaff.setValue([this.getSelectedJabatan(data.jabatan.id)], { onlySelf: true });
    this.staffForm.controls.emailStaff.setValue(data.email_staff, { onlySelf: true });
    this.idStaff = data.id
    this.staffModalEdit.show();
  }
}
