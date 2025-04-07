import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrouteComponent } from './newroute.component';

describe('NewrouteComponent', () => {
  let component: NewrouteComponent;
  let fixture: ComponentFixture<NewrouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewrouteComponent]
    });
    fixture = TestBed.createComponent(NewrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
