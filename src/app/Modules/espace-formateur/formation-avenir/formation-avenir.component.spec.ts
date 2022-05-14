import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationAvenirComponent } from './formation-avenir.component';

describe('FormationAvenirComponent', () => {
  let component: FormationAvenirComponent;
  let fixture: ComponentFixture<FormationAvenirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationAvenirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationAvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
