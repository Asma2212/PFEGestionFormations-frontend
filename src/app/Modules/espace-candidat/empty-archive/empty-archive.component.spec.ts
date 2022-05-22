import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyArchiveComponent } from './empty-archive.component';

describe('EmptyArchiveComponent', () => {
  let component: EmptyArchiveComponent;
  let fixture: ComponentFixture<EmptyArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
