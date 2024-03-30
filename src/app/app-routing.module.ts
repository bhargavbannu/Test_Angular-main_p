import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './component/search/search.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { SearchPaginationComponent } from './component/search-pagination/search-pagination.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent, 
    children: [
      { path: 'advance-search', component: SearchPaginationComponent}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
