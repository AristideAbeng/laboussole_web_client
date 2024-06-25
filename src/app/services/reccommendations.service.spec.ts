import { TestBed } from '@angular/core/testing';

import { ReccommendationsService } from './reccommendations.service';

describe('ReccommendationsService', () => {
  let service: ReccommendationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReccommendationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
