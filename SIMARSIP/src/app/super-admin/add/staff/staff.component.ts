import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { DataService } from './../../../_services/data.service';
import { AdminService } from './../../../_services/admin.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public staffForm: FormGroup;
  public listJabatanStaff;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public staffData: Array<object>;

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
    let url = 'http://localhost:3000/api/dataform/get/staff/all';
    this.adminService.postAddSuperAdmin(url, null)
      .subscribe(data => {
        this.staffData = data.data;
        this.dtTrigger.next();
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
          this.getListJabatanStaff();
        }
        if (!data.status) {
          this.dataService.showError(data.message);
        }
      });
  }

}
