import { TestBed } from '@angular/core/testing';

import { AuthGuardFormateurGuard } from './auth-guard-formateur.guard';

describe('AuthGuardFormateurGuard', () => {
  let guard: AuthGuardFormateurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardFormateurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
