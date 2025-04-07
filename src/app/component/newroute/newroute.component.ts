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
Section: any[]=[];
routeType: any;
disposition: any;
remark: any;

constructor(private apiService : ApiService, private datePipe:DatePipe, private router:Router){}
ngOnInit(){
   this.DetailIdRefNmbr =  this.apiService.popRefNbr 
   this.Section = this.apiService.section
}

save(){

  if(this.routeDate !== null && this.routeDate !== undefined) {
    this.routeDate = this.datePipe.transform(
      this.routeDate,
      'MM/dd/yyyy HH:mm:ss'
    );
  }
  if(this.closeDate !== null && this.closeDate !== undefined) {
    this.closeDate = this.datePipe.transform(
      this.closeDate,
      'MM/dd/yyyy HH:mm:ss'
    );
  }

  const payload = {
  "route": {
    "detailId": this.apiService.popno,
    "detailRefNbr": this.DetailIdRefNmbr,
    "routeType": this.routeType,
    "sections": this.Section,
    "routeDate": this.routeDate,
    "disposition": this.disposition,
    "closedate": this.closeDate,
    "remark": this.remark

  },
  "submitType": "add"
}
this.apiService.newRoute(payload).subscribe((res) => {
  this.router.navigate(['/viewDetail', { routeAdded: true }]);
}
)

}

}
