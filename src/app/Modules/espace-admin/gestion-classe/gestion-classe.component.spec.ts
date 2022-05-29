import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClasseComponent } from './gestion-classe.component';

describe('GestionClasseComponent', () => {
  let component: GestionClasseComponent;
  let fixture: ComponentFixture<GestionClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionClasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
