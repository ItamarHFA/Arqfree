import { TestBed } from '@angular/core/testing';

import { TipoProyectoService } from './tipo-proyecto.service';

describe('TipoProyectoService', () => {
  let service: TipoProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
