import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEffectivitiesComponent } from './manage-effectivities.component';

describe('ManageEffectivitiesComponent', () => {
  let component: ManageEffectivitiesComponent;
  let fixture: ComponentFixture<ManageEffectivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEffectivitiesComponent]
    });
    fixture = TestBed.createComponent(ManageEffectivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
