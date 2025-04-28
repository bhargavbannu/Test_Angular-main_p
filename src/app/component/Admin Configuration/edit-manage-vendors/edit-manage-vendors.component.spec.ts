import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManageVendorsComponent } from './edit-manage-vendors.component';

describe('EditManageVendorsComponent', () => {
  let component: EditManageVendorsComponent;
  let fixture: ComponentFixture<EditManageVendorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditManageVendorsComponent]
    });
    fixture = TestBed.createComponent(EditManageVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
