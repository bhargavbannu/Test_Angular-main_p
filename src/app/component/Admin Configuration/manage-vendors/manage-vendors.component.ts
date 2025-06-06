import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-vendors',
  templateUrl: './manage-vendors.component.html',
  styleUrls: ['./manage-vendors.component.css'],
  providers: [DatePipe]
})
export class ManageVendorsComponent implements OnInit {

  vendorName: any = '';
  isEditVendor:boolean=false
superced: boolean = false;
isEditVendorTemp: boolean = false;
newVendorName: any;
vendError: boolean = false;
  @ViewChild('calendar1') calendar1!: Calendar;
supercedDate: any;
  vendorSaved: any;
vendorDeleted: any;
  constructor(private http: HttpClient, private appservice: ApiService, private route: ActivatedRoute,private datePipe: DatePipe) {}
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
        this.dropdownValues = res;
      });

      this.route.params.subscribe(params =>{
        this.vendorSaved = params['vendorSaved'];
      })

       this.route.params.subscribe(params =>{
        this.vendorDeleted = params['vendorDeleted'];
      })
  }

  tettt(val: any) {
    this.subb.next(val.target.value);
    if(val.target.value === ''){
      this.dropdownValues = [];
    }
  }

  supercedFun(){
    if(this.vendorName.length>0){
    this.superced = true ;
     this.isEditVendor = true;
     this.isEditVendorTemp = false;
     this.vendError = false
    }
    else {
      this.vendError = true;
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

  formatDate1(date: Date) {
    this.supercedDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

deleteVendor(){
}
}