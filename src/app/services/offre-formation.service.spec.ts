import { TestBed } from '@angular/core/testing';

import { OffreFormationService } from './offre-formation.service';

describe('OffreFormationService', () => {
  let service: OffreFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
