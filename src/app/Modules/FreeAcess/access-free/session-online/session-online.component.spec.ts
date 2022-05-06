import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionOnlineComponent } from './session-online.component';

describe('SessionOnlineComponent', () => {
  let component: SessionOnlineComponent;
  let fixture: ComponentFixture<SessionOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionOnlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
