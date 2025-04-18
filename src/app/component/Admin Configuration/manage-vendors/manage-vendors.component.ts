import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-vendors',
  templateUrl: './manage-vendors.component.html',
  styleUrls: ['./manage-vendors.component.css'],
})
export class ManageVendorsComponent implements OnInit {

  vendorName: any = 'heloo';
  isEditVendor:boolean=false
superced: boolean = false;
isEditVendorTemp: boolean = false;
newVendorName: any;
  error: boolean = false;
  @ViewChild('calendar1') calendar1!: Calendar;
supercedDate: any;
  constructor(private http: HttpClient, private appservice: ApiService) {}
dropdownValues:any[]=[]
  subb = new Subject();
  ngOnInit() {
    this.subb
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(() => {          
          return this.appservice.getAutoPopulateVendors(this.vendorName);
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        this.dropdownValues = res;

      });
  }

  tettt(val: any) {
    this.subb.next(val.target.value);
  }

  supercedFun(){
    console.log('superctc test');
    console.log(this.vendorName);
    
    if(this.vendorName.length>0){
    this.superced = true ;
     this.isEditVendor = true;
     this.isEditVendorTemp = false;
     this.error = false
    }
    else {
      this.error = true;
    }
  }
  setVal(val:any){
   this.vendorName = val;
   this.dropdownValues = [];
  }

  saveSuper() {
    this.appservice.savevenodrs(this.newVendorName).subscribe((res) => {
      console.log(res);    
    })
}
onFocusOut(){
  this.dropdownValues = [];
}
}