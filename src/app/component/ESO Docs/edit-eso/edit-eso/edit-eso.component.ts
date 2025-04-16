import { DatePipe } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-eso',
  templateUrl: './edit-eso.component.html',
  styleUrls: ['./edit-eso.component.css'],
  providers: [DatePipe],
})
export class EditEsoDocComponent {
  esoDetails:any
  showIcon: boolean = false;
   @ViewChild('calendar1') calendar1!: Calendar;
   @ViewChild('calendar2') calendar2!: Calendar;
 // @ViewChildren('calendar') calendars!: QueryList<Calendar>;

    constructor(private apiService: ApiService, private router:Router,  private datePipe: DatePipe){}

  ngOnInit() {
    this.loadEso();
  }


  loadEso() {
    this.apiService.viewEso().subscribe((data) => {
      this.esoDetails={}
      this.esoDetails["esoData"] = data
    });
  }

  saveEso(){
    this.esoDetails.esoData.assigndate = this.datePipe.transform(
      this.esoDetails?.esoData.assigndate,
      'MM/dd/yyyy HH:mm:ss'
    );
    this.esoDetails.esoData.canceldate = this.datePipe.transform(
      this.esoDetails?.esoData.canceldate,
      'MM/dd/yyyy HH:mm:ss'
    );
  let payload ={
    "submitType": "edit", 
    "eso": {
      "eso": this.esoDetails?.esoData.eso,
      "assigndate":this.esoDetails?.esoData.assigndate,
      "subject": this.esoDetails?.esoData.subject,
      "engineer": this.esoDetails?.esoData.engineer,
      "remark": this.esoDetails?.esoData.remark,
      "canceldate":this.esoDetails?.esoData.canceldate,
      "status": this.esoDetails?.esoData.status
    }  
  }
  this.apiService.saveEso(payload).subscribe((res:any)=>{
    this.apiService.eso = res.returnObject.eso
    this.router.navigate(['/view-eso', { esoSaved: true }]);
  })
  }

  deleteEso(){
   let payload={
      "submitType": "edit", 
      "eso": {
        "eso": this.esoDetails?.esoData.eso
      }
    }
    this.apiService.deleteEso(payload).subscribe()
   
  }


//   openCalendar(calendar: any){
//    calendar.overlayVisible = !calendar.overlayVisible;
//     calendar.inputfieldViewChild?.nativeElement.click()
// }

}
