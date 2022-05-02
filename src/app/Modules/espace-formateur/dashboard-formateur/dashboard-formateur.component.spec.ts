import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFormateurComponent } from './dashboard-formateur.component';

describe('DashboardFormateurComponent', () => {
  let component: DashboardFormateurComponent;
  let fixture: ComponentFixture<DashboardFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
