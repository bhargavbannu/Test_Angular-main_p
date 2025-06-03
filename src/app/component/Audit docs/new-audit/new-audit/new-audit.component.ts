import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-new-audit',
  templateUrl: './new-audit.component.html',
  styleUrls: ['./new-audit.component.css'],
  providers:[DatePipe]
})
export class NewAuditComponent implements OnInit {
  docAuditCategory: any;
  auditStatus: any;
  auditDate: any;
  followUpCompleteInd: any;
  followUpDate: any;
  revNmbr: any;
  revDate: any;
  auditNotes: any;
  documentDetail: any;
  documentDetailsList: any[] = [];
  @ViewChild('calendar1') calendar1!: Calendar;
  @ViewChild('calendar2') calendar2!: Calendar;
  @ViewChild('calendar3') calendar3!: Calendar;

  constructor(private apiService: ApiService, private datePipe:DatePipe, private router:Router){}

  ngOnInit(){
    this.docAuditCategory = 'A';
    this.followUpCompleteInd = 'Y';
    this.apiService.documentDetails().subscribe((res)=>{
      this.documentDetailsList = res;
    })
  }

  saveNewAudit(){
    let auditDate = this.datePipe.transform(this.auditDate, 'MM/dd/yyyy HH:mm:ss')
    let followUpDate = this.datePipe.transform(this.followUpDate, 'MM/dd/yyyy HH:mm:ss')
    let revDate = this.datePipe.transform(this.revDate, 'MM/dd/yyyy HH:mm:ss')

    let payload ={
      "audit": {
        "documentNbr": this.apiService.viewDocId,
        "popno": this.documentDetail,
        "dodAuditCategory": this.docAuditCategory,
        "auditStatus": this.auditStatus,
        "auditDate": auditDate,
        "followUpCompleteInd": this.followUpCompleteInd,
        "followUpDate": followUpDate,
        "revisionNbr": this.revNmbr,
        "revisionDate": revDate,
        "auditNotes": this.auditNotes       
      }
    }
  this.apiService.saveNewAudit(payload).subscribe((res)=>{
    this.apiService.viewAuditId = res.successResult.data.auditData.auditId
    this.router.navigate(["/viewAudit", {auditSaved:true}])
  })
  }

      formatDate1(date: Date) {
    this.auditDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

    formatDate2(date: Date) {
    this.revDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

    formatDate3(date: Date) {
    this.followUpDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }
}
