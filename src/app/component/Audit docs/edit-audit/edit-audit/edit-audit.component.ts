import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-audit',
  templateUrl: './edit-audit.component.html',
  styleUrls: ['./edit-audit.component.css'],
  providers: [DatePipe]
})
export class EditAuditComponent {

  auditData: any;
  followUpCompleteInd: any;
@ViewChild('calendar1') calendar1!: Calendar;
@ViewChild('calendar2') calendar2!: Calendar;
@ViewChild('calendar3') calendar3!: Calendar;

  constructor(private apiService: ApiService, private router:Router, private datePipe:DatePipe){}

  ngOnInit() {
    this.loadAuditData();
  }

  loadAuditData() {
    this.apiService.viewAudit().subscribe((data) => {
      this.auditData = data;
      this.auditData.audit.auditDate = this.datePipe.transform(this.auditData.audit.auditDate, 'MM/dd/yyyy');    
      this.auditData.audit.revisionDate = this.datePipe.transform(this.auditData.audit.revisionDate, 'MM/dd/yyyy');
      this.auditData.audit.followUpDate = this.datePipe.transform(this.auditData.audit.followUpDate, 'MM/dd/yyyy');
      this.followUpCompleteInd = this.auditData?.audit.followUpCompleteInd
      if(this.followUpCompleteInd === 'Yes'){
        this.followUpCompleteInd = "Y"
      }
      else if(this.followUpCompleteInd === 'No'){
        this.followUpCompleteInd = "N"
      }
    });
  }

  saveAudit(){
    let followUpDate = this.datePipe.transform(this.auditData?.audit?.followUpDate, 'MM/dd/yyyy HH:mm:ss');
    let auditDate = this.datePipe.transform(this.auditData?.audit?.auditDate, 'MM/dd/yyyy HH:mm:ss');
    let revisionDate = this.datePipe.transform(this.auditData?.audit?.revisionDate, 'MM/dd/yyyy HH:mm:ss');
    if(this.followUpCompleteInd === 'Yes'){
      this.followUpCompleteInd = 'Y'
    }
    else if(this.followUpCompleteInd === 'No' || this.followUpCompleteInd === 'NO'){
      this.followUpCompleteInd = 'N'
    }
    let payload ={
      "audit": {
        "documentNbr": this.auditData.audit.documentNbr,
        "dodAuditCategory": this.auditData.audit.dodAuditCategory,
        "auditStatus": this.auditData.audit.auditStatus,
        "auditId":this.auditData.audit.auditId,
        "popno":this.auditData.audit.popno,
        "auditDate": auditDate,
        "followUpCompleteInd": this.followUpCompleteInd,
        "followUpDate": followUpDate,
        "revisionNbr": this.auditData.audit.revisionNbr,
        "revisionDate": revisionDate,
        "auditNotes": this.auditData.audit.auditNotes     
      }
    }
    this.apiService.saveExistingAudit(payload).subscribe((res)=>{
      this.router.navigate(["/viewAudit", {auditSaved:true}])
    })
  }

    formatDate1(date: Date) {
    this.auditData.audit.auditDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

    formatDate2(date: Date) {
    this.auditData.audit.revisionDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

    formatDate3(date: Date) {
    this.auditData.audit.followUpDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }
}
