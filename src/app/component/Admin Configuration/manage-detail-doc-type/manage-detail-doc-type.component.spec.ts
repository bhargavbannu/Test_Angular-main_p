import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDetailDocTypeComponent } from './manage-detail-doc-type.component';

describe('ManageDetailDocTypeComponent', () => {
  let component: ManageDetailDocTypeComponent;
  let fixture: ComponentFixture<ManageDetailDocTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageDetailDocTypeComponent]
    });
    fixture = TestBed.createComponent(ManageDetailDocTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
