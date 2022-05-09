import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureIsetComponent } from './architecture-iset.component';

describe('ArchitectureIsetComponent', () => {
  let component: ArchitectureIsetComponent;
  let fixture: ComponentFixture<ArchitectureIsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchitectureIsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectureIsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
