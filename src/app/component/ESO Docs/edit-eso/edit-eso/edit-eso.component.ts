import { DatePipe } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  fromViewStatus: any;
  viewRoute: any;
  viewDetail: any;
 // @ViewChildren('calendar') calendars!: QueryList<Calendar>;

    constructor(private apiService: ApiService, private router:Router,  private datePipe: DatePipe, private route:ActivatedRoute){}

  ngOnInit() {
    this.loadEso();
    this.route.params.subscribe(params => {
      this.fromViewStatus = params['fromViewStatus'];
      this.viewRoute = params['fromViewRoute'];
      this.viewDetail = params['fromViewDetail'];
    })
  }


  loadEso() {
    this.apiService.viewEso().subscribe((data) => {
      this.esoDetails={}
      this.esoDetails["esoData"] = data
      this.esoDetails.esoData.assigndate = this.datePipe.transform(this.esoDetails?.esoData?.assigndate, 'MM/dd/yyyy');
      this.esoDetails.esoData.canceldate = this.datePipe.transform(this.esoDetails?.esoData?.canceldate, 'MM/dd/yyyy');

    });
  }

  saveEso(){
    let assigndate = this.datePipe.transform(
      this.esoDetails?.esoData?.assigndate,
      'MM/dd/yyyy HH:mm:ss'
    );
    let canceldate = this.datePipe.transform(
      this.esoDetails?.esoData?.canceldate,
      'MM/dd/yyyy HH:mm:ss'
    );
  let payload ={
    "submitType": "edit", 
    "eso": {
      "eso": this.esoDetails?.esoData.eso,
      "assigndate":assigndate,
      "subject": this.esoDetails?.esoData.subject,
      "engineer": this.esoDetails?.esoData.engineer,
      "remark": this.esoDetails?.esoData.remark,
      "canceldate":canceldate,
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
    this.apiService.deleteEso(payload).subscribe((res:any)=>{
      if(res){
        this.router.navigate(['/View-Edit-ESO', { esoDeleted: true }]);
      }
    })
   
  }

  backToEso(){
    if(this.fromViewStatus){
      this.router.navigate(['/view-eso', { fromViewStatus: true }]);
    }
    else if(this.viewDetail){
      this.router.navigate(['/view-eso',{fromViewDetail:true}])
    }
    else if(this.viewRoute){
      this.router.navigate(['/view-eso',{fromViewRoute:true}])
    }
    else{
      this.router.navigate(['/view-eso'])
    }
  }


//   openCalendar(calendar: any){
//    calendar.overlayVisible = !calendar.overlayVisible;
//     calendar.inputfieldViewChild?.nativeElement.click()
// }

  formatDate1(date: Date) {
    this.esoDetails.esoData.assigndate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }
  formatDate2(date: Date) {
    this.esoDetails.esoData.canceldate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

}
