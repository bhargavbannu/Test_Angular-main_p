import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRouteChildComponent } from './view-route-child.component';

describe('ViewRouteChildComponent', () => {
  let component: ViewRouteChildComponent;
  let fixture: ComponentFixture<ViewRouteChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRouteChildComponent]
    });
    fixture = TestBed.createComponent(ViewRouteChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
