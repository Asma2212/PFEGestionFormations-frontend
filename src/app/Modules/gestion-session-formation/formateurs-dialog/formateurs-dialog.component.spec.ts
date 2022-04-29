import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateursDialogComponent } from './formateurs-dialog.component';

describe('FormateursDialogComponent', () => {
  let component: FormateursDialogComponent;
  let fixture: ComponentFixture<FormateursDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormateursDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormateursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
