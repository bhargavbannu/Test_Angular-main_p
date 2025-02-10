import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAuditComponent } from './new-audit.component';

describe('NewAuditComponent', () => {
  let component: NewAuditComponent;
  let fixture: ComponentFixture<NewAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAuditComponent]
    });
    fixture = TestBed.createComponent(NewAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
