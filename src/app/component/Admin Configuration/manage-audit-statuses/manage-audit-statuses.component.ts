import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-audit-statuses',
  templateUrl: './manage-audit-statuses.component.html',
  styleUrls: ['./manage-audit-statuses.component.css']
})
export class ManageAuditStatusesComponent {
  auditStatuses: any[]=[];

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.loadAuditStatuses();
  }

  loadAuditStatuses(){
    this.apiService.getAuditStatuses().subscribe(data =>{
      this.auditStatuses = data;  
    })
  }

  // updateStatus(statusCode:string, description:string){
  //   this.apiService.updateAuditStatuses(statusCode, description).subscribe(()=>{
  //     this.loadAuditStatuses()
  //   })
  // }

}
