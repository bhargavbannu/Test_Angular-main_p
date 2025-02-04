import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css'],
  providers:[DatePipe]
})
export class EditDetailComponent {
  docDetails: any;
  detailDocType: any;
  docNmbr: any;
  vendorName: any;
  docSubject: any;
  formattedDate: any;

  constructor(private apiService: ApiService, private router: Router, private datePipe:DatePipe) {}

  ngOnInit() {
    this.loadDetails();
    this.docNmbr = this.apiService.viewDocId
    this.vendorName = this.apiService.vendorName
    this.docSubject = this.apiService.subject
  }

  loadDetails() {
    this.apiService.viewDetail().subscribe((data) => {
      this.docDetails = data;
    });
  }
  saveEditDetail() {
    this.formattedDate = this.datePipe.transform(this.docDetails?.detail.manualdate, 'MM/dd/yyyy HH:mm:ss')
    const payload = {
      documentNbr: this.docNmbr,
      vendor: this.vendorName,
      subject: this.docSubject,
      detail: {
        popno:this.docDetails?.detail.popno,
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
      this.router.navigate(['/viewDetail', {detailSaved:true}]);
    });
  }

  deleteDetail(){
    this.apiService.deleteDetail().subscribe(() => {
      this.router.navigate(['/viewSearch', {detailDeleted:true}]);
    });
  }
}
