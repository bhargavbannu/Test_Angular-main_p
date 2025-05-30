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
  loading: boolean = false;
  searchEffetivity: any[] = [];

  constructor(private apiService: ApiService, private route:ActivatedRoute, private router:Router, private datePipe:DatePipe) {}

  ngOnInit() {
    this.loading = true;
    this.viewDocuments();
    this.route.params.subscribe(params =>{
      this.docAdded = params['docAdded']
      this.detailDeleted = params['detailDeleted']
      this.docMoved = params['docMoved']
    })
    this.searchType = this.apiService.searchType;
       this.apiService.getSearchEffetivity().subscribe((data) => {
      this.searchEffetivity = data;
      console.log(this.searchEffetivity);
    });
  }

  viewDocuments() {
    this.apiService.viewDocuments().subscribe((data) => {
      console.log(data);     
      this.loading = false;
      this.documentsDetails = data;
      this.documentsDetails.document.reissueDate 
      if(this.documentsDetails.document.reissueDate  !== null && this.documentsDetails.document.reissueDate  !== undefined && this.documentsDetails.document.reissueDate  !=='null') {
        this.documentsDetails.document.reissueDate = this.datePipe.transform(this.documentsDetails.document.reissueDate, 'MM/dd/yyyy')
        }
        else {
          this.documentsDetails.document.reissueDate = "";
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

  viewRoute(arg0: any) {
    this.apiService.detailRoute = arg0;
  }

  closed(routeId:any){
    this.apiService.detailRoute = routeId;
    this.router.navigate(['/viewRoute', { ClosedRoute: true }]);
  }
  reIssue(){
    this.apiService.type ="reIssue"
  }

  downloadRouteSlip(id:any){
    this.apiService.routeSlipDownload(id,{observe:'response', responseType:'blob'}).subscribe((response:any)=>{
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition.split('filename=')[1].trim().replace(/"/g, '');
      const blob = new Blob([response.body], { type: 'application/msword' });
       const url = window.URL.createObjectURL(blob);
       const a = document.createElement('a');
       a.href = url;
       a.download = filename;
       a.click();
       window.URL.revokeObjectURL(url);
    });

  }

}
