import { TestBed } from '@angular/core/testing';

import { PrimerNivelService } from './primer-nivel.service';

describe('PrimerNivelService', () => {
  let service: PrimerNivelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimerNivelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
