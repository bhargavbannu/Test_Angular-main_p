import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.css'],
})
export class ViewSearchComponent {
  documentsDetails: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.viewDocuments();
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
}
