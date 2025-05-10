import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';


@Component({
  selector: 'app-edit-manage-vendors',
  templateUrl: './edit-manage-vendors.component.html',
  styleUrls: ['./edit-manage-vendors.component.css'],
})
export class EditManageVendorsComponent {
  vendorName: any;
  vendorWebsite: any;
  remarks: any;
  contactPerson: any;
  contactPhone: any;
  email: any;
  dropdownValues:any[]=[]
  subb = new Subject();
  constructor(private apiService: ApiService, private router:Router, private appservice:ApiService, private route: ActivatedRoute) {}

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
        this.route.params.subscribe(params => {
          this.vendorName = params['vendorVal'];
        })
  
    }

  save() {
    const payload = {
      vendor: {
        vendorNm: this.vendorName,
        vendorWebsite: this.vendorWebsite,
        remarks: this.remarks,
        contactPerson: this.contactPerson,
        contactPhone: this.contactPhone,
        vendorEmailAddress: this.email,
      },
    };
    this.apiService.savevendor(payload).subscribe((res:any)=>{
      if(res){
        this.router.navigate(['/Manage-Vendors', {vendorSaved:true}])
      }
    });
  }

  tettt(val: any) {
    this.subb.next(val.target.value);
    if(val.target.value === ''){
      this.dropdownValues = [];
    }
  }

  setVal(val:any){
    this.vendorName = val;
    this.dropdownValues = [];
   }

   onFocusOut(){
    this.dropdownValues = [];
  }

  deleteVendor(){
    console.log(this.vendorName);
    
    const payload = {
      vendor: {
        vendorNm: this.vendorName,
      
      },
    };
    this.apiService.deleteVendorEditApi(payload).subscribe((res:any)=>{
      if(res){
        this.router.navigate(['/Manage-Vendors', {vendorDeleted:true}])
      }
    });
  }

}
