import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-route-child',
  templateUrl: './view-route-child.component.html',
  styleUrls: ['./view-route-child.component.css']
})
export class ViewRouteChildComponent  implements OnInit {
  viewRoute: any;
  routeData:any;
edit: boolean = true;
  constructor( private apiService:ApiService) { } 
routee() {
  this.edit = false
}


ngOnInit(){


   this.apiService.viewRouteDetailApi(this.apiService.detailRoute).subscribe((data) => {
      this.viewRoute = data.routeForm;
   
      console.log(this.viewRoute);
    });
    console.log(this.viewRoute);
    
}
}

