import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFormateursComponent } from './liste-formateurs.component';

describe('ListeFormateursComponent', () => {
  let component: ListeFormateursComponent;
  let fixture: ComponentFixture<ListeFormateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFormateursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFormateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
