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
  viewRoute(arg0: any) {
    this.apiService.detailRoute = arg0;

  }
  docDetails: any;
  detailSaved: any;
  routeSaved:any;
  routeAdded:any
  constructor(private apiService: ApiService, private route: ActivatedRoute, private http:HttpClient, private router:Router) {}

  ngOnInit() {
    this.loadDetails();
    this.route.params.subscribe((params) => {
      this.detailSaved = params['detailSaved'];
      this.routeSaved = params['routeSaved'];
      this.routeAdded = params['routeAdded'];
    });
  }

  loadDetails() {
    this.apiService.viewDetail().subscribe((data) => {
      this.docDetails = data;
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
}
