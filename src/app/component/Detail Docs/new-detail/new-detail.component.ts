import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';


@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.css'],
  providers:[DatePipe]
})
export class NewDetailComponent {
  docNmbr: any;
  vendorName: any;
  docSubject: any;
  docType: any;
  revNmbr: any;
  subDesc: any;
  revDate: any;
  caseClass: any;
  mediaType: any;
  bin: any;
  remark: any;
  detailDocType: any;
  formattedDate: any;

  @ViewChild('calendar1') calendar1!: Calendar;


  constructor(private apiService: ApiService, private http: HttpClient, private datePipe:DatePipe, private router:Router) {}

  ngOnInit(){
    this.docNmbr = this.apiService.viewDocId;
    this.vendorName = this.apiService.vendorName;
    this.docSubject = this.apiService.subject; 
    this.caseClass = "REGULAR";
  }

  saveDetails() {
    let formattedDate = this.datePipe.transform(this.revDate, 'MM/dd/yyyy HH:mm:ss')
    const payload = {
      documentNbr: this.docNmbr,
      vendor: this.vendorName,
      subject: this.docSubject,
      detail: {
        doctype: this.docType,
        bin: this.bin,
        manualdate: formattedDate ?? '',
        remark: this.remark,
        detailSubjectDesc: this.subDesc,
        popClass: this.caseClass,
        revisionNbr: this.revNmbr,
        detailDocType: this.detailDocType,
        mediaTypes: this.mediaType,
        childRecords: false,
      },
    };
    this.apiService.saveNewDetail(payload).subscribe((res)=>{
      this.apiService.popno = res.detailResponse.detail.popno
      this.router.navigate(["/viewDetail", {detailSaved:true}])
    });
  }

  formatDate1(date: Date) {
    this.revDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }
}
