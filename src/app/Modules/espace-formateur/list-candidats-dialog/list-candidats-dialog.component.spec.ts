import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCandidatsDialogComponent } from './list-candidats-dialog.component';

describe('ListCandidatsDialogComponent', () => {
  let component: ListCandidatsDialogComponent;
  let fixture: ComponentFixture<ListCandidatsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCandidatsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCandidatsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
