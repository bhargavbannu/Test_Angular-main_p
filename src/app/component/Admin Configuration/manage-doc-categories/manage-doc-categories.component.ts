import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-doc-categories',
  templateUrl: './manage-doc-categories.component.html',
  styleUrls: ['./manage-doc-categories.component.css']
})
export class ManageDocCategoriesComponent {
  DocCategories: any[]=[];

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.loadDocCategories();
  }

  loadDocCategories(){
    this.apiService.getDocCategories().subscribe(data =>{
      this.DocCategories = data;  
    })
  }

}
