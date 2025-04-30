import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.css'],
  providers: [DatePipe]
})
export class ViewSearchComponent {
  documentsDetails: any = [];
  docAdded :any;
  detailDeleted: any;
  docMoved:any;
  searchType!: string;

  constructor(private apiService: ApiService, private route:ActivatedRoute, private router:Router, private datePipe:DatePipe) {}

  ngOnInit() {
    this.viewDocuments();
    this.route.params.subscribe(params =>{
      this.docAdded = params['docAdded']
      this.detailDeleted = params['detailDeleted']
      this.docMoved = params['docMoved']
    })
    this.searchType = this.apiService.searchType;
  }

  viewDocuments() {
    this.apiService.viewDocuments().subscribe((data) => {
      console.log(data);     
      this.documentsDetails = data;
      this.documentsDetails.document.reissueDate 
      if(this.documentsDetails.document.reissueDate  !== null && this.documentsDetails.document.reissueDate  !== undefined && this.documentsDetails.document.reissueDate  !=='null') {
        this.documentsDetails.document.reissueDate = this.datePipe.transform(this.documentsDetails.document.reissueDate, 'MM/dd/yyyy')
        }
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
    this.router.navigate(['/view-eso', { fromViewStatus: true }]);
  }

  deleteFormerVendor(){
    this.apiService.deleteFormerVendor()
  }

}
