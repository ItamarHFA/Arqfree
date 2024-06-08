import { TestBed } from '@angular/core/testing';

import { EstiloFachadaService } from './estilo-fachada.service';

describe('EstiloFachadaService', () => {
  let service: EstiloFachadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstiloFachadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
