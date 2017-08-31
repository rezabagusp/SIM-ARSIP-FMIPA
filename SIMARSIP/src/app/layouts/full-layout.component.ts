import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../_services/authentication.service';
import { DataService } from './../_services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers:[AuthenticationService, DataService]
})
export class FullLayoutComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  private role;

  constructor(private auth: AuthenticationService, private router:Router, private data: DataService){
    console.log("layout dasar")
    this.role = this.data.role;
    console.log('decode', this.data.decode)
  }
  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {}
  
  logout(){
    this.auth.logout();
    this.router.navigate(['auth']);
  }  
}
