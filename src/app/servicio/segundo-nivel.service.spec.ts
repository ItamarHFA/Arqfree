import { TestBed } from '@angular/core/testing';

import { SegundoNivelService } from './segundo-nivel.service';

describe('SegundoNivelService', () => {
  let service: SegundoNivelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SegundoNivelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
