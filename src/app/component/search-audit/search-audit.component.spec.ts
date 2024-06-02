import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAuditComponent } from './search-audit.component';

describe('SearchAuditComponent', () => {
  let component: SearchAuditComponent;
  let fixture: ComponentFixture<SearchAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAuditComponent]
    });
    fixture = TestBed.createComponent(SearchAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
