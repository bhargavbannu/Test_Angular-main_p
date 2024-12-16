import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { HeaderComponent } from './component/header/header.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { SearchComponent } from './component/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchPaginationComponent } from './component/search-pagination/search-pagination.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DocumentComponent } from './component/document/document.component';
import { SearchAuditComponent } from './component/search-audit/search-audit.component';
import { SearchRoutesComponent } from './component/search-routes/search-routes.component';
import { FormsModule } from '@angular/forms';

import { EsoComponent } from './component/ESO Information/eso/eso.component';
import { EditEsoComponent } from './component/ESO Information/edit-eso/edit-eso.component';
import { ManageEffectivitiesComponent } from './component/Admin Configuration/manage-effectivities/manage-effectivities.component';
import { ManageVendorsComponent } from './component/Admin Configuration/manage-vendors/manage-vendors.component';
import { ManageSectionsComponent } from './component/Admin Configuration/manage-sections/manage-sections.component';
import { ManageAuditStatusesComponent } from './component/Admin Configuration/manage-audit-statuses/manage-audit-statuses.component';
import { ManageDetailDocTypeComponent } from './component/Admin Configuration/manage-detail-doc-type/manage-detail-doc-type.component';
import { ManageDocCategoriesComponent } from './component/Admin Configuration/manage-doc-categories/manage-doc-categories.component';
import { ManageEccnLocationComponent } from './component/Admin Configuration/manage-eccn-location/manage-eccn-location.component';
import { ManageEccnNumberComponent } from './component/Admin Configuration/manage-eccn-number/manage-eccn-number.component';
import { HealthTestComponent } from './component/health-test/health-test.component';
import { ViewSearchComponent } from './component/viewSearch/view-search/view-search.component';
import { ViewAuditComponent } from './component/viewAudit/view-audit/view-audit.component';
import { ViewAllAuditsComponent } from './component/viewAllAudits/view-all-audits/view-all-audits.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    SideNavComponent,
    SearchComponent,
    SearchPaginationComponent,
    DocumentComponent,
    SearchAuditComponent,
    SearchRoutesComponent,
    EsoComponent,
    EditEsoComponent,
    ManageSectionsComponent,
    ManageEffectivitiesComponent,
    ManageVendorsComponent,
    ManageAuditStatusesComponent,
    ManageDetailDocTypeComponent,
    ManageDocCategoriesComponent,
    ManageEccnLocationComponent,
    ManageEccnNumberComponent,
    HealthTestComponent,
    ViewSearchComponent,
    ViewAuditComponent,
    ViewAllAuditsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
