import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-audit',
  templateUrl: './edit-audit.component.html',
  styleUrls: ['./edit-audit.component.css']
})
export class EditAuditComponent {

  auditData: any;
  followUpCompleteInd: any;
@ViewChild('calendar1') calendar1!: Calendar;
@ViewChild('calendar2') calendar2!: Calendar;
@ViewChild('calendar3') calendar3!: Calendar;

  constructor(private apiService: ApiService, private router:Router){}

  ngOnInit() {
    this.loadAuditData();    
  }

  loadAuditData() {
    this.apiService.viewAudit().subscribe((data) => {
      this.auditData = data;
      console.log(this.auditData?.audit.followUpCompleteInd);
      console.log(this.auditData?.audit.dodAuditCategory);
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
    let payload ={
      "audit": {
        "documentNbr": this.auditData.audit.documentNbr,
        "dodAuditCategory": this.auditData.audit.dodAuditCategory,
        "auditStatus": this.auditData.audit.auditStatus,
        "auditId":this.auditData.audit.auditId,
        "popno":this.auditData.audit.popno,
        "auditDate": this.auditData.audit.auditDate,
        "followUpCompleteInd": this.followUpCompleteInd,
        "followUpDate": this.auditData.audit.followUpDate,
        "revisionNbr": this.auditData.audit.revisionNbr,
        "revisionDate": this.auditData.audit.revisionDate,
        "auditNotes": this.auditData.audit.auditNotes     
      }
    }
    this.apiService.saveExistingAudit(payload).subscribe((res)=>{
      this.router.navigate(["/viewAudit", {auditSaved:true}])
    })
  }
}
