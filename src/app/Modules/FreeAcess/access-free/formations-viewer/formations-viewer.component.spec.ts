import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsViewerComponent } from './formations-viewer.component';

describe('FormationsViewerComponent', () => {
  let component: FormationsViewerComponent;
  let fixture: ComponentFixture<FormationsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationsViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
