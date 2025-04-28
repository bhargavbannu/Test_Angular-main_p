import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

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
  constructor(private apiService: ApiService, private router:Router) {}
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
}
