import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatuerLoginComponent } from './formatuer-login.component';

describe('FormatuerLoginComponent', () => {
  let component: FormatuerLoginComponent;
  let fixture: ComponentFixture<FormatuerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatuerLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatuerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
