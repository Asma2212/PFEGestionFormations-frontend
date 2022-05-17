import { TestBed } from '@angular/core/testing';

import { AuthGuardCandidatGuard } from './auth-guard-candidat.guard';

describe('AuthGuardCandidatGuard', () => {
  let guard: AuthGuardCandidatGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardCandidatGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
