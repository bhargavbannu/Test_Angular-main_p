import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-audit',
  templateUrl: './view-audit.component.html',
  styleUrls: ['./view-audit.component.css'],
})
export class ViewAuditComponent implements OnInit {
  auditDetails: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.viewAudit();
  }

  viewAudit() {
    this.apiService.viewAudit().subscribe((data) => {
      this.auditDetails = data;
    });
  }
}
