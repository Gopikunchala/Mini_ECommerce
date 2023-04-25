import { TestBed } from '@angular/core/testing';

import { AuthJwtGuard } from './auth-jwt.guard';

describe('AuthJwtGuard', () => {
  let guard: AuthJwtGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthJwtGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
