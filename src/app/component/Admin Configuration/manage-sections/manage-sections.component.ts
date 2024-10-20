import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-manage-sections',
  templateUrl: './manage-sections.component.html',
  styleUrls: ['./manage-sections.component.css']
})
export class ManageSectionsComponent {
  sections: any[]=[];

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.loadSections();
  }

  loadSections(){
    this.apiService.getSections().subscribe(data =>{
      this.sections = data;  
    })
  }

}
