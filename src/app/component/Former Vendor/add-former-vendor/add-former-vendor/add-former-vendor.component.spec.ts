import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormerVendorComponent } from './add-former-vendor.component';

describe('AddFormerVendorComponent', () => {
  let component: AddFormerVendorComponent;
  let fixture: ComponentFixture<AddFormerVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFormerVendorComponent]
    });
    fixture = TestBed.createComponent(AddFormerVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
