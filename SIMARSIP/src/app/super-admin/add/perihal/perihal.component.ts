import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { DataService } from './../../../_services/data.service';
import { AdminService } from './../../../_services/admin.service';

@Component({
  selector: 'app-perihal',
  templateUrl: './perihal.component.html',
  styleUrls: ['./perihal.component.css']
})
export class PerihalComponent implements OnInit {
  @ViewChild('perihalModal') modal: ModalDirective;
  public perihalForm:FormGroup;
  public perihalData;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.perihalForm = this.fb.group({
      namaPerihal: ['', Validators.required]
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true,
      lengthChange: false,
      autoWidth: true
    };
    this.getPerihalData();
  }

  public getPerihalData() {
    let url = this.dataService.url_perihal_get;
    this.adminService.postAddSuperAdmin(url, null)
      .subscribe( data => {
        if (data.status) {
          this.perihalData = data.data;
          this.dtTrigger.next();
        }
        if (!data.status) {
          this.dataService.showError(data.message);
        }
      });
  }

  public onSubmit() {
    let url = this.dataService.url_perihal_add;
    let data = {
      nama_perihal: this.perihalForm.value.namaPerihal,
    }
    let body = JSON.stringify(data);
    this.adminService.postAddSuperAdmin(url, body)
      .subscribe(data => {
        if (data.status) {
          this.dataService.showSuccess(data.message);
          this.getPerihalData();
          this.modal.hide();
        }
        if (!data.status) {
          this.dataService.showError(data.message);
        }
      });
  }

  clickRow(data) {
    console.log('row', data)
    this.perihalForm.controls.namaStaff.setValue('', { onlySelf: true });
  }  
}
