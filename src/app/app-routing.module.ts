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
import { ManageAuditStatusesComponent } from './component/Admin Configuration/manage-audit-statuses/manage-audit-statuses.component';
import { ManageDetailDocTypeComponent } from './component/Admin Configuration/manage-detail-doc-type/manage-detail-doc-type.component';
import { ManageDocCategoriesComponent } from './component/Admin Configuration/manage-doc-categories/manage-doc-categories.component';
import { ManageEccnLocationComponent } from './component/Admin Configuration/manage-eccn-location/manage-eccn-location.component';
import { ManageEccnNumberComponent } from './component/Admin Configuration/manage-eccn-number/manage-eccn-number.component';
import { HealthTestComponent } from './component/health-test/health-test.component'
import { ViewSearchComponent } from './component/viewSearch/view-search/view-search.component';
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
  {
    path: 'Manage-audit-statuses',
    component: ManageAuditStatusesComponent,
  },
  {
    path: 'Manage-detail-doc-type',
    component: ManageDetailDocTypeComponent,
  },
  {
    path: 'Manage-doc-categories',
    component: ManageDocCategoriesComponent,
  },
  {
    path: 'Manage-eccn-location',
    component: ManageEccnLocationComponent,
  },
  {
    path: 'Manage-eccn-number',
    component: ManageEccnNumberComponent,
  },
  {
    path: 'viewStatus',
    component: ViewSearchComponent,
  },
  { path: 'health', 
    component: HealthTestComponent
   },

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
