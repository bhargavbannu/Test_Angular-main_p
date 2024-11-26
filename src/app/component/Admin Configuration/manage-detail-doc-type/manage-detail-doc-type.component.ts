import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-detail-doc-type',
  templateUrl: './manage-detail-doc-type.component.html',
  styleUrls: ['./manage-detail-doc-type.component.css'],
})
export class ManageDetailDocTypeComponent {
  docTypes: any[] = [];
  btnIndex: any;
  clickFlag: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.docTypeDetails();
  }

  docTypeDetails() {
    this.apiService.getDocTypes().subscribe((data) => {
      this.docTypes = data;
    });
  }

  btnClick(index: any) {
    this.btnIndex = index;
    this.clickFlag = true;
  }

  createRow() {
    this.docTypes.push({
      detailDocType: '',
      detailDocTypeDesc: '',
      auditableInd: '',
    });
  }

  saveRow(detailDocType: any, detailDocTypeDesc: string, auditableInd: string) {
    this.apiService
      .saveDetailDocType(detailDocType, detailDocTypeDesc, auditableInd)
      .subscribe(() => {
        this.docTypeDetails();
      });
    this.btnIndex = '';
  }

  deleteRow(detailDocType: any) {
    this.apiService.deleteDetailDocType(detailDocType).subscribe(() => {
      this.docTypeDetails();
    });
    this.btnIndex = '';
  }

  cancelRow() {
    this.docTypeDetails();
    this.btnIndex = '';
  }
}
