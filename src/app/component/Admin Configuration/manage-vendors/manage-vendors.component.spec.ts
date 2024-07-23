import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVendorsComponent } from './manage-vendors.component';

describe('ManageVendorsComponent', () => {
  let component: ManageVendorsComponent;
  let fixture: ComponentFixture<ManageVendorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageVendorsComponent]
    });
    fixture = TestBed.createComponent(ManageVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
