import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { DataService } from './../../../_services/data.service';
import { AdminService } from './../../../_services/admin.service';

@Component({
  selector: 'app-unit-kerja',
  templateUrl: './unit-kerja.component.html',
  styleUrls: ['./unit-kerja.component.css']
})
export class UnitKerjaComponent implements OnInit {
  @ViewChild('unitKerjaModal') modal: ModalDirective;

  public unitKerjaForm: FormGroup;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public unitKerjaData;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.unitKerjaForm = this.fb.group({
      namaUnitKerja: ['', Validators.required],
      akronimUnitKerja: ['', Validators.required],
      kodeUnitKerja: ['', Validators.required]
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true,
      lengthChange: false,
      autoWidth: true
    };
    this.getUnitKerjaData();
  }

  public getUnitKerjaData() {
    let url = this.dataService.url_unitkerja_all_get;
    this.adminService.postAddSuperAdmin(url, null)
      .subscribe( data => {
        if (data.status) {
          this.unitKerjaData = data.data;
          console.log(data);
          this.dtTrigger.next();
          this.dataService.showSuccess(data.message);
        } else {
          this.dataService.showError(data.message);
        }
      });
  }

  public onSubmit () {
    let url = this.dataService.url_unitkerja_add;
    let data = {
      nama_unit_kerja: this.unitKerjaForm.value.namaUnitKerja,
      akronim_unit_kerja: this.unitKerjaForm.value.akronimUnitKerja,
      kode_unit_kerja: this.unitKerjaForm.value.kodeUnitKerja
    };
    let body = JSON.stringify(data);
    this.adminService.postAddSuperAdmin(url, body)
      .subscribe( data => {
        if (data.status) {
          this.modal.hide();
          this.dataService.showSuccess(data.message);
          this.getUnitKerjaData();
        } else {
          this.dataService.showError(data.message);
        }
      })
  }

}
