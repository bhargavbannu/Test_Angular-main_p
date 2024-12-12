import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.css']
})
export class ViewSearchComponent {

documentsDetails:any=[]

  constructor(private apiService: ApiService) {}

  ngOnInit(){
    this.viewDocuments();
  }

  viewDocuments(){
    this.apiService.viewDocuments().subscribe((data) => {
      this.documentsDetails = data;
    });
  }

}
