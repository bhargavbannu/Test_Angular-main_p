import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.css']
})
export class ViewDetailComponent implements OnInit{
  docDetails:any;
  detailSaved: any;
  constructor(private apiService: ApiService, private route:ActivatedRoute){}

  ngOnInit() {
    this.loadDetails();
    this.route.params.subscribe(params =>{
      this.detailSaved = params['detailSaved']
    })
  }

  loadDetails() {
    this.apiService.viewDetail().subscribe((data) => {
      this.docDetails = data;
    });
  }
}
