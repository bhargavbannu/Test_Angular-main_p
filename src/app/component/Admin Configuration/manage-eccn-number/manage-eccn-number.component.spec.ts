import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEccnNumberComponent } from './manage-eccn-number.component';

describe('ManageEccnNumberComponent', () => {
  let component: ManageEccnNumberComponent;
  let fixture: ComponentFixture<ManageEccnNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEccnNumberComponent]
    });
    fixture = TestBed.createComponent(ManageEccnNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
