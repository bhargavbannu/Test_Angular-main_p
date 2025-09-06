import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css'],
  providers: [DatePipe],
})
export class EditDetailComponent {
  docDetails: any;
  detailDocType: any;
  docNmbr: any;
  vendorName: any;
  docSubject: any;
  formattedDate: any;

  @ViewChild('calendar1') calendar1!: Calendar;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadDetails();
    this.docNmbr = this.apiService.viewDocId;
    this.vendorName = this.apiService.vendorName;
    this.docSubject = this.apiService.subject;
  }

  loadDetails() {
    this.apiService.viewDetail().subscribe((data) => {
      this.docDetails = data;
      this.docDetails.detail.manualdate = this.datePipe.transform(this.docDetails?.detail.manualdate, 'MM/dd/yyyy');
    });
  }
  saveEditDetail() {
     if(this.docDetails?.detail.manualdate !== null && this.docDetails?.detail.manualdate !== undefined) {
      this.formattedDate = this.datePipe.transform(
        this.docDetails?.detail.manualdate,
        'MM/dd/yyyy HH:mm:ss'
      );
    }
 
    const payload = {
      documentNbr: this.docNmbr,
      vendor: this.vendorName,
      subject: this.docSubject,
      detail: {
        popno: this.docDetails?.detail.popno,
        popRefNbr: this.docDetails?.detail.popRefNbr,
        doctype: this.docDetails?.detail.doctype,
        bin: this.docDetails?.detail.bin,
        manualdate: this.formattedDate,
        remark: this.docDetails?.detail.remark,
        detailSubjectDesc: this.docDetails?.detail.detailSubjectDesc,
        popClass: this.docDetails?.detail.popClass,
        revisionNbr: this.docDetails?.detail.revisionNbr,
        detailDocType: this.docDetails?.detail.detailDocType,
        mediaTypes: this.docDetails?.detail.mediaTypes,
        childRecords: false,
      },
    };

    this.apiService.saveEditDetail(payload).subscribe((res: any) => {
      this.apiService.popno = res.detailResponse.detail.popno;
      this.router.navigate(['/viewDetail', { detailSaved: true }]);
    });
  }

  deleteDetail() {
    let confirm = window.confirm('Are you sure you want to delete this Detail and all associated records');
     if(confirm){
      this.apiService.deleteDetail().subscribe(() => {
      this.router.navigate(['/viewStatus', { detailDeleted: true }]);
    });
  }
  }

  formatDate1(date: Date) {
    this.docDetails.detail.manualdate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }
}
