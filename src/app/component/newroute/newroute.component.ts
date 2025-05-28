import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-newroute',
  templateUrl: './newroute.component.html',
  styleUrls: ['./newroute.component.css'],
  providers: [DatePipe],
})
export class NewrouteComponent {
  DetailIdRefNmbr: any;

  @ViewChild('calendar1') calendar1!: Calendar;
  @ViewChild('calendar2') calendar2!: Calendar;
  routeDate: any;
  closeDate: any;
  Section: any[] = [];
  routeType: any;
  disposition: any;
  remark: any;
  dispositionValues: any[] = [];
  Sections: any[]=[];
  showErr: boolean = false;
  errDate: boolean = false;

  constructor(
    private apiService: ApiService,
    private datePipe: DatePipe,
    private router: Router
  ) {}
  ngOnInit() {
    this.DetailIdRefNmbr = this.apiService.popRefNbr;
    this.Section = this.apiService.section;
    this.routeType = "ETDT"
  }

  save() {
    if (this.routeDate !== null && this.routeDate !== undefined) {
      this.routeDate = this.datePipe.transform(
        this.routeDate,
        'MM/dd/yyyy HH:mm:ss'
      );
    }
    if (this.closeDate !== null && this.closeDate !== undefined) {
      this.closeDate = this.datePipe.transform(
        this.closeDate,
        'MM/dd/yyyy HH:mm:ss'
      );
    }
let newSection = this.Sections.map(sec=> sec.split(' - ')[0]);
    const payload = {
      route: {
        detailId: this.apiService.popno,
        detailRefNbr: this.DetailIdRefNmbr,
        routeType: this.routeType,
        sections: newSection,
        routeDate: this.routeDate,
        disposition: this.disposition,
        closedate: this.closeDate,
        remark: this.remark,
      },
      submitType: 'add',
    };
    this.apiService.newRoute(payload).subscribe((res) => {
      this.router.navigate(['/viewDetail', { routeAdded: true,closedbtn: true,routeSaved: true }]);
    });
    if(this.Sections.length === 0 || this.Sections === undefined || this.Sections === null){
      this.showErr = true;
      this.errDate = false;
    }
    else if(this.Sections.length !== 0 && this.Sections !== undefined && this.Sections !== null && (this.routeDate === undefined || this.routeDate === null || this.routeDate === '')){
      this.showErr = false;
      this.errDate = true;
    }
    else {
      this.showErr = false;
      this.errDate = false;
    }
  }

  onDispositionChange(disposition: any) {
    if (disposition.trim() !== '') {
      this.apiService.disposition(disposition).subscribe((res) => {
        this.dispositionValues = res;
      });
    } else {
      this.dispositionValues = [];
    }
  }

  selectValue(val: any) {
    this.disposition = val;
    this.dispositionValues = [];
  }

  backToDetail(){
    // if(this.routeDate === undefined && this.closeDate === undefined && this.remark === undefined && this.disposition === undefined){
    // this.router.navigate(['/viewDetail', { closedbtn: true }]);
    // } else {
    //   this.router.navigate(['/viewDetail']);
    // }
  }
}
