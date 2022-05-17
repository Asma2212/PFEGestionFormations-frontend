import { TestBed } from '@angular/core/testing';

import { CandidatGuard } from './candidat.guard';

describe('CandidatGuard', () => {
  let guard: CandidatGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CandidatGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
