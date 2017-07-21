import { TestBed, async, inject } from '@angular/core/testing';

import { AutorisationGuard } from './autorisation.guard';

describe('AutorisationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutorisationGuard]
    });
  });

  it('should ...', inject([AutorisationGuard], (guard: AutorisationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
