import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-former-vendor',
  templateUrl: './add-former-vendor.component.html',
  styleUrls: ['./add-former-vendor.component.css'],
  providers: [DatePipe],
})
export class AddFormerVendorComponent {
  vendorName: any;
  supercedeDate: any;
  vendorSub = new Subject();
  vendorNamesList: any[] = [];
  @ViewChild('calendar1') calendar1!: Calendar;

  constructor(private apiService: ApiService, private datePipe: DatePipe, private router:Router) {}

  ngOnInit() {
    this.vendorSub
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(() => {
          return this.apiService.getAutoPopulateVendors(this.vendorName);
        })
      )
      .subscribe((res: any) => {
        this.vendorNamesList = res;
        if (this.vendorName === '') {
          this.vendorNamesList = [];
        }
      });
  }

  saveFormerVendor() {
    let supercedeDate = this.datePipe.transform(
        this.supercedeDate,
        'MM/dd/yyyy HH:mm:ss'
    );
    let payload = {
      documentNbr: this.apiService.viewDocId,
      supercededByVendorName: this.vendorName,
      supercedeDate: supercedeDate,
    };
    this.apiService.saveFormerVendor(payload).subscribe((res: any) => {
      if(res){
        this.router.navigate(['/viewStatus', { formerVendorSaved: true }]);
      }
    });
  }

  vName(val: any) {
    this.vendorSub.next(val.target.value);
    if (val.target.value === '') {
      this.vendorNamesList = [];
    }
  }

  setVal(val: any) {
    this.vendorName = val;
    this.vendorNamesList = [];
  }

  onFocusOut() {
    this.vendorNamesList = [];
  }

  formatDate1(date: Date) {
    this.supercedeDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }
}
