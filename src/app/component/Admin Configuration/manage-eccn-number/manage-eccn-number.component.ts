import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-eccn-number',
  templateUrl: './manage-eccn-number.component.html',
  styleUrls: ['./manage-eccn-number.component.css']
})
export class ManageEccnNumberComponent {
  EccnNumbers: any[]=[];

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.loadEccnNumbers();
  }

  loadEccnNumbers(){
    this.apiService.getEccnNumbers().subscribe(data =>{
      this.EccnNumbers = data;  
    })
  }

}
