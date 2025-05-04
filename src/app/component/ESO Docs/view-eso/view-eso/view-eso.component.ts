import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
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
  viewDetail: any;

  constructor(private apiService: ApiService, private route:ActivatedRoute, private router:Router){}

  ngOnInit() {
    this.loadEso();
    this.route.params.subscribe(params =>{
      this.esoSaved = params['esoSaved'];
      this.viewRoute = params['fromViewRoute'];
      this.viewStatus = params['fromViewStatus'];
      this.viewDetail = params['fromViewDetail'];
    })
    this.searchType = this.apiService.searchType;

  }

  loadEso() {
    this.apiService.viewEso().subscribe((data) => {
      this.esoData = data;
    });
  }

  editEso(){
    if(this.viewStatus){
   this.router.navigate(['/edit-eso',{fromViewStatus:true}])
    }
    else if(this.viewDetail){
      this.router.navigate(['/edit-eso',{fromViewDetail:true}])
    }
    else if(this.viewRoute){
      this.router.navigate(['/edit-eso',{fromViewRoute:true}])
    }
    else{
      this.router.navigate(['/edit-eso'])
    }
  }
}
