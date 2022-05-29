import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSpecialiteComponent } from './gestion-specialite.component';

describe('GestionSpecialiteComponent', () => {
  let component: GestionSpecialiteComponent;
  let fixture: ComponentFixture<GestionSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSpecialiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
