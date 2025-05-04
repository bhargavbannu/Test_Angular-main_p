import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
 constructor(private apiService: ApiService, private router:Router){}
 resetFormData(){
  this.apiService.formData = null;
 }

 default(route:any){
  this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
    this.router.navigate([route]);
  }
  )
 }
}
