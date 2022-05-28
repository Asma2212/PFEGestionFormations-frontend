import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSuggestionComponent } from './gestion-suggestion.component';

describe('GestionSuggestionComponent', () => {
  let component: GestionSuggestionComponent;
  let fixture: ComponentFixture<GestionSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
