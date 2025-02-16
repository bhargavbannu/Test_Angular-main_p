import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEsoComponent } from './edit-eso.component';

describe('EditEsoComponent', () => {
  let component: EditEsoComponent;
  let fixture: ComponentFixture<EditEsoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEsoComponent]
    });
    fixture = TestBed.createComponent(EditEsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
