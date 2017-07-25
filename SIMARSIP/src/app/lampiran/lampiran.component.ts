import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx'; // dipake buat datatables\



@Component({
  selector: 'app-lampiran',
  templateUrl: './lampiran.component.html',
  styleUrls: ['./lampiran.component.scss']
})
export class LampiranComponent implements OnInit {
  datalist=[]
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();  


  constructor(private http: Http) { }

  ngOnInit() {
      this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true
    };
    this.http.get('https://jsonplaceholder.typicode.com/todos')
      .map(this.extractData)
      .subscribe(data => {
        console.log(data);
        this.datalist = data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });

  }

  private extractData(res: Response) {
    return res.json();
  }

}
