import { TestBed } from '@angular/core/testing';

import { CentreInteretsService } from './centre-interets.service';

describe('CentreInteretsService', () => {
  let service: CentreInteretsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreInteretsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
