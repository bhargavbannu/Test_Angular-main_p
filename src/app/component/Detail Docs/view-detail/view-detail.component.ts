import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.css'],
})
export class ViewDetailComponent implements OnInit {
  closedbtn: any;
  docDetails: any;
  detailSaved: any;
  routeSaved:any;
  routeAdded:any
  type: any;
  searchType: any;
  backDoc: any;
  loading: boolean = false;
  routeDeleted: any;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private http:HttpClient, private router:Router) {}

  ngOnInit() {
    this.loading = true
    this.loadDetails();
    this.route.params.subscribe((params) => {
      this.detailSaved = params['detailSaved'];
      this.routeSaved = params['routeSaved'];
      this.routeAdded = params['routeAdded'];
      this.closedbtn = params['closedbtn'];
      this.backDoc = params['fromViewRoute'];
      this.routeDeleted = params['routeDeleted'];
    });
    this.type = this.apiService.type;
    this.searchType = this.apiService.searchType;
    
  }

  viewRoute(arg0: any) {
    this.apiService.detailRoute = arg0;
  }

  loadDetails() {
    this.apiService.viewDetail().subscribe((data) => {
      this.docDetails = data;
      this.loading = false;
      this.apiService.section = data.document.sections
    });
  }

  moveDocument(){
    const documentNumber = window.prompt('Please enter the document number to which you want to move the detail:','New Document Number'); 
    if(documentNumber !== null && documentNumber.trim()!=='' ){
      const payload ={
        // "popno":this.apiService.popno,
        "popno":205553541,
        "oldDocumentNbr":this.apiService.viewDocId,
        "newDocumentNbr":documentNumber
      }
     this.apiService.moveDetail(payload).subscribe((response:any)=>{
      this.router.navigate(['/viewStatus', { docMoved: true }]);
     })
      
    }
  }

  closed(routeId:any){
    this.apiService.detailRoute = routeId;
    this.router.navigate(['/viewRoute', { ClosedRoute: true }]);
  }
  reIssue(){
    this.apiService.type ="reIssue"
  }
  newRoute(){
    this.apiService.type ="new"
    if(this.docDetails.document.nextRouteType){
      this.apiService.nextRouteType = this.docDetails.document.nextRouteType;
    }
    else {
      this.apiService.nextRouteType = "ETDT";
    }
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

  viewEso(eso:any){
    this.apiService.eso = eso;
    this.router.navigate(['/view-eso', { fromViewDetail: true }]);
  }

  backToDoc(){
    if(this.backDoc){
    this.apiService.viewDocId = this.docDetails.document.documentNbr;
    }
  }

}
