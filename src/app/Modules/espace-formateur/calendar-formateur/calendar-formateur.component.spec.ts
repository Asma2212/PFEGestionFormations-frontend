import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFormateurComponent } from './calendar-formateur.component';

describe('CalendarFormateurComponent', () => {
  let component: CalendarFormateurComponent;
  let fixture: ComponentFixture<CalendarFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
