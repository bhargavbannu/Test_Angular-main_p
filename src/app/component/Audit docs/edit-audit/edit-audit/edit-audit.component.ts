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
documentDetailsList: any[] = [];
auditableDocTypes: any[]=[];
detailDocType: any;

  constructor(private apiService: ApiService, private router:Router, private datePipe:DatePipe){}

  ngOnInit() {
    this.loadAuditData();
    this.apiService.documentDetails().subscribe((res)=>{
      this.documentDetailsList = res;
    })

    this.apiService.getAuditableDocTypes().subscribe((res)=>{
      if(res[0] !== "ENTIRE DOCUMENT"){
         this.auditableDocTypes = res;
      }       
    })
  }

  loadAuditData() {
    this.apiService.viewAudit().subscribe((data) => {
      this.auditData = data;
      console.log(this.auditData);
      this.auditData.audit.auditDate = this.datePipe.transform(this.auditData.audit.auditDate, 'MM/dd/yyyy');
      this.auditData.audit.revisionDate = this.datePipe.transform(this.auditData.audit.revisionDate, 'MM/dd/yyyy');
      this.auditData.audit.followUpDate = this.datePipe.transform(this.auditData.audit.followUpDate, 'MM/dd/yyyy');
      this.followUpCompleteInd = this.auditData?.audit.followUpCompleteInd
      this.detailDocType = this.auditData?.audit.detailDocType
      if(this.followUpCompleteInd === 'YES'){
        this.followUpCompleteInd = "Y"
      }
      else if(this.followUpCompleteInd === 'NO'){
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
        "popno": this.auditData.audit.documentDetail?.split(" ")[0] || null,
        "detailDocType":  this.detailDocType || null,
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

  deleteAud(){
    let confirm = window.confirm('Are you sure you want to delete this Audit');
   if(confirm){
    const payload = {
      "audit": {
    "auditId": this.auditData.audit.auditId,
    "documentNbr":this.auditData.audit.documentNbr
  }
    }
    this.apiService.deleteAudit(payload).subscribe((res:any)=>{
      if(res){
      this.router.navigate(['/viewStatus', { auditDeleted: true }]);
      }
    })
  }
  }

   docDetailChange(documentDetail:any){
    let val = documentDetail.match(/\((.*?)\)/)[1];
    this.detailDocType = val;
  }
}
