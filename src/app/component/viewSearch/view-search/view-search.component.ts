import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.css'],
})
export class ViewSearchComponent {
  documentsDetails: any = [];
  docAdded :any;
  detailDeleted: any;
  docMoved:any;

  constructor(private apiService: ApiService, private route:ActivatedRoute, private router:Router) {}

  ngOnInit() {
    this.viewDocuments();
    this.route.params.subscribe(params =>{
      this.docAdded = params['docAdded']
      this.detailDeleted = params['detailDeleted']
      this.docMoved = params['docMoved']
    })
  }

  viewDocuments() {
    this.apiService.viewDocuments().subscribe((data) => {
      console.log(data);     
      this.documentsDetails = data;
      console.log(data);      
    })
  }

  editDoc(){
    this.apiService.viewDocId = this.documentsDetails.document.documentNbr
    this.router.navigate(['/document', { editDoc: true }]);
  }

  viewClick(id: any) {
    this.apiService.viewAuditId = id;
  }

  editAudit(id:any){
    this.apiService.viewAuditId = id;
  }

  viewDetail(popno:any, popRefNbr:any){
  this.apiService.popno = popno;
  this.apiService.popRefNbr = popRefNbr;
  }

  viewEso(eso:any){
    this.apiService.eso = eso;
  }

  deleteFormerVendor(){
    this.apiService.deleteFormerVendor()
  }

}
