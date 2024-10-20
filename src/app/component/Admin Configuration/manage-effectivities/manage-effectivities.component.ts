import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-manage-effectivities',
  templateUrl: './manage-effectivities.component.html',
  styleUrls: ['./manage-effectivities.component.css']
})
export class ManageEffectivitiesComponent {
  Effectivities: any[]=[];

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.loadEffectivities();
  }

  loadEffectivities(){
    this.apiService.getEffectivites().subscribe(data =>{
      this.Effectivities = data;  
    })
  }

}
