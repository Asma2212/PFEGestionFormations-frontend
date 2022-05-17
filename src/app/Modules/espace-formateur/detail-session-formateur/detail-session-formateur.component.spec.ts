import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSessionFormateurComponent } from './detail-session-formateur.component';

describe('DetailSessionFormateurComponent', () => {
  let component: DetailSessionFormateurComponent;
  let fixture: ComponentFixture<DetailSessionFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSessionFormateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSessionFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
