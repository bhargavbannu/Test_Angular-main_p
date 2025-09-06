import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-audit-statuses',
  templateUrl: './manage-audit-statuses.component.html',
  styleUrls: ['./manage-audit-statuses.component.css'],
})
export class ManageAuditStatusesComponent {
  auditStatuses: any[] = [];
  btnIndex: any;
  clickFlag: boolean = false;
  saveNew: boolean = false;
  updateRecord: boolean = false;
  dataFlag: boolean = false;
  auditSaved: boolean = false;
  auditDeleted: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAuditStatuses();
  }

  loadAuditStatuses() {
    this.apiService.getAuditStatuses().subscribe((data) => {
      this.auditStatuses = data;
      this.dataFlag = true;
    });
  }

  btnClick(index: any) {
    this.saveNew = false;
    this.btnIndex = index;
    this.clickFlag = true;
    this.auditSaved = false;
    this.auditDeleted = false;
  }

  createRow() {
    this.saveNew = true;
    this.auditStatuses.forEach((item)=>{
      delete item.newRow
    })
    this.auditStatuses.push({ auditStatusCd: '', auditStatusDesc: '', newRow:true });
    this.auditSaved = false;
    this.auditDeleted = false;

  }

  saveRow(auditStatusCd: any, auditStatusDesc: string) {
    if(this.saveNew){
    this.apiService
      .saveAuditStatus(auditStatusCd, auditStatusDesc)
      .subscribe((res) => {
        if(res){
          this.auditSaved = true;
        }
        else {
          this.auditSaved = false;
        }
        this.loadAuditStatuses();
      });
    this.btnIndex = '';

  }
  else {
    this.apiService
      .saveAuditStatus1(auditStatusCd, auditStatusDesc)
      .subscribe((res) => {
        if(res){
          this.auditSaved = true;
        }
        else {
          this.auditSaved = false;
        }
        this.loadAuditStatuses();
      });
    this.btnIndex = '';
  }
}


  deleteRow(auditStatusCd: any) {
    this.apiService.deleteAuditStatus(auditStatusCd).subscribe((res) => {
      if(res){
        this.auditDeleted = true;
      }
      else {
        this.auditDeleted = false;
      }
      this.loadAuditStatuses();
    });
    this.btnIndex = '';
  }

  cancelRow() {
    this.loadAuditStatuses();
    this.btnIndex = '';
  }
}
