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
  savenew:boolean=false;
  updateRecord:boolean=false;

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
    this.savenew=false;
    this.updateRecord=true;
    this.btnIndex = index;
    this.clickFlag = true;
  }

  createRow() {
    this.savenew=true;
    this.docTypes.push({
      detailDocType: '',
      detailDocTypeDesc: '',
      auditableInd: '',
      newRow:true
    });
  }

  saveRow(detailDocType: any, detailDocTypeDesc: string, auditableInd: string) {
    if(this.savenew){
    this.apiService
      .saveDetailDocType(detailDocType, detailDocTypeDesc, auditableInd)
      .subscribe(() => {
        this.docTypeDetails();
      });
    this.btnIndex = '';
  }
  else {
    this.apiService
      .saveDetailDocType1(detailDocType, detailDocTypeDesc, auditableInd)
      .subscribe(() => {
        this.docTypeDetails();
      });
    this.btnIndex = '';
  }
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
