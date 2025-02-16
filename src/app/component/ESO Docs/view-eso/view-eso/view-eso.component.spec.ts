import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEsoComponent } from './view-eso.component';

describe('ViewEsoComponent', () => {
  let component: ViewEsoComponent;
  let fixture: ComponentFixture<ViewEsoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEsoComponent]
    });
    fixture = TestBed.createComponent(ViewEsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
