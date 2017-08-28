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
  @ViewChild('perihalModalEdit') modalEdit: ModalDirective;

  private idPerihal: number;
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

  public onUpdate() {
    const url = this.dataService.url_perihal_edit;
    const token = this.dataService.token;
    let data = {
      id_perihal: this.idPerihal,
      nama_perihal: this.perihalForm.value.namaPerihal
    }
    let body = JSON.stringify(data);
    this.adminService.postSuperAdmin(url, token, body)
      .subscribe(data => {
        if (data.status) {
          this.modalEdit.hide();
          this.dataService.showSuccess(data.message);
          this.getPerihalData();
        } else {
          this.dataService.showError(data.message);
        }
      });
  }

  public onDelete(id: number) {
    let url = this.dataService.url_perihal_delete;
    let token = this.dataService.token;
    let data = {
      id_perihal: id
    }
    let body = JSON.stringify(data);
    this.deleteConfirm()
      .then((res) => {
        this.adminService.postSuperAdmin(url, token, data)
          .subscribe(data => {
            if (data.status) {
              this.dataService.showSuccess(data.message);
              this.getPerihalData();
            } else {
              this.dataService.showError(data.message);
            }
          })
      })
  }

  private deleteConfirm() {
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

  clickRow(data) {
    this.idPerihal = data.id;
    this.perihalForm.controls.namaPerihal.setValue(data.nama_perihal);
    this.modalEdit.show();
  }  
}
