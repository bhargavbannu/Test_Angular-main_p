import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEccnLocationComponent } from './manage-eccn-location.component';

describe('ManageEccnLocationComponent', () => {
  let component: ManageEccnLocationComponent;
  let fixture: ComponentFixture<ManageEccnLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEccnLocationComponent]
    });
    fixture = TestBed.createComponent(ManageEccnLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
