import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTestComponent } from './health-test.component';

describe('HealthTestComponent', () => {
  let component: HealthTestComponent;
  let fixture: ComponentFixture<HealthTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthTestComponent]
    });
    fixture = TestBed.createComponent(HealthTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
