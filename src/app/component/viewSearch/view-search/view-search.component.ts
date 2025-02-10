import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.css'],
})
export class ViewSearchComponent {
  documentsDetails: any = [];
  docAdded :any;
  detailDeleted: any;

  constructor(private apiService: ApiService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.viewDocuments();
    this.route.params.subscribe(params =>{
      this.docAdded = params['docAdded']
      this.detailDeleted = params['detailDeleted']
    })
  }

  viewDocuments() {
    this.apiService.viewDocuments().subscribe((data) => {
      console.log(data);     
      this.documentsDetails = data;
      console.log(data);      
    })
  }

  viewClick(id: any) {
    this.apiService.viewAuditId = id;
  }

  editAudit(id:any){
    this.apiService.viewAuditId = id;
  }

  viewDetail(popno:any){
  this.apiService.popno = popno;
  }

  deleteFormerVendor(){
    this.apiService.deleteFormerVendor()
  }

}
