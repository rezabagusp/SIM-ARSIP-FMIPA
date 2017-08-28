import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { DataService } from './../../../_services/data.service';
import { AdminService } from './../../../_services/admin.service';

@Component({
  selector: 'app-jabatan',
  templateUrl: './jabatan.component.html',
  styleUrls: ['./jabatan.component.css']
})
export class JabatanComponent implements OnInit {
  @ViewChild('jabatanModal') modal: ModalDirective;
  @ViewChild('jabatanModalEdit') modalEdit: ModalDirective;

  private idJabatan: number;
  public jabatanForm:FormGroup;
  public jabatanData;
  // datatables
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public numberCols: Array<number> = [];
  
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

  public getJabatanData() {
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

  public onSubmit() {
    let url = this.dataService.url_jabatan_add;
    let data = {
      nama_jabatan: this.jabatanForm.value.namaJabatan
    }
    let body = JSON.stringify(data);
    this.adminService.postAddSuperAdmin(url, body)
      .subscribe(data => {
        if(data.status) {
          this.dataService.showSuccess(data.message);
          this.modal.hide();
          this.getJabatanData();
        }
      })
  }
  public onUpdate() {
    let url = this.dataService.url_jabatan_edit;
    let token = this.dataService.token;
    let data = {
      id_jabatan: this.idJabatan,
      nama_jabatan: this.jabatanForm.value.namaJabatan
    };
    let body = JSON.stringify(data);
    this.adminService.postSuperAdmin(url, token, body)
      .subscribe(data => {
        if (data.status) {
          this.modalEdit.hide();
          this.dataService.showSuccess(data.message);
          this.getJabatanData();
        } else {
          this.dataService.showError(data.message);
        }
      });
  }

  public onDelete(id: number) {
    let url = this.dataService.url_jabatan_delete;
    let token = this.dataService.token;
    let data = {
      id_jabatan: id
    }
    let body = JSON.stringify(data);
    this.deleteConfirm()
      .then((res) => {
        this.adminService.postSuperAdmin(url, token, data)
          .subscribe(data => {
            if (data.status) {
              this.dataService.showSuccess(data.message);
              this.getJabatanData();
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

  public clickRow(data) {
    this.idJabatan = data.id;
    this.jabatanForm.controls.namaJabatan.setValue(data.nama_jabatan);
    this.modalEdit.show();
  }
}
