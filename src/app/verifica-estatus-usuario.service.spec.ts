import { TestBed } from '@angular/core/testing';

import { VerificaEstatusUsuarioService } from './verifica-estatus-usuario.service';

describe('VerificaEstatusUsuarioService', () => {
  let service: VerificaEstatusUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificaEstatusUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
