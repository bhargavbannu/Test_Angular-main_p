import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-eccn-location',
  templateUrl: './manage-eccn-location.component.html',
  styleUrls: ['./manage-eccn-location.component.css']
})
export class ManageEccnLocationComponent {
  EccnLocations: any[]=[];

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.loadEccnLocations();
  }

  loadEccnLocations(){
    this.apiService.getEccnLocations().subscribe(data =>{
      this.EccnLocations = data;  
    })
  }

}
