import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-eso',
  templateUrl: './view-eso.component.html',
  styleUrls: ['./view-eso.component.css']
})
export class ViewEsoComponent {
  esoData:any;
  esoSaved: any;
  viewRoute: any;
  searchType: any;
  viewStatus: any;

  constructor(private apiService: ApiService, private route:ActivatedRoute){}

  ngOnInit() {
    this.loadEso();
    this.route.params.subscribe(params =>{
      this.esoSaved = params['esoSaved'];
      this.viewRoute = params['fromViewRoute'];
      this.viewStatus = params['fromViewStatus'];
    })
    this.searchType = this.apiService.searchType;

  }

  loadEso() {
    this.apiService.viewEso().subscribe((data) => {
      this.esoData = data;
    });
  }
}
