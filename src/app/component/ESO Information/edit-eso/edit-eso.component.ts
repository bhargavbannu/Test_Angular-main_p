import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-eso',
  templateUrl: './edit-eso.component.html',
  styleUrls: ['./edit-eso.component.css']
})
export class EditEsoComponent {
eso: any;
  esoNumbers: any[]=[];
  showError: boolean = false;
  esoData: any[]=[];
  esoDeleted: any;

constructor(public apiService: ApiService, private router: Router, private route:ActivatedRoute){}

ngOnInit(){
   this.route.params.subscribe(params =>{
      this.esoDeleted = params['esoDeleted']
    })
}


viewESO() {
  if(this.esoData.includes(this.eso)){
  this.apiService.eso = this.eso
  this.router.navigate(["/view-eso"])
  }
  else {
    this.showError = true
  }
}

editESO(){
  if(this.esoData.includes(this.eso)){
  this.apiService.eso = this.eso
  this.router.navigate(["/edit-eso"])
  }
  else {
    this.router.navigate(["/Add-ESO", { fromEditEso: true }])
  }
  // else {
  //   this.showError = true
  // }
}

onESOChange(esoId: any) {
  this.apiService.esoNumbersApiData(esoId).subscribe((res)=>{
    this.esoNumbers = res
    this.esoData = res
    if(this.eso === '' || this.eso === null || this.eso === undefined){
      this.esoNumbers = [];
    }
  })

}

selectEso(esoId:any){
 this.eso = esoId;
 this.esoNumbers=[];
}

onFocusOut(){
  this.esoNumbers = [];
}
}
