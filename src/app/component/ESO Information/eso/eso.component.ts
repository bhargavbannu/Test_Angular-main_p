import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-eso',
  templateUrl: './eso.component.html',
  styleUrls: ['./eso.component.css'],
  providers: [DatePipe],
})
export class EsoComponent {
@ViewChild('calendar1') calendar1!: Calendar;
@ViewChild('calendar2') calendar2!: Calendar;
cancelDate: any;
esoNo: any;
effectivityId: any;
assigndate: any;
subject: any;
engineer: any;
remarks: any;
status: any;

constructor(private apiService: ApiService,  private datePipe: DatePipe, private router:Router) {}

submitESO(){
  this.assigndate = this.datePipe.transform(
    this.assigndate,
    'MM/dd/yyyy HH:mm:ss'
  );

  this.cancelDate = this.datePipe.transform(
    this.cancelDate,
    'MM/dd/yyyy HH:mm:ss'
  );

  const payload={
    "submitType": "add", 
    "eso": {
      "effectivityId":this.effectivityId,
      "eso": this.esoNo,
      "assigndate": this.assigndate,
      "subject": this.subject,
      "engineer": this.engineer,
      "remark": this.remarks,
      "cancelDate": this.cancelDate,
      "status": this.status
  }
}
  this.apiService.addNewEso(payload).subscribe((response: any) => {
    this.apiService.eso = this.esoNo;
    this.router.navigate(["/view-eso", {esoSaved:true}])
  }
  );
}

}
