import { TestBed } from '@angular/core/testing';

import { AuthGuardGuardFormateurGuard } from './auth-guard-guard-formateur.guard';

describe('AuthGuardGuardFormateurGuard', () => {
  let guard: AuthGuardGuardFormateurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardGuardFormateurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
