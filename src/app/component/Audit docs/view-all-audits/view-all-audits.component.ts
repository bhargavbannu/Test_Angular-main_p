import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-all-audits',
  templateUrl: './view-all-audits.component.html',
  styleUrls: ['./view-all-audits.component.css'],
})
export class ViewAllAuditsComponent {
  auditDetails: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.viewAllAudits();
  }

  viewAllAudits() {
    this.apiService.viewAllAudits().subscribe((data) => {
      this.auditDetails = data;
    });
  }

  viewAudit(id: any) {
    this.apiService.viewAuditId = id;
  }
  editAudit(id:any){
   this.apiService.viewAuditId = id;
  }
}
