import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
 

  // constructor(private readonly authService: PingAuthenticationService) {}
 constructor(public apiService: ApiService, private router:Router){}

  employeeNumber: any;
  titlecasePipe = new TitleCasePipe();
  userName: any;
  collapsed = false;
  screenWidth = 0;

  // userTest:any
 ngOnInit(): void {
  // this.screenWidth = window.innerWidth;
  // if (this.authService.loggedIn$) {
  //   this.authService.profile$.subscribe((p) => {
  //     this.apiService.role = p.amrappvdt
  //     //this.apiService.role = "VDT_ROLE_ADMINISTRATOR";
  //     //this.apiService.role = "VDT_ROLE_READONLY";
  //     //this.apiService.role = "VDT_ROLE_AUDITOR";

  //     console.log(p);
  //     this.userName =
  //       this.titlecasePipe.transform(p.given_name) +
  //       " " +
  //       this.titlecasePipe.transform(p.family_name);
  //     // this.uid = empIdFormat(p.BadgeNo);
  //   });
  // }
  // // open on default
  // this.toggleCollapse();
}


@Output() WhenToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
toggleCollapse(): void {
  this.collapsed = !this.collapsed;
  this.WhenToggleSideNav.emit({
    collapsed: this.collapsed,
    screenWidth: this.screenWidth,
  });
}
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
