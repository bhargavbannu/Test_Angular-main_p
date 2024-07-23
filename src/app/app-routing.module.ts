import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './component/search/search.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { SearchPaginationComponent } from './component/search-pagination/search-pagination.component';
import { DocumentComponent } from './component/document/document.component';
import { SearchAuditComponent } from './component/search-audit/search-audit.component';
import { SearchRoutesComponent } from './component/search-routes/search-routes.component';
import { EsoComponent } from './component/ESO Information/eso/eso.component';
import { EditEsoComponent } from './component/ESO Information/edit-eso/edit-eso.component';
import { ManageEffectivitiesComponent } from './component/Admin Configuration/manage-effectivities/manage-effectivities.component';
import { ManageSectionsComponent } from './component/Admin Configuration/manage-sections/manage-sections.component';
import { ManageVendorsComponent } from './component/Admin Configuration/manage-vendors/manage-vendors.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent,
    children: [ 
      { path: 'advance-search', component: SearchPaginationComponent },
    ],
  },
  {
    path: 'search-audits',
    component: SearchAuditComponent,
  },
  {
    path: 'search-routes',
    component: SearchRoutesComponent,
  },
  {
    path: 'document',
    component: DocumentComponent,
  },
  {
    path: 'Add-ESO',
    component: EsoComponent,
  },
  {
    path: 'View-Edit-ESO',
    component: EditEsoComponent,
  },
  {
    path: 'Manage-Effectivities',
    component: ManageEffectivitiesComponent,
  },
  {
    path: 'Manage-Sections',
    component: ManageSectionsComponent,
  },
  {
    path: 'Manage-Vendors',
    component: ManageVendorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
