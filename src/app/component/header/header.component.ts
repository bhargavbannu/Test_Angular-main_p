import { Component, OnInit } from '@angular/core';
import { TitleCasePipe } from "@angular/common";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{

  // logout() {
  //   // Try to get id_token from PingAuthenticationService or local/session storage
  //   let idToken = '';
  //   if (this.authService && (this.authService as any).idToken) {
  //     idToken = (this.authService as any).idToken;
  //   } else {
  //     idToken = localStorage.getItem('id_token') || sessionStorage.getItem('id_token') || '';
  //   }
  //   const appUrl = window.location.origin;
  //   const logoutUrl = `https://pfloginapp-stage.cloud.aa.com/api/logout?id_token_hint=${idToken}&TargetResource=${encodeURIComponent(appUrl)}`;
  //   window.location.href = logoutUrl;
  // }
  // userName: string = "";
  // titlecasePipe = new TitleCasePipe();
  // employeeNumber: string = "";
  // userRole: string = "";


  // constructor(private readonly authService: PingAuthenticationService) {
  
  // }
 
  ngOnInit(): void {
    // if (this.authService.loggedIn$) {
    //   this.authService.profile$.subscribe((p) => {
    //     console.log(p)
    //       this.userName =
    //       this.titlecasePipe.transform(p.firstname) +
    //       " " +
    //       this.titlecasePipe.transform(p.lastname);
    //     this.employeeNumber = p.uid;
    //     this.userRole = p.amrappvdt;
    //     console.log(this.userName);
    //     console.log(this.userRole);
    //     console.log(this.employeeNumber);        
    //   });
    // }
  }


}
