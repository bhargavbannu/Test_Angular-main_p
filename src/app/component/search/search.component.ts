import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  advancedSearchValue : any;

  constructor(private router: Router){}

  ngOnInit(){
    this.advancedSearchValue = "Advanced Search (Display)"
      this.router.navigateByUrl('/search')
  }


  advancedSearch(){ 
   
  if(this.advancedSearchValue === "Advanced Search (Display)" ){
     this.advancedSearchValue = "Advanced Search (Hide)"
     this.router.navigateByUrl('/search/advance-search')
  }
  else {
    this.advancedSearchValue = "Advanced Search (Display)"
    this.router.navigateByUrl('/search')
  }
  }

}
