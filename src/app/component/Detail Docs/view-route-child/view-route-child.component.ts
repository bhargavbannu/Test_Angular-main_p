import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-route-child',
  templateUrl: './view-route-child.component.html',
  styleUrls: ['./view-route-child.component.css'],
})
export class ViewRouteChildComponent implements OnInit {
  viewRoute: any;
  routeData: any;
  edit: boolean = true;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .viewRouteDetailApi(this.apiService.detailRoute)
      .subscribe((data) => {
        this.viewRoute = data.routeForm;

        console.log(this.viewRoute);
      });
    // console.log(this.viewRoute);
  }


  routee() {
    this.edit = false;
  }

  save() {
    const payload={
     
       "route": {
         "routeId": "5443208",
         "detailId": "205553542",
         "detailRefNbr": "200502602",
         "routeType": "ETDT",
         "section": "40",
         "routeDate": "10/05/2005 00:00:00",
         "disposition": "APPROVE",
         "closedate": "12/13/2005 00:00:00",
         "remark": "eso1",
         "esos": ["60410"]
       },
       "submitType": "edit"
    }
   }
}
