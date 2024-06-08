import { TestBed } from '@angular/core/testing';

import { TercerNivelService } from './tercer-nivel.service';

describe('TercerNivelService', () => {
  let service: TercerNivelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TercerNivelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
