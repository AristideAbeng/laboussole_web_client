import { TestBed } from '@angular/core/testing';

import { ActualitesService } from './actualites.service';

describe('ActualitesService', () => {
  let service: ActualitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
