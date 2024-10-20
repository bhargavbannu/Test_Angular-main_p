import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-detail-doc-type',
  templateUrl: './manage-detail-doc-type.component.html',
  styleUrls: ['./manage-detail-doc-type.component.css']
})
export class ManageDetailDocTypeComponent {
  docTypes: any[]=[];


  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.docTypeDetails();
  }

  docTypeDetails(){
    this.apiService.getDocTypes().subscribe(data =>{
      this.docTypes = data;   
    })
  }

}
