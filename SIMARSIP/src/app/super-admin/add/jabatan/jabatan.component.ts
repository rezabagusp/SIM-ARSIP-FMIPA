import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { DataService } from './../../../_services/data.service';
import { AdminService } from './../../../_services/admin.service';

@Component({
  selector: 'app-jabatan',
  templateUrl: './jabatan.component.html',
  styleUrls: ['./jabatan.component.css']
})
export class JabatanComponent implements OnInit {
  public jabatanForm:FormGroup;
  // datatables
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public jabatanData;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.jabatanForm = this.fb.group({
      namaJabatan: ['', Validators.required]
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true,
      lengthChange: false,
      autoWidth: true
    };
    this.getJabatanData();
  }

  getJabatanData() {
    let url = this.dataService.url_jabatan_get;
    let token = this.dataService.token;
    this.adminService.getTujuanJabatan(url, token)
      .subscribe(data => {
        if (data.status) {
          this.jabatanData = data.data;
          for (let jabatan of this.jabatanData) {
            jabatan.text = jabatan.nama_jabatan;
          }
          this.dtTrigger.next();
        }
        if (!data.status) {
          this.dataService.showError(data.message);
        }
      });
  }

  onSubmit() {
    let url = this.dataService.url_jabatan_add;
    let data = {
      nama_jabatan: this.jabatanForm.value.namaJabatan
    }
    let body = JSON.stringify(data);
    this.adminService.postAddSuperAdmin(url, body)
      .subscribe(data => {
        if(data.status) {
          this.dataService.showSuccess(data.message);
          this.getJabatanData();
        }
      })

  }

}
