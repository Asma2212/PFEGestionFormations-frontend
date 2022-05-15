import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLoginFormateurComponent } from './first-login-formateur.component';

describe('FirstLoginFormateurComponent', () => {
  let component: FirstLoginFormateurComponent;
  let fixture: ComponentFixture<FirstLoginFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstLoginFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLoginFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
