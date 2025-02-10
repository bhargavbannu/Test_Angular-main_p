import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAuditsComponent } from './view-all-audits.component';

describe('ViewAllAuditsComponent', () => {
  let component: ViewAllAuditsComponent;
  let fixture: ComponentFixture<ViewAllAuditsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllAuditsComponent]
    });
    fixture = TestBed.createComponent(ViewAllAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
