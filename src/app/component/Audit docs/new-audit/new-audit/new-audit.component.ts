import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-new-audit',
  templateUrl: './new-audit.component.html',
  styleUrls: ['./new-audit.component.css'],
  providers:[DatePipe]
})
export class NewAuditComponent {
  docAuditCategory: any;
  auditStatus: any;
  auditDate: any;
  followUpCompleteInd: any;
  followUpDate: any;
  revNmbr: any;
  revDate: any;
  auditNotes: any;
  documentDetail: any;

  constructor(private apiService: ApiService, private datePipe:DatePipe, private router:Router){}

  saveNewAudit(){
    this.auditDate = this.datePipe.transform(this.auditDate, 'MM/dd/yyyy HH:mm:ss')
    let payload ={
      "audit": {
        "documentNbr": this.apiService.viewDocId,
        "popno": this.documentDetail,
        "dodAuditCategory": this.docAuditCategory,
        "auditStatus": this.auditStatus,
        "auditDate": this.auditDate,
        "followUpCompleteInd": this.followUpCompleteInd,
        "followUpDate": this.followUpDate,
        "revisionNbr": this.revNmbr,
        "revisionDate": this.revDate,
        "auditNotes": this.auditNotes       
      }
    }
  this.apiService.saveNewAudit(payload).subscribe((res)=>{
    this.apiService.viewAuditId = res.successResult.data.auditData.auditId
    this.router.navigate(["/viewAudit", {auditSaved:true}])
  })
  }
}
