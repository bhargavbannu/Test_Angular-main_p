import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocCategoriesComponent } from './manage-doc-categories.component';

describe('ManageDocCategoriesComponent', () => {
  let component: ManageDocCategoriesComponent;
  let fixture: ComponentFixture<ManageDocCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageDocCategoriesComponent]
    });
    fixture = TestBed.createComponent(ManageDocCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
