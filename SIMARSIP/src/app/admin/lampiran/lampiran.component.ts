import { Component, OnInit, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx'; // dipake buat datatables\
import { DatePickerOptions, DateModel } from 'ng2-datepicker'; // dipake buat datepicker 


@Component({
  selector: 'app-lampiran',
  templateUrl: './lampiran.component.html',
  styleUrls: ['./../surat-masuk/surat-masuk.component.scss']
})
export class LampiranComponent implements OnInit {
  
  // data tables
  datalist:any=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();  
  message = '';

  // date picker
  dateLmpiran: DateModel;
  options: DatePickerOptions;
  constructor(private http: Http, private zone: NgZone) { }

  someClickHandler(info: any): void {
    this.message = info.id + ' - ' + info.firstName;
  }

  ngOnInit() {
      //get the data
      this.http.get('https://jsonplaceholder.typicode.com/todos')
      .map(this.extractData)
      .subscribe(data => {
        console.log(data);
        this.datalist = data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
      //config and init datatables
      this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };


  }

  private extractData(res: Response) {
    return res.json();
  }



}
