import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-former-vendor',
  templateUrl: './add-former-vendor.component.html',
  styleUrls: ['./add-former-vendor.component.css'],
  providers:[DatePipe],
})
export class AddFormerVendorComponent {
  vendorName: any;
  supercedeDate: any;

  @ViewChild('calendar1') calendar1!: Calendar;

  constructor(private apiService:ApiService, private datePipe:DatePipe){}

  saveFormerVendor(){
    if(this.supercedeDate !==null || this.supercedeDate !==undefined)
    this.supercedeDate = this.datePipe.transform(this.supercedeDate, 'MM/dd/yyyy HH:mm:ss')
    let payload = {
      "documentNbr": this.apiService.viewDocId,
      "supercededByVendorName": this.vendorName,
      "supercedeDate": this.supercedeDate
    }
    this.apiService.saveFormerVendor(payload).subscribe()

  }
}
