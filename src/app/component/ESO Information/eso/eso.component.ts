import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  showErr: boolean = false;
  fromEditEso: any;
  esoFromDoc:any;
  esoSaved: boolean = false;

  constructor(
    private apiService: ApiService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.fromEditEso = params['fromEditEso'];
    });

    this.route.queryParams.subscribe((params) => {
      if (params['eso'] !== undefined) {
        this.esoFromDoc = params['eso'];
        this.esoNo = params['eso'];
        this.effectivityId = 'new';
        this.status = 'A';
      }
    });
  }

  submitESO() {
    let assigndate = this.datePipe.transform(
      this.assigndate,
      'MM/dd/yyyy HH:mm:ss'
    );

    let cancelDate = this.datePipe.transform(
      this.cancelDate,
      'MM/dd/yyyy HH:mm:ss'
    );

    const payload = {
      submitType: 'add',
      eso: {
        effectivityId: this.effectivityId,
        eso: this.esoNo,
        assigndate: assigndate,
        subject: this.subject,
        engineer: this.engineer,
        remark: this.remarks,
        cancelDate: cancelDate,
        status: this.status,
      },
    };
    if (this.esoFromDoc) {
      this.apiService.addNewEso(payload).subscribe((response: any) => {
        this.apiService.eso = this.esoNo;
        this.esoSaved = true;
         let seconds = 4;
         const intervalId = setInterval(() => {
           seconds--;
           if (seconds > 0) {
             document.getElementById('message')!.innerHTML = `Window will close in ${seconds} seconds. <a href="#" onClick="closeNow()">Close Now</a>`; 
           } else {
            clearInterval(intervalId);
            (window.opener as any).setEsoNmbr(this.esoNo);
            window.close();
           }
      },1000);
      (window as any).closeNow = () => {
        clearInterval(intervalId);
        (window.opener as any).setEsoNmbr(this.esoNo);
        window.close();
      };
    })
  } else {
      this.apiService.addNewEso(payload).subscribe((response: any) => {
        this.apiService.eso = this.esoNo;
        this.router.navigate(['/view-eso', { esoSaved: true }]);
      });
    }
    if (this.esoNo === '' || this.esoNo === undefined || this.esoNo === null) {
      this.showErr = true;
    } else {
      this.showErr = false;
    }
  }

  getEsoNumber(id: any) {
    if (id !== 'new') {
      this.apiService.esoByEffectivity(id).subscribe((response: any) => {
        this.esoNo = response;
      });
    
    } else {
      this.esoNo = '';
    }
  }

  formatDate1(date: Date) {
    this.assigndate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

  formatDate2(date: Date) {
    this.cancelDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

}
