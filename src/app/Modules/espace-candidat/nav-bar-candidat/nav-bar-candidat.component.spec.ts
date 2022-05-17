import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCandidatComponent } from './nav-bar-candidat.component';

describe('NavBarCandidatComponent', () => {
  let component: NavBarCandidatComponent;
  let fixture: ComponentFixture<NavBarCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarCandidatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
