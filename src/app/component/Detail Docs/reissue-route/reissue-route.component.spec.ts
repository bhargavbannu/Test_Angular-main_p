import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReissueRouteComponent } from './reissue-route.component';

describe('ReissueRouteComponent', () => {
  let component: ReissueRouteComponent;
  let fixture: ComponentFixture<ReissueRouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReissueRouteComponent]
    });
    fixture = TestBed.createComponent(ReissueRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
