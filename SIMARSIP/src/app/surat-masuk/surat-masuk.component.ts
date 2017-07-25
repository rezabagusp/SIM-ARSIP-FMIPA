import { Component, OnInit, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx'; // dipake buat datatables
import { DatePickerOptions, DateModel } from 'ng2-datepicker'; // dipake buat datepicker 

@Component({
  selector: 'app-surat-masuk',
  templateUrl: './surat-masuk.component.html',
  styleUrls: ['./surat-masuk.component.scss']
})
export class SuratMasukComponent implements OnInit {
  // hidden field disposisi
  private hidden:boolean;
  // datatables
  datalist=[]
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  message='';
  // date picker
  dateSurat: DateModel;
  dateEntri: DateModel;
  options: DatePickerOptions;

  constructor(private http: Http) { 
    this.hidden=true;
    this.options = new DatePickerOptions();
  }

  someClickHandler(info: any): void {
    this.message=info[0] + " " + info[1];
  }

  ngOnInit() {
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

  public items:Array<string> = ['Amsterdam@gmail.com', 'Antwerp@gmail.com', 'Athens@gmail.com', 'Barcelona@gmail.com',
    'Berlin@gmail.com', 'Birmingham@gmail.com', 'Bradford@gmail.com', 'Bremen@gmail.com', 'Brussels@gmail.com', 'Bucharest@gmail.com',
    'Budapest@gmail.com', 'Cologne@gmail.com', 'Copenhagen@gmail.com', 'Dortmund@gmail.com', 'Dresden@gmail.com', 'Dublin@gmail.com', 'Düsseldorf@gmail.com',
    'Essen@gmail.com', 'Frankfurt@gmail.com', 'Genoa@gmail.com', 'Glasgow@gmail.com', 'Gothenburg@gmail.com', 'Hamburg', 'Hannover',
    'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
    'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
    'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
    'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
    'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza'];
  
  // ng select
  private value:any = [];
  private _disabledV:string = '0';
  private disabled:boolean = false;
  private myData:any;

  public refreshValue(value:any):void {
    this.value = value;
  }
 
  cek(fileinput){
    console.log("yang di pilil auto complete : " , this.myData);
    console.log("yang di pilil auto single seldect : " , this.value);    
  }
  state(){
    if (this.hidden==true) this.hidden=false;
    else this.hidden= true;
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
