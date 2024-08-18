import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditStatusesComponent } from './manage-audit-statuses.component';

describe('ManageAuditStatusesComponent', () => {
  let component: ManageAuditStatusesComponent;
  let fixture: ComponentFixture<ManageAuditStatusesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAuditStatusesComponent]
    });
    fixture = TestBed.createComponent(ManageAuditStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
